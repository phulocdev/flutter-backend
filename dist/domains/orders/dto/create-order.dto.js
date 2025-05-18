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
exports.CreateOrderDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const enum_1 = require("../../../core/constants/enum");
const order_item_dto_1 = require("./order-item.dto");
const shipping_info_dto_1 = require("./shipping-info.dto");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_transformer_1.Type)(() => order_item_dto_1.OrderItemDto),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'items phải có ít nhất một phần tử' }),
    (0, class_validator_1.IsArray)({ message: 'items phải là định dạng mảng' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'items không được bỏ trống' }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "items", void 0);
__decorate([
    (0, class_validator_1.IsMongoId)({ message: 'userId phải là định dạng ObjectId' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: 'itemCount phải >= 1' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false }, { message: 'itemCount phải là định dạng số' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNotEmpty)({ message: 'itemCount không được bỏ trống' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "itemCount", void 0);
__decorate([
    (0, class_validator_1.Min)(1, { message: 'totalPrice phải >= 1' }),
    (0, class_validator_1.IsNumber)({ allowNaN: false }, { message: 'totalPrice phải là định dạng số' }),
    (0, class_transformer_1.Transform)(({ value }) => Number(value)),
    (0, class_validator_1.IsNotEmpty)({ message: 'totalPrice không được bỏ trống' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "totalPrice", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(enum_1.PaymentMethod, {
        message: `paymentMethod phải là một trong những giá trị sau: ${enum_1.paymentMethodOptions}`
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'paymentMethod không được bỏ trống' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "paymentMethod", void 0);
__decorate([
    (0, class_transformer_1.Type)(() => shipping_info_dto_1.ShippingInfoDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_validator_1.IsObject)({ message: 'shippingInfo phải là định dạng Object' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'shippingInfo không được bỏ trống' }),
    __metadata("design:type", shipping_info_dto_1.ShippingInfoDto)
], CreateOrderDto.prototype, "shippingInfo", void 0);
//# sourceMappingURL=create-order.dto.js.map