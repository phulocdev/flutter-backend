import { Role } from 'core/constants/enum';
import * as mongoose from 'mongoose';
export type AccountDocument = mongoose.HydratedDocument<Account>;
export declare class Account {
    email: string;
    password: string;
    fullName: string;
    avatarUrl: string;
    address: string;
    role: Role;
    refreshToken: string;
}
export declare const AccountSchema: mongoose.Schema<Account, mongoose.Model<Account, any, any, any, mongoose.Document<unknown, any, Account> & Account & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Account, mongoose.Document<unknown, {}, mongoose.FlatRecord<Account>> & mongoose.FlatRecord<Account> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
