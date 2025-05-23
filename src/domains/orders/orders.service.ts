import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { OrderStatus } from 'core/constants/enum'
import { BadRequestError, NotFoundError } from 'core/exceptions/errors.exception'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { AccountType, ISku } from 'core/types/type'
import { generateOrderCode } from 'core/utils/utils'
import { MailService } from 'domains/mail/mail.service'
import { CreateOrderDto } from 'domains/orders/dto/create-order.dto'
import { OrderQueryDto } from 'domains/orders/dto/order-query.dto'
import { UpdateOrderDto } from 'domains/orders/dto/update-order.dto'
import { OrderItem } from 'domains/orders/schemas/order-item.schema'
import { Order } from 'domains/orders/schemas/order.schema'
import { DecreaseStockOnHandDto } from 'domains/products/dto/decrease-stock-on-hand.dto'
import { ProductsService } from 'domains/products/products.service'
import mongoose, { FilterQuery, Model, Types } from 'mongoose'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(OrderItem.name) private readonly orderItemModel: Model<OrderItem>,
    private mailService: MailService,
    private readonly productsService: ProductsService
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    if (!createOrderDto.userId) {
      throw new BadRequestError('Không thể tạo đơn hàng khi không có thông tin về KH')
    }

    const { items, userId } = createOrderDto
    const orderId = new mongoose.Types.ObjectId()
    const orderCode = generateOrderCode()
    const skusWithDecreaseQuantity: DecreaseStockOnHandDto['items'] = items.map(({ sku, quantity }) => ({
      sku,
      quantity
    }))
    const productsWithDecreaseQuantity: { productId: string; quantity: number }[] = items.map(
      ({ productId, quantity }) => ({
        productId,
        quantity
      })
    )

    const session = await this.orderModel.db.startSession()
    try {
      session.startTransaction()

      await this.orderItemModel.insertMany(
        items.map((orderItem) => ({ ...orderItem, order: orderId })),
        { session }
      )

      // Mặc dù trong createOrderDto vẫn có thuộc tính 'items', nhưng mà ta lại cho nó vào trong hàm create của Mongose
      // Thì có có bị dư thuộc tính 'items' trong Order model hay không? -> KHÔNG
      const createdOrder = await this.orderModel.create(
        [
          {
            ...createOrderDto,
            _id: orderId,
            code: orderCode,
            user: userId
          }
        ],
        { session }
      )

      await session.commitTransaction()
      this.productsService.decreaseStockOnHand({ items: skusWithDecreaseQuantity })
      this.productsService.increaseSoldQuantity(productsWithDecreaseQuantity)
      this.mailService.sendOrderConfirmation(createdOrder[0])

      return createdOrder[0]
    } catch (error) {
      await session.abortTransaction()
      throw error
    } finally {
      session.endSession()
    }
  }

  countDocs() {
    return this.orderModel.countDocuments()
  }

  async countDocsToday() {
    const startOfDay = new Date()
    startOfDay.setHours(0, 0, 0, 0)

    const endOfDay = new Date()
    endOfDay.setHours(23, 59, 59, 999)

    return this.orderModel.countDocuments({
      createdAt: { $gte: startOfDay, $lt: endOfDay }
    })
  }
  async calculateInvest(from?: Date, to?: Date) {
    if (!from || !to) return 0

    const result = await this.orderModel.aggregate([
      {
        $match: {
          createdAt: { $gte: from, $lt: to }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$totalPrice' }
        }
      }
    ])

    return result[0]?.total || 0
  }

  async findAll(qs: PaginationQueryDto & DateRangeQueryDto & OrderQueryDto) {
    const {
      page,
      limit,
      from,
      to,
      sort: sortQuery,
      code,
      userId,
      status,
      paymentMethod,
      minTotalPrice,
      maxTotalPrice,
      minItemCount,
      maxItemCount,
      paymentFromDate,
      paymentToDate,
      deliveredFromDate,
      deliveredToDate
    } = qs

    const filter: FilterQuery<Order> = {}

    if (userId) {
      filter.user = new Types.ObjectId(userId)
    }

    if (code) {
      filter.code = { $regex: code, $options: 'i' }
    }

    // must accept status 0 - Processing
    if (status !== undefined) {
      filter.status = status
    }

    if (paymentMethod) {
      filter.paymentMethod = paymentMethod
    }

    if (minTotalPrice !== undefined || maxTotalPrice !== undefined) {
      filter.totalPrice = {}
      if (minTotalPrice !== undefined) filter.totalPrice.$gte = minTotalPrice
      if (maxTotalPrice !== undefined) filter.totalPrice.$lte = maxTotalPrice
    }

    if (minItemCount !== undefined || maxItemCount !== undefined) {
      filter.itemCount = {}
      if (minItemCount !== undefined) filter.itemCount.$gte = minItemCount
      if (maxItemCount !== undefined) filter.itemCount.$lte = maxItemCount
    }

    if (from || to) {
      filter.createdAt = {}
      if (from) filter.createdAt.$gte = from
      if (to) filter.createdAt.$lt = to
    }

    if (paymentFromDate || paymentToDate) {
      filter.paymentAt = {}
      if (paymentFromDate) filter.paymentAt.$gte = paymentFromDate
      if (paymentToDate) filter.paymentAt.$lt = paymentToDate
    }

    if (deliveredFromDate || deliveredToDate) {
      filter.deliveredAt = {}
      if (deliveredFromDate) filter.deliveredAt.$gte = deliveredFromDate
      if (deliveredToDate) filter.deliveredAt.$lt = deliveredToDate
    }

    let sort: Record<string, 1 | -1> = { createdAt: -1 }
    if (sortQuery) {
      const sortField = sortQuery.split('.')[0]
      const isDescending = sortQuery.split('.')[1] === 'desc'
      sort = isDescending ? { [sortField]: -1 } : { [sortField]: 1 }
    }

    const query = this.orderModel.find(filter).sort(sort)

    if (limit && page) {
      query.skip((page - 1) * limit).limit(limit)
    }

    const [data, totalDocuments] = await Promise.all([query, this.orderModel.countDocuments(filter)])

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

  async findAllByCustomer(qs: PaginationQueryDto, account: AccountType) {
    const { page, limit } = qs

    const filter: FilterQuery<Order> = { user: account._id }

    const query = this.orderModel.find(filter).sort({ createdAt: -1 })

    if (limit && page) {
      query.skip((page - 1) * limit).limit(limit)
    }

    const [data, totalDocuments] = await Promise.all([query, this.orderModel.countDocuments(filter)])

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

  async findOrderDoc(id: string) {
    return this.orderModel.findOne({ _id: id })
  }

  async findOne(id: string) {
    const orderItemList = await this.orderItemModel.find({ order: new Types.ObjectId(id) }).lean(true)
    const skuIds = await orderItemList.map((orderItem) => orderItem.sku.toString())

    const skus: ISku[] = await this.productsService.findAllSkus(skuIds)

    const skuMap = new Map(skus.map((skuDocument) => [skuDocument._id.toString(), skuDocument]))

    const enrichedItems = orderItemList.map((orderItem) => {
      const skuInfo = skuMap.get(orderItem.sku.toString())
      return {
        ...orderItem, // lấy dữ liệu thực
        sku: skuInfo ?? null
      }
    })

    return enrichedItems
  }

  async update(_id: string, updateOrderDto: UpdateOrderDto, account: AccountType) {
    const order = await this.orderModel.findOne({ _id })
    if (!order) {
      throw new NotFoundError('Đơn hàng không tồn tại')
    }

    const currentStatus = order.status
    const { status: nextStatus } = updateOrderDto

    const now = new Date()
    if (nextStatus === OrderStatus.DELIVERED) {
      updateOrderDto.deliveredAt = now
    } else if (nextStatus === OrderStatus.CANCELED) {
      updateOrderDto.cancelledAt = now
    } else if (nextStatus === OrderStatus.COMPLETED) {
      updateOrderDto.paymentAt = now
    }

    return this.orderModel.findOneAndUpdate(
      {
        _id
      },
      { ...updateOrderDto, updateBy: account._id },
      {
        returnOriginal: false
      }
    )
  }

  async remove(_id: string) {
    await this.orderModel.deleteOne({ _id })
    return { deleted: true }
  }

  async bulkRemove(ids: string[]) {
    await this.orderModel.deleteMany({ _id: { $in: ids } })
    return { deleted: true }
  }
}
