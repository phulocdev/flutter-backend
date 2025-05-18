"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const enum_1 = require("../../core/constants/enum");
const errors_exception_1 = require("../../core/exceptions/errors.exception");
const utils_1 = require("../../core/utils/utils");
const order_item_schema_1 = require("./schemas/order-item.schema");
const order_schema_1 = require("./schemas/order.schema");
const products_service_1 = require("../products/products.service");
const mongoose_2 = __importStar(require("mongoose"));
let OrdersService = exports.OrdersService = class OrdersService {
    constructor(orderModel, orderItemModel, productsService) {
        this.orderModel = orderModel;
        this.orderItemModel = orderItemModel;
        this.productsService = productsService;
    }
    async create(createOrderDto) {
        if (!createOrderDto.userId) {
            throw new errors_exception_1.BadRequestError('Không thể tạo đơn hàng khi không có thông tin về KH');
        }
        const { items, userId } = createOrderDto;
        const orderId = new mongoose_2.default.Types.ObjectId();
        const orderCode = (0, utils_1.generateOrderCode)();
        const skusWithDecreaseQuantity = items.map(({ sku, quantity }) => ({
            sku,
            quantity
        }));
        const session = await this.orderModel.db.startSession();
        try {
            session.startTransaction();
            await this.orderItemModel.insertMany(items.map((orderItem) => ({ ...orderItem, order: orderId })), { session });
            const createdOrder = await this.orderModel.create([
                {
                    ...createOrderDto,
                    _id: orderId,
                    code: orderCode,
                    user: userId
                }
            ], { session });
            await session.commitTransaction();
            this.productsService.decreaseStockOnHand({ items: skusWithDecreaseQuantity });
            return createdOrder[0];
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async findAll(qs) {
        const { page, limit, from, to, sort: sortQuery } = qs;
        const filter = {};
        let sort = { createdAt: -1 };
        if (sortQuery) {
            const sortField = sortQuery.split('.')[0];
            const isDescending = sortQuery.split('.')[1] === 'desc';
            sort = isDescending ? { [sortField]: -1 } : { [sortField]: 1 };
        }
        if (from || to) {
            filter.createdAt = {};
            if (from)
                filter.createdAt.$gte = from;
            if (to)
                filter.createdAt.$lt = to;
        }
        const query = this.orderModel.find(filter).sort(sort);
        if (limit && page) {
            query.skip((page - 1) * limit).limit(limit);
        }
        const [data, totalDocuments] = await Promise.all([query, this.orderModel.countDocuments(filter)]);
        return {
            data,
            meta: {
                page: page || 1,
                limit: limit || totalDocuments,
                totalPages: limit ? Math.ceil(totalDocuments / limit) : 1,
                totalDocuments
            }
        };
    }
    async findAllByCustomer(qs, account) {
        const { page, limit } = qs;
        const filter = { user: account._id };
        const query = this.orderModel.find(filter).sort({ createdAt: -1 });
        if (limit && page) {
            query.skip((page - 1) * limit).limit(limit);
        }
        const [data, totalDocuments] = await Promise.all([query, this.orderModel.countDocuments(filter)]);
        return {
            data,
            meta: {
                page: page || 1,
                limit: limit || totalDocuments,
                totalPages: limit ? Math.ceil(totalDocuments / limit) : 1,
                totalDocuments
            }
        };
    }
    async findOne(id) {
        const orderItemList = await this.orderItemModel.find({ order: id }).lean(true);
        const skuIds = await orderItemList.map((orderItem) => orderItem.sku.toString());
        const skus = await this.productsService.findAllSkus(skuIds);
        const skuMap = new Map(skus.map((skuDocument) => [skuDocument._id.toString(), skuDocument]));
        const enrichedItems = orderItemList.map((orderItem) => {
            const skuInfo = skuMap.get(orderItem.sku.toString());
            return {
                ...orderItem,
                sku: skuInfo ?? null
            };
        });
        return enrichedItems;
    }
    async update(_id, updateOrderDto, account) {
        const order = await this.orderModel.findOne({ _id });
        if (!order) {
            throw new errors_exception_1.NotFoundError('Đơn hàng không tồn tại');
        }
        const currentStatus = order.status;
        const { status: nextStatus } = updateOrderDto;
        const now = new Date();
        if (nextStatus === enum_1.OrderStatus.DELIVERED) {
            updateOrderDto.deliveredAt = now;
        }
        else if (nextStatus === enum_1.OrderStatus.CANCELED) {
            updateOrderDto.cancelledAt = now;
        }
        else if (nextStatus === enum_1.OrderStatus.PAID) {
            updateOrderDto.paymentAt = now;
        }
        return this.orderModel.findOneAndUpdate({
            _id
        }, { ...updateOrderDto, updateBy: account._id }, {
            returnOriginal: false
        });
    }
    async remove(_id) {
        await this.orderModel.deleteOne({ _id });
        return { deleted: true };
    }
    async bulkRemove(ids) {
        await this.orderModel.deleteMany({ _id: { $in: ids } });
        return { deleted: true };
    }
};
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __param(1, (0, mongoose_1.InjectModel)(order_item_schema_1.OrderItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map