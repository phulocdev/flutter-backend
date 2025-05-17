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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const account_decorator_1 = require("../../core/decorators/account.decorator");
const public_decorator_1 = require("../../core/decorators/public.decorator");
const response_message_decorator_1 = require("../../core/decorators/response-message.decorator");
const local_auth_guard_1 = require("../../core/guards/local-auth.guard");
const auth_service_1 = require("./auth.service");
const change_password_dto_1 = require("./dtos/change-password.dto");
const reset_password_dto_1 = require("./dtos/reset-password.dto");
const login_dto_1 = require("./dtos/login.dto");
const logout_dto_1 = require("./dtos/logout.dto");
const refresh_token_dto_1 = require("./dtos/refresh-token.dto");
const register_account_guest_dto_1 = require("./dtos/register-account-guest.dto");
const register_account_dto_1 = require("./dtos/register-account.dto");
const forgot_password_dto_1 = require("./dtos/forgot-password.dto");
let AuthController = exports.AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    login(loginDto, req) {
        return this.authService.login(req.user);
    }
    register(registerAccountDto) {
        return this.authService.register(registerAccountDto);
    }
    registerForGuest(registerAccountGuestDto) {
        return this.authService.registerGuest(registerAccountGuestDto);
    }
    refreshToken(refreshTokenDto) {
        return this.authService.refreshToken(refreshTokenDto);
    }
    async resetUserPassword(body) {
        return this.authService.resetPassword(body);
    }
    changePassword(changePasswordDto, account) {
        return this.authService.changePassword(changePasswordDto, account);
    }
    logout(logoutDto) {
        return this.authService.logout(logoutDto);
    }
    async forgotPassword(forgotPasswordDto) {
        return this.authService.handleSendOtp(forgotPasswordDto.email);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('login'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalEmployeeAuthGuard),
    (0, response_message_decorator_1.ResponseMessage)('Đăng nhập thành công'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register'),
    (0, response_message_decorator_1.ResponseMessage)('Đăng ký tài khoản thành công'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_account_dto_1.RegisterAccountDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "register", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('register/guest'),
    (0, response_message_decorator_1.ResponseMessage)('Đăng ký tài khoản cho khách hàng thành công'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_account_guest_dto_1.RegisterAccountGuestDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerForGuest", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('refresh-token'),
    (0, response_message_decorator_1.ResponseMessage)('Làm mới token thành công'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [refresh_token_dto_1.RefreshTokenDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "refreshToken", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('reset-password'),
    (0, response_message_decorator_1.ResponseMessage)('Đặt lại mật khẩu thành công'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [reset_password_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetUserPassword", null);
__decorate([
    (0, common_1.Patch)('change-password'),
    (0, response_message_decorator_1.ResponseMessage)('Mật khẩu đã được thay đổi thành công'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, account_decorator_1.Account)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [change_password_dto_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "changePassword", null);
__decorate([
    (0, common_1.Post)('logout'),
    (0, response_message_decorator_1.ResponseMessage)('Đăng xuất thành công'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [logout_dto_1.LogoutDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logout", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)('forgot-password'),
    (0, response_message_decorator_1.ResponseMessage)('Gửi mã OTP thành công'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [forgot_password_dto_1.ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map