import { IsOptional, IsMongoId, IsString, IsNumber, Min, Max } from 'class-validator'

export class CreateCommentDto {
  @IsMongoId()
  productId: string

  @IsMongoId()
  @IsOptional()
  accountId?: string

  @IsString()
  @IsOptional()
  content: string

  @IsString()
  @IsOptional()
  name?: string

  @IsString()
  @IsOptional()
  email?: string

  @Min(1)
  @Max(5)
  @IsNumber()
  @IsOptional()
  stars: number
}
