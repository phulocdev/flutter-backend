import { ArrayMinSize, IsMongoId } from 'class-validator'
import { IsUniqueArray } from 'core/decorators/is-unique-array.decorator'

export class DeleteCartItemsDto {
  @IsUniqueArray('Các phần tử trong skuIds không được trùng lặp')
  @IsMongoId({
    each: true,
    message: `Các phần tử trong skuIds phải là ObjectId`
  })
  @ArrayMinSize(1, { message: 'skuIds phải có ít một phần tử' })
  skuIds: string[]
}
