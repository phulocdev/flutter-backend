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
exports.CreateProductDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const is_unique_array_decorator_1 = require("../../../core/decorators/is-unique-array.decorator");
const sku_dto_1 = require("./sku.dto");
class CreateProductDto {
}
exports.CreateProductDto = CreateProductDto;
__decorate([
    (0, class_validator_1.MaxLength)(200, { message: 'name không được vượt quá 200 kí tự' }),
    (0, class_validator_1.MinLength)(2, { message: 'name phải có ít nhất 2 kí tự' }),
    (0, class_validator_1.IsString)({ message: 'name phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'name không được bỏ trống' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    __metadata("design:type", String)
], CreateProductDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(1000, { message: 'description không được vượt quá 1000 kí tự' }),
    (0, class_validator_1.IsString)({ message: 'description phải là kiểu dữ liệu là string' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)({ message: 'category phải là định dạng ObjectId' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'category không được bỏ trống' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "category", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)({ message: 'brand phải là định dạng ObjectId' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'brand không được bỏ trống' }),
    __metadata("design:type", String)
], CreateProductDto.prototype, "brand", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: 'basePrice phải >= 1' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false }, { message: 'basePrice phải là định dạng số' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNotEmpty)({ message: 'basePrice không được bỏ trống' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "basePrice", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'imageUrl phải là kiểu dữ liệu là string' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateProductDto.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.Min)(0, { message: 'minStockLevel phải ≥ 0' }),
    (0, class_validator_1.IsInt)({ message: 'minStockLevel phải là số nguyên' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNotEmpty)({ message: 'minStockLevel không được bỏ trống' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "minStockLevel", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: 'maxStockLevel phải >= 1' }),
    (0, class_validator_1.IsInt)({ message: 'maxStockLevel phải là số nguyên' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNotEmpty)({ message: 'maxStockLevel không được bỏ trống' }),
    __metadata("design:type", Number)
], CreateProductDto.prototype, "maxStockLevel", void 0);
__decorate([
    (0, is_unique_array_decorator_1.IsUniqueArray)('Mỗi phần tử trong attributeNames không được trùng lặp'),
    (0, class_validator_1.IsString)({
        each: true,
        message: `Mỗi phần tử trong attributeNames phải là dạng chuỗi`
    }),
    (0, class_validator_1.MinLength)(1, { each: true, message: 'Mỗi phần tử trong attributeNames phải có ít nhất 1 ký tự' }),
    (0, class_validator_1.MaxLength)(50, { each: true, message: 'Mỗi phần tử trong attributeNames không được vượt quá 50 ký tự' }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'attributeNames phải có ít nhất một phần tử' }),
    (0, class_validator_1.IsArray)({ message: 'attributeNames phải là định dạng mảng' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "attributeNames", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => sku_dto_1.SkuDto),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.IsArray)({ message: 'skus phải là định dạng mảng' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'skus không được bỏ trống' }),
    __metadata("design:type", Array)
], CreateProductDto.prototype, "skus", void 0);
//# sourceMappingURL=create-product.dto.js.map