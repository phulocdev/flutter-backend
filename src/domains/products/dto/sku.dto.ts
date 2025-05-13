import { Transform } from 'class-transformer'
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator'
import { IsUniqueArray } from 'core/decorators/is-unique-array.decorator'
export class SkuDto {
  // @IsString({ message: 'skus[index].sku phải là chuỗi' })
  // @MinLength(1, { message: 'skus[index].sku phải có ít nhất 1 ký tự' })
  // @MaxLength(50, { message: 'skus[index].sku không được vượt quá 50 ký tự' })
  // @Transform(({ value }) => String(value).trim())
  // @IsNotEmpty({ message: 'skus[index].sku không được bỏ trống' })
  // sku: string

  // @IsString({ message: 'skus[index].barcode phải là chuỗi' })
  // @MinLength(1, { message: 'skus[index].barcode phải có ít nhất 1 ký tự' })
  // @MaxLength(50, { message: 'skus[index].barcode không được vượt quá 50 ký tự' })
  // @Transform(({ value }) => String(value).trim())
  // @IsNotEmpty({ message: 'skus[index].barcode không được bỏ trống' })
  // barcode: string

  @Min(0, { message: 'skus[index].costPrice phải ≥ 0' })
  @IsNumber({ allowNaN: false }, { message: 'skus[index].costPrice phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'skus[index].costPrice không được bỏ trống' })
  costPrice: number

  @Min(1, { message: 'skus[index].sellingPrice phải >= 1' })
  @IsNumber({ allowNaN: false }, { message: 'skus[index].sellingPrice phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'skus[index].sellingPrice không được bỏ trống' })
  sellingPrice: number

  @Min(-1, { message: 'skus[index].stockOnHand phải >= 0' })
  @IsInt({ message: 'skus[index].stockOnHand phải là số nguyên' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'skus[index].stockOnHand không được bỏ trống' })
  stockOnHand: number

  @IsUniqueArray('Mỗi phần tử trong skus[index].attributeValues không được trùng lặp')
  @IsString({
    each: true,
    message: `Mỗi phần tử trong skus[index].attributeValues phải là dạng chuỗi`
  })
  @MaxLength(100, { each: true, message: 'Không được vượt quá 100 ký tự' })
  @MinLength(1, { each: true, message: 'Từng attribute phải có ít nhất 1 ký tự' })
  @IsArray({ message: 'skus[index].attributeValues phải là định dạng mảng' })
  @IsNotEmpty({ message: 'skus[index].attributeValues không được bỏ trống' }) // Trong trường hợp tạo sản phẩm không có Varians (SKUS) thì sẽ có attributeValues là 1 array rỗng
  attributeValues: string[]

  @IsString({ message: 'sku[index].imageUrl phải là kiểu dữ liệu là string' })
  @Transform(({ value }) => String(value).trim())
  @IsOptional()
  imageUrl?: string
}
