"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const coupon_schema_1 = require("./schemas/coupon.schema");
const orders_service_1 = require("../orders/orders.service");
let CouponsService = exports.CouponsService = class CouponsService {
    constructor(couponModel, ordersService) {
        this.couponModel = couponModel;
        this.ordersService = ordersService;
    }
    async create(createCouponDto) {
        const existingCoupon = await this.couponModel.findOne({ code: createCouponDto.code }).exec();
        if (existingCoupon) {
            throw new common_1.ConflictException(`Coupon với code ${createCouponDto.code} đã tồn tại`);
        }
        const newCoupon = new this.couponModel({
            _id: new mongoose_2.Types.ObjectId(),
            ...createCouponDto,
            usageCount: 0,
            appliedOrderIds: []
        });
        return newCoupon.save();
    }
    async findAll(qs) {
        const { page, limit, from, to, code, isActive, discountAmount, minUsageCount, maxUsageCount, appliedOrderId } = qs;
        const filter = {};
        if (code) {
            filter.code = { $regex: code, $options: 'i' };
        }
        if (isActive !== undefined) {
            filter.isActive = isActive;
        }
        if (discountAmount) {
            filter.discountAmount = discountAmount;
        }
        if (minUsageCount !== undefined || maxUsageCount !== undefined) {
            filter.usageCount = {};
            if (minUsageCount !== undefined)
                filter.usageCount.$gte = minUsageCount;
            if (maxUsageCount !== undefined)
                filter.usageCount.$lte = maxUsageCount;
        }
        if (appliedOrderId) {
            filter.appliedOrderIds = new mongoose_2.Types.ObjectId(appliedOrderId);
        }
        if (from || to) {
            filter.createdAt = {};
            if (from)
                filter.createdAt.$gte = from;
            if (to)
                filter.createdAt.$lt = to;
        }
        const sort = { createdAt: -1 };
        const query = this.couponModel.find(filter).sort(sort);
        if (limit && page) {
            query.skip((page - 1) * limit).limit(limit);
        }
        const [data, totalDocuments] = await Promise.all([query.exec(), this.couponModel.countDocuments(filter)]);
        return {
            data,
            meta: {
                page: page || 1,
                limit: limit || totalDocuments,
                totalPages: limit ? Math.ceil(totalDocuments / limit) : 1,
                totalDocuments
            }
        };
    }
    async findById(id) {
        try {
            const coupon = await this.couponModel.findById(id).exec();
            if (!coupon) {
                throw new common_1.NotFoundException(`Không tìm thấy coupon`);
            }
            return coupon;
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException)
                throw error;
            throw new common_1.BadRequestException(`Invalid ID format: ${id}`);
        }
    }
    async findByCode(code) {
        const coupon = await this.couponModel.findOne({ code: code.toUpperCase() }).exec();
        if (!coupon) {
            throw new common_1.NotFoundException(`Coupon with code ${code} not found`);
        }
        return coupon;
    }
    async update(id, updateCouponDto) {
        const coupon = await this.findById(id);
        if (updateCouponDto.maxUsage !== undefined && updateCouponDto.maxUsage < coupon.usageCount) {
            throw new common_1.BadRequestException(`Cannot set maxUsage (${updateCouponDto.maxUsage}) below current usageCount (${coupon.usageCount})`);
        }
        const updatedCoupon = await this.couponModel.findByIdAndUpdate(id, updateCouponDto, { new: true }).exec();
        return updatedCoupon;
    }
    async remove(id) {
        const deletedCoupon = await this.couponModel.findByIdAndDelete(id).exec();
        if (!deletedCoupon) {
            throw new common_1.NotFoundException(`Coupon with ID ${id} not found`);
        }
        return deletedCoupon;
    }
    async applyCoupon(couponId, orderId) {
        const coupon = await this.findById(couponId);
        if (!coupon.isActive) {
            throw new common_1.BadRequestException('This coupon is not active');
        }
        if (coupon.usageCount >= coupon.maxUsage) {
            throw new common_1.BadRequestException('This coupon has reached its maximum usage limit');
        }
        const order = await this.ordersService.findOrderDoc(orderId);
        if (coupon.discountAmount > order.totalPrice) {
            throw new common_1.BadRequestException('Coupon discount amount exceeds the order total price');
        }
        if (coupon.appliedOrderIds.some((id) => id.toString() === orderId)) {
            throw new common_1.BadRequestException('This coupon has already been applied to this order');
        }
        const updatedCoupon = await this.couponModel
            .findByIdAndUpdate(couponId, {
            $push: { appliedOrderIds: new mongoose_2.Types.ObjectId(orderId) },
            $inc: { usageCount: 1 }
        }, { new: true })
            .exec();
        return updatedCoupon;
    }
    async validateCoupon(code, totalAmount) {
        try {
            const coupon = await this.findByCode(code);
            if (!coupon.isActive) {
                return {
                    valid: false,
                    message: 'Mã giảm giá này không còn hiệu lực'
                };
            }
            if (coupon.usageCount >= coupon.maxUsage) {
                return {
                    valid: false,
                    message: 'Mã giảm giá này đã vượt giới hạn sử dụng'
                };
            }
            if (coupon.discountAmount > totalAmount) {
                return {
                    valid: false,
                    message: 'Mã giảm giá này đã vượt quá tổng giá trị đơn hàng'
                };
            }
            return {
                valid: true,
                coupon: {
                    id: coupon._id,
                    code: coupon.code,
                    discountAmount: coupon.discountAmount,
                    remainingUsage: coupon.remainingUsage
                }
            };
        }
        catch (error) {
            if (error instanceof common_1.NotFoundException) {
                return { valid: false, message: 'Mã giảm giá không chính xác' };
            }
            throw error;
        }
    }
};
exports.CouponsService = CouponsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(coupon_schema_1.Coupon.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        orders_service_1.OrdersService])
], CouponsService);
//# sourceMappingURL=coupons.service.js.map