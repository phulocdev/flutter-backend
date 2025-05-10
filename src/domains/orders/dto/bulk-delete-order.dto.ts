import { ArrayMinSize, IsAlpha, IsArray, IsMongoId, IsNotEmpty } from 'class-validator'
import { IsUniqueArray } from 'core/decorators/is-unique-array.decorator'

export class BulkDeleteOrderDto {
  @IsUniqueArray('Các phần tử trong ids không được trùng lặp')
  @IsMongoId({
    each: true,
    message: `Các phần tử trong ids phải là ObjectId`
  })
  @ArrayMinSize(1, { message: 'ids phải có ít một phần tử' })
  @IsArray({ message: 'ids phải là dạng mảng' })
  @IsNotEmpty({ message: 'ids không được bỏ trống' })
  ids: string[]
}
