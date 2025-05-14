import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { BrandsService } from './brands.service'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'
import { ResponseMessage } from 'core/decorators/response-message.decorator'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'
import { BrandQueryDto } from 'domains/brands/dto/brand-query-dto'
import { ValidateDateRange } from 'core/pipes/validate-date-range.pipe'
import { ValidateMongoIdPipe } from 'core/pipes/validate-mongo-id.pipe'
import { Public } from 'core/decorators/public.decorator'

@Controller('brands')
export class BrandsController {
  constructor(private readonly brandsService: BrandsService) {}

  @Post()
  @ResponseMessage('Tạo mới thương hiệu thành công')
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandsService.create(createBrandDto)
  }

  @Public()
  @Get()
  @ResponseMessage('Lấy danh sách thương hiệu thành công')
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query(ValidateDateRange) dateRangeQuery: DateRangeQueryDto,
    @Query() brandQuery: BrandQueryDto
  ) {
    return this.brandsService.findAll({ ...paginationQuery, ...dateRangeQuery, ...brandQuery })
  }

  @Get(':id')
  @ResponseMessage('Lấy thông tin thương hiệu thành công')
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.brandsService.findOne(id)
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật thương hiệu thành công')
  update(@Param('id', ValidateMongoIdPipe) id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandsService.update(id, updateBrandDto)
  }

  @Delete(':id')
  @ResponseMessage('Xóa thương hiệu thành công')
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.brandsService.remove(id)
  }
}
