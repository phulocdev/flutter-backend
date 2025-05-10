import { Type } from 'class-transformer'
import { IsDate, IsEnum, IsNotEmpty, IsOptional } from 'class-validator'
import { OrderStatus, orderStatusOptions } from 'core/constants/enum'

export class UpdateOrderDto {
  @IsEnum(OrderStatus, {
    message: `status phải là một trong những giá trị sau: ${orderStatusOptions}`
  })
  @IsNotEmpty({ message: 'status không được bỏ trống' })
  status: OrderStatus

  @IsDate({ message: 'deliveredAt phải là định dạng ngày' })
  @Type(() => Date)
  @IsOptional()
  deliveredAt?: Date | undefined

  @IsDate({ message: 'cancelledAt phải là định dạng ngày' })
  @Type(() => Date)
  @IsOptional()
  cancelledAt?: Date | undefined

  @IsDate({ message: 'paymentAt phải là định dạng ngày' })
  @Type(() => Date)
  @IsOptional()
  paymentAt?: Date | undefined
}
