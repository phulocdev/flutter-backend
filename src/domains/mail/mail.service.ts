import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private configService: ConfigService
  ) {}

  async sendOtp(email: string, otpCode: number) {
    this.mailerService.sendMail({
      to: email,
      from: 'Flutter E-Commerce TDTU 2025',
      subject: 'Mã OTP để khôi phục mật khẩu',
      template: './send-otp',
      context: {
        userEmail: email,
        otpCode
      }
    })
  }
}
