import { Transform } from 'class-transformer'
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min, MinLength } from 'class-validator'
import { IsUniqueArray } from 'core/decorators/is-unique-array.decorator'

export class SkuDto {
  @Min(1, { message: 'skus[index].price phải > 0' })
  @IsNumber({ allowNaN: false }, { message: 'skus[index].price phải là định dạng số' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'skus[index].price không được bỏ trống' })
  price: number

  @Min(1, { message: 'skus[index].stockQuantity phải > 0' })
  @IsInt({ message: 'skus[index].stockQuantity phải là định dạng số nguyên' })
  @Transform(({ value }) => Number(value))
  @IsNotEmpty({ message: 'skus[index].stockQuantity không được bỏ trống' })
  stockQuantity: number

  // Quy ước: thứ tự của các phần tử trong attributeValues phải trùng khớp thứ tự với các phần tử trong attributeNames
  @IsUniqueArray('Mỗi phần tử trong attributeValues không được trùng lặp')
  @IsString({
    each: true,
    message: `Mỗi phần tử trong attributeValues phải là dạng chuỗi`
  })
  @MinLength(3, { each: true, message: 'Mỗi phần tử trong skus[index].attributeValues phải có ít nhất 3 ký tự' })
  @MaxLength(20, { each: true, message: 'Mỗi phần tử trong skus[index].attributeValues không được vượt quá 20 ký tự' })
  @IsArray({ message: 'skus[index].attributeValues phải là định dạng mảng' })
  @IsNotEmpty({ message: 'skus[index].attributeValues không được bỏ trống' })
  attributeValues: string[]

  @IsUniqueArray('Các phần tử trong images không được trùng lặp')
  @IsString({
    each: true,
    message: `skus[index].Các phần tử trong images phải là dạng chuỗi`
  })
  @IsArray({ message: 'skus[index].images phải là định dạng mảng' })
  @IsOptional()
  images?: string[] | undefined
}
