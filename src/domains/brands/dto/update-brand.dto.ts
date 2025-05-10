import { PartialType } from '@nestjs/mapped-types'
import { CreateBrandDto } from 'domains/brands/dto/create-brand.dto'

export class UpdateBrandDto extends PartialType(CreateBrandDto) {}
