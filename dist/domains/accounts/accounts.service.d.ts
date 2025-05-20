import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto';
import { AccountQueryDto } from 'domains/accounts/dto/account-query.dto';
import { Account, AccountDocument } from 'domains/accounts/schemas/account.schema';
import mongoose, { Model } from 'mongoose';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateGuestAccountDto } from 'domains/accounts/dto/create-account-guest.dto';
import { AccountType } from 'core/types/type';
export declare class AccountsService {
    private accountModel;
    private saltRounds;
    constructor(accountModel: Model<AccountDocument>);
    createForGuest(createGuestAccountDto: CreateGuestAccountDto): Promise<AccountType>;
    create(createAccountDto: CreateAccountDto & {
        _id?: string;
    }): Promise<AccountType>;
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
    findOneAndUpdateByEmail(email: string, updateAccountDto: UpdateAccountDto): Promise<AccountType>;
    updateRefreshToken(id: string, refreshToken: string): Promise<mongoose.UpdateWriteOpResult>;
    updatePassword(id: string, password: string): Promise<mongoose.UpdateWriteOpResult>;
    updatePasswordByEmail(email: string, password: string): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string): Promise<mongoose.mongo.DeleteResult>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, hashedPassword: string): Promise<boolean>;
    countDocs(): mongoose.Query<number, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Account> & Account & {
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
    }, "countDocuments", {}>;
}
