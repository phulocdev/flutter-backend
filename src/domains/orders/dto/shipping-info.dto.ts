import { Transform } from 'class-transformer'
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from 'class-validator'

export class ShippingInfoDto {
  @MaxLength(100, { message: 'name không được vượt quá 100 kí tự' })
  @MinLength(2, { message: 'name phải có ít nhất 2 kí tự' })
  @IsString({ message: 'name phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'name không được bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  name: string

  @IsEmail({}, { message: 'email không đúng định dạng' })
  @IsNotEmpty({ message: 'email không được  bỏ trống' })
  email: string

  @Matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'phoneNumber không đúng định dạng' })
  @IsString({ message: 'phoneNumber phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'phoneNumber không được bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  phoneNumber: string

  @MaxLength(60, { message: 'province không được vượt quá 60 kí tự' })
  @MinLength(2, { message: 'province phải có ít nhất 2 kí tự' })
  @IsString({ message: 'province phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'province không được bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  province: string

  @MaxLength(60, { message: 'district không được vượt quá 60 kí tự' })
  @MinLength(2, { message: 'district phải có ít nhất 2 kí tự' })
  @IsString({ message: 'district phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'district không được bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  district: string

  @MaxLength(60, { message: 'ward không được vượt quá 60 kí tự' })
  @MinLength(2, { message: 'ward phải có ít nhất 2 kí tự' })
  @IsString({ message: 'ward phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'ward không được bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  ward: string

  @MaxLength(100, { message: 'detailedAddress không được vượt quá 100 kí tự' })
  @MinLength(2, { message: 'detailedAddress phải có ít nhất 2 kí tự' })
  @IsString({ message: 'detailedAddress phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'detailedAddress không được bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  detailedAddress: string
}
