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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponQueryDto = exports.UpdateCouponDto = exports.CreateCouponDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
var DiscountAmount;
(function (DiscountAmount) {
    DiscountAmount[DiscountAmount["TEN_THOUSAND"] = 10000] = "TEN_THOUSAND";
    DiscountAmount[DiscountAmount["TWENTY_THOUSAND"] = 20000] = "TWENTY_THOUSAND";
    DiscountAmount[DiscountAmount["FIFTY_THOUSAND"] = 50000] = "FIFTY_THOUSAND";
    DiscountAmount[DiscountAmount["ONE_HUNDRED_THOUSAND"] = 100000] = "ONE_HUNDRED_THOUSAND";
})(DiscountAmount || (DiscountAmount = {}));
class CreateCouponDto {
}
exports.CreateCouponDto = CreateCouponDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Coupon code phải là chuỗi' }),
    (0, class_validator_1.MinLength)(5, { message: 'Coupon code phải có đúng 5 ký tự' }),
    (0, class_validator_1.MaxLength)(5, { message: 'Coupon code phải có đúng 5 ký tự' }),
    (0, class_validator_1.Matches)(/^[A-Za-z0-9]{5}$/, {
        message: 'Coupon code chỉ được chứa 5 ký tự chữ hoặc số'
    }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).toUpperCase()),
    __metadata("design:type", String)
], CreateCouponDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(DiscountAmount, {
        message: `Discount amount phải là một trong các giá trị sau: 10000, 20000, 50000, 100000 VND`
    }),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "discountAmount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'maxUsage phải là số' }),
    (0, class_validator_1.Min)(1, { message: 'maxUsage phải >= 1' }),
    (0, class_validator_1.Max)(10, { message: 'maxUsage phải <= 10' }),
    __metadata("design:type", Number)
], CreateCouponDto.prototype, "maxUsage", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'isActive phải là boolean' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateCouponDto.prototype, "isActive", void 0);
class UpdateCouponDto {
}
exports.UpdateCouponDto = UpdateCouponDto;
__decorate([
    (0, class_validator_1.IsEnum)(DiscountAmount, {
        message: `Discount amount phải là một trong các giá trị sau: 10000, 20000, 50000, 100000 VND`
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCouponDto.prototype, "discountAmount", void 0);
__decorate([
    (0, class_validator_1.IsNumber)({}, { message: 'maxUsage phải là số' }),
    (0, class_validator_1.Min)(1, { message: 'maxUsage phải >= 1' }),
    (0, class_validator_1.Max)(10, { message: 'maxUsage phải <= 10' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateCouponDto.prototype, "maxUsage", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)({ message: 'isActive phải là boolean' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], UpdateCouponDto.prototype, "isActive", void 0);
class CouponQueryDto {
}
exports.CouponQueryDto = CouponQueryDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'Code phải là chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CouponQueryDto.prototype, "code", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Boolean),
    (0, class_validator_1.IsBoolean)({ message: 'isActive phải là boolean' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CouponQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsEnum)(DiscountAmount, {
        message: `discountAmount phải là một trong các giá trị sau: 10000, 20000, 50000, 100000 VND`
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CouponQueryDto.prototype, "discountAmount", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'minUsageCount phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'minUsageCount phải >= 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CouponQueryDto.prototype, "minUsageCount", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'maxUsageCount phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'maxUsageCount phải >= 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CouponQueryDto.prototype, "maxUsageCount", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)({ message: 'appliedOrderId phải là ObjectId' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CouponQueryDto.prototype, "appliedOrderId", void 0);
//# sourceMappingURL=create-coupon.dto.js.map