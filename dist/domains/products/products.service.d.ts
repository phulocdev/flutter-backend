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
export declare class ProductsService {
    private productModel;
    private productAttributeModel;
    private skuModel;
    private productAttributeSkuModel;
    constructor(productModel: Model<Product>, productAttributeModel: Model<ProductAttribute>, skuModel: Model<Sku>, productAttributeSkuModel: Model<ProductAttributeSku>);
    create(createProductDto: CreateProductDto): Promise<mongoose.Document<unknown, {}, Product> & Product & {
        _id: Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(qs: PaginationQueryDto & DateRangeQueryDto & ProductQueryDto): Promise<{
        data: (mongoose.Document<unknown, {}, Product> & Product & {
            _id: Types.ObjectId;
        } & {
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
        attributeOptions: any;
        skus: any;
        name: string;
        description: string;
        imageUrl: string;
        category: import("../categories/schemas/category.schema").Category;
        brand: string;
        status: import("../../core/constants/enum").ProductStatus;
        basePrice: number;
        _id: Types.ObjectId;
        __v: number;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): string;
    remove(id: string): string;
}
