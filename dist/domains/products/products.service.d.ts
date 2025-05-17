import { ProductAttributeSku } from 'domains/products/schemas/product-attribute-sku.schema';
import { ProductAttribute } from 'domains/products/schemas/product-attributes.schema';
import { Product } from 'domains/products/schemas/product.schema';
import { Sku } from 'domains/products/schemas/sku.schema';
import mongoose, { Model, Types } from 'mongoose';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto';
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto';
import { ProductQueryDto } from 'domains/products/dto/product-query-dto';
import { IncreaseStockOnHandDto } from 'domains/products/dto/increase-stock-on-hand.dto';
import { DecreaseStockOnHandDto } from 'domains/products/dto/decrease-stock-on-hand.dto';
export declare class ProductsService {
    private productModel;
    private productAttributeModel;
    private skuModel;
    private productAttributeSkuModel;
    constructor(productModel: Model<Product>, productAttributeModel: Model<ProductAttribute>, skuModel: Model<Sku>, productAttributeSkuModel: Model<ProductAttributeSku>);
    create(createProductDto: CreateProductDto): Promise<mongoose.Document<unknown, {}, Product> & Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(qs: PaginationQueryDto & DateRangeQueryDto & ProductQueryDto): Promise<{
        data: (mongoose.Document<unknown, {}, Product> & Product & Required<{
            _id: Types.ObjectId;
        }> & {
            __v: number;
        })[];
        meta: {
            page: number;
            limit: number;
            totalPages: number;
            totalDocuments: number;
        };
    }>;
    findOne(productId: string): Promise<{
        skus: (mongoose.Document<unknown, {}, Sku> & Sku & {
            _id: Types.ObjectId;
        } & {
            __v: number;
        })[];
        _id: Types.ObjectId;
        code: string;
        name: string;
        description: string;
        imageUrl: string;
        category: mongoose.FlattenMaps<{
            name: string;
            parentCategory: mongoose.Document<unknown, {}, import("../categories/schemas/category.schema").Category> & import("../categories/schemas/category.schema").Category & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            };
            imageUrl: string;
        }>;
        brand: mongoose.FlattenMaps<{
            name: string;
            imageUrl: string;
        }>;
        status: import("core/constants/enum").ProductStatus;
        basePrice: number;
        minStockLevel: number;
        maxStockLevel: number;
        views: number;
        __v: number;
    } | {
        attributeOptions: any;
        skus: any;
        _id: Types.ObjectId;
        code: string;
        name: string;
        description: string;
        imageUrl: string;
        category: mongoose.FlattenMaps<{
            name: string;
            parentCategory: mongoose.Document<unknown, {}, import("../categories/schemas/category.schema").Category> & import("../categories/schemas/category.schema").Category & {
                _id: Types.ObjectId;
            } & {
                __v: number;
            };
            imageUrl: string;
        }>;
        brand: mongoose.FlattenMaps<{
            name: string;
            imageUrl: string;
        }>;
        status: import("core/constants/enum").ProductStatus;
        basePrice: number;
        minStockLevel: number;
        maxStockLevel: number;
        views: number;
        __v: number;
    }>;
    update(_id: string, updateProductDto: UpdateProductDto): Promise<mongoose.Document<unknown, {}, Product> & Product & Required<{
        _id: Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(_id: string): Promise<{
        deleted: boolean;
    }>;
    bulkRemove(ids: string[]): Promise<{
        deleted: boolean;
    }>;
    increaseStockOnHand(increaseStockOnHandDto: IncreaseStockOnHandDto): void;
    decreaseStockOnHand(decreaseStockOnHandDto: DecreaseStockOnHandDto): void;
    findOneSku(skuId: string): Promise<mongoose.Document<unknown, {}, Sku> & Sku & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAllSkus(skuIds: string[]): Promise<any[]>;
}
