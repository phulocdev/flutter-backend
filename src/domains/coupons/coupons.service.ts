import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { Coupon, CouponDocument } from './schemas/coupon.schema'
import { OrdersService } from '../orders/orders.service'
import { CouponQueryDto, CreateCouponDto, UpdateCouponDto } from 'domains/coupons/dto/create-coupon.dto'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'

@Injectable()
export class CouponsService {
  constructor(
    @InjectModel(Coupon.name) private couponModel: Model<CouponDocument>,
    private ordersService: OrdersService
  ) {}

  async create(createCouponDto: CreateCouponDto): Promise<Coupon> {
    const existingCoupon = await this.couponModel.findOne({ code: createCouponDto.code }).exec()
    if (existingCoupon) {
      throw new ConflictException(`Coupon với code ${createCouponDto.code} đã tồn tại`)
    }

    const newCoupon = new this.couponModel({
      _id: new Types.ObjectId(),
      ...createCouponDto,
      usageCount: 0,
      appliedOrderIds: []
    })

    return newCoupon.save()
  }

  async findAll(qs: PaginationQueryDto & DateRangeQueryDto & CouponQueryDto) {
    const { page, limit, from, to, code, isActive, discountAmount, minUsageCount, maxUsageCount, appliedOrderId } = qs

    const filter: any = {}

    // Handle code filter with case-insensitive search
    if (code) {
      filter.code = { $regex: code, $options: 'i' }
    }

    // Handle isActive filter
    if (isActive !== undefined) {
      filter.isActive = isActive
    }

    // Handle discountAmount filter
    if (discountAmount) {
      filter.discountAmount = discountAmount
    }

    // Handle usageCount range filters
    if (minUsageCount !== undefined || maxUsageCount !== undefined) {
      filter.usageCount = {}
      if (minUsageCount !== undefined) filter.usageCount.$gte = minUsageCount
      if (maxUsageCount !== undefined) filter.usageCount.$lte = maxUsageCount
    }

    // Handle appliedOrderId filter
    if (appliedOrderId) {
      filter.appliedOrderIds = new Types.ObjectId(appliedOrderId)
    }

    // Handle creation date range
    if (from || to) {
      filter.createdAt = {}
      if (from) filter.createdAt.$gte = from
      if (to) filter.createdAt.$lt = to
    }

    const sort = { createdAt: -1 }
    const query = this.couponModel.find(filter).sort(sort as any)

    // Handle pagination
    if (limit && page) {
      query.skip((page - 1) * limit).limit(limit)
    }

    const [data, totalDocuments] = await Promise.all([query.exec(), this.couponModel.countDocuments(filter)])

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

  async findById(id: string): Promise<Coupon> {
    try {
      const coupon = await this.couponModel.findById(id).exec()
      if (!coupon) {
        throw new NotFoundException(`Không tìm thấy coupon`)
      }
      return coupon
    } catch (error) {
      if (error instanceof NotFoundException) throw error
      throw new BadRequestException(`Invalid ID format: ${id}`)
    }
  }

  async findByCode(code: string): Promise<Coupon> {
    const coupon = await this.couponModel.findOne({ code: code.toUpperCase() }).exec()
    if (!coupon) {
      throw new NotFoundException(`Coupon with code ${code} not found`)
    }
    return coupon
  }

  async update(id: string, updateCouponDto: UpdateCouponDto): Promise<Coupon> {
    const coupon = await this.findById(id)

    // Prevent reducing maxUsage below current usageCount
    if (updateCouponDto.maxUsage !== undefined && updateCouponDto.maxUsage < coupon.usageCount) {
      throw new BadRequestException(
        `Cannot set maxUsage (${updateCouponDto.maxUsage}) below current usageCount (${coupon.usageCount})`
      )
    }

    const updatedCoupon = await this.couponModel.findByIdAndUpdate(id, updateCouponDto, { new: true }).exec()

    return updatedCoupon
  }

  async remove(id: string): Promise<Coupon> {
    const deletedCoupon = await this.couponModel.findByIdAndDelete(id).exec()
    if (!deletedCoupon) {
      throw new NotFoundException(`Coupon with ID ${id} not found`)
    }
    return deletedCoupon
  }

  async applyCoupon(couponId: string, orderId: string): Promise<Coupon> {
    const coupon = await this.findById(couponId)

    // Check if coupon is valid
    if (!coupon.isActive) {
      throw new BadRequestException('This coupon is not active')
    }

    if (coupon.usageCount >= coupon.maxUsage) {
      throw new BadRequestException('This coupon has reached its maximum usage limit')
    }

    // Check if order exists
    const order = await this.ordersService.findOrderDoc(orderId)

    // Check if coupon is applicable to this order
    if (coupon.discountAmount > order.totalPrice) {
      throw new BadRequestException('Coupon discount amount exceeds the order total price')
    }

    // Check if coupon already applied to this order
    if (coupon.appliedOrderIds.some((id) => id.toString() === orderId)) {
      throw new BadRequestException('This coupon has already been applied to this order')
    }

    // Add order to appliedOrderIds and increment usageCount
    const updatedCoupon = await this.couponModel
      .findByIdAndUpdate(
        couponId,
        {
          $push: { appliedOrderIds: new Types.ObjectId(orderId) },
          $inc: { usageCount: 1 }
        },
        { new: true }
      )
      .exec()

    return updatedCoupon
  }

  async validateCoupon(code: string, totalAmount: number): Promise<any> {
    try {
      const coupon = await this.findByCode(code)

      // Check if coupon is active
      if (!coupon.isActive) {
        return {
          valid: false,
          message: 'Mã giảm giá này không còn hiệu lực'
        }
      }

      // Check if coupon has remaining uses
      if (coupon.usageCount >= coupon.maxUsage) {
        return {
          valid: false,
          message: 'Mã giảm giá này đã vượt giới hạn sử dụng'
        }
      }

      // Check if discount amount is applicable
      if (coupon.discountAmount > totalAmount) {
        return {
          valid: false,
          message: 'Mã giảm giá này đã vượt quá tổng giá trị đơn hàng'
        }
      }

      return {
        valid: true,
        coupon: {
          id: coupon._id,
          code: coupon.code,
          discountAmount: coupon.discountAmount,
          remainingUsage: coupon.remainingUsage
        }
      }
    } catch (error) {
      if (error instanceof NotFoundException) {
        return { valid: false, message: 'Mã giảm giá không chính xác' }
      }
      throw error
    }
  }
}
