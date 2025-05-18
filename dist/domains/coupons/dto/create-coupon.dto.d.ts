declare enum DiscountAmount {
    TEN_THOUSAND = 10000,
    TWENTY_THOUSAND = 20000,
    FIFTY_THOUSAND = 50000,
    ONE_HUNDRED_THOUSAND = 100000
}
export declare class CreateCouponDto {
    code: string;
    discountAmount: DiscountAmount;
    maxUsage: number;
    isActive?: boolean;
}
export declare class UpdateCouponDto {
    discountAmount?: DiscountAmount;
    maxUsage?: number;
    isActive?: boolean;
}
export declare class CouponQueryDto {
    code?: string;
    isActive?: boolean;
    discountAmount?: DiscountAmount;
    minUsageCount?: number;
    maxUsageCount?: number;
    appliedOrderId?: string;
}
export {};
