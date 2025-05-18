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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto';
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto';
import { CouponQueryDto, CreateCouponDto, UpdateCouponDto } from 'domains/coupons/dto/create-coupon.dto';
import { CouponsService } from './coupons.service';
export declare class CouponsController {
    private readonly couponsService;
    constructor(couponsService: CouponsService);
    create(createCouponDto: CreateCouponDto): Promise<import("./schemas/coupon.schema").Coupon>;
    findAll(qs: PaginationQueryDto & DateRangeQueryDto & CouponQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/coupon.schema").CouponDocument> & import("./schemas/coupon.schema").Coupon & import("mongoose").Document<unknown, any, any> & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    findById(id: string): Promise<import("./schemas/coupon.schema").Coupon>;
    findByCode(code: string): Promise<import("./schemas/coupon.schema").Coupon>;
    update(id: string, updateCouponDto: UpdateCouponDto): Promise<import("./schemas/coupon.schema").Coupon>;
    remove(id: string): Promise<import("./schemas/coupon.schema").Coupon>;
    applyCoupon(id: string, orderId: string): Promise<import("./schemas/coupon.schema").Coupon>;
    validateCoupon(code: string, totalAmount: number): Promise<any>;
}
