import { Transform } from 'class-transformer'
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'
import { Role } from 'core/constants/enum'

export class CreateGuestAccountDto {
  @IsEmail({}, { message: 'email không đúng định dạng' })
  @IsNotEmpty({ message: 'email không được  bỏ trống' })
  email: string

  @MaxLength(40, { message: 'fullname không được vượt quá 40 kí tự' })
  @MinLength(1, { message: 'password phải có ít nhất 1 kí tự' })
  @IsString({ message: 'fullname phải là kiểu dữ liệu là string' })
  @IsNotEmpty({ message: 'fullname không được bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  fullName: string

  @MaxLength(40, { message: 'address không được vượt quá 40 kí tự' })
  @IsString({ message: 'address phải là kiểu dữ liệu là string' })
  @MinLength(8, { message: 'address phải có ít nhất 8 kí tự' })
  @IsNotEmpty({ message: 'address không được bỏ trống' })
  @Transform(({ value }) => String(value).trim())
  address: string
}
