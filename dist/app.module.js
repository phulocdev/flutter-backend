"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const auth_module_1 = require("./domains/auth/auth.module");
const cloudinary_module_1 = require("./domains/cloudinary/cloudinary.module");
const orders_module_1 = require("./domains/orders/orders.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const core_module_1 = require("./core/core.module");
const accounts_module_1 = require("./domains/accounts/accounts.module");
const brands_module_1 = require("./domains/brands/brands.module");
const cart_module_1 = require("./domains/cart/cart.module");
const categories_module_1 = require("./domains/categories/categories.module");
const mail_module_1 = require("./domains/mail/mail.module");
const media_module_1 = require("./domains/media/media.module");
const products_module_1 = require("./domains/products/products.module");
const otps_module_1 = require("./domains/otps/otps.module");
const comments_module_1 = require("./domains/comments/comments.module");
const coupons_module_1 = require("./domains/coupons/coupons.module");
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            core_module_1.CoreModule,
            auth_module_1.AuthModule,
            otps_module_1.OtpsModule,
            accounts_module_1.AccountsModule,
            media_module_1.MediaModule,
            orders_module_1.OrdersModule,
            products_module_1.ProductsModule,
            categories_module_1.CategoriesModule,
            cloudinary_module_1.CloudinaryModule,
            brands_module_1.BrandsModule,
            cart_module_1.CartModule,
            mail_module_1.MailModule,
            comments_module_1.CommentsModule,
            coupons_module_1.CouponsModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService]
    })
], AppModule);
//# sourceMappingURL=app.module.js.map