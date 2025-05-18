import { Transform, Type } from 'class-transformer'
import {
  IsString,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsEnum,
  IsNumber,
  Min,
  Max,
  IsBoolean,
  IsMongoId,
  ArrayMaxSize
} from 'class-validator'

enum DiscountAmount {
  TEN_THOUSAND = 10000,
  TWENTY_THOUSAND = 20000,
  FIFTY_THOUSAND = 50000,
  ONE_HUNDRED_THOUSAND = 100000
}

export class CreateCouponDto {
  @IsString({ message: 'Coupon code phải là chuỗi' })
  @MinLength(5, { message: 'Coupon code phải có đúng 5 ký tự' })
  @MaxLength(5, { message: 'Coupon code phải có đúng 5 ký tự' })
  @Matches(/^[A-Za-z0-9]{5}$/, {
    message: 'Coupon code chỉ được chứa 5 ký tự chữ hoặc số'
  })
  @Transform(({ value }) => String(value).toUpperCase())
  code: string

  @IsEnum(DiscountAmount, {
    message: `Discount amount phải là một trong các giá trị sau: 10000, 20000, 50000, 100000 VND`
  })
  discountAmount: DiscountAmount

  @IsNumber({}, { message: 'maxUsage phải là số' })
  @Min(1, { message: 'maxUsage phải >= 1' })
  @Max(10, { message: 'maxUsage phải <= 10' })
  maxUsage: number

  @IsBoolean({ message: 'isActive phải là boolean' })
  @IsOptional()
  isActive?: boolean
}

export class UpdateCouponDto {
  @IsEnum(DiscountAmount, {
    message: `Discount amount phải là một trong các giá trị sau: 10000, 20000, 50000, 100000 VND`
  })
  @IsOptional()
  discountAmount?: DiscountAmount

  @IsNumber({}, { message: 'maxUsage phải là số' })
  @Min(1, { message: 'maxUsage phải >= 1' })
  @Max(10, { message: 'maxUsage phải <= 10' })
  @IsOptional()
  maxUsage?: number

  @IsBoolean({ message: 'isActive phải là boolean' })
  @IsOptional()
  isActive?: boolean
}

export class CouponQueryDto {
  @IsString({ message: 'Code phải là chuỗi' })
  @IsOptional()
  code?: string

  @Type(() => Boolean)
  @IsBoolean({ message: 'isActive phải là boolean' })
  @IsOptional()
  isActive?: boolean

  @Type(() => Number)
  @IsEnum(DiscountAmount, {
    message: `discountAmount phải là một trong các giá trị sau: 10000, 20000, 50000, 100000 VND`
  })
  @IsOptional()
  discountAmount?: DiscountAmount

  @Type(() => Number)
  @IsNumber({}, { message: 'minUsageCount phải là số' })
  @Min(0, { message: 'minUsageCount phải >= 0' })
  @IsOptional()
  minUsageCount?: number

  @Type(() => Number)
  @IsNumber({}, { message: 'maxUsageCount phải là số' })
  @Min(0, { message: 'maxUsageCount phải >= 0' })
  @IsOptional()
  maxUsageCount?: number

  @IsMongoId({ message: 'appliedOrderId phải là ObjectId' })
  @IsOptional()
  appliedOrderId?: string
}
