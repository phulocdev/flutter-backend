import { Transform } from 'class-transformer'
import { IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateBrandDto {
  @MaxLength(40, { message: 'name không được vượt quá 40 kí tự' })
  @MinLength(2, { message: 'name phải có ít nhất 2 kí tự' })
  @IsString({ message: 'name phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'name không được  bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  name: string

  @IsMongoId({ message: 'countryOfOrigin phải là định dạng ObjectId' })
  @IsOptional()
  countryOfOrigin: string

  @IsString({ message: 'imageUrl phải là kiểu dữ liệu là string' })
  @Transform(({ value }) => String(value).trim())
  @IsOptional()
  imageUrl?: string
}
