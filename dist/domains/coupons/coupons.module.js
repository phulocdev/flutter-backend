"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponsModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const coupons_controller_1 = require("./coupons.controller");
const coupons_service_1 = require("./coupons.service");
const coupon_schema_1 = require("./schemas/coupon.schema");
const orders_module_1 = require("../orders/orders.module");
let CouponsModule = exports.CouponsModule = class CouponsModule {
};
exports.CouponsModule = CouponsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: coupon_schema_1.Coupon.name, schema: coupon_schema_1.CouponSchema }]), orders_module_1.OrdersModule],
        controllers: [coupons_controller_1.CouponsController],
        providers: [coupons_service_1.CouponsService],
        exports: [coupons_service_1.CouponsService]
    })
], CouponsModule);
//# sourceMappingURL=coupons.module.js.map