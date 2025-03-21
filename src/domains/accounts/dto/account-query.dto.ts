import { Type } from 'class-transformer'
import { IsOptional, IsString, MinLength } from 'class-validator'

export class AccountQueryDto {
  @MinLength(5, { message: 'sort phải có ít nhất 5 ký tự' })
  @IsString({ message: 'sort phải là định dạng chuỗi' })
  @Type(() => String)
  @IsOptional()
  sort?: string | undefined

  @MinLength(1, { message: 'code phải có ít nhất 1 ký tự' })
  @IsString({ message: 'code phải là định dạng chuỗi' })
  @Type(() => String)
  @IsOptional()
  code?: string | undefined

  @MinLength(1, { message: 'customerCode phải có ít nhất 1 ký tự' })
  @IsString({ message: 'customerCode phải là định dạng chuỗi' })
  @Type(() => String)
  @IsOptional()
  customerCode?: string | undefined
}
