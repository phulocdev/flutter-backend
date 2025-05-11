/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { AccountType } from 'core/types/type';
import { AuthService } from 'domains/auth/auth.service';
import { ChangePasswordDto } from 'domains/auth/dtos/change-password.dto';
import { ForgotPasswordtDto } from 'domains/auth/dtos/forgot-password.dto';
import { LoginDto } from 'domains/auth/dtos/login.dto';
import { LogoutDto } from 'domains/auth/dtos/logout.dto';
import { RefreshTokenDto } from 'domains/auth/dtos/refresh-token.dto';
import { RegisterAccountGuestDto } from 'domains/auth/dtos/register-account-guest.dto';
import { RegisterAccountDto } from 'domains/auth/dtos/register-account.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(loginDto: LoginDto, req: any): Promise<{
        accessToken: string;
        refreshToken: string;
        account: AccountType;
    }>;
    register(registerAccountDto: RegisterAccountDto): Promise<{
        accessToken: string;
        refreshToken: string;
        account: AccountType;
    }>;
    registerForGuest(registerAccountGuestDto: RegisterAccountGuestDto): Promise<AccountType>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        account: {
            _id: string;
            email: string;
            fullName: string;
            avatarUrl: string;
            role: import("../../core/constants/enum").Role;
        };
    }>;
    forgotPassword(forgotPasswordtDto: ForgotPasswordtDto): Promise<import("mongoose").UpdateWriteOpResult>;
    changePassword(changePasswordDto: ChangePasswordDto, account: AccountType): Promise<{
        accessToken: string;
        refreshToken: string;
        account: {
            email: string;
            fullName: string;
            role: import("../../core/constants/enum").Role;
        };
    }>;
    logout(logoutDto: LogoutDto): Promise<void>;
}
