/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { Model, Types } from 'mongoose';
import { Coupon, CouponDocument } from './schemas/coupon.schema';
import { OrdersService } from '../orders/orders.service';
import { CouponQueryDto, CreateCouponDto, UpdateCouponDto } from 'domains/coupons/dto/create-coupon.dto';
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto';
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto';
export declare class CouponsService {
    private couponModel;
    private ordersService;
    constructor(couponModel: Model<CouponDocument>, ordersService: OrdersService);
    create(createCouponDto: CreateCouponDto): Promise<Coupon>;
    findAll(qs: PaginationQueryDto & DateRangeQueryDto & CouponQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, CouponDocument> & Coupon & import("mongoose").Document<unknown, any, any> & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            totalPages: number;
            totalDocuments: number;
        };
    }>;
    findById(id: string): Promise<Coupon>;
    findByCode(code: string): Promise<Coupon>;
    update(id: string, updateCouponDto: UpdateCouponDto): Promise<Coupon>;
    remove(id: string): Promise<Coupon>;
    applyCoupon(couponId: string, orderId: string): Promise<Coupon>;
    validateCoupon(code: string, totalAmount: number): Promise<any>;
}
