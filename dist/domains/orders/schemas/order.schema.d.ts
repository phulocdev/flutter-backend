import { OrderStatus, PaymentMethod } from 'core/constants/enum';
import { ShippingInfo } from 'domains/orders/schemas/shipping-info.schema';
import mongoose from 'mongoose';
export declare class Order {
    _id: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
    code: string;
    status: OrderStatus;
    totalPrice: number;
    paymentMethod: PaymentMethod;
    paymentAt: Date;
    deliveredAt: Date;
    cancelledAt: Date;
    shippingInfo: ShippingInfo;
    updateBy: mongoose.Types.ObjectId;
}
export declare const OrderSchema: mongoose.Schema<Order, mongoose.Model<Order, any, any, any, mongoose.Document<unknown, any, Order> & Order & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Order, mongoose.Document<unknown, {}, mongoose.FlatRecord<Order>> & mongoose.FlatRecord<Order> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
export type OrderDocument = mongoose.HydratedDocument<Order, {
    shippingInfo: ShippingInfo;
}>;
