import { Transform, Type } from 'class-transformer'
import { IsEnum, IsMongoId, IsNumber, IsOptional, IsString, MinLength, Min, Max } from 'class-validator'
import { ProductStatus } from 'core/constants/enum'

export class ProductQueryDto {
  @MinLength(5, { message: 'sort phải có ít nhất 5 ký tự' })
  @IsString({ message: 'sort phải là chuỗi' })
  @Type(() => String)
  @IsOptional()
  sort?: string

  @MinLength(1, { message: 'code phải có ít nhất 1 ký tự' })
  @IsString({ message: 'code phải là chuỗi' })
  @Transform(({ value }) => String(value).trim())
  @IsOptional()
  code?: string

  @MinLength(1, { message: 'name phải có ít nhất 1 ký tự' })
  @IsString({ message: 'name phải là chuỗi' })
  @Transform(({ value }) => String(value).trim())
  @IsOptional()
  name?: string

  @IsMongoId({ message: 'categoryId phải là ObjectId hợp lệ' })
  @IsOptional()
  categoryId?: string

  @IsMongoId({ message: 'brandId phải là ObjectId hợp lệ' })
  @IsOptional()
  brandId?: string

  @IsEnum(ProductStatus, {
    message: `status phải là một trong các giá trị sau: ${Object.values(ProductStatus).join(' || ')}`
  })
  @IsOptional()
  status?: ProductStatus

  @Type(() => Number)
  @IsNumber({}, { message: 'minPrice phải là số' })
  @Min(0, { message: 'minPrice phải >= 0' })
  @IsOptional()
  minPrice?: number

  @Type(() => Number)
  @IsNumber({}, { message: 'maxPrice phải là số' })
  @Min(0, { message: 'maxPrice phải >= 0' })
  @IsOptional()
  maxPrice?: number
}
