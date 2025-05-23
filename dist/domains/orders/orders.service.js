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
const mail_service_1 = require("../mail/mail.service");
const order_item_schema_1 = require("./schemas/order-item.schema");
const order_schema_1 = require("./schemas/order.schema");
const products_service_1 = require("../products/products.service");
const mongoose_2 = __importStar(require("mongoose"));
let OrdersService = exports.OrdersService = class OrdersService {
    constructor(orderModel, orderItemModel, mailService, productsService) {
        this.orderModel = orderModel;
        this.orderItemModel = orderItemModel;
        this.mailService = mailService;
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
        const productsWithDecreaseQuantity = items.map(({ productId, quantity }) => ({
            productId,
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
            this.productsService.increaseSoldQuantity(productsWithDecreaseQuantity);
            this.mailService.sendOrderConfirmation(createdOrder[0]);
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
    countDocs() {
        return this.orderModel.countDocuments();
    }
    async countDocsToday() {
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);
        return this.orderModel.countDocuments({
            createdAt: { $gte: startOfDay, $lt: endOfDay }
        });
    }
    async calculateInvest(from, to) {
        if (!from || !to)
            return 0;
        const result = await this.orderModel.aggregate([
            {
                $match: {
                    createdAt: { $gte: from, $lt: to }
                }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: '$totalPrice' }
                }
            }
        ]);
        return result[0]?.total || 0;
    }
    async findAll(qs) {
        const { page, limit, from, to, sort: sortQuery, code, userId, status, paymentMethod, minTotalPrice, maxTotalPrice, minItemCount, maxItemCount, paymentFromDate, paymentToDate, deliveredFromDate, deliveredToDate } = qs;
        const filter = {};
        if (userId) {
            filter.user = new mongoose_2.Types.ObjectId(userId);
        }
        if (code) {
            filter.code = { $regex: code, $options: 'i' };
        }
        if (status !== undefined) {
            filter.status = status;
        }
        if (paymentMethod) {
            filter.paymentMethod = paymentMethod;
        }
        if (minTotalPrice !== undefined || maxTotalPrice !== undefined) {
            filter.totalPrice = {};
            if (minTotalPrice !== undefined)
                filter.totalPrice.$gte = minTotalPrice;
            if (maxTotalPrice !== undefined)
                filter.totalPrice.$lte = maxTotalPrice;
        }
        if (minItemCount !== undefined || maxItemCount !== undefined) {
            filter.itemCount = {};
            if (minItemCount !== undefined)
                filter.itemCount.$gte = minItemCount;
            if (maxItemCount !== undefined)
                filter.itemCount.$lte = maxItemCount;
        }
        if (from || to) {
            filter.createdAt = {};
            if (from)
                filter.createdAt.$gte = from;
            if (to)
                filter.createdAt.$lt = to;
        }
        if (paymentFromDate || paymentToDate) {
            filter.paymentAt = {};
            if (paymentFromDate)
                filter.paymentAt.$gte = paymentFromDate;
            if (paymentToDate)
                filter.paymentAt.$lt = paymentToDate;
        }
        if (deliveredFromDate || deliveredToDate) {
            filter.deliveredAt = {};
            if (deliveredFromDate)
                filter.deliveredAt.$gte = deliveredFromDate;
            if (deliveredToDate)
                filter.deliveredAt.$lt = deliveredToDate;
        }
        let sort = { createdAt: -1 };
        if (sortQuery) {
            const sortField = sortQuery.split('.')[0];
            const isDescending = sortQuery.split('.')[1] === 'desc';
            sort = isDescending ? { [sortField]: -1 } : { [sortField]: 1 };
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
    async findOrderDoc(id) {
        return this.orderModel.findOne({ _id: id });
    }
    async findOne(id) {
        const orderItemList = await this.orderItemModel.find({ order: new mongoose_2.Types.ObjectId(id) }).lean(true);
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
        else if (nextStatus === enum_1.OrderStatus.COMPLETED) {
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
        mail_service_1.MailService,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map