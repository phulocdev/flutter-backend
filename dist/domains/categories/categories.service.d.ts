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
/// <reference types="mongoose/types/inferschematype" />
/// <reference types="mongoose/types/inferrawdoctype" />
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto';
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto';
import { CategoryQueryDto } from 'domains/categories/dto/category-query-dto';
import { Category } from 'domains/categories/schemas/category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesService {
    private categoryModel;
    constructor(categoryModel: Model<Category>);
    create(createCategoryDto: CreateCategoryDto): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(qs: PaginationQueryDto & DateRangeQueryDto & CategoryQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, Category> & Category & {
            _id: import("mongoose").Types.ObjectId;
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
    findAllPopulated(qs: PaginationQueryDto & DateRangeQueryDto & CategoryQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, Category> & Category & {
            _id: import("mongoose").Types.ObjectId;
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
    getCategoryHierarchy(id: string): Promise<any[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findOnePopulated(id: string): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<import("mongoose").Document<unknown, {}, Category> & Category & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongodb").DeleteResult>;
}
