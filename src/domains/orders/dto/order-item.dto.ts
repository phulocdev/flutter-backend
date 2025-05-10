import { Transform } from 'class-transformer'
import { IsMongoId, IsNotEmpty, IsNumber, Min } from 'class-validator'

export class OrderItemDto {
  @IsMongoId({ message: 'items[index].sku phải là định dạng ObjectId' })
  @IsNotEmpty({ message: 'items[index].sku không được bỏ trống' })
  sku: string

  @Min(1, { message: 'items[index].quantity phải >= 1' })
  @IsNumber({ allowNaN: false }, { message: 'items[index].quantity phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'items[index].quantity không được bỏ trống' })
  quantity: number

  @Min(1, { message: 'items[index].price phải >= 1' })
  @IsNumber({ allowNaN: false }, { message: 'items[index].price phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'items[index].price không được bỏ trống' })
  price: number
}
