import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { CategoriesService } from './categories.service'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { ValidateMongoIdPipe } from 'core/pipes/validate-mongo-id.pipe'
import { ResponseMessage } from 'core/decorators/response-message.decorator'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'
import { ValidateDateRange } from 'core/pipes/validate-date-range.pipe'
import { CategoryQueryDto } from 'domains/categories/dto/category-query-dto'
import { Public } from 'core/decorators/public.decorator'

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto)
  }

  @Public()
  @Get()
  @ResponseMessage('Fetch danh sách danh mục thành công')
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query(ValidateDateRange) dateRangeQuery: DateRangeQueryDto,
    @Query() categoryQuery: CategoryQueryDto
  ) {
    return this.categoriesService.findAll({ ...paginationQuery, ...dateRangeQuery, ...categoryQuery })
  }

  @Get(':id')
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.categoriesService.findOne(id)
  }

  @Get(':id/ancestors')
  findHierachy(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.categoriesService.getCategoryHierarchy(id)
  }

  @Patch(':id')
  update(@Param('id', ValidateMongoIdPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto)
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.categoriesService.remove(id)
  }
}
