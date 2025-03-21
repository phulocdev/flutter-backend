import { Transform, Type } from 'class-transformer'
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  MinLength,
  ValidateNested
} from 'class-validator'
import { ProductStatus } from 'core/constants/enum'
import { IsUniqueArray } from 'core/decorators/is-unique-array.decorator'
import { SkuDto } from 'domains/products/dto/sku.dto'
import { Types } from 'mongoose'

export class CreateProductDto {
  @MaxLength(100, { message: 'name không được vượt quá 100 kí tự' })
  @MinLength(2, { message: 'name phải có ít nhất 2 kí tự' })
  @IsString({ message: 'name phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'name không được  bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  name: string

  @MaxLength(1000, { message: 'description không được vượt quá 1000 kí tự' })
  @MinLength(1, { message: 'description phải có ít nhất 1 kí tự' })
  @IsString({ message: 'description phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'description không được  bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  description: string

  @IsMongoId({ message: 'category phải là định dạng ObjectId' })
  @IsNotEmpty({ message: 'category không được bỏ trống' })
  category: Types.ObjectId

  @MaxLength(20, { message: 'brand không được vượt quá 20 kí tự' })
  @MinLength(1, { message: 'brand phải có ít nhất 1 kí tự' })
  @IsString({ message: 'brand phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'brand không được  bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  brand: string

  @IsEnum(ProductStatus, {
    message: `status phải là một trong những giá trị sau: ${Object.values(ProductStatus).join(' || ')}`
  })
  @IsOptional()
  status?: ProductStatus

  @Min(1, { message: 'basePrice phải > 0' })
  @IsNumber({ allowNaN: false }, { message: 'basePrice phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'basePrice không được bỏ trống' })
  basePrice: number

  @IsString({ message: 'imageUrl phải là kiểu dữ liệu là string' })
  @Transform(({ value }) => String(value).trim())
  @IsOptional()
  imageUrl?: string | undefined

  @IsUniqueArray('Mỗi phần tử trong attributeNames không được trùng lặp')
  @IsString({
    each: true,
    message: `Mỗi phần tử trong attributeNames phải là dạng chuỗi`
  })
  @MinLength(3, { each: true, message: 'Mỗi phần tử trong attributeNames phải có ít nhất 3 ký tự' })
  @MaxLength(50, { each: true, message: 'Mỗi phần tử trong attributeNames không được vượt quá 50 ký tự' })
  @IsArray({ message: 'attributeNames phải là định dạng mảng' })
  @IsOptional()
  attributeNames?: string[] | undefined

  @Type(() => SkuDto)
  @ValidateNested({ each: true, message: 'Các phần tử trong skus không đúng định dạng' })
  @IsArray({ message: 'skus phải là định dạng mảng' })
  @IsOptional()
  skus?: SkuDto[] | undefined
}
