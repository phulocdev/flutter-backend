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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const product_attribute_sku_schema_1 = require("./schemas/product-attribute-sku.schema");
const product_attributes_schema_1 = require("./schemas/product-attributes.schema");
const product_schema_1 = require("./schemas/product.schema");
const sku_schema_1 = require("./schemas/sku.schema");
const mongoose_2 = __importStar(require("mongoose"));
const utils_1 = require("../../core/utils/utils");
let ProductsService = exports.ProductsService = class ProductsService {
    constructor(productModel, productAttributeModel, skuModel, productAttributeSkuModel) {
        this.productModel = productModel;
        this.productAttributeModel = productAttributeModel;
        this.skuModel = skuModel;
        this.productAttributeSkuModel = productAttributeSkuModel;
    }
    async create(createProductDto) {
        const { attributeNames, skus, ...baseProductDto } = createProductDto;
        const productId = new mongoose_2.default.Types.ObjectId();
        const attributeDocuments = await this.productAttributeModel.insertMany(attributeNames.map((name) => ({ product: productId, name })));
        const skuDocuments = await this.skuModel.insertMany(skus.map((sku) => ({
            price: sku.price,
            sku: (0, utils_1.generateSkuCode)({
                brand: baseProductDto.brand,
                attributeValues: sku.attributeValues,
                productId: `${productId}`
            }),
            stockQuantity: sku.stockQuantity,
            images: sku.images,
            product: productId
        })));
        const productAttributeSkuOperations = skus.flatMap((sku, skuIndex) => {
            return sku.attributeValues.map((attributeValue, attrIndex) => ({
                insertOne: {
                    document: {
                        productAttribute: attributeDocuments[attrIndex]._id,
                        sku: skuDocuments[skuIndex]._id,
                        value: attributeValue
                    }
                }
            }));
        });
        await this.productAttributeSkuModel.bulkWrite(productAttributeSkuOperations);
        return this.productModel.create({ _id: productId, ...baseProductDto });
    }
    async findAll(qs) {
        const { page, limit, from, to, sort: sortQuery, ...filterRest } = qs;
        const filter = filterRest;
        let sort = '-createdAt';
        if (sortQuery) {
            const sortField = sortQuery.split('.')[0];
            const isDescending = sortQuery.split('.')[1] === 'desc';
            sort = isDescending ? `-${sortField}` : sortField;
        }
        if (from || to) {
            filter.createdAt = {};
            if (from)
                filter.createdAt.$gte = from;
            if (to)
                filter.createdAt.$lt = to;
        }
        const query = this.productModel.find(filter);
        if (limit && page) {
            query
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sort);
        }
        const [data, totalDocuments] = await Promise.all([query, this.productModel.countDocuments(filter)]);
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
    async findOne(productId) {
        const baseProductPromise = this.productModel
            .findById(productId)
            .populate({ path: 'category', select: ['name', 'imageUrl', '-_id'] });
        const skuDocumentList = await this.skuModel.find({ product: productId });
        const skuIds = skuDocumentList.map((sku) => sku._id);
        const attributeAndVariantsPromise = this.productAttributeSkuModel.aggregate([
            {
                $match: { sku: { $in: skuIds } }
            },
            {
                $lookup: {
                    from: 'ProductAttributes',
                    localField: 'productAttribute',
                    foreignField: '_id',
                    as: 'attributeInfo'
                }
            },
            {
                $unwind: '$attributeInfo'
            },
            {
                $facet: {
                    attributeOptions: [
                        {
                            $group: {
                                _id: '$attributeInfo.name',
                                values: { $addToSet: '$value' }
                            }
                        },
                        {
                            $project: {
                                _id: 0,
                                keyValue: { $arrayToObject: [[{ k: '$_id', v: '$values' }]] }
                            }
                        },
                        {
                            $replaceRoot: { newRoot: '$keyValue' }
                        }
                    ],
                    variants: [
                        {
                            $group: {
                                _id: '$sku',
                                attributes: {
                                    $push: { k: '$attributeInfo.name', v: '$value' }
                                }
                            }
                        },
                        {
                            $addFields: {
                                attributes: { $arrayToObject: '$attributes' }
                            }
                        },
                        {
                            $lookup: {
                                from: 'Skus',
                                localField: '_id',
                                foreignField: '_id',
                                as: 'skuInfo'
                            }
                        },
                        { $unwind: { path: '$skuInfo', preserveNullAndEmptyArrays: true } },
                        {
                            $replaceRoot: { newRoot: { $mergeObjects: ['$skuInfo', '$$ROOT'] } }
                        },
                        {
                            $project: {
                                skuInfo: 0,
                                product: 0
                            }
                        }
                    ]
                }
            }
        ]);
        const [baseProduct, { attributeOptions, variants }] = await Promise.all([
            baseProductPromise,
            attributeAndVariantsPromise.then((res) => res[0])
        ]);
        return {
            ...baseProduct.toObject(),
            attributeOptions,
            skus: variants
        };
    }
    update(id, updateProductDto) {
        return `This action updates a #${id} product`;
    }
    remove(id) {
        return `This action removes a #${id} product`;
    }
};
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __param(1, (0, mongoose_1.InjectModel)(product_attributes_schema_1.ProductAttribute.name)),
    __param(2, (0, mongoose_1.InjectModel)(sku_schema_1.Sku.name)),
    __param(3, (0, mongoose_1.InjectModel)(product_attribute_sku_schema_1.ProductAttributeSku.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map