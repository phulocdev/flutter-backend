import { Transform, Type } from 'class-transformer'
import { ArrayMinSize, IsArray, IsEnum, IsNotEmpty, IsNumber, IsObject, Min, ValidateNested } from 'class-validator'
import { PaymentMethod, paymentMethodOptions } from 'core/constants/enum'
import { OrderItemDto } from 'domains/orders/dto/order-item.dto'
import { ShippingInfoDto } from 'domains/orders/dto/shipping-info.dto'

export class CreateOrderDto {
  @Type(() => OrderItemDto)
  @ValidateNested({ each: true })
  @ArrayMinSize(1, { message: 'items phải có ít nhất một phần tử' })
  @IsArray({ message: 'items phải là định dạng mảng' })
  @IsNotEmpty({ message: 'items không được bỏ trống' })
  items: OrderItemDto[]

  @Min(1, { message: 'totalPrice phải >= 1' })
  @IsNumber({ allowNaN: false }, { message: 'totalPrice phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'totalPrice không được bỏ trống' })
  totalPrice: number

  @IsEnum(PaymentMethod, {
    message: `paymentMethod phải là một trong những giá trị sau: ${paymentMethodOptions}`
  })
  @IsNotEmpty({ message: 'paymentMethod không được bỏ trống' })
  paymentMethod: PaymentMethod

  @Type(() => ShippingInfoDto)
  @ValidateNested()
  @IsObject({ message: 'shippingInfo phải là định dạng Object' })
  @IsNotEmpty({ message: 'shippingInfo không được bỏ trống' })
  shippingInfo: ShippingInfoDto
}
