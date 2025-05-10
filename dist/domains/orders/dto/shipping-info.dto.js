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
exports.ShippingInfoDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ShippingInfoDto {
}
exports.ShippingInfoDto = ShippingInfoDto;
__decorate([
    (0, class_validator_1.MaxLength)(100, { message: 'name không được vượt quá 100 kí tự' }),
    (0, class_validator_1.MinLength)(2, { message: 'name phải có ít nhất 2 kí tự' }),
    (0, class_validator_1.IsString)({ message: 'name phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'name không được bỏ trống' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    __metadata("design:type", String)
], ShippingInfoDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'email không đúng định dạng' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'email không được  bỏ trống' }),
    __metadata("design:type", String)
], ShippingInfoDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.Matches)(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'phoneNumber không đúng định dạng' }),
    (0, class_validator_1.IsString)({ message: 'phoneNumber phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'phoneNumber không được bỏ trống' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    __metadata("design:type", String)
], ShippingInfoDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(60, { message: 'province không được vượt quá 60 kí tự' }),
    (0, class_validator_1.MinLength)(2, { message: 'province phải có ít nhất 2 kí tự' }),
    (0, class_validator_1.IsString)({ message: 'province phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'province không được bỏ trống' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    __metadata("design:type", String)
], ShippingInfoDto.prototype, "province", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(60, { message: 'district không được vượt quá 60 kí tự' }),
    (0, class_validator_1.MinLength)(2, { message: 'district phải có ít nhất 2 kí tự' }),
    (0, class_validator_1.IsString)({ message: 'district phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'district không được bỏ trống' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    __metadata("design:type", String)
], ShippingInfoDto.prototype, "district", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(60, { message: 'ward không được vượt quá 60 kí tự' }),
    (0, class_validator_1.MinLength)(2, { message: 'ward phải có ít nhất 2 kí tự' }),
    (0, class_validator_1.IsString)({ message: 'ward phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'ward không được bỏ trống' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    __metadata("design:type", String)
], ShippingInfoDto.prototype, "ward", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(100, { message: 'detailedAddress không được vượt quá 100 kí tự' }),
    (0, class_validator_1.MinLength)(2, { message: 'detailedAddress phải có ít nhất 2 kí tự' }),
    (0, class_validator_1.IsString)({ message: 'detailedAddress phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'detailedAddress không được bỏ trống' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    __metadata("design:type", String)
], ShippingInfoDto.prototype, "detailedAddress", void 0);
//# sourceMappingURL=shipping-info.dto.js.map