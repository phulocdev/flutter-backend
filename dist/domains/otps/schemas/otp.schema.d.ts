import mongoose, { HydratedDocument } from 'mongoose';
export type OtpDocument = HydratedDocument<Otp>;
export declare class Otp {
    email: string;
    otp: number;
    createdAt: Date;
}
export declare const OtpSchema: mongoose.Schema<Otp, mongoose.Model<Otp, any, any, any, mongoose.Document<unknown, any, Otp> & Otp & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Otp, mongoose.Document<unknown, {}, mongoose.FlatRecord<Otp>> & mongoose.FlatRecord<Otp> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
