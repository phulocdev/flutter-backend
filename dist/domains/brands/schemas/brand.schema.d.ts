import * as mongoose from 'mongoose';
export type BrandDocument = mongoose.HydratedDocument<Brand>;
export declare class Brand {
    name: string;
    imageUrl: string;
}
export declare const BrandSchema: mongoose.Schema<Brand, mongoose.Model<Brand, any, any, any, mongoose.Document<unknown, any, Brand> & Brand & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Brand, mongoose.Document<unknown, {}, mongoose.FlatRecord<Brand>> & mongoose.FlatRecord<Brand> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
