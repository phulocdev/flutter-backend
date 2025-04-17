import * as mongoose from 'mongoose';
export declare class OrderItem {
    sku: mongoose.Types.ObjectId;
    quantity: number;
    pricePurchase: number;
    createdAt?: string;
    updatedAt?: string;
}
export declare const OrderItemSchema: mongoose.Schema<OrderItem, mongoose.Model<OrderItem, any, any, any, mongoose.Document<unknown, any, OrderItem> & OrderItem & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, OrderItem, mongoose.Document<unknown, {}, mongoose.FlatRecord<OrderItem>> & mongoose.FlatRecord<OrderItem> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
