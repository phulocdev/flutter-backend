import { IsMongoId, IsNotEmpty, IsNumber, IsPositive, Min } from 'class-validator'
import { Type } from 'class-transformer'

export class AddToCartDto {
  @IsMongoId({ message: 'sku phải là ObjectId hợp lệ' })
  @IsNotEmpty({ message: 'sku không được bỏ trống' })
  skuId: string

  @IsPositive({ message: 'quantity phải >= 1' })
  @Type(() => Number)
  @IsNumber({}, { message: 'quantity phải là định dạng số' })
  @IsNotEmpty({ message: 'quantity không được bỏ trống' })
  quantity: number
}
