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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const enum_1 = require("../../core/constants/enum");
const errors_exception_1 = require("../../core/exceptions/errors.exception");
const accounts_service_1 = require("../accounts/accounts.service");
const mail_service_1 = require("../mail/mail.service");
const otps_service_1 = require("../otps/otps.service");
const mongoose_1 = __importDefault(require("mongoose"));
const ms_1 = __importDefault(require("ms"));
let AuthService = exports.AuthService = class AuthService {
    constructor(accountsService, jwtService, configService, mailService, otpService) {
        this.accountsService = accountsService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.mailService = mailService;
        this.otpService = otpService;
    }
    async validateAccount(email, password) {
        const account = await this.accountsService.findAccountByEmailAndPassword({ email, password });
        if (account) {
            const { password, ...result } = account.toObject();
            return result;
        }
        return null;
    }
    async login(account) {
        const payload = account;
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken(payload),
            this.signRefreshToken(payload)
        ]);
        await this.accountsService.updateRefreshToken(account._id.toString(), refreshToken);
        return {
            accessToken,
            refreshToken,
            account
        };
    }
    async registerGuest(registerAccountGuestDto) {
        const existingAccount = await this.accountsService.findByEmail(registerAccountGuestDto.email);
        if (!existingAccount) {
            return this.accountsService.createForGuest(registerAccountGuestDto);
        }
        return {
            _id: existingAccount._id,
            avatarUrl: existingAccount.avatarUrl,
            email: existingAccount.email,
            fullName: existingAccount.fullName,
            role: existingAccount.role,
            address: existingAccount.address,
            phoneNumber: existingAccount.phoneNumber
        };
    }
    async register(registerAccountDto) {
        const accountId = new mongoose_1.default.Types.ObjectId().toString();
        const { email, fullName, password, address } = registerAccountDto;
        const existingAccount = await this.accountsService.findByEmail(email);
        let account;
        if (existingAccount) {
            if (!existingAccount.isGuest) {
                throw new errors_exception_1.UnprocessableEntityError([{ field: 'email', message: 'Email này đã tồn tại trên hệ thống' }]);
            }
            account = await this.accountsService.findOneAndUpdateByEmail(email, { ...registerAccountDto, isGuest: false });
        }
        else {
            account = await this.accountsService.create({ address, email, fullName, password, _id: accountId });
        }
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken({
                _id: accountId,
                email,
                fullName,
                role: enum_1.Role.Customer,
                avatarUrl: '',
                address: account.address,
                phoneNumber: account.phoneNumber
            }),
            this.signRefreshToken({
                _id: accountId,
                email,
                fullName,
                role: enum_1.Role.Customer,
                avatarUrl: '',
                address: account.address,
                phoneNumber: account.phoneNumber
            })
        ]);
        this.accountsService.updateRefreshToken(accountId, refreshToken);
        return {
            accessToken,
            refreshToken,
            account
        };
    }
    async refreshToken(refreshTokenDto) {
        let accountId = undefined;
        try {
            const account = await this.accountsService.findByRefreshToken(refreshTokenDto.refreshToken);
            if (!account || !refreshTokenDto.refreshToken) {
                throw new errors_exception_1.UnauthorizedError('INVALID_REFRESH_TOKEN');
            }
            accountId = account._id.toString();
            const decodedOldRefreshToken = await this.jwtService.verifyAsync(refreshTokenDto.refreshToken, {
                secret: this.configService.get('refreshToken.secret')
            });
            const { iat, exp, ...payload } = decodedOldRefreshToken;
            const [accessToken, refreshToken] = await Promise.all([
                this.signAccessToken(payload),
                this.signRefreshToken(payload, decodedOldRefreshToken.exp)
            ]);
            await this.accountsService.updateRefreshToken(account._id.toString(), refreshToken);
            return {
                accessToken,
                refreshToken,
                account: payload
            };
        }
        catch (error) {
            if (error instanceof jwt_1.TokenExpiredError) {
                if (accountId) {
                    this.accountsService.updateRefreshToken(accountId, '');
                }
                throw new errors_exception_1.UnauthorizedError('REFRESH_TOKEN_EXPIRED');
            }
            throw error;
        }
    }
    async resetPassword(resetPasswordDto) {
        const { email, otpCode, password } = resetPasswordDto;
        const otpDocument = await this.otpService.findOtpCodeByUserEmail(email);
        if (!otpDocument) {
            throw new errors_exception_1.BadRequestError('Mã OTP không còn hiệu lực');
        }
        const { otp: userOtp } = otpDocument;
        if (userOtp !== Number(otpCode)) {
            throw new errors_exception_1.BadRequestError('Mã OTP không chính xác');
        }
        await this.accountsService.updatePasswordByEmail(email, password);
        await this.otpService.removeOtpByEmail(email);
    }
    async changePassword(changePasswordDto, account) {
        const { oldPassword, newPassword } = changePasswordDto;
        const accountDocument = await this.accountsService.findByEmail(account.email);
        if (!accountDocument) {
            throw new errors_exception_1.NotFoundError('Tài khoản không tồn tại trên hệ thống');
        }
        const isMatchPassowrd = await this.accountsService.comparePassword(oldPassword, accountDocument.password);
        if (!isMatchPassowrd) {
            throw new errors_exception_1.BadRequestError('Mật khẩu cũ không chính xác');
        }
        const payload = account;
        const decodedOldRefreshToken = this.jwtService.decode(accountDocument.refreshToken);
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken(payload),
            this.signRefreshToken(payload, decodedOldRefreshToken.exp),
            this.accountsService.updatePassword(accountDocument._id.toString(), newPassword)
        ]);
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
        };
    }
    async logout(logoutDto) {
        try {
            const { refreshToken } = logoutDto;
            const decodedRefreshToken = await this.jwtService.verifyAsync(refreshToken, {
                secret: this.configService.get('refreshToken.secret')
            });
            this.accountsService.updateRefreshToken(decodedRefreshToken._id.toString(), '');
        }
        catch (error) {
            if (error instanceof jwt_1.TokenExpiredError) {
                throw new errors_exception_1.UnauthorizedError('REFRESH_TOKEN_EXPIRED');
            }
            throw error;
        }
    }
    signAccessToken(payload) {
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('accessToken.secret'),
            expiresIn: (0, ms_1.default)(this.configService.get('accessToken.expiresIn')) / 1000
        });
    }
    signRefreshToken(payload, exp) {
        if (exp) {
            return this.jwtService.signAsync({ ...payload, exp }, {
                secret: this.configService.get('refreshToken.secret')
            });
        }
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('refreshToken.secret'),
            expiresIn: (0, ms_1.default)(this.configService.get('refreshToken.expiresIn')) / 1000
        });
    }
    async getUserFromAuthenticationToken(token) {
        const payload = this.jwtService.verify(token, {
            secret: this.configService.get('accessToken.secret')
        });
        if (payload._id) {
            return this.accountsService.findOne(payload._id);
        }
    }
    async handleSendOtp(email) {
        const existAccount = await this.accountsService.findByEmail(email);
        if (!existAccount) {
            throw new errors_exception_1.UnprocessableEntityError([{ field: 'email', message: 'Email không tồn tại trên hệ thống' }]);
        }
        const otpCode = Math.trunc(Math.random() * 1000000);
        await this.mailService.sendOtp(email, otpCode);
        await this.otpService.create({ otp: otpCode, email });
    }
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService,
        jwt_1.JwtService,
        config_1.ConfigService,
        mail_service_1.MailService,
        otps_service_1.OtpsService])
], AuthService);
//# sourceMappingURL=auth.service.js.map