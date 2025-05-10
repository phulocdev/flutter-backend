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
import { BrandQueryDto } from 'domains/brands/dto/brand-query-dto';
import { CreateBrandDto } from 'domains/brands/dto/create-brand.dto';
import { UpdateBrandDto } from 'domains/brands/dto/update-brand.dto';
import { Brand } from 'domains/brands/schemas/brand.schema';
import { Model } from 'mongoose';
export declare class BrandsService {
    private brandModel;
    constructor(brandModel: Model<Brand>);
    create(createBrandDto: CreateBrandDto): Promise<import("mongoose").Document<unknown, {}, Brand> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(qs: PaginationQueryDto & DateRangeQueryDto & BrandQueryDto): Promise<{
        data: (import("mongoose").Document<unknown, {}, Brand> & Brand & {
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
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Brand> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    update(_id: string, updateBrandDto: UpdateBrandDto): Promise<import("mongoose").Document<unknown, {}, Brand> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    remove(_id: string): Promise<import("mongoose").Document<unknown, {}, Brand> & Brand & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}
