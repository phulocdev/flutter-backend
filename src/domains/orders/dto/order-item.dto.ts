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

  @Min(1, { message: 'items[index].sellingPrice phải >= 1' })
  @IsNumber({ allowNaN: false }, { message: 'items[index].sellingPrice phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'items[index].sellingPrice không được bỏ trống' })
  sellingPrice: number

  @Min(1, { message: 'items[index].costPrice phải >= 1' })
  @IsNumber({ allowNaN: false }, { message: 'items[index].costPrice phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'items[index].costPrice không được bỏ trống' })
  costPrice: number
}
