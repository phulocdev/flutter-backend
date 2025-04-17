"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const errors_exception_1 = require("../../core/exceptions/errors.exception");
const category_schema_1 = require("./schemas/category.schema");
const mongoose_2 = require("mongoose");
let CategoriesService = exports.CategoriesService = class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }
    async create(createCategoryDto) {
        return this.categoryModel.create({
            ...createCategoryDto
        });
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
        const query = this.categoryModel.find(filter);
        if (limit && page) {
            query
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sort);
        }
        const [data, totalDocuments] = await Promise.all([query, this.categoryModel.countDocuments(filter)]);
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
    async findAllPopulated(qs) {
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
        const query = this.categoryModel.find(filter).populate({ path: 'parentCategory' });
        if (limit && page) {
            query
                .skip((page - 1) * limit)
                .limit(limit)
                .sort(sort);
        }
        const [data, totalDocuments] = await Promise.all([query, this.categoryModel.countDocuments(filter)]);
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
    async getCategoryHierarchy(id) {
        const hieranchy = [];
        let currentCategory = await this.categoryModel.findById(id);
        while (currentCategory && currentCategory.parentCategory) {
            hieranchy.unshift(currentCategory);
            currentCategory = await this.categoryModel.findById(currentCategory.parentCategory);
        }
        if (currentCategory)
            hieranchy.unshift(currentCategory);
        return hieranchy;
    }
    async findOne(id) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new errors_exception_1.NotFoundError('Danh mục không tồn tại');
        }
        return category;
    }
    async findOnePopulated(id) {
        const category = await this.categoryModel.findById(id);
        if (!category) {
            throw new errors_exception_1.NotFoundError('Danh mục không tồn tại');
        }
        if (category.parentCategory) {
            await category.populate({ path: 'parentCategory' });
        }
        return category;
    }
    async update(id, updateCategoryDto) {
        return this.categoryModel.findOneAndUpdate({ _id: id }, updateCategoryDto, { returnOriginal: false });
    }
    async remove(id) {
        const a = await this.findOne(id);
        const filter = { _id: id };
        return this.categoryModel.deleteOne(filter);
    }
};
exports.CategoriesService = CategoriesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(category_schema_1.Category.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CategoriesService);
//# sourceMappingURL=categories.service.js.map