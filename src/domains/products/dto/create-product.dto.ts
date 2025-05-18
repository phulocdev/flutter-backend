import { Transform, Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsInt,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator'
import { IsUniqueArray } from 'core/decorators/is-unique-array.decorator'
import { SkuDto } from 'domains/products/dto/sku.dto'
export class CreateProductDto {
  @MaxLength(200, { message: 'name không được vượt quá 200 kí tự' })
  @MinLength(2, { message: 'name phải có ít nhất 2 kí tự' })
  @IsString({ message: 'name phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'name không được bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  name: string

  @MaxLength(1000, { message: 'description không được vượt quá 1000 kí tự' })
  @IsString({ message: 'description phải là kiểu dữ liệu là string' })
  @Transform(({ value }) => String(value).trim())
  @IsOptional()
  description: string

  @IsMongoId({ message: 'category phải là định dạng ObjectId' })
  @IsNotEmpty({ message: 'category không được bỏ trống' })
  category: string

  @IsMongoId({ message: 'brand phải là định dạng ObjectId' })
  @IsNotEmpty({ message: 'brand không được bỏ trống' })
  brand: string

  // @IsMongoId({ message: 'supplier phải là định dạng ObjectId' })
  // @IsOptional()
  // supplier: string

  // @IsEnum(ProductStatus, {
  //   message: `status phải là một trong những giá trị sau: ${Object.values(ProductStatus).join(' || ')}`
  // })
  // @IsOptional()
  // status?: ProductStatus

  @Min(1, { message: 'basePrice phải >= 1' })
  @IsNumber({ allowNaN: false }, { message: 'basePrice phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'basePrice không được bỏ trống' })
  basePrice: number

  @Max(100, { message: 'discountPercentage phải < 100' })
  @Min(1, { message: 'discountPercentage phải >= 1' })
  @IsNumber({ allowNaN: false }, { message: 'discountPercentage phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  discountPercentage: number

  @IsString({ message: 'imageUrl phải là kiểu dữ liệu là string' })
  @Transform(({ value }) => String(value).trim())
  @IsOptional()
  imageUrl?: string

  @Min(0, { message: 'minStockLevel phải ≥ 0' })
  @IsInt({ message: 'minStockLevel phải là số nguyên' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'minStockLevel không được bỏ trống' })
  minStockLevel: number

  @Min(1, { message: 'maxStockLevel phải >= 1' })
  @IsInt({ message: 'maxStockLevel phải là số nguyên' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'maxStockLevel không được bỏ trống' })
  maxStockLevel: number

  @IsUniqueArray('Mỗi phần tử trong attributeNames không được trùng lặp')
  @IsString({
    each: true,
    message: `Mỗi phần tử trong attributeNames phải là dạng chuỗi`
  })
  @MinLength(1, { each: true, message: 'Mỗi phần tử trong attributeNames phải có ít nhất 1 ký tự' })
  @MaxLength(50, { each: true, message: 'Mỗi phần tử trong attributeNames không được vượt quá 50 ký tự' })
  @ArrayMinSize(1, { message: 'attributeNames phải có ít nhất một phần tử' })
  @IsArray({ message: 'attributeNames phải là định dạng mảng' })
  @IsOptional()
  attributeNames?: string[]

  // Khi tạo mới 1 SP, DÙ CÓ BIẾN THỂ hay không thì ta vẫn PHẢI TẠO ra một SKU cho nó - sku có attributeValues là 1 array rỗng
  @Type(() => SkuDto)
  @ValidateNested({ each: true })
  @IsArray({ message: 'skus phải là định dạng mảng' })
  @IsNotEmpty({ message: 'skus không được bỏ trống' })
  skus: SkuDto[]
}
