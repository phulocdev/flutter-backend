import { Body, Controller, Patch, Post, Request, UseGuards } from '@nestjs/common'
import { Account } from 'core/decorators/account.decorator'
import { Public } from 'core/decorators/public.decorator'
import { ResponseMessage } from 'core/decorators/response-message.decorator'
import { LocalEmployeeAuthGuard } from 'core/guards/local-auth.guard'
import { AccountType } from 'core/types/type'
import { AuthService } from 'domains/auth/auth.service'
import { ChangePasswordDto } from 'domains/auth/dtos/change-password.dto'
import { ForgotPasswordtDto } from 'domains/auth/dtos/forgot-password.dto'
import { LoginDto } from 'domains/auth/dtos/login.dto'
import { LogoutDto } from 'domains/auth/dtos/logout.dto'
import { RefreshTokenDto } from 'domains/auth/dtos/refresh-token.dto'
import { RegisterAccountDto } from 'domains/auth/dtos/register-account-dto'

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
  @Post('refresh-token')
  @ResponseMessage('Làm mới token thành công')
  refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenDto)
  }

  @Public()
  @Patch('forgot-password')
  @ResponseMessage('Yêu cầu đặt lại mật khẩu đã được gửi')
  forgotPassword(@Body() forgotPasswordtDto: ForgotPasswordtDto) {
    return this.authService.forgotPassword(forgotPasswordtDto)
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
}
