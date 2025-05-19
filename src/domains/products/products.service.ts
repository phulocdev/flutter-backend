import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { ProductAttributeSku } from 'domains/products/schemas/product-attribute-sku.schema'
import { ProductAttribute } from 'domains/products/schemas/product-attributes.schema'
import { Product, ProductDocument } from 'domains/products/schemas/product.schema'
import { Sku } from 'domains/products/schemas/sku.schema'
import mongoose, { FilterQuery, Model, Types } from 'mongoose'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { generateProductCode, generateSkuCode } from 'core/utils/utils'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'
import { ProductQueryDto } from 'domains/products/dto/product-query-dto'
import { BadRequestError, NotFoundError, UnprocessableEntityError } from 'core/exceptions/errors.exception'
import { IncreaseStockOnHandDto } from 'domains/products/dto/increase-stock-on-hand.dto'
import { DecreaseStockOnHandDto } from 'domains/products/dto/decrease-stock-on-hand.dto'
import { AccountType } from 'core/types/type'
import { Role } from 'core/constants/enum'

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
    const productCode = generateProductCode()

    // SP không có thuộc tính
    if (skus && skus.length === 0) {
      throw new UnprocessableEntityError([{ field: 'skus', message: 'skus không hợp lệ phải có ít nhất một phần tử' }])
    }

    const session = await this.productModel.db.startSession()
    try {
      session.startTransaction()
      let attributeDocuments: Array<any> = []
      let skuDocuments: Array<any> = []

      // Tạo Documents cho ProductAttributes Collection trước
      if (attributeNames && attributeNames.length > 0) {
        attributeDocuments = await this.productAttributeModel.insertMany(
          attributeNames.map((name) => ({ product: productId, name })),
          { session }
        )
      }

      // Tiếp đó là tạo Documents cho Skus Collection
      if (skus && skus.length > 0) {
        skuDocuments = await this.skuModel.insertMany(
          skus.map((sku) => {
            const { ...skuFieldValues } = sku
            return {
              ...skuFieldValues,
              product: productId,
              barcode: generateSkuCode(),
              sku: generateSkuCode()
            }
          }),
          { session }
        )
      }

      // Create attribute-SKU mappings
      if (attributeDocuments.length > 0 && skuDocuments.length > 0) {
        const attributeNameToIdMap = new Map<string, mongoose.Types.ObjectId>()
        attributeDocuments.forEach((attr, index) => {
          attributeNameToIdMap.set(attributeNames![index], attr._id)
        })

        const productAttributeSkuOperations: Array<any> = []

        // Ràng buộc giữa Client và Server là, thú tự của các AttributeValues phải khớp với thứ tự của AttributeNames
        skus!.forEach((sku, skuIndex) => {
          if (sku.attributeValues && sku.attributeValues.length === attributeNames!.length) {
            sku.attributeValues.forEach((attributeValue, attrIndex) => {
              const attributeName = attributeNames![attrIndex]
              const attributeId = attributeNameToIdMap.get(attributeName)

              productAttributeSkuOperations.push({
                insertOne: {
                  document: {
                    productAttribute: attributeId,
                    sku: skuDocuments[skuIndex]._id,
                    value: attributeValue
                  }
                }
              })
            })
          } else {
            throw new Error(
              `SKU at index ${skuIndex} has invalid attribute values count. Expected ${attributeNames!.length}, got ${
                sku.attributeValues?.length || 0
              }`
            )
          }
        })

        // Thêm các Documents vào bảng trung gian giữa ProductAttribute và Sku
        if (productAttributeSkuOperations.length > 0) {
          await this.productAttributeSkuModel.bulkWrite(productAttributeSkuOperations, { session })
        }
      }

      const createdProduct = await this.productModel.create(
        [{ _id: productId, code: productCode, ...baseProductDto }],
        { session }
      )
      await session.commitTransaction()

      return createdProduct[0]
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }

  async findAll(qs: PaginationQueryDto & DateRangeQueryDto & ProductQueryDto) {
    const {
      page,
      limit,
      from,
      to,
      sort: sortQuery,
      name,
      brandIds,
      categoryIds,
      code,
      hasDiscount,
      maxPrice,
      minPrice,
      status
    } = qs
    // sort và status là những query có gtri đặc biệt -> phải transform thành cú pháp hợp lệ trước khi mà thực hiện filter
    // customerCode và tableNumber là query đặc biệt -> dùng để query nested Object
    // Cho nên ta phải tasck 3 query value đó ra riêng

    // Filter key of nested object

    const filter: FilterQuery<Product> = {}
    // if (qs.customerId) {
    //   filter.customer = new Types.ObjectId(qs.customerId)
    // }

    if (status !== undefined) {
      filter.status = status
    }

    if (name) {
      filter.name = { $regex: name, $options: 'i' }
    }

    // 0 || 1
    if (hasDiscount) {
      filter.discountPercentage = { $gte: 0 }
    }

    if (code) {
      filter.code = { $regex: code, $options: 'i' }
    }

    if (categoryIds) {
      filter.category = { $in: categoryIds }
    }

    if (brandIds) {
      filter.brand = { $in: brandIds }
    }

    if (minPrice !== undefined && maxPrice) {
      filter.basePrice = { $gte: minPrice, $lte: maxPrice }
    }

    // sort: createdAt.desc || createdAt.asc
    let sort: Record<string, 1 | -1> = { createdAt: -1 }
    if (sortQuery) {
      const sortField = sortQuery.split('.')[0]
      const isDescending = sortQuery.split('.')[1] === 'desc'
      sort = isDescending ? { [sortField]: -1 } : { [sortField]: 1 }
    }

    if (from || to) {
      filter.createdAt = {}
      if (from) filter.createdAt.$gte = from
      if (to) filter.createdAt.$lt = to
    }

    const query = this.productModel
      .find(filter)
      .sort(sort)
      .populate([{ path: 'category' }, { path: 'brand' }])

    if (limit && page) {
      query.skip((page - 1) * limit).limit(limit)
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
      .populate([{ path: 'category' }, { path: 'brand' }])
      .lean(true)

    const [skuDocumentList, productVariants] = await Promise.all([
      this.skuModel.find({ product: productId }),
      this.productAttributeModel.findOne({ product: productId })
    ])
    const skuIds = skuDocumentList.map((sku) => sku._id)
    const hasVariants = productVariants !== null

    // TH: SP chỉ có 1 biến thể duy nhất
    // -> Thuộc 2 trường hợp là sản phẩm không có biến thể (thật sự)
    //                          sản phẩm chỉ có 1 biến thể

    // Chon nên là điều kiện ngay bên dưởi chỉ nên match trong trường hợp sản phẩm KHÔNG có biến thể
    if (skuIds.length === 1 && !hasVariants) {
      const [baseProduct] = await Promise.all([baseProductPromise])

      return {
        ...baseProduct,
        skus: skuDocumentList
      }
    }

    // TH: SP có nhiều biến thể
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
          // Format attributeOptions to: { name: string, values: string[] }
          attributeOptions: [
            {
              $group: {
                _id: '$attributeInfo.name',
                values: { $addToSet: '$value' }
              }
            },
            {
              $project: {
                _id: 0,
                name: '$_id',
                values: 1
              }
            }
          ],

          // Format variants.skus[n].attributes to: { name: string, values: string[] }
          variants: [
            {
              $group: {
                _id: '$sku',
                attributesArray: {
                  $push: {
                    name: '$attributeInfo.name',
                    values: ['$value']
                  }
                }
              }
            },
            {
              $addFields: {
                attributes: {
                  $map: {
                    input: '$attributesArray',
                    as: 'item',
                    in: {
                      name: '$$item.name',
                      value: { $arrayElemAt: ['$$item.values', 0] }
                    }
                  }
                }
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
            {
              $unwind: { path: '$skuInfo', preserveNullAndEmptyArrays: true }
            },
            {
              $replaceRoot: {
                newRoot: {
                  $mergeObjects: ['$skuInfo', '$$ROOT']
                }
              }
            },
            {
              $project: {
                skuInfo: 0,
                product: 0,
                attributesArray: 0
              }
            }
          ]
        }
      }
    ])

    const [baseProduct, { attributeOptions, variants }] = await Promise.all([
      baseProductPromise,
      attributeAndVariantsPromise.then((res) => res[0]),
      this.productModel.updateOne({ _id: productId }, { $inc: { views: 1 } })
    ])

    // Increase product viewsif
    return {
      ...baseProduct,
      attributeOptions,
      skus: variants
    }
  }

  async update(_id: string, updateProductDto: UpdateProductDto) {
    const { attributeNames, skus, ...baseProductDto } = updateProductDto

    if (attributeNames && !skus) {
      throw new UnprocessableEntityError([{ field: 'skus', message: 'skus không được bỏ trống' }])
    }

    if (!attributeNames && skus) {
      throw new UnprocessableEntityError([{ field: 'attributeNames', message: 'attributeNames không được bỏ trống' }])
    }

    // Add retry logic for TransientTransactionError
    const MAX_RETRIES = 3
    let retryCount = 0

    while (retryCount < MAX_RETRIES) {
      const session = await this.productModel.db.startSession()

      try {
        session.startTransaction({
          readConcern: { level: 'snapshot' },
          writeConcern: { w: 'majority' },
          maxCommitTimeMS: 10000 // Set appropriate timeout
        })

        // TH1: Không cập nhật liên quan đến biến thể
        if (!attributeNames || !skus) {
          const updatedProduct = await this.productModel.findOneAndUpdate({ _id }, baseProductDto, {
            new: true,
            session
          })
          await session.commitTransaction()
          return updatedProduct
        }

        // TH2: Cập nhật các biến thể của sản phẩm
        // 1. Find and remove related records
        const productAttributes = await this.productAttributeModel.find({ product: _id })
        const productAttributeIds = productAttributes.map((prodAtt) => prodAtt._id)

        await Promise.all([
          this.productAttributeModel.deleteMany({ product: _id }).session(session),
          this.productAttributeSkuModel.deleteMany({ productAttribute: { $in: productAttributeIds } }).session(session),
          this.skuModel.deleteMany({ product: _id }).session(session)
        ])

        // 2. Create new attributes and SKUs
        let attributeDocuments: Array<any> = []
        let skuDocuments: Array<any> = []

        if (attributeNames.length > 0) {
          attributeDocuments = await this.productAttributeModel.insertMany(
            attributeNames.map((name) => ({ product: _id, name })),
            { session }
          )
        }

        if (skus.length > 0) {
          skuDocuments = await this.skuModel.insertMany(
            skus.map((sku) => {
              const { attributeValues, ...skuFieldValues } = sku
              return {
                ...skuFieldValues,
                product: _id,
                barcode: generateSkuCode(),
                sku: generateSkuCode()
              }
            }),
            { session }
          )
        }

        // 3. Create mapping between attributes and SKUs
        if (attributeDocuments.length > 0 && skuDocuments.length > 0) {
          const attributeNameToIdMap = new Map<string, mongoose.Types.ObjectId>()
          attributeDocuments.forEach((attr, index) => {
            attributeNameToIdMap.set(attributeNames[index], attr._id)
          })

          const productAttributeSkuOperations: Array<any> = []

          skus.forEach((sku, skuIndex) => {
            if (sku.attributeValues && sku.attributeValues.length === attributeNames.length) {
              sku.attributeValues.forEach((attributeValue, attrIndex) => {
                const attributeName = attributeNames[attrIndex]
                const attributeId = attributeNameToIdMap.get(attributeName)

                productAttributeSkuOperations.push({
                  insertOne: {
                    document: {
                      productAttribute: attributeId,
                      sku: skuDocuments[skuIndex]._id,
                      value: attributeValue
                    }
                  }
                })
              })
            } else {
              throw new BadRequestError(
                `SKU at index ${skuIndex} has invalid attribute values count. Expected ${attributeNames.length}, got ${
                  sku.attributeValues?.length || 0
                }`
              )
            }
          })

          if (productAttributeSkuOperations.length > 0) {
            await this.productAttributeSkuModel.bulkWrite(productAttributeSkuOperations, { session })
          }
        }

        // 4. Update the base product
        const updatedProduct = await this.productModel.findOneAndUpdate({ _id }, baseProductDto, { new: true, session })

        await session.commitTransaction()
        session.endSession()
        return updatedProduct
      } catch (error) {
        await session.abortTransaction()
        session.endSession()

        // Check if it's a transient transaction error that we should retry
        if (
          (error as any).errorLabels &&
          (error as any).errorLabels.includes('TransientTransactionError') &&
          retryCount < MAX_RETRIES - 1
        ) {
          retryCount++
          console.log(`Transaction failed with transient error, retrying (${retryCount}/${MAX_RETRIES})...`)
          // Add a small delay before retrying
          await new Promise((resolve) => setTimeout(resolve, 100 * Math.pow(2, retryCount)))
          continue
        }

        throw error
      }
    }
  }

  async remove(_id: string) {
    const MAX_RETRIES = 3
    let retryCount = 0

    while (retryCount < MAX_RETRIES) {
      const session = await this.productModel.db.startSession()

      try {
        session.startTransaction({
          readConcern: { level: 'snapshot' },
          writeConcern: { w: 'majority' },
          maxCommitTimeMS: 10000
        })

        // Find related records to delete
        const productAttributes = await this.productAttributeModel.find({ product: _id })
        const productAttributeIds = productAttributes.map((prodAtt) => prodAtt._id)

        // Delete all related records
        await Promise.all([
          this.productModel.deleteOne({ _id }).session(session),
          this.productAttributeModel.deleteMany({ product: _id }).session(session),
          this.productAttributeSkuModel.deleteMany({ productAttribute: { $in: productAttributeIds } }).session(session),
          this.skuModel.deleteMany({ product: _id }).session(session)
        ])

        await session.commitTransaction()
        session.endSession()
        return { deleted: true }
      } catch (error) {
        await session.abortTransaction()
        session.endSession()

        // Check if it's a transient transaction error that we should retry
        if (
          (error as any).errorLabels &&
          (error as any).errorLabels.includes('TransientTransactionError') &&
          retryCount < MAX_RETRIES - 1
        ) {
          retryCount++
          console.log(`Transaction failed with transient error, retrying (${retryCount}/${MAX_RETRIES})...`)
          await new Promise((resolve) => setTimeout(resolve, 100 * Math.pow(2, retryCount)))
          continue
        }

        throw error
      }
    }
  }

  increaseStockOnHand(increaseStockOnHandDto: IncreaseStockOnHandDto) {
    const { items } = increaseStockOnHandDto

    const operations = items.map(({ sku, quantity }) => ({
      updateOne: {
        filter: { _id: sku },
        update: { $inc: { stockOnHand: quantity } }
      }
    }))

    this.skuModel.bulkWrite(operations)
  }

  decreaseStockOnHand(decreaseStockOnHandDto: DecreaseStockOnHandDto) {
    const { items } = decreaseStockOnHandDto

    const operations = items.map(({ sku, quantity }) => ({
      updateOne: {
        filter: { _id: sku },
        update: { $inc: { stockOnHand: -quantity } }
      }
    }))

    this.skuModel.bulkWrite(operations)
  }

  increaseSoldQuantity(items: { productId: string; quantity: number }[]) {
    const operations = items.map(({ productId, quantity }) => ({
      updateOne: {
        filter: { _id: productId },
        update: { $inc: { soldQuantity: quantity } }
      }
    }))

    this.productModel.bulkWrite(operations)
  }

  async findOneSku(skuId: string) {
    const sku = await this.skuModel.findOne({ _id: skuId })

    if (!sku) {
      throw new NotFoundError('SKU không tồn tại')
    }

    return sku
  }

  async findAllSkus(skuIds: string[]): Promise<any[]> {
    const objectIds = skuIds.map((id) => new Types.ObjectId(id))

    return this.skuModel.aggregate([
      {
        $match: {
          _id: { $in: objectIds }
        }
      },
      {
        $lookup: {
          from: 'Products',
          localField: 'product',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'Categories',
          localField: 'product.category',
          foreignField: '_id',
          as: 'productCategory'
        }
      },
      { $unwind: { path: '$productCategory', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'Brands',
          localField: 'product.brand',
          foreignField: '_id',
          as: 'productBrand'
        }
      },
      { $unwind: { path: '$productBrand', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: 'ProductAttributeSku',
          let: { skuId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$sku', '$$skuId'] }
              }
            }
          ],
          as: 'attributeSkus'
        }
      },
      {
        $lookup: {
          from: 'ProductAttributes',
          let: { attrSkus: '$attributeSkus' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: [
                    '$_id',
                    {
                      $map: {
                        input: '$$attrSkus',
                        as: 'asku',
                        in: '$$asku.productAttribute'
                      }
                    }
                  ]
                }
              }
            }
          ],
          as: 'attributesInfo'
        }
      },
      {
        $addFields: {
          attributes: {
            $map: {
              input: '$attributeSkus',
              as: 'asku',
              in: {
                value: '$$asku.value',
                name: {
                  $let: {
                    vars: {
                      attr: {
                        $arrayElemAt: [
                          {
                            $filter: {
                              input: '$attributesInfo',
                              as: 'ainfo',
                              cond: { $eq: ['$$ainfo._id', '$$asku.productAttribute'] }
                            }
                          },
                          0
                        ]
                      }
                    },
                    in: '$$attr.name'
                  }
                }
              }
            }
          },
          product: {
            $mergeObjects: [
              '$product',
              {
                category: '$productCategory',
                brand: '$productBrand'
              }
            ]
          }
        }
      },
      {
        $project: {
          minStockLevel: 0,
          maxStockLevel: 0,
          attributeSkus: 0,
          attributesInfo: 0,
          productCategory: 0,
          productBrand: 0
        }
      }
    ])
  }
}
