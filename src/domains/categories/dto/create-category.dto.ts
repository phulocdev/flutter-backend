import { Transform } from 'class-transformer'
import { IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { Types } from 'mongoose'

export class CreateCategoryDto {
  @MaxLength(40, { message: 'name không được vượt quá 40 kí tự' })
  @MinLength(2, { message: 'name phải có ít nhất 2 kí tự' })
  @IsString({ message: 'name phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'name không được  bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  name: string

  @IsMongoId({ message: 'parentCategory phải là định dạng ObjectId' })
  @IsOptional()
  parentCategory: Types.ObjectId

  @IsString({ message: 'imageUrl phải là kiểu dữ liệu là string' })
  @Transform(({ value }) => String(value).trim())
  @IsOptional() // Tác dụng khi gọi API
  imageUrl?: string // ? Tác dụng cho DEV nhận biết chứ TS không có check
}
