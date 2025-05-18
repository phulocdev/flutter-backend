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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouponSchema = exports.Coupon = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose = __importStar(require("mongoose"));
let Coupon = exports.Coupon = class Coupon {
    get isValid() {
        return this.isActive && this.usageCount < this.maxUsage;
    }
    get remainingUsage() {
        return this.maxUsage - this.usageCount;
    }
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId }),
    __metadata("design:type", mongoose.Types.ObjectId)
], Coupon.prototype, "_id", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: String,
        unique: true,
        uppercase: true,
        validate: {
            validator: function (v) {
                return /^[A-Z0-9]{5}$/.test(v);
            },
            message: (props) => `${props.value} is not a valid coupon code. Code must be 5 alphanumeric characters.`
        }
    }),
    __metadata("design:type", String)
], Coupon.prototype, "code", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
        enum: [10000, 20000, 50000, 100000],
        message: 'Discount amount must be one of: 10000, 20000, 50000, or 100000 VND'
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "discountAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: Number, default: 0 }),
    __metadata("design:type", Number)
], Coupon.prototype, "usageCount", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        type: Number,
        min: 1,
        max: 10,
        validate: {
            validator: function (v) {
                return v >= 1 && v <= 10;
            },
            message: (props) => `Max usage must be between 1 and 10, got ${props.value}`
        }
    }),
    __metadata("design:type", Number)
], Coupon.prototype, "maxUsage", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: [mongoose.Schema.Types.ObjectId], default: [] }),
    __metadata("design:type", Array)
], Coupon.prototype, "appliedOrderIds", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: false, type: Boolean, default: true }),
    __metadata("design:type", Boolean)
], Coupon.prototype, "isActive", void 0);
exports.Coupon = Coupon = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false, collection: 'Coupons' })
], Coupon);
exports.CouponSchema = mongoose_1.SchemaFactory.createForClass(Coupon);
exports.CouponSchema.virtual('isValid').get(function () {
    return this.isActive && this.usageCount < this.maxUsage;
});
exports.CouponSchema.virtual('remainingUsage').get(function () {
    return this.maxUsage - this.usageCount;
});
exports.CouponSchema.set('toJSON', {
    virtuals: true,
    transform: function (doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        return ret;
    }
});
//# sourceMappingURL=coupon.schema.js.map