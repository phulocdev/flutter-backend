import { Account } from 'domains/accounts/schemas/account.schema';
import { OrderItem } from 'domains/carts/schemas/order-item.schema';
import * as mongoose from 'mongoose';
export declare class Order {
    account: Account | null;
    items: OrderItem[];
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order> & Order & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>> & mongoose.FlatRecord<Order> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export type OrderDocument = mongoose.HydratedDocument<Order, {
    items: mongoose.Types.DocumentArray<OrderItem>;
}>;
