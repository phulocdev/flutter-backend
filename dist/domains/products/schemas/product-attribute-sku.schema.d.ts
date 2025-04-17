import { ProductAttribute } from 'domains/products/schemas/product-attributes.schema';
import { Sku } from 'domains/products/schemas/sku.schema';
import * as mongoose from 'mongoose';
export type ProductAttributeSkuDocument = mongoose.HydratedDocument<ProductAttributeSku>;
export declare class ProductAttributeSku {
    productAttribute: ProductAttribute;
    sku: Sku;
    value: string;
}
export declare const ProductAttributeSkuSchema: mongoose.Schema<ProductAttributeSku, mongoose.Model<ProductAttributeSku, any, any, any, mongoose.Document<unknown, any, ProductAttributeSku> & ProductAttributeSku & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, ProductAttributeSku, mongoose.Document<unknown, {}, mongoose.FlatRecord<ProductAttributeSku>> & mongoose.FlatRecord<ProductAttributeSku> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
