import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ProductAttributeSku } from 'domains/products/schemas/product-attribute-sku.schema'
import { ProductAttribute } from 'domains/products/schemas/product-attributes.schema'
import { Product, ProductDocument } from 'domains/products/schemas/product.schema'
import { Sku } from 'domains/products/schemas/sku.schema'
import mongoose, { FilterQuery, Model, Types } from 'mongoose'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { generateSkuCode } from 'core/utils/utils'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'
import { ProductQueryDto } from 'domains/products/dto/product-query-dto'

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @InjectModel(ProductAttribute.name) private productAttributeModel: Model<ProductAttribute>,
    @InjectModel(Sku.name) private skuModel: Model<Sku>,
    @InjectModel(ProductAttributeSku.name)
    private productAttributeSkuModel: Model<ProductAttributeSku>
  ) {}

  async create(createProductDto: CreateProductDto) {
    const { attributeNames, skus, ...baseProductDto } = createProductDto
    const productId = new mongoose.Types.ObjectId()

    // Tạo danh sách thuộc tính sản phẩm một lần
    const attributeDocuments = await this.productAttributeModel.insertMany(
      attributeNames.map((name) => ({ product: productId, name }))
    )

    // Tạo danh sách SKU
    const skuDocuments = await this.skuModel.insertMany(
      skus.map((sku) => ({
        price: sku.price,
        sku: generateSkuCode({
          brand: baseProductDto.brand,
          attributeValues: sku.attributeValues,
          productId: `${productId}`
        }),
        stockQuantity: sku.stockQuantity,
        images: sku.images,
        product: productId
      }))
    )

    // Tạo bảng ánh xạ `productAttributeSku` bằng `bulkWrite`
    const productAttributeSkuOperations = skus.flatMap((sku, skuIndex) => {
      return sku.attributeValues.map((attributeValue, attrIndex) => ({
        insertOne: {
          document: {
            productAttribute: attributeDocuments[attrIndex]._id,
            sku: skuDocuments[skuIndex]._id,
            value: attributeValue
          }
        }
      }))
    })
    await this.productAttributeSkuModel.bulkWrite(productAttributeSkuOperations)

    return this.productModel.create({ _id: productId, ...baseProductDto })
  }

  async findAll(qs: PaginationQueryDto & DateRangeQueryDto & ProductQueryDto) {
    const { page, limit, from, to, sort: sortQuery, ...filterRest } = qs
    const filter: FilterQuery<ProductDocument> = filterRest

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

    const query = this.productModel.find(filter)

    if (limit && page) {
      query
        .skip((page - 1) * limit)
        .limit(limit)
        .sort(sort)
    }

    const [data, totalDocuments] = await Promise.all([query, this.productModel.countDocuments(filter)])

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

  async findOne(productId: string) {
    const baseProductPromise = this.productModel
      .findById(productId)
      .populate({ path: 'category', select: ['name', 'imageUrl', '-_id'] })

    const skuDocumentList = await this.skuModel.find({ product: productId })
    const skuIds = skuDocumentList.map((sku) => sku._id)

    const attributeAndVariantsPromise = this.productAttributeSkuModel.aggregate([
      {
        $match: { sku: { $in: skuIds } }
      },
      {
        $lookup: {
          from: 'ProductAttributes',
          localField: 'productAttribute',
          foreignField: '_id',
          as: 'attributeInfo'
        }
      },
      {
        $unwind: '$attributeInfo'
      },
      {
        $facet: {
          // Attribute Options: Lấy các thuộc tính của sản phẩm
          attributeOptions: [
            {
              $group: {
                _id: '$attributeInfo.name',
                values: { $addToSet: '$value' } // Loại bỏ giá trị trùng lặp
              }
            },
            {
              $project: {
                _id: 0,
                keyValue: { $arrayToObject: [[{ k: '$_id', v: '$values' }]] }
              }
            },
            {
              $replaceRoot: { newRoot: '$keyValue' }
            }
          ],

          // Variants: Lấy danh sách SKU và các thuộc tính của SKU đó
          variants: [
            {
              $group: {
                _id: '$sku',
                attributes: {
                  $push: { k: '$attributeInfo.name', v: '$value' }
                }
              }
            },
            {
              $addFields: {
                attributes: { $arrayToObject: '$attributes' }
              }
            },
            {
              $lookup: {
                from: 'Skus',
                localField: '_id',
                foreignField: '_id',
                as: 'skuInfo'
              }
            },
            { $unwind: { path: '$skuInfo', preserveNullAndEmptyArrays: true } },
            {
              $replaceRoot: { newRoot: { $mergeObjects: ['$skuInfo', '$$ROOT'] } }
            },
            {
              $project: {
                skuInfo: 0,
                product: 0
              }
            }
          ]
        }
      }
    ])

    const [baseProduct, { attributeOptions, variants }] = await Promise.all([
      baseProductPromise,
      attributeAndVariantsPromise.then((res) => res[0]) // Lấy phần tử đầu tiên của kết quả
    ])

    return {
      ...baseProduct.toObject(),
      attributeOptions,
      skus: variants
    }
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: string) {
    return `This action removes a #${id} product`
  }
}
