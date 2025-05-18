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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = exports.Order = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const enum_1 = require("../../../core/constants/enum");
const shipping_info_schema_1 = require("./shipping-info.schema");
const mongoose_2 = __importDefault(require("mongoose"));
let Order = exports.Order = class Order {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Order.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose_2.default.Schema.Types.ObjectId }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Order.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], Order.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, enum: enum_1.OrderStatus, default: enum_1.OrderStatus.PROCESSING }),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], Order.prototype, "itemCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Number, enum: enum_1.PaymentMethod, default: enum_1.PaymentMethod.COD }),
    __metadata("design:type", Number)
], Order.prototype, "paymentMethod", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date, default: '' }),
    __metadata("design:type", Date)
], Order.prototype, "paymentAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date, default: '' }),
    __metadata("design:type", Date)
], Order.prototype, "deliveredAt", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Date, default: '' }),
    __metadata("design:type", Date)
], Order.prototype, "cancelledAt", void 0);
__decorate([
    (0, mongoose_1.Prop)(shipping_info_schema_1.ShippingInfoSchema),
    __metadata("design:type", shipping_info_schema_1.ShippingInfo)
], Order.prototype, "shippingInfo", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: mongoose_2.default.Schema.Types.ObjectId, default: null }),
    __metadata("design:type", mongoose_2.default.Types.ObjectId)
], Order.prototype, "updateBy", void 0);
exports.Order = Order = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false, collection: 'Orders' })
], Order);
exports.OrderSchema = mongoose_1.SchemaFactory.createForClass(Order);
//# sourceMappingURL=order.schema.js.map