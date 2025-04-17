import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto';
import { AccountQueryDto } from 'domains/accounts/dto/account-query.dto';
import { Account, AccountDocument } from 'domains/accounts/schemas/account.schema';
import mongoose, { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
export declare class AccountsService {
    private accountModel;
    private saltRounds;
    constructor(accountModel: Model<AccountDocument>);
    create(createAccountDto: CreateAccountDto & {
        _id?: string;
    }): Promise<{
        _id: mongoose.Types.ObjectId;
        email: string;
        fullName: string;
        avatarUrl: string;
        role: import("../../core/constants/enum").Role;
    }>;
    findAll(qs: PaginationQueryDto & AccountQueryDto): Promise<{
        data: (mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Account> & Account & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }> & mongoose.Document<unknown, {}, Account> & Account & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        } & Required<{
            _id: mongoose.Types.ObjectId;
        }>)[];
        meta: {
            page: number;
            limit: number;
            totalPages: number;
            totalDocuments: number;
        };
    }>;
    findOne(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }> & mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findByEmail(email: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }> & mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }> & mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "findOne", {}>;
    findByRefreshToken(refreshToken: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }> & mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }> & mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, {}, mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "findOne", {}>;
    findAccountByEmailAndPassword({ email, password }: {
        email: string;
        password: string;
    }): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }> & mongoose.Document<unknown, {}, Account> & Account & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<mongoose.UpdateWriteOpResult>;
    updateRefreshToken(id: string, refreshToken: string): Promise<mongoose.UpdateWriteOpResult>;
    updatePassword(id: string, password: string): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string): Promise<mongoose.mongo.DeleteResult>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
}
