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
const mongoose_1 = __importDefault(require("mongoose"));
const ms_1 = __importDefault(require("ms"));
let AuthService = exports.AuthService = class AuthService {
    constructor(accountsService, jwtService, configService) {
        this.accountsService = accountsService;
        this.jwtService = jwtService;
        this.configService = configService;
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
    async register(registerAccountDto) {
        const { email, fullName, password, address } = registerAccountDto;
        const accountId = new mongoose_1.default.Types.ObjectId().toString();
        const [accessToken, refreshToken] = await Promise.all([
            this.signAccessToken({
                _id: accountId,
                email,
                fullName,
                role: enum_1.Role.Customer,
                avatarUrl: ''
            }),
            this.signRefreshToken({
                _id: accountId,
                email,
                fullName,
                role: enum_1.Role.Customer,
                avatarUrl: ''
            })
        ]);
        const account = await this.accountsService.create({
            email,
            password,
            fullName,
            address,
            _id: accountId
        });
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
    async forgotPassword(forgotPasswordDto) {
        const { email, password } = forgotPasswordDto;
        const account = await this.accountsService.findByEmail(email);
        if (!account) {
            throw new errors_exception_1.NotFoundError('Email không tồn tại trên hệ thống');
        }
        return this.accountsService.updatePassword(account._id.toString(), password);
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
            refreshToken
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
};
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [accounts_service_1.AccountsService,
        jwt_1.JwtService,
        config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map