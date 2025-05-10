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
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const cart_schema_1 = require("./schemas/cart.schema");
const products_service_1 = require("../products/products.service");
const mongoose_2 = require("mongoose");
let CartService = exports.CartService = class CartService {
    constructor(cartModel, productsService) {
        this.cartModel = cartModel;
        this.productsService = productsService;
    }
    create(account) {
        return this.cartModel.create({ account: account._id, items: [] });
    }
    async addToCart(addToCartDto, account) {
        const { skuId, quantity } = addToCartDto;
        const skuDocument = await this.productsService.findOneSku(skuId);
        const adjustedQuantity = Math.min(quantity, skuDocument.stockOnHand);
        const cart = await this.cartModel.findOne({ account: account._id });
        const existingSkuInCart = cart?.items?.find((item) => item.sku.toString() === skuId);
        if (existingSkuInCart) {
            const prevQuantity = existingSkuInCart.quantity;
            const newQuantity = prevQuantity + quantity;
            const adjustedQuantity = Math.min(newQuantity, skuDocument.stockOnHand);
            return this.cartModel.updateOne({ account: account._id, 'items.sku': skuId }, { $set: { 'items.$.quantity': adjustedQuantity } });
        }
        return this.cartModel.updateOne({ account: account._id }, {
            $push: {
                items: {
                    sku: skuId,
                    quantity: adjustedQuantity
                }
            }
        });
    }
    async updateCartItem(updateCartItemDto, account) {
        const { skuId, quantity } = updateCartItemDto;
        const skuDocument = await this.productsService.findOneSku(skuId);
        const adjustedQuantity = Math.min(quantity, skuDocument.stockOnHand);
        return this.cartModel.updateOne({ account: account._id, 'items.sku': skuId }, { $set: { 'items.$.quantity': adjustedQuantity } });
    }
    async findCart(account) {
        const cart = await this.cartModel.findOne({ account: account._id }).lean();
        if (!cart)
            return [];
        const skuIds = cart.items.map((item) => item.sku.toString());
        const skus = await this.productsService.findAllSkus(skuIds);
        const skuMap = new Map(skus.map((skuDocument) => [skuDocument._id, skuDocument]));
        const enrichedItems = cart.items.map((cartItem) => {
            const skuInfo = skuMap.get(cartItem.sku.toString());
            return {
                ...cartItem,
                sku: skuInfo ?? null
            };
        });
        return enrichedItems;
    }
    removeCartItem(deleteCartItemsDto, account) {
        const { skuIds } = deleteCartItemsDto;
        return this.cartModel.updateOne({
            account: account._id
        }, {
            $pull: {
                items: { sku: { $in: skuIds } }
            }
        });
    }
};
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        products_service_1.ProductsService])
], CartService);
//# sourceMappingURL=cart.service.js.map