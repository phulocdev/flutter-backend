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
exports.AccountQueryDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../../core/constants/enum");
class AccountQueryDto {
}
exports.AccountQueryDto = AccountQueryDto;
__decorate([
    (0, class_validator_1.IsString)({ message: 'sort phải là định dạng chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AccountQueryDto.prototype, "sort", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'email phải là định dạng chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AccountQueryDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'fullName phải là định dạng chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AccountQueryDto.prototype, "fullName", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'phoneNumber phải là định dạng chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AccountQueryDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: 'isActive phải là 0 || 1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], AccountQueryDto.prototype, "isActive", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: 'address phải là định dạng chuỗi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AccountQueryDto.prototype, "address", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.Role, { message: 'role phải là một trong các giá trị hợp lệ của Role' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], AccountQueryDto.prototype, "role", void 0);
//# sourceMappingURL=account-query.dto.js.map