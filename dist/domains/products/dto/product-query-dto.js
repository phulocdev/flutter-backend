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
exports.ProductQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../../core/constants/enum");
const is_unique_array_decorator_1 = require("../../../core/decorators/is-unique-array.decorator");
class ProductQueryDto {
}
exports.ProductQueryDto = ProductQueryDto;
__decorate([
    (0, class_validator_1.MinLength)(5, { message: 'sort phải có ít nhất 5 ký tự' }),
    (0, class_validator_1.IsString)({ message: 'sort phải là chuỗi' }),
    (0, class_transformer_1.Type)(() => String),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.MinLength)(1, { message: 'code phải có ít nhất 1 ký tự' }),
    (0, class_validator_1.IsString)({ message: 'code phải là chuỗi' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "code", void 0);
__decorate([
    (0, class_validator_1.MinLength)(1, { message: 'name phải có ít nhất 1 ký tự' }),
    (0, class_validator_1.IsString)({ message: 'name phải là chuỗi' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "name", void 0);
__decorate([
    (0, is_unique_array_decorator_1.IsUniqueArray)('Các phần tử trong categoryIds không được trùng lặp'),
    (0, class_validator_1.IsMongoId)({
        each: true,
        message: `Các phần tử trong categoryIds phải là ObjectId`
    }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'categoryIds phải có ít một phần tử' }),
    (0, class_transformer_1.Transform)(({ value }) => value.split(',').filter((v) => !!v && v.trim().length > 0)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProductQueryDto.prototype, "categoryIds", void 0);
__decorate([
    (0, is_unique_array_decorator_1.IsUniqueArray)('Các phần tử trong brandIds không được trùng lặp'),
    (0, class_validator_1.IsMongoId)({
        each: true,
        message: `Các phần tử trong brandIds phải là ObjectId`
    }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'brandIds phải có ít một phần tử' }),
    (0, class_transformer_1.Transform)(({ value }) => value.split(',').filter((v) => !!v && v.trim().length > 0)),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], ProductQueryDto.prototype, "brandIds", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "hasDiscount", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.ProductStatus, {
        message: `status phải là một trong các giá trị sau: ${Object.values(enum_1.ProductStatus).join(' || ')}`
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ProductQueryDto.prototype, "status", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'minPrice phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'minPrice phải >= 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "minPrice", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'minRating phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'minRating phải >= 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "minRating", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)({}, { message: 'maxPrice phải là số' }),
    (0, class_validator_1.Min)(0, { message: 'maxPrice phải >= 0' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], ProductQueryDto.prototype, "maxPrice", void 0);
//# sourceMappingURL=product-query-dto.js.map