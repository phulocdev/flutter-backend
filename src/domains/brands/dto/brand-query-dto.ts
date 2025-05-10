import { Transform, Type } from 'class-transformer'
import { IsMongoId, IsOptional, IsString, MinLength } from 'class-validator'

export class BrandQueryDto {
  @MinLength(5, { message: 'sort phải có ít nhất 5 ký tự' })
  @IsString({ message: 'sort phải là định dạng chuỗi' })
  @Type(() => String)
  @IsOptional()
  sort?: string | undefined

  @MinLength(1, { message: 'name phải có ít nhất 1 ký tự' })
  @IsString({ message: 'name phải là định dạng chuỗi' })
  @Transform(({ value }) => String(value).trim())
  @Type(() => String)
  @IsOptional()
  name?: string | undefined

  @IsMongoId({ message: 'countryOfOrigin phải là định dạng ObjectId' })
  @IsOptional()
  countryOfOrigin?: string | undefined
}
