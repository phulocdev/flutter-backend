import * as mongoose from 'mongoose';
import { Document } from 'mongoose';
export type CouponDocument = Coupon & Document;
export declare class Coupon {
    _id: mongoose.Types.ObjectId;
    code: string;
    discountAmount: number;
    usageCount: number;
    maxUsage: number;
    appliedOrderIds: mongoose.Types.ObjectId[];
    isActive: boolean;
    get isValid(): boolean;
    get remainingUsage(): number;
}
export declare const CouponSchema: mongoose.Schema<Coupon, mongoose.Model<Coupon, any, any, any, mongoose.Document<unknown, any, Coupon> & Coupon & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Coupon, mongoose.Document<unknown, {}, mongoose.FlatRecord<Coupon>> & mongoose.FlatRecord<Coupon> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
