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
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const errors_exception_1 = require("../../core/exceptions/errors.exception");
const accounts_service_1 = require("../accounts/accounts.service");
const orders_service_1 = require("../orders/orders.service");
const products_service_1 = require("../products/products.service");
let DashboardService = exports.DashboardService = class DashboardService {
    constructor(productsService, accountsService, ordersService) {
        this.productsService = productsService;
        this.accountsService = accountsService;
        this.ordersService = ordersService;
    }
    async statistic(from, to) {
        if (!from || !to)
            throw new errors_exception_1.BadRequestError('from to required');
        const [accountCounts, productCounts, orderCounts, orderTodayCounts, invest] = await Promise.all([
            this.accountsService.countDocs(),
            this.productsService.countDocs(),
            this.ordersService.countDocs(),
            this.ordersService.countDocsToday(),
            this.ordersService.calculateInvest(from, to)
        ]);
        return {
            accountCounts,
            productCounts,
            orderCounts,
            orderTodayCounts,
            invest
        };
    }
};
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        accounts_service_1.AccountsService,
        orders_service_1.OrdersService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map