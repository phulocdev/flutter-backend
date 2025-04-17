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
exports.ProductAttributeSkuSchema = exports.ProductAttributeSku = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const product_attributes_schema_1 = require("./product-attributes.schema");
const sku_schema_1 = require("./sku.schema");
const mongoose = __importStar(require("mongoose"));
let ProductAttributeSku = exports.ProductAttributeSku = class ProductAttributeSku {
};
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'ProductAttribute' }),
    __metadata("design:type", product_attributes_schema_1.ProductAttribute)
], ProductAttributeSku.prototype, "productAttribute", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Sku' }),
    __metadata("design:type", sku_schema_1.Sku)
], ProductAttributeSku.prototype, "sku", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: String }),
    __metadata("design:type", String)
], ProductAttributeSku.prototype, "value", void 0);
exports.ProductAttributeSku = ProductAttributeSku = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false, collection: 'ProductAttributeSku', id: false })
], ProductAttributeSku);
exports.ProductAttributeSkuSchema = mongoose_1.SchemaFactory.createForClass(ProductAttributeSku);
exports.ProductAttributeSkuSchema.index({ productAttribute: 1, sku: 1 }, { unique: true });
//# sourceMappingURL=product-attribute-sku.schema.js.map