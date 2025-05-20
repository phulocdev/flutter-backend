/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto';
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto';
import { ProductQueryDto } from 'domains/products/dto/product-query-dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    findAll(paginationQuery: PaginationQueryDto, dateRangeQuery: DateRangeQueryDto, categoryQuery: ProductQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & Required<{
            _id: import("mongoose").Types.ObjectId;
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
    findOne(id: string): Promise<{
        skus: (import("mongoose").Document<unknown, {}, import("./schemas/sku.schema").Sku> & import("./schemas/sku.schema").Sku & {
            _id: import("mongoose").Types.ObjectId;
        } & {
            __v: number;
        })[];
        _id: import("mongoose").Types.ObjectId;
        code: string;
        name: string;
        description: string;
        imageUrl: string;
        category: import("mongoose").FlattenMaps<{
            name: string;
            parentCategory: import("mongoose").Document<unknown, {}, import("../categories/schemas/category.schema").Category> & import("../categories/schemas/category.schema").Category & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            imageUrl: string;
        }>;
        brand: import("mongoose").FlattenMaps<{
            name: string;
            imageUrl: string;
        }>;
        status: import("../../core/constants/enum").ProductStatus;
        soldQuantity: number;
        star: number;
        discountPercentage: number;
        basePrice: number;
        minStockLevel: number;
        maxStockLevel: number;
        views: number;
        __v: number;
    } | {
        attributeOptions: any;
        skus: any;
        _id: import("mongoose").Types.ObjectId;
        code: string;
        name: string;
        description: string;
        imageUrl: string;
        category: import("mongoose").FlattenMaps<{
            name: string;
            parentCategory: import("mongoose").Document<unknown, {}, import("../categories/schemas/category.schema").Category> & import("../categories/schemas/category.schema").Category & {
                _id: import("mongoose").Types.ObjectId;
            } & {
                __v: number;
            };
            imageUrl: string;
        }>;
        brand: import("mongoose").FlattenMaps<{
            name: string;
            imageUrl: string;
        }>;
        status: import("../../core/constants/enum").ProductStatus;
        soldQuantity: number;
        star: number;
        discountPercentage: number;
        basePrice: number;
        minStockLevel: number;
        maxStockLevel: number;
        views: number;
        __v: number;
    }>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/product.schema").Product> & import("./schemas/product.schema").Product & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<{
        deleted: boolean;
    }>;
}
