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
exports.OrderQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../../core/constants/enum");
class OrderQueryDto {
}
exports.OrderQueryDto = OrderQueryDto;
__decorate([
    (0, class_validator_1.MinLength)(5, { message: 'sort phải có ít nhất 5 ký tự' }),
    (0, class_validator_1.IsString)({ message: 'sort phải là chuỗi' }),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderQueryDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.MinLength)(1, { message: 'code phải có ít nhất 1 ký tự' }),
    (0, class_validator_1.IsString)({ message: 'code phải là chuỗi' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderQueryDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)({ message: 'userId phải là ObjectId' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderQueryDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.OrderStatus, {
        message: `status phải là một trong các giá trị sau: ${Object.values(enum_1.OrderStatus).join(' || ')}`
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderQueryDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.PaymentMethod, {
        message: `paymentMethod phải là một trong các giá trị sau: ${Object.values(enum_1.PaymentMethod).join(' || ')}`
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderQueryDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'minTotalPrice phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'minTotalPrice phải >= 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderQueryDto.prototype, "minTotalPrice", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'maxTotalPrice phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'maxTotalPrice phải >= 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderQueryDto.prototype, "maxTotalPrice", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'minItemCount phải là số' }),
    (0, class_validator_1.Min)(1, { message: 'minItemCount phải >= 1' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderQueryDto.prototype, "minItemCount", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'maxItemCount phải là số' }),
    (0, class_validator_1.Min)(1, { message: 'maxItemCount phải >= 1' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OrderQueryDto.prototype, "maxItemCount", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: 'fromDate phải là ngày' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrderQueryDto.prototype, "fromDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: 'toDate phải là ngày' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrderQueryDto.prototype, "toDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: 'paymentFromDate phải là ngày' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrderQueryDto.prototype, "paymentFromDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: 'paymentToDate phải là ngày' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrderQueryDto.prototype, "paymentToDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: 'deliveredFromDate phải là ngày' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrderQueryDto.prototype, "deliveredFromDate", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsDate)({ message: 'deliveredToDate phải là ngày' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], OrderQueryDto.prototype, "deliveredToDate", void 0);
//# sourceMappingURL=order-query.dto.js.map