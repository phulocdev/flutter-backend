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
exports.OrdersController = void 0;
const common_1 = require("@nestjs/common");
const orders_service_1 = require("./orders.service");
const create_order_dto_1 = require("./dto/create-order.dto");
const update_order_dto_1 = require("./dto/update-order.dto");
const response_message_decorator_1 = require("../../core/decorators/response-message.decorator");
const account_decorator_1 = require("../../core/decorators/account.decorator");
const pagination_query_dto_1 = require("../../core/query-string-dtos/pagination-query.dto");
const validate_date_range_pipe_1 = require("../../core/pipes/validate-date-range.pipe");
const date_range_query_dto_1 = require("../../core/query-string-dtos/date-range-query.dto");
const order_query_dto_1 = require("./dto/order-query.dto");
const validate_mongo_id_pipe_1 = require("../../core/pipes/validate-mongo-id.pipe");
const bulk_delete_order_dto_1 = require("./dto/bulk-delete-order.dto");
const public_decorator_1 = require("../../core/decorators/public.decorator");
let OrdersController = exports.OrdersController = class OrdersController {
    constructor(ordersService) {
        this.ordersService = ordersService;
    }
    create(createOrderDto) {
        return this.ordersService.create(createOrderDto);
    }
    findAll(paginationQuery, dateRangeQuery, orderQuery) {
        return this.ordersService.findAll({ ...paginationQuery, ...dateRangeQuery, ...orderQuery });
    }
    findAllByCustomer(paginationQuery = {}, account) {
        return this.ordersService.findAllByCustomer({ ...paginationQuery }, account);
    }
    update(id, updateOrderDto, account) {
        return this.ordersService.update(id, updateOrderDto, account);
    }
    bulkRemove(bulkDeleteOrderDto) {
        return this.ordersService.bulkRemove(bulkDeleteOrderDto.ids);
    }
    remove(id) {
        return this.ordersService.remove(id);
    }
};
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Post)(),
    (0, response_message_decorator_1.ResponseMessage)('Tạo mới đơn hàng thành công'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_order_dto_1.CreateOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, response_message_decorator_1.ResponseMessage)('Fetch danh sách đơn hàng thành công'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)(validate_date_range_pipe_1.ValidateDateRange)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto,
        date_range_query_dto_1.DateRangeQueryDto,
        order_query_dto_1.OrderQueryDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('customer'),
    (0, response_message_decorator_1.ResponseMessage)('Fetch danh sách đơn hàng thành công'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, account_decorator_1.Account)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "findAllByCustomer", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, response_message_decorator_1.ResponseMessage)('Cập nhật đơn hàng thành công'),
    __param(0, (0, common_1.Param)('id', validate_mongo_id_pipe_1.ValidateMongoIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, account_decorator_1.Account)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_order_dto_1.UpdateOrderDto, Object]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('bulk-delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bulk_delete_order_dto_1.BulkDeleteOrderDto]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "bulkRemove", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', validate_mongo_id_pipe_1.ValidateMongoIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], OrdersController.prototype, "remove", null);
exports.OrdersController = OrdersController = __decorate([
    (0, common_1.Controller)('orders'),
    __metadata("design:paramtypes", [orders_service_1.OrdersService])
], OrdersController);
//# sourceMappingURL=orders.controller.js.map