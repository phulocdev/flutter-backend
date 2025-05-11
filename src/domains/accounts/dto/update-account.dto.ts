import { OmitType, PartialType } from '@nestjs/mapped-types'
import { CreateAccountDto } from './create-account.dto'
import { IsBoolean, IsOptional } from 'class-validator'

export class UpdateAccountDto extends OmitType(PartialType(CreateAccountDto), ['email'] as const) {
  @IsBoolean()
  @IsOptional()
  isGuest?: boolean
}
