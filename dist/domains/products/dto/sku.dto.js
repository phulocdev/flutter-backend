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
exports.SkuDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_unique_array_decorator_1 = require("../../../core/decorators/is-unique-array.decorator");
class SkuDto {
}
exports.SkuDto = SkuDto;
__decorate([
    (0, class_validator_1.Min)(0, { message: 'skus[index].costPrice phải ≥ 0' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false }, { message: 'skus[index].costPrice phải là định dạng số' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNotEmpty)({ message: 'skus[index].costPrice không được bỏ trống' }),
    __metadata("design:type", Number)
], SkuDto.prototype, "costPrice", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: 'skus[index].sellingPrice phải >= 1' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false }, { message: 'skus[index].sellingPrice phải là định dạng số' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNotEmpty)({ message: 'skus[index].sellingPrice không được bỏ trống' }),
    __metadata("design:type", Number)
], SkuDto.prototype, "sellingPrice", void 0);
__decorate([
    (0, class_validator_1.Min)(-1, { message: 'skus[index].stockOnHand phải >= 0' }),
    (0, class_validator_1.IsInt)({ message: 'skus[index].stockOnHand phải là số nguyên' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNotEmpty)({ message: 'skus[index].stockOnHand không được bỏ trống' }),
    __metadata("design:type", Number)
], SkuDto.prototype, "stockOnHand", void 0);
__decorate([
    (0, is_unique_array_decorator_1.IsUniqueArray)('Mỗi phần tử trong skus[index].attributeValues không được trùng lặp'),
    (0, class_validator_1.IsString)({
        each: true,
        message: `Mỗi phần tử trong skus[index].attributeValues phải là dạng chuỗi`
    }),
    (0, class_validator_1.MaxLength)(100, { each: true, message: 'Không được vượt quá 100 ký tự' }),
    (0, class_validator_1.MinLength)(1, { each: true, message: 'Từng attribute phải có ít nhất 1 ký tự' }),
    (0, class_validator_1.IsArray)({ message: 'skus[index].attributeValues phải là định dạng mảng' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'skus[index].attributeValues không được bỏ trống' }),
    __metadata("design:type", Array)
], SkuDto.prototype, "attributeValues", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'sku[index].imageUrl phải là kiểu dữ liệu là string' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], SkuDto.prototype, "imageUrl", void 0);
//# sourceMappingURL=sku.dto.js.map