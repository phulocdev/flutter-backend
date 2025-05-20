import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'
import { Role } from 'core/constants/enum'
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  UnprocessableEntityError
} from 'core/exceptions/errors.exception'
import { AccountType, AuthTokenPayload } from 'core/types/type'
import { AccountsService } from 'domains/accounts/accounts.service'
import { ChangePasswordDto } from 'domains/auth/dtos/change-password.dto'
import { LogoutDto } from 'domains/auth/dtos/logout.dto'
import { RefreshTokenDto } from 'domains/auth/dtos/refresh-token.dto'
import { RegisterAccountGuestDto } from 'domains/auth/dtos/register-account-guest.dto'
import { RegisterAccountDto } from 'domains/auth/dtos/register-account.dto'
import { ResetPasswordDto } from 'domains/auth/dtos/reset-password.dto'
import { MailService } from 'domains/mail/mail.service'
import { OtpsService } from 'domains/otps/otps.service'
import mongoose from 'mongoose'
import ms, { StringValue } from 'ms'

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private mailService: MailService,
    private otpService: OtpsService
  ) {}

  async validateAccount(email: string, password: string) {
    const account = await this.accountsService.findAccountByEmailAndPassword({ email, password })
    if (account) {
      const { password, ...result } = account.toObject()
      return result
    }
    return null
  }

  async login(account: AccountType) {
    const payload = account
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload)
    ])
    await this.accountsService.updateRefreshToken(account._id.toString(), refreshToken)

    return {
      accessToken,
      refreshToken,
      account
    }
  }

  async registerGuest(registerAccountGuestDto: RegisterAccountGuestDto): Promise<AccountType> {
    const existingAccount = await this.accountsService.findByEmail(registerAccountGuestDto.email)

    if (!existingAccount) {
      return this.accountsService.createForGuest(registerAccountGuestDto)
    }

    return {
      _id: existingAccount._id,
      avatarUrl: existingAccount.avatarUrl,
      email: existingAccount.email,
      fullName: existingAccount.fullName,
      role: existingAccount.role,
      address: existingAccount.address,
      phoneNumber: existingAccount.phoneNumber
    }
  }

  async register(registerAccountDto: RegisterAccountDto) {
    const accountId = new mongoose.Types.ObjectId().toString()
    const { email, fullName, password, address } = registerAccountDto
    const existingAccount = await this.accountsService.findByEmail(email)
    let account: AccountType | undefined

    if (existingAccount) {
      if (!existingAccount.isGuest) {
        throw new UnprocessableEntityError([{ field: 'email', message: 'Email này đã tồn tại trên hệ thống' }])
      }
      account = await this.accountsService.findOneAndUpdateByEmail(email, { ...registerAccountDto, isGuest: false })
    } else {
      account = await this.accountsService.create({ address, email, fullName, password, _id: accountId })
    }

    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken({
        _id: account._id,
        email,
        fullName,
        role: Role.Customer,
        avatarUrl: '',
        address: account.address,
        phoneNumber: account.phoneNumber
      }),
      this.signRefreshToken({
        _id: account._id,
        email,
        fullName,
        role: Role.Customer,
        avatarUrl: '',
        address: account.address,
        phoneNumber: account.phoneNumber
      })
    ])

    this.accountsService.updateRefreshToken(account._id.toString(), refreshToken)

    return {
      accessToken,
      refreshToken,
      account
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    let accountId: string | undefined = undefined
    try {
      const account = await this.accountsService.findByRefreshToken(refreshTokenDto.refreshToken)
      if (!account || !refreshTokenDto.refreshToken) {
        throw new UnauthorizedError('INVALID_REFRESH_TOKEN')
      }

      accountId = account._id.toString()
      const decodedOldRefreshToken = await this.jwtService.verifyAsync<AuthTokenPayload>(refreshTokenDto.refreshToken, {
        secret: this.configService.get<string>('refreshToken.secret')
      })

      const { iat, exp, ...payload } = decodedOldRefreshToken
      const [accessToken, refreshToken] = await Promise.all([
        this.signAccessToken(payload),
        this.signRefreshToken(payload, decodedOldRefreshToken.exp)
      ])
      await this.accountsService.updateRefreshToken(account._id.toString(), refreshToken)
      return {
        accessToken,
        refreshToken,
        account: payload
      }
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        if (accountId) {
          this.accountsService.updateRefreshToken(accountId, '')
        }
        throw new UnauthorizedError('REFRESH_TOKEN_EXPIRED')
      }
      throw error
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    const { email, otpCode, password } = resetPasswordDto
    // Email of user is already check exist when send OTP code
    const otpDocument = await this.otpService.findOtpCodeByUserEmail(email)
    // OTP expire
    if (!otpDocument) {
      throw new BadRequestError('Mã OTP không còn hiệu lực')
    }

    const { otp: userOtp } = otpDocument
    if (userOtp !== Number(otpCode)) {
      throw new BadRequestError('Mã OTP không chính xác')
    }
    await this.accountsService.updatePasswordByEmail(email, password)
    await this.otpService.removeOtpByEmail(email)
  }

  async changePassword(changePasswordDto: ChangePasswordDto, account: AccountType) {
    const { oldPassword, newPassword } = changePasswordDto

    const accountDocument = await this.accountsService.findByEmail(account.email)
    if (!accountDocument) {
      throw new NotFoundError('Tài khoản không tồn tại trên hệ thống')
    }

    const isMatchPassowrd = await this.accountsService.comparePassword(oldPassword, accountDocument.password)
    if (!isMatchPassowrd) {
      throw new BadRequestError('Mật khẩu cũ không chính xác')
    }

    const payload = account
    const decodedOldRefreshToken = this.jwtService.decode<AuthTokenPayload>(accountDocument.refreshToken)
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken(payload),
      this.signRefreshToken(payload, decodedOldRefreshToken.exp),
      this.accountsService.updatePassword(accountDocument._id.toString(), newPassword)
    ])

    return {
      accessToken,
      refreshToken,
      account: {
        _id: account._id,
        avatarUrl: account.avatarUrl,
        email: account.email,
        fullName: account.fullName,
        role: account.role,
        address: account.address,
        phoneNumber: account.phoneNumber
      }
    }
  }

  async logout(logoutDto: LogoutDto) {
    try {
      const { refreshToken } = logoutDto
      const decodedRefreshToken = await this.jwtService.verifyAsync<AuthTokenPayload>(refreshToken, {
        secret: this.configService.get<string>('refreshToken.secret')
      })
      this.accountsService.updateRefreshToken(decodedRefreshToken._id.toString(), '')
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedError('REFRESH_TOKEN_EXPIRED')
      }
      throw error
    }
  }

  signAccessToken(payload: AccountType) {
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('accessToken.secret'),
      expiresIn: ms(this.configService.get<StringValue>('accessToken.expiresIn')) / 1000
    })
  }

  signRefreshToken(payload: AccountType, exp?: number) {
    if (exp) {
      return this.jwtService.signAsync(
        { ...payload, exp },
        {
          secret: this.configService.get<string>('refreshToken.secret')
        }
      )
    }
    return this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('refreshToken.secret'),
      expiresIn: ms(this.configService.get<StringValue>('refreshToken.expiresIn')) / 1000
    })
  }

  public async getUserFromAuthenticationToken(token: string) {
    const payload: AuthTokenPayload = this.jwtService.verify(token, {
      secret: this.configService.get<string>('accessToken.secret')
    })
    if (payload._id) {
      return this.accountsService.findOne(payload._id)
    }
  }

  async handleSendOtp(email: string) {
    const existAccount = await this.accountsService.findByEmail(email)
    if (!existAccount) {
      throw new UnprocessableEntityError([{ field: 'email', message: 'Email không tồn tại trên hệ thống' }])
    }

    const otpCode = Math.trunc(Math.random() * 1000000)
    this.mailService.sendOtp(email, otpCode)

    this.otpService.create({ otp: otpCode, email })
  }
}
