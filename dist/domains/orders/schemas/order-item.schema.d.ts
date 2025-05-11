import mongoose, { Types } from 'mongoose';
export declare class OrderItem {
    order: Types.ObjectId;
    sku: Types.ObjectId;
    quantity: number;
    sellingPrice: number;
    costPrice: number;
    createdAt?: string;
    updatedAt?: string;
}
export declare const OrderItemSchema: mongoose.Schema<OrderItem, mongoose.Model<OrderItem, any, any, any, mongoose.Document<unknown, any, OrderItem> & OrderItem & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, OrderItem, mongoose.Document<unknown, {}, mongoose.FlatRecord<OrderItem>> & mongoose.FlatRecord<OrderItem> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
