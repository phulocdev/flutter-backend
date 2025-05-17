import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common'
import { Account } from 'core/decorators/account.decorator'
import { Public } from 'core/decorators/public.decorator'
import { ResponseMessage } from 'core/decorators/response-message.decorator'
import { LocalEmployeeAuthGuard } from 'core/guards/local-auth.guard'
import { AccountType } from 'core/types/type'
import { AuthService } from 'domains/auth/auth.service'
import { ChangePasswordDto } from 'domains/auth/dtos/change-password.dto'
import { ResetPasswordDto } from 'domains/auth/dtos/reset-password.dto'
import { LoginDto } from 'domains/auth/dtos/login.dto'
import { LogoutDto } from 'domains/auth/dtos/logout.dto'
import { RefreshTokenDto } from 'domains/auth/dtos/refresh-token.dto'
import { RegisterAccountGuestDto } from 'domains/auth/dtos/register-account-guest.dto'
import { RegisterAccountDto } from 'domains/auth/dtos/register-account.dto'
import { ForgotPasswordDto } from 'domains/auth/dtos/forgot-password.dto'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('login')
  @UseGuards(LocalEmployeeAuthGuard)
  @ResponseMessage('Đăng nhập thành công')
  login(@Body() loginDto: LoginDto, @Request() req) {
    return this.authService.login(req.user as AccountType)
  }

  @Public()
  @Post('register')
  @ResponseMessage('Đăng ký tài khoản thành công')
  register(@Body() registerAccountDto: RegisterAccountDto) {
    return this.authService.register(registerAccountDto)
  }

  @Public()
  @Post('register/guest')
  @ResponseMessage('Đăng ký tài khoản cho khách hàng thành công')
  registerForGuest(@Body() registerAccountGuestDto: RegisterAccountGuestDto) {
    return this.authService.registerGuest(registerAccountGuestDto)
  }

  @Public()
  @Post('refresh-token')
  @ResponseMessage('Làm mới token thành công')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Public()
  @Post('reset-password')
  @ResponseMessage('Đặt lại mật khẩu thành công')
  async resetUserPassword(@Body() body: ResetPasswordDto) {
    return this.authService.resetPassword(body)
  }

  @Patch('change-password')
  @ResponseMessage('Mật khẩu đã được thay đổi thành công')
  changePassword(@Body() changePasswordDto: ChangePasswordDto, @Account() account: AccountType) {
    return this.authService.changePassword(changePasswordDto, account)
  }

  @Post('logout')
  @ResponseMessage('Đăng xuất thành công')
  logout(@Body() logoutDto: LogoutDto) {
    return this.authService.logout(logoutDto)
  }

  @Public()
  @Post('forgot-password')
  @ResponseMessage('Gửi mã OTP thành công')
  async forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.handleSendOtp(forgotPasswordDto.email)
  }
}
