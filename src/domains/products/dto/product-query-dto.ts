import { Transform, Type } from 'class-transformer'
import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
  Min,
  Max,
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsBooleanString,
  IsBoolean,
  IsInt
} from 'class-validator'
import { ProductStatus } from 'core/constants/enum'
import { IsUniqueArray } from 'core/decorators/is-unique-array.decorator'

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

  @IsUniqueArray('Các phần tử trong categoryIds không được trùng lặp')
  @IsMongoId({
    each: true,
    message: `Các phần tử trong categoryIds phải là ObjectId`
  })
  @ArrayMinSize(1, { message: 'categoryIds phải có ít một phần tử' })
  @Transform(({ value }: { value: string }) => value.split(',').filter((v) => !!v && v.trim().length > 0))
  @IsOptional()
  categoryIds?: string[]

  @IsUniqueArray('Các phần tử trong brandIds không được trùng lặp')
  @IsMongoId({
    each: true,
    message: `Các phần tử trong brandIds phải là ObjectId`
  })
  @ArrayMinSize(1, { message: 'brandIds phải có ít một phần tử' })
  @Transform(({ value }: { value: string }) => value.split(',').filter((v) => !!v && v.trim().length > 0))
  @IsOptional()
  brandIds?: string[]

  @IsInt()
  @IsOptional()
  hasDiscount: number

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
  @IsNumber({}, { message: 'minRating phải là số' })
  @Min(0, { message: 'minRating phải >= 0' })
  @IsOptional()
  minRating?: number

  @Type(() => Number)
  @IsNumber({}, { message: 'maxPrice phải là số' })
  @Min(0, { message: 'maxPrice phải >= 0' })
  @IsOptional()
  maxPrice?: number
}
