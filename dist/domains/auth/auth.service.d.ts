import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'core/constants/enum';
import { AccountType } from 'core/types/type';
import { AccountsService } from 'domains/accounts/accounts.service';
import { ChangePasswordDto } from 'domains/auth/dtos/change-password.dto';
import { ForgotPasswordtDto } from 'domains/auth/dtos/forgot-password.dto';
import { LogoutDto } from 'domains/auth/dtos/logout.dto';
import { RefreshTokenDto } from 'domains/auth/dtos/refresh-token.dto';
import { RegisterAccountGuestDto } from 'domains/auth/dtos/register-account-guest.dto';
import { RegisterAccountDto } from 'domains/auth/dtos/register-account.dto';
import mongoose from 'mongoose';
export declare class AuthService {
    private readonly accountsService;
    private readonly jwtService;
    private readonly configService;
    constructor(accountsService: AccountsService, jwtService: JwtService, configService: ConfigService);
    validateAccount(email: string, password: string): Promise<{
        _id: mongoose.Types.ObjectId;
        $locals: Record<string, unknown>;
        $op: "remove" | "save" | "validate";
        $where: Record<string, unknown>;
        baseModelName?: string;
        collection: mongoose.Collection<mongoose.mongo.BSON.Document>;
        db: mongoose.Connection;
        errors?: mongoose.Error.ValidationError;
        id?: any;
        isNew: boolean;
        schema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
            [x: string]: unknown;
        }, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            [x: string]: unknown;
        }>> & mongoose.FlatRecord<{
            [x: string]: unknown;
        }> & Required<{
            _id: unknown;
        }> & {
            __v: number;
        }>;
        email: string;
        fullName: string;
        phoneNumber: string;
        isGuest: boolean;
        isActive: boolean;
        avatarUrl: string;
        address: string;
        role: Role;
        refreshToken: string;
        __v: number;
    }>;
    login(account: AccountType): Promise<{
        accessToken: string;
        refreshToken: string;
        account: AccountType;
    }>;
    registerGuest(registerAccountGuestDto: RegisterAccountGuestDto): Promise<AccountType>;
    register(registerAccountDto: RegisterAccountDto): Promise<{
        accessToken: string;
        refreshToken: string;
        account: AccountType;
    }>;
    refreshToken(refreshTokenDto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        account: {
            _id: string;
            email: string;
            fullName: string;
            avatarUrl: string;
            role: Role;
        };
    }>;
    forgotPassword(forgotPasswordDto: ForgotPasswordtDto): Promise<mongoose.UpdateWriteOpResult>;
    changePassword(changePasswordDto: ChangePasswordDto, account: AccountType): Promise<{
        accessToken: string;
        refreshToken: string;
        account: {
            email: string;
            fullName: string;
            role: Role;
        };
    }>;
    logout(logoutDto: LogoutDto): Promise<void>;
    signAccessToken(payload: AccountType): Promise<string>;
    signRefreshToken(payload: AccountType, exp?: number): Promise<string>;
    getUserFromAuthenticationToken(token: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, import("../accounts/schemas/account.schema").Account> & import("../accounts/schemas/account.schema").Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }> & mongoose.Document<unknown, {}, import("../accounts/schemas/account.schema").Account> & import("../accounts/schemas/account.schema").Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
}
