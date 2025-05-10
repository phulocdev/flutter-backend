import { PaymentMethod } from 'core/constants/enum';
import { OrderItemDto } from 'domains/orders/dto/order-item.dto';
import { ShippingInfoDto } from 'domains/orders/dto/shipping-info.dto';
export declare class CreateOrderDto {
    items: OrderItemDto[];
    totalPrice: number;
    paymentMethod: PaymentMethod;
    shippingInfo: ShippingInfoDto;
}
