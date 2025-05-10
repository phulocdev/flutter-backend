import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { BadRequestError, NotFoundError } from 'core/exceptions/errors.exception'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { BrandQueryDto } from 'domains/brands/dto/brand-query-dto'
import { CreateBrandDto } from 'domains/brands/dto/create-brand.dto'
import { UpdateBrandDto } from 'domains/brands/dto/update-brand.dto'
import { Brand } from 'domains/brands/schemas/brand.schema'
import { FilterQuery, Model } from 'mongoose'

@Injectable()
export class BrandsService {
  constructor(@InjectModel(Brand.name) private brandModel: Model<Brand>) {}

  async create(createBrandDto: CreateBrandDto) {
    const { name } = createBrandDto
    const brand = await this.brandModel.findOne({ name })

    if (brand) {
      throw new BadRequestError(`Thương hiệu${name} đã tồn tại`)
    }

    return this.brandModel.create(createBrandDto)
  }

  async findAll(qs: PaginationQueryDto & DateRangeQueryDto & BrandQueryDto) {
    const { page, limit, from, to, sort: sortQuery, ...filter } = qs

    const _filter: FilterQuery<Brand> = filter

    let sort = '-createdAt'
    if (sortQuery) {
      const sortField = sortQuery.split('.')[0]
      const isDescending = sortQuery.split('.')[1] === 'desc'
      sort = isDescending ? `-${sortField}` : sortField
    }

    if (from || to) {
      _filter.createdAt = {}
      if (from) _filter.createdAt.$gte = from
      if (to) _filter.createdAt.$lt = to
    }

    const query = this.brandModel.find(filter).sort(sort)

    if (limit && page) {
      query.skip((page - 1) * limit).limit(limit)
    }

    const [data, totalDocuments] = await Promise.all([query, this.brandModel.countDocuments(filter)])

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

  async findOne(id: string) {
    const brand = await this.brandModel.findById(id)

    if (!brand) {
      throw new NotFoundError('Thương hiệu không tồn tại')
    }

    return brand
  }

  async update(_id: string, updateBrandDto: UpdateBrandDto) {
    const brand = await this.brandModel.findOne({ name: updateBrandDto.name })
    if (brand) {
      throw new BadRequestError(`Thương hiệu ${updateBrandDto.name} đã tồn tại`)
    }

    const updatedBrand = await this.brandModel.findOneAndUpdate({ _id }, updateBrandDto, { new: true })
    if (!updatedBrand) {
      throw new NotFoundError('Thương hiệu cần cập nhật không tồn tại')
    }

    return updatedBrand
  }

  async remove(_id: string) {
    const deletedBrand = await this.brandModel.findOneAndDelete({ _id })

    if (!deletedBrand) {
      throw new NotFoundError('Thương hiệu cần xóa không tồn tại')
    }

    return deletedBrand
  }
}
