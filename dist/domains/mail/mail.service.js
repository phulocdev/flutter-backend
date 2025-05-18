"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const utils_1 = require("../../core/utils/utils");
let MailService = exports.MailService = class MailService {
    constructor(mailerService, configService) {
        this.mailerService = mailerService;
        this.configService = configService;
    }
    async sendOtp(email, otpCode) {
        this.mailerService.sendMail({
            to: email,
            from: 'Flutter E-Commerce TDTU 2025',
            subject: 'Mã OTP để khôi phục mật khẩu',
            template: './send-otp',
            context: {
                userEmail: email,
                otpCode
            }
        });
    }
    async sendOrderConfirmation(order) {
        const { totalPrice, discountAmount, code, shippingInfo } = order;
        const { address, phoneNumber, name, email } = shippingInfo;
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
                totalAmount: (0, utils_1.formatNumberToVND)(totalPrice),
                shippingFee: (0, utils_1.formatNumberToVND)(26000),
                totalAmountWithShippingFee: (0, utils_1.formatNumberToVND)(totalPrice + 26000),
                detailedAddress: address,
                ward: '',
                district: '',
                province: '',
                phoneNumber,
                paymentMethod: 'Thanh toán khi nhận hàng(COD)',
                shippingMethod: 'Vận chuyển nhanh',
                orderStatus: 'Đã xác nhận'
            }
        });
    }
};
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mailer_1.MailerService,
        config_1.ConfigService])
], MailService);
//# sourceMappingURL=mail.service.js.map