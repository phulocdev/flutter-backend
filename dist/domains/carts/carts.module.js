"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartsModule = void 0;
const common_1 = require("@nestjs/common");
const carts_service_1 = require("./carts.service");
const carts_controller_1 = require("./carts.controller");
const mongoose_1 = require("@nestjs/mongoose");
const cart_schema_1 = require("../orders/schemas/cart.schema");
let CartsModule = exports.CartsModule = class CartsModule {
};
exports.CartsModule = CartsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: cart_schema_1.Cart.name, schema: cart_schema_1.CartSchema }])],
        controllers: [carts_controller_1.CartsController],
        providers: [carts_service_1.CartsService]
    })
], CartsModule);
//# sourceMappingURL=carts.module.js.map