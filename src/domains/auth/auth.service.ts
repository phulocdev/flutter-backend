import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService, TokenExpiredError } from '@nestjs/jwt'
import { Role } from 'core/constants/enum'
import { BadRequestError, NotFoundError, UnauthorizedError } from 'core/exceptions/errors.exception'
import { AccountType, AuthTokenPayload } from 'core/types/type'
import { AccountsService } from 'domains/accounts/accounts.service'
import { ChangePasswordDto } from 'domains/auth/dtos/change-password.dto'
import { ForgotPasswordtDto } from 'domains/auth/dtos/forgot-password.dto'
import { LogoutDto } from 'domains/auth/dtos/logout.dto'
import { RefreshTokenDto } from 'domains/auth/dtos/refresh-token.dto'
import { RegisterAccountDto } from 'domains/auth/dtos/register-account-dto'
import mongoose from 'mongoose'
import ms, { StringValue } from 'ms'

@Injectable()
export class AuthService {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
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

  async register(registerAccountDto: RegisterAccountDto) {
    const { email, fullName, password, address } = registerAccountDto

    const accountId = new mongoose.Types.ObjectId().toString()
    const [accessToken, refreshToken] = await Promise.all([
      this.signAccessToken({
        _id: accountId,
        email,
        fullName,
        role: Role.Customer,
        avatarUrl: ''
      }),
      this.signRefreshToken({
        _id: accountId,
        email,
        fullName,
        role: Role.Customer,
        avatarUrl: ''
      })
    ])

    const account = await this.accountsService.create({
      email,
      password,
      fullName,
      address,
      _id: accountId
    })
    this.accountsService.updateRefreshToken(accountId, refreshToken)

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

  async forgotPassword(forgotPasswordDto: ForgotPasswordtDto) {
    const { email, password } = forgotPasswordDto
    const account = await this.accountsService.findByEmail(email)
    if (!account) {
      throw new NotFoundError('Email không tồn tại trên hệ thống')
    }
    return this.accountsService.updatePassword(account._id.toString(), password)
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
      refreshToken
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
}
