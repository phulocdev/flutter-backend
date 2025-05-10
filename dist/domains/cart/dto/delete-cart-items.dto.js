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
exports.DeleteCartItemsDto = void 0;
const class_validator_1 = require("class-validator");
const is_unique_array_decorator_1 = require("../../../core/decorators/is-unique-array.decorator");
class DeleteCartItemsDto {
}
exports.DeleteCartItemsDto = DeleteCartItemsDto;
__decorate([
    (0, is_unique_array_decorator_1.IsUniqueArray)('Các phần tử trong skuIds không được trùng lặp'),
    (0, class_validator_1.IsMongoId)({
        each: true,
        message: `Các phần tử trong skuIds phải là ObjectId`
    }),
    (0, class_validator_1.ArrayMinSize)(1, { message: 'skuIds phải có ít một phần tử' }),
    __metadata("design:type", Array)
], DeleteCartItemsDto.prototype, "skuIds", void 0);
//# sourceMappingURL=delete-cart-items.dto.js.map