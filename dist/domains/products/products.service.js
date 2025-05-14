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
const errors_exception_1 = require("../../core/exceptions/errors.exception");
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
        const productCode = (0, utils_1.generateProductCode)();
        if (skus && skus.length === 0) {
            throw new errors_exception_1.UnprocessableEntityError([{ field: 'skus', message: 'skus không hợp lệ phải có ít nhất một phần tử' }]);
        }
        const session = await this.productModel.db.startSession();
        try {
            session.startTransaction();
            let attributeDocuments = [];
            let skuDocuments = [];
            if (attributeNames && attributeNames.length > 0) {
                attributeDocuments = await this.productAttributeModel.insertMany(attributeNames.map((name) => ({ product: productId, name })), { session });
            }
            if (skus && skus.length > 0) {
                skuDocuments = await this.skuModel.insertMany(skus.map((sku) => {
                    const { ...skuFieldValues } = sku;
                    return {
                        ...skuFieldValues,
                        product: productId,
                        barcode: (0, utils_1.generateSkuCode)(),
                        sku: (0, utils_1.generateSkuCode)()
                    };
                }), { session });
            }
            if (attributeDocuments.length > 0 && skuDocuments.length > 0) {
                const attributeNameToIdMap = new Map();
                attributeDocuments.forEach((attr, index) => {
                    attributeNameToIdMap.set(attributeNames[index], attr._id);
                });
                const productAttributeSkuOperations = [];
                skus.forEach((sku, skuIndex) => {
                    if (sku.attributeValues && sku.attributeValues.length === attributeNames.length) {
                        sku.attributeValues.forEach((attributeValue, attrIndex) => {
                            const attributeName = attributeNames[attrIndex];
                            const attributeId = attributeNameToIdMap.get(attributeName);
                            productAttributeSkuOperations.push({
                                insertOne: {
                                    document: {
                                        productAttribute: attributeId,
                                        sku: skuDocuments[skuIndex]._id,
                                        value: attributeValue
                                    }
                                }
                            });
                        });
                    }
                    else {
                        throw new Error(`SKU at index ${skuIndex} has invalid attribute values count. Expected ${attributeNames.length}, got ${sku.attributeValues?.length || 0}`);
                    }
                });
                if (productAttributeSkuOperations.length > 0) {
                    await this.productAttributeSkuModel.bulkWrite(productAttributeSkuOperations, { session });
                }
            }
            const createdProduct = await this.productModel.create([{ _id: productId, code: productCode, ...baseProductDto }], { session });
            await session.commitTransaction();
            return createdProduct[0];
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
        const { page, limit, from, to, sort: sortQuery, name, brandIds, categoryIds, code, maxPrice, minPrice, status } = qs;
        const filter = {};
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        }
        if (code) {
            filter.code = { $regex: code, $options: 'i' };
        }
        if (categoryIds) {
            filter.category = { $in: categoryIds };
        }
        if (brandIds) {
            filter.brand = { $in: brandIds };
        }
        if (minPrice !== undefined && maxPrice) {
            filter.basePrice = { $gte: minPrice, $lte: maxPrice };
        }
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
        const query = this.productModel
            .find(filter)
            .sort(sort)
            .populate([{ path: 'category' }, { path: 'brand' }]);
        if (limit && page) {
            query.skip((page - 1) * limit).limit(limit);
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
            .populate([{ path: 'category' }, { path: 'brand' }])
            .lean(true);
        const skuDocumentList = await this.skuModel.find({ product: productId });
        const skuIds = skuDocumentList.map((sku) => sku._id);
        if (skuIds.length === 1) {
            const [baseProduct] = await Promise.all([baseProductPromise]);
            return {
                ...baseProduct,
                skus: skuDocumentList
            };
        }
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
                    variants: [
                        {
                            $group: {
                                _id: '$sku',
                                attributesArray: {
                                    $push: {
                                        name: '$attributeInfo.name',
                                        values: ['$value']
                                    }
                                }
                            }
                        },
                        {
                            $addFields: {
                                attributes: {
                                    $map: {
                                        input: '$attributesArray',
                                        as: 'item',
                                        in: {
                                            name: '$$item.name',
                                            value: { $arrayElemAt: ['$$item.values', 0] }
                                        }
                                    }
                                }
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
                        {
                            $unwind: { path: '$skuInfo', preserveNullAndEmptyArrays: true }
                        },
                        {
                            $replaceRoot: {
                                newRoot: {
                                    $mergeObjects: ['$skuInfo', '$$ROOT']
                                }
                            }
                        },
                        {
                            $project: {
                                skuInfo: 0,
                                product: 0,
                                attributesArray: 0
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
            ...baseProduct,
            attributeOptions,
            skus: variants
        };
    }
    async update(_id, updateProductDto) {
        const { attributeNames, skus, ...baseProductDto } = updateProductDto;
        if (attributeNames && !skus) {
            throw new errors_exception_1.UnprocessableEntityError([{ field: 'skus', message: 'skus không được bỏ trống' }]);
        }
        if (!attributeNames && skus) {
            throw new errors_exception_1.UnprocessableEntityError([{ field: 'attributeNames', message: 'attributeNames không được bỏ trống' }]);
        }
        const session = await this.productModel.db.startSession();
        try {
            session.startTransaction();
            if (!attributeNames || !skus) {
                const updatedProduct = await this.productModel.findOneAndUpdate({ _id }, baseProductDto, { new: true, session });
                await session.commitTransaction();
                return updatedProduct;
            }
            const productAttributes = await this.productAttributeModel.find({ product: _id });
            const productAttributeIds = productAttributes.map((prodAtt) => prodAtt._id);
            await Promise.all([
                this.productAttributeModel.deleteMany({ product: _id }).session(session),
                this.productAttributeSkuModel.deleteMany({ productAttribute: { $in: productAttributeIds } }).session(session),
                this.skuModel.deleteMany({ product: _id }).session(session)
            ]);
            let attributeDocuments = [];
            let skuDocuments = [];
            if (attributeNames.length > 0) {
                attributeDocuments = await this.productAttributeModel.insertMany(attributeNames.map((name) => ({ product: _id, name })), { session });
            }
            if (skus.length > 0) {
                skuDocuments = await this.skuModel.insertMany(skus.map((sku) => {
                    const { attributeValues, ...skuFieldValues } = sku;
                    return {
                        ...skuFieldValues,
                        product: _id,
                        barcode: (0, utils_1.generateSkuCode)(),
                        sku: (0, utils_1.generateSkuCode)()
                    };
                }), { session });
            }
            if (attributeDocuments.length > 0 && skuDocuments.length > 0) {
                const attributeNameToIdMap = new Map();
                attributeDocuments.forEach((attr, index) => {
                    attributeNameToIdMap.set(attributeNames[index], attr._id);
                });
                const productAttributeSkuOperations = [];
                skus.forEach((sku, skuIndex) => {
                    if (sku.attributeValues && sku.attributeValues.length === attributeNames.length) {
                        sku.attributeValues.forEach((attributeValue, attrIndex) => {
                            const attributeName = attributeNames[attrIndex];
                            const attributeId = attributeNameToIdMap.get(attributeName);
                            productAttributeSkuOperations.push({
                                insertOne: {
                                    document: {
                                        productAttribute: attributeId,
                                        sku: skuDocuments[skuIndex]._id,
                                        value: attributeValue
                                    }
                                }
                            });
                        });
                    }
                    else {
                        throw new errors_exception_1.BadRequestError(`SKU at index ${skuIndex} has invalid attribute values count. Expected ${attributeNames.length}, got ${sku.attributeValues?.length || 0}`);
                    }
                });
                if (productAttributeSkuOperations.length > 0) {
                    await this.productAttributeSkuModel.bulkWrite(productAttributeSkuOperations, { session });
                }
            }
            const updatedProduct = await this.productModel.findOneAndUpdate({ _id }, baseProductDto, { new: true, session });
            await session.commitTransaction();
            return updatedProduct;
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async remove(_id) {
        const session = await this.productModel.db.startSession();
        try {
            session.startTransaction();
            const productAttributes = await this.productAttributeModel.find({ product: _id });
            const productAttributeIds = productAttributes.map((prodAtt) => prodAtt._id);
            await Promise.all([
                this.productModel.deleteOne({ _id }).session(session),
                this.productAttributeModel.deleteMany({ product: _id }).session(session),
                this.productAttributeSkuModel.deleteMany({ productAttribute: { $in: productAttributeIds } }).session(session),
                this.skuModel.deleteMany({ product: _id }).session(session)
            ]);
            await session.commitTransaction();
            return { deleted: true };
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    async bulkRemove(ids) {
        const session = await this.productModel.db.startSession();
        try {
            session.startTransaction();
            const productAttributes = await this.productAttributeModel.find({ product: { $in: ids } });
            const productAttributeIds = productAttributes.map((prodAtt) => prodAtt._id);
            await Promise.all([
                this.productModel.deleteMany({ _id: { $in: ids } }).session(session),
                this.productAttributeModel.deleteMany({ product: { $in: ids } }).session(session),
                this.productAttributeSkuModel.deleteMany({ productAttribute: { $in: productAttributeIds } }).session(session),
                this.skuModel.deleteMany({ product: { $in: ids } }).session(session)
            ]);
            await session.commitTransaction();
            return { deleted: true };
        }
        catch (error) {
            await session.abortTransaction();
            throw error;
        }
        finally {
            session.endSession();
        }
    }
    increaseStockOnHand(increaseStockOnHandDto) {
        const { items } = increaseStockOnHandDto;
        const operations = items.map(({ sku, quantity }) => ({
            updateOne: {
                filter: { _id: sku },
                update: { $inc: { stockOnHand: quantity } }
            }
        }));
        this.skuModel.bulkWrite(operations);
    }
    decreaseStockOnHand(decreaseStockOnHandDto) {
        const { items } = decreaseStockOnHandDto;
        const operations = items.map(({ sku, quantity }) => ({
            updateOne: {
                filter: { _id: sku },
                update: { $inc: { stockOnHand: -quantity } }
            }
        }));
        this.skuModel.bulkWrite(operations);
    }
    async findOneSku(skuId) {
        const sku = await this.skuModel.findOne({ _id: skuId });
        if (!sku) {
            throw new errors_exception_1.NotFoundError('SKU không tồn tại');
        }
        return sku;
    }
    async findAllSkus(skuIds) {
        const objectIds = skuIds.map((id) => new mongoose_2.Types.ObjectId(id));
        return this.skuModel.aggregate([
            {
                $match: {
                    _id: { $in: objectIds }
                }
            },
            {
                $lookup: {
                    from: 'Products',
                    localField: 'product',
                    foreignField: '_id',
                    as: 'product'
                }
            },
            { $unwind: { path: '$product', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Categories',
                    localField: 'product.category',
                    foreignField: '_id',
                    as: 'productCategory'
                }
            },
            { $unwind: { path: '$productCategory', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'Brands',
                    localField: 'product.brand',
                    foreignField: '_id',
                    as: 'productBrand'
                }
            },
            { $unwind: { path: '$productBrand', preserveNullAndEmptyArrays: true } },
            {
                $lookup: {
                    from: 'ProductAttributeSku',
                    let: { skuId: '$_id' },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ['$sku', '$$skuId'] }
                            }
                        }
                    ],
                    as: 'attributeSkus'
                }
            },
            {
                $lookup: {
                    from: 'ProductAttributes',
                    let: { attrSkus: '$attributeSkus' },
                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $in: [
                                        '$_id',
                                        {
                                            $map: {
                                                input: '$$attrSkus',
                                                as: 'asku',
                                                in: '$$asku.productAttribute'
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    ],
                    as: 'attributesInfo'
                }
            },
            {
                $addFields: {
                    attributes: {
                        $map: {
                            input: '$attributeSkus',
                            as: 'asku',
                            in: {
                                value: '$$asku.value',
                                name: {
                                    $let: {
                                        vars: {
                                            attr: {
                                                $arrayElemAt: [
                                                    {
                                                        $filter: {
                                                            input: '$attributesInfo',
                                                            as: 'ainfo',
                                                            cond: { $eq: ['$$ainfo._id', '$$asku.productAttribute'] }
                                                        }
                                                    },
                                                    0
                                                ]
                                            }
                                        },
                                        in: '$$attr.name'
                                    }
                                }
                            }
                        }
                    },
                    product: {
                        $mergeObjects: [
                            '$product',
                            {
                                category: '$productCategory',
                                brand: '$productBrand'
                            }
                        ]
                    }
                }
            },
            {
                $project: {
                    minStockLevel: 0,
                    maxStockLevel: 0,
                    attributeSkus: 0,
                    attributesInfo: 0,
                    productCategory: 0,
                    productBrand: 0
                }
            }
        ]);
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