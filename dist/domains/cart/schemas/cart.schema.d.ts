import { Account } from 'domains/accounts/schemas/account.schema';
import { CartItem } from 'domains/cart/schemas/cart-item.schema';
import * as mongoose from 'mongoose';
export declare class Cart {
    account: Account | null;
    items: CartItem[];
}
export declare const CartSchema: mongoose.Schema<Cart, mongoose.Model<Cart, any, any, any, mongoose.Document<unknown, any, Cart> & Cart & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Cart, mongoose.Document<unknown, {}, mongoose.FlatRecord<Cart>> & mongoose.FlatRecord<Cart> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type CartDocument = mongoose.HydratedDocument<Cart, {
    items: mongoose.Types.DocumentArray<CartItem>;
}>;
