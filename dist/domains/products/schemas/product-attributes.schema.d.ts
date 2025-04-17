import { Product } from 'domains/products/schemas/product.schema';
import * as mongoose from 'mongoose';
export type ProductAttributeDocument = mongoose.HydratedDocument<ProductAttribute>;
export declare class ProductAttribute {
    product: Product;
    name: string;
}
export declare const ProductAttributeSchema: mongoose.Schema<ProductAttribute, mongoose.Model<ProductAttribute, any, any, any, mongoose.Document<unknown, any, ProductAttribute> & ProductAttribute & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ProductAttribute, mongoose.Document<unknown, {}, mongoose.FlatRecord<ProductAttribute>> & mongoose.FlatRecord<ProductAttribute> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
