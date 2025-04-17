import { ProductStatus } from 'core/constants/enum';
import { Category } from 'domains/categories/schemas/category.schema';
import * as mongoose from 'mongoose';
export type ProductDocument = mongoose.HydratedDocument<Product>;
export declare class Product {
    name: string;
    description: string;
    imageUrl: string;
    category: Category;
    brand: string;
    status: ProductStatus;
    basePrice: number;
}
export declare const ProductSchema: mongoose.Schema<Product, mongoose.Model<Product, any, any, any, mongoose.Document<unknown, any, Product> & Product & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Product, mongoose.Document<unknown, {}, mongoose.FlatRecord<Product>> & mongoose.FlatRecord<Product> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
