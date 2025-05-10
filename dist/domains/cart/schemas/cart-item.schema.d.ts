import * as mongoose from 'mongoose';
export declare class CartItem {
    sku: mongoose.Types.ObjectId;
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
}
export declare const CartItemSchema: mongoose.Schema<CartItem, mongoose.Model<CartItem, any, any, any, mongoose.Document<unknown, any, CartItem> & CartItem & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, CartItem, mongoose.Document<unknown, {}, mongoose.FlatRecord<CartItem>> & mongoose.FlatRecord<CartItem> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
