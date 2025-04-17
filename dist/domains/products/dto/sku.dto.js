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
    (0, class_validator_1.Min)(1, { message: 'skus[index].price phải > 0' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false }, { message: 'skus[index].price phải là định dạng số' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNotEmpty)({ message: 'skus[index].price không được bỏ trống' }),
    __metadata("design:type", Number)
], SkuDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: 'skus[index].stockQuantity phải > 0' }),
    (0, class_validator_1.IsInt)({ message: 'skus[index].stockQuantity phải là định dạng số nguyên' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNotEmpty)({ message: 'skus[index].stockQuantity không được bỏ trống' }),
    __metadata("design:type", Number)
], SkuDto.prototype, "stockQuantity", void 0);
__decorate([
    (0, is_unique_array_decorator_1.IsUniqueArray)('Mỗi phần tử trong attributeValues không được trùng lặp'),
    (0, class_validator_1.IsString)({
        each: true,
        message: `Mỗi phần tử trong attributeValues phải là dạng chuỗi`
    }),
    (0, class_validator_1.MinLength)(3, { each: true, message: 'Mỗi phần tử trong skus[index].attributeValues phải có ít nhất 3 ký tự' }),
    (0, class_validator_1.MaxLength)(20, { each: true, message: 'Mỗi phần tử trong skus[index].attributeValues không được vượt quá 20 ký tự' }),
    (0, class_validator_1.IsArray)({ message: 'skus[index].attributeValues phải là định dạng mảng' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'skus[index].attributeValues không được bỏ trống' }),
    __metadata("design:type", Array)
], SkuDto.prototype, "attributeValues", void 0);
__decorate([
    (0, is_unique_array_decorator_1.IsUniqueArray)('Các phần tử trong images không được trùng lặp'),
    (0, class_validator_1.IsString)({
        each: true,
        message: `skus[index].Các phần tử trong images phải là dạng chuỗi`
    }),
    (0, class_validator_1.IsArray)({ message: 'skus[index].images phải là định dạng mảng' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], SkuDto.prototype, "images", void 0);
//# sourceMappingURL=sku.dto.js.map