import { OrderStatus } from 'core/constants/enum';
export declare class UpdateOrderDto {
    status: OrderStatus;
    deliveredAt?: Date | undefined;
    cancelledAt?: Date | undefined;
    paymentAt?: Date | undefined;
}
