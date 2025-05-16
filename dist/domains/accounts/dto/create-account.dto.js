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
exports.CreateAccountDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../../core/constants/enum");
class CreateAccountDto {
}
exports.CreateAccountDto = CreateAccountDto;
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: 'email không đúng định dạng' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'email không được  bỏ trống' }),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(40, { message: 'password không được vượt quá 40 kí tự' }),
    (0, class_validator_1.MinLength)(8, { message: 'password phải có ít nhất 8 kí tự' }),
    (0, class_validator_1.IsString)({ message: 'password phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'password không được bỏ trống' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(40, { message: 'fullname không được vượt quá 40 kí tự' }),
    (0, class_validator_1.MinLength)(1, { message: 'password phải có ít nhất 1 kí tự' }),
    (0, class_validator_1.IsString)({ message: 'fullname phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'fullname không được bỏ trống' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.MaxLength)(40, { message: 'address không được vượt quá 40 kí tự' }),
    (0, class_validator_1.IsString)({ message: 'address phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.MinLength)(1, { message: 'address phải có ít nhất 1 kí tự' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], CreateAccountDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.Matches)(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, { message: 'phoneNumber không đúng định dạng' }),
    (0, class_validator_1.IsString)({ message: 'phoneNumber phải là kiểu dữ liệu là string' }),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'imageUrl phải là kiểu dữ liệu là string' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => String(value).trim()),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "avatarUrl", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.Role, {
        message: `role phải là một trong những giá trị sau: ${enum_1.Role.Customer} || ${enum_1.Role.Admin}`
    }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateAccountDto.prototype, "role", void 0);
//# sourceMappingURL=create-account.dto.js.map