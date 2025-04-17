"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const products_controller_1 = require("./products.controller");
const mongoose_1 = require("@nestjs/mongoose");
const product_schema_1 = require("./schemas/product.schema");
const product_attributes_schema_1 = require("./schemas/product-attributes.schema");
const sku_schema_1 = require("./schemas/sku.schema");
const product_attribute_sku_schema_1 = require("./schemas/product-attribute-sku.schema");
let ProductsModule = exports.ProductsModule = class ProductsModule {
};
exports.ProductsModule = ProductsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: product_schema_1.Product.name, schema: product_schema_1.ProductSchema },
                { name: product_attributes_schema_1.ProductAttribute.name, schema: product_attributes_schema_1.ProductAttributeSchema },
                { name: sku_schema_1.Sku.name, schema: sku_schema_1.SkuSchema },
                {
                    name: product_attribute_sku_schema_1.ProductAttributeSku.name,
                    schema: product_attribute_sku_schema_1.ProductAttributeSkuSchema
                }
            ])
        ],
        controllers: [products_controller_1.ProductsController],
        providers: [products_service_1.ProductsService]
    })
], ProductsModule);
//# sourceMappingURL=products.module.js.map