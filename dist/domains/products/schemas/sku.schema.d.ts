import { Product } from 'domains/products/schemas/product.schema';
import * as mongoose from 'mongoose';
export type SkuDocument = mongoose.HydratedDocument<Sku>;
export declare class Sku {
    product: Product | null;
    sku: string;
    price: number;
    stockQuantity: number;
    images: string[];
}
export declare const SkuSchema: mongoose.Schema<Sku, mongoose.Model<Sku, any, any, any, mongoose.Document<unknown, any, Sku> & Sku & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Sku, mongoose.Document<unknown, {}, mongoose.FlatRecord<Sku>> & mongoose.FlatRecord<Sku> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
