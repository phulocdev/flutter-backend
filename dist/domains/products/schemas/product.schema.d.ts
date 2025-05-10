import { ProductStatus } from 'core/constants/enum';
import { Brand } from 'domains/brands/schemas/brand.schema';
import { Category } from 'domains/categories/schemas/category.schema';
import * as mongoose from 'mongoose';
export type ProductDocument = mongoose.HydratedDocument<Product>;
export declare class Product {
    _id: mongoose.Types.ObjectId;
    code: string;
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    brand: Brand;
    status: ProductStatus;
    basePrice: number;
    minStockLevel: number;
    maxStockLevel: number;
    views: number;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, mongoose.Document<unknown, any, Product> & Product & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, mongoose.FlatRecord<Product>> & mongoose.FlatRecord<Product> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
