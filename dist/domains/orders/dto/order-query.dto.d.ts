import { OrderStatus, PaymentMethod } from 'core/constants/enum';
export declare class OrderQueryDto {
    sort?: string;
    code?: string;
    userId?: string;
    status?: OrderStatus;
    paymentMethod?: PaymentMethod;
    minTotalPrice?: number;
    maxTotalPrice?: number;
    minItemCount?: number;
    maxItemCount?: number;
    fromDate?: Date;
    toDate?: Date;
    paymentFromDate?: Date;
    paymentToDate?: Date;
    deliveredFromDate?: Date;
    deliveredToDate?: Date;
}
