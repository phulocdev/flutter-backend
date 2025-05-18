import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { formatNumberToVND } from 'core/utils/utils'
import { Order } from 'domains/orders/schemas/order.schema'

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

  async sendOrderConfirmation(order: Order) {
    const { totalPrice, discountAmount, code, shippingInfo } = order
    const { address, phoneNumber, name, email } = shippingInfo

    await this.mailerService.sendMail({
      to: email,
      from: 'Flutter Ecommerce',
      subject: `Xác nhận đặt hàng thành công | ${code}`,
      template: './order-confirmation',
      context: {
        username: name,
        orderUrl: ``,
        items: [],
        discount: discountAmount,
        totalAmount: formatNumberToVND(totalPrice),
        shippingFee: formatNumberToVND(26000),
        totalAmountWithShippingFee: formatNumberToVND(totalPrice + 26000),
        detailedAddress: address,
        ward: '',
        district: '',
        province: '',
        phoneNumber,
        paymentMethod: 'Thanh toán khi nhận hàng(COD)',
        shippingMethod: 'Vận chuyển nhanh',
        orderStatus: 'Đã xác nhận'
      }
    })
  }
}
