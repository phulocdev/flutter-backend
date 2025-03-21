import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { NotFoundError } from 'core/exceptions/errors.exception'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { CategoryQueryDto } from 'domains/categories/dto/category-query-dto'
import { Category, CategoryDocument } from 'domains/categories/schemas/category.schema'
import { FilterQuery, Model } from 'mongoose'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose'

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
    @InjectModel(Category.name) private categorySoftDeleteModel: SoftDeleteModel<CategoryDocument>
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return this.categoryModel.create(createCategoryDto)
  }

  async findAll(qs: PaginationQueryDto & DateRangeQueryDto & CategoryQueryDto) {
    const { page, limit, from, to, sort: sortQuery, ...filterRest } = qs
    const filter: FilterQuery<CategoryDocument> = filterRest

    let sort = '-createdAt'
    if (sortQuery) {
      const sortField = sortQuery.split('.')[0]
      const isDescending = sortQuery.split('.')[1] === 'desc'
      sort = isDescending ? `-${sortField}` : sortField
    }

    if (from || to) {
      filter.createdAt = {}
      if (from) filter.createdAt.$gte = from
      if (to) filter.createdAt.$lt = to
    }

    const query = this.categoryModel.find(filter)

    if (limit && page) {
      query
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort)
    }

    const [data, totalDocuments] = await Promise.all([query, this.categoryModel.countDocuments(filter)])

    return {
      data,
      meta: {
        page: page || 1,
        limit: limit || totalDocuments,
        totalPages: limit ? Math.ceil(totalDocuments / limit) : 1,
        totalDocuments
      }
    }
  }

  async findAllPopulated(qs: PaginationQueryDto & DateRangeQueryDto & CategoryQueryDto) {
    const { page, limit, from, to, sort: sortQuery, ...filterRest } = qs
    const filter: FilterQuery<CategoryDocument> = filterRest

    let sort = '-createdAt'
    if (sortQuery) {
      const sortField = sortQuery.split('.')[0]
      const isDescending = sortQuery.split('.')[1] === 'desc'
      sort = isDescending ? `-${sortField}` : sortField
    }

    if (from || to) {
      filter.createdAt = {}
      if (from) filter.createdAt.$gte = from
      if (to) filter.createdAt.$lt = to
    }

    const query = this.categoryModel.find(filter).populate({ path: 'parentCategory' })

    if (limit && page) {
      query
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort)
    }

    const [data, totalDocuments] = await Promise.all([query, this.categoryModel.countDocuments(filter)])

    return {
      data,
      meta: {
        page: page || 1,
        limit: limit || totalDocuments,
        totalPages: limit ? Math.ceil(totalDocuments / limit) : 1,
        totalDocuments
      }
    }
  }

  async getCategoryHierarchy(id: string) {
    const hieranchy = []
    let currentCategory = await this.categoryModel.findById(id)

    while (currentCategory && currentCategory.parentCategory) {
      hieranchy.unshift(currentCategory)
      currentCategory = await this.categoryModel.findById(currentCategory.parentCategory)
    }

    if (currentCategory) hieranchy.unshift(currentCategory)

    return hieranchy
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id)
    if (!category) {
      throw new NotFoundError('Danh mục không tồn tại')
    }

    return category
  }

  async findOnePopulated(id: string) {
    const category = await this.categoryModel.findById(id)
    if (!category) {
      throw new NotFoundError('Danh mục không tồn tại')
    }

    if (category.parentCategory) {
      await category.populate<{ parentCategory: Category }>({ path: 'parentCategory' })
    }

    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryModel.findOneAndUpdate({ _id: id }, updateCategoryDto, { returnOriginal: false })
  }

  async remove(id: string) {
    const a = await this.findOne(id)
    const filter = { _id: id }
    return this.categorySoftDeleteModel.softDelete(filter)
  }
}
