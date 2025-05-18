import { Transform, Type } from 'class-transformer'
import { IsString, IsOptional, MinLength, IsMongoId, IsEnum, IsNumber, Min, IsDate } from 'class-validator'
import { OrderStatus, PaymentMethod } from 'core/constants/enum'

export class OrderQueryDto {
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

  @IsMongoId({ message: 'userId phải là ObjectId' })
  @IsOptional()
  userId?: string

  @IsEnum(OrderStatus, {
    message: `status phải là một trong các giá trị sau: ${Object.values(OrderStatus).join(' || ')}`
  })
  @IsOptional()
  status?: OrderStatus

  @IsEnum(PaymentMethod, {
    message: `paymentMethod phải là một trong các giá trị sau: ${Object.values(PaymentMethod).join(' || ')}`
  })
  @IsOptional()
  paymentMethod?: PaymentMethod

  @Type(() => Number)
  @IsNumber({}, { message: 'minTotalPrice phải là số' })
  @Min(0, { message: 'minTotalPrice phải >= 0' })
  @IsOptional()
  minTotalPrice?: number

  @Type(() => Number)
  @IsNumber({}, { message: 'maxTotalPrice phải là số' })
  @Min(0, { message: 'maxTotalPrice phải >= 0' })
  @IsOptional()
  maxTotalPrice?: number

  @Type(() => Number)
  @IsNumber({}, { message: 'minItemCount phải là số' })
  @Min(1, { message: 'minItemCount phải >= 1' })
  @IsOptional()
  minItemCount?: number

  @Type(() => Number)
  @IsNumber({}, { message: 'maxItemCount phải là số' })
  @Min(1, { message: 'maxItemCount phải >= 1' })
  @IsOptional()
  maxItemCount?: number

  @Type(() => Date)
  @IsDate({ message: 'fromDate phải là ngày' })
  @IsOptional()
  fromDate?: Date

  @Type(() => Date)
  @IsDate({ message: 'toDate phải là ngày' })
  @IsOptional()
  toDate?: Date

  @Type(() => Date)
  @IsDate({ message: 'paymentFromDate phải là ngày' })
  @IsOptional()
  paymentFromDate?: Date

  @Type(() => Date)
  @IsDate({ message: 'paymentToDate phải là ngày' })
  @IsOptional()
  paymentToDate?: Date

  @Type(() => Date)
  @IsDate({ message: 'deliveredFromDate phải là ngày' })
  @IsOptional()
  deliveredFromDate?: Date

  @Type(() => Date)
  @IsDate({ message: 'deliveredToDate phải là ngày' })
  @IsOptional()
  deliveredToDate?: Date
}
