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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsController = void 0;
const cart_service_1 = require("./cart.service");
const common_1 = require("@nestjs/common");
const add_to_cart_dto_1 = require("./dto/add-to-cart.dto");
const account_decorator_1 = require("../../core/decorators/account.decorator");
const update_cart_item_dto_1 = require("./dto/update-cart-item.dto");
const delete_cart_items_dto_1 = require("./dto/delete-cart-items.dto");
let CartsController = exports.CartsController = class CartsController {
    constructor(cartService) {
        this.cartService = cartService;
    }
    addToCart(addToCartDto, account) {
        return this.cartService.addToCart(addToCartDto, account);
    }
    update(updateCartItemDto, account) {
        return this.cartService.updateCartItem(updateCartItemDto, account);
    }
    findCart(account) {
        return this.cartService.findCart(account);
    }
    remove(deleteCartItemsDto, account) {
        return this.cartService.removeCartItem(deleteCartItemsDto, account);
    }
};
__decorate([
    (0, common_1.Post)('items'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, account_decorator_1.Account)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [add_to_cart_dto_1.AddToCartDto, Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "addToCart", null);
__decorate([
    (0, common_1.Patch)('items'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, account_decorator_1.Account)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_cart_item_dto_1.UpdateCartItemDto, Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, account_decorator_1.Account)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "findCart", null);
__decorate([
    (0, common_1.Delete)('items'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, account_decorator_1.Account)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [delete_cart_items_dto_1.DeleteCartItemsDto, Object]),
    __metadata("design:returntype", void 0)
], CartsController.prototype, "remove", null);
exports.CartsController = CartsController = __decorate([
    (0, common_1.Controller)('cart'),
    __metadata("design:paramtypes", [cart_service_1.CartService])
], CartsController);
//# sourceMappingURL=cart.controller.js.map