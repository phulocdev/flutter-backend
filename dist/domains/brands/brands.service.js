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
exports.BrandsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const errors_exception_1 = require("../../core/exceptions/errors.exception");
const brand_schema_1 = require("./schemas/brand.schema");
const mongoose_2 = require("mongoose");
let BrandsService = exports.BrandsService = class BrandsService {
    constructor(brandModel) {
        this.brandModel = brandModel;
    }
    async create(createBrandDto) {
        const { name } = createBrandDto;
        const brand = await this.brandModel.findOne({ name });
        if (brand) {
            throw new errors_exception_1.BadRequestError(`Thương hiệu${name} đã tồn tại`);
        }
        return this.brandModel.create(createBrandDto);
    }
    async findAll(qs) {
        const { page, limit, from, to, sort: sortQuery, ...filter } = qs;
        const _filter = filter;
        let sort = '-createdAt';
        if (sortQuery) {
            const sortField = sortQuery.split('.')[0];
            const isDescending = sortQuery.split('.')[1] === 'desc';
            sort = isDescending ? `-${sortField}` : sortField;
        }
        if (from || to) {
            _filter.createdAt = {};
            if (from)
                _filter.createdAt.$gte = from;
            if (to)
                _filter.createdAt.$lt = to;
        }
        const query = this.brandModel.find(filter).sort(sort);
        if (limit && page) {
            query.skip((page - 1) * limit).limit(limit);
        }
        const [data, totalDocuments] = await Promise.all([query, this.brandModel.countDocuments(filter)]);
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
    async findOne(id) {
        const brand = await this.brandModel.findById(id);
        if (!brand) {
            throw new errors_exception_1.NotFoundError('Thương hiệu không tồn tại');
        }
        return brand;
    }
    async update(_id, updateBrandDto) {
        const brand = await this.brandModel.findOne({ name: updateBrandDto.name });
        if (brand) {
            throw new errors_exception_1.BadRequestError(`Thương hiệu ${updateBrandDto.name} đã tồn tại`);
        }
        const updatedBrand = await this.brandModel.findOneAndUpdate({ _id }, updateBrandDto, { new: true });
        if (!updatedBrand) {
            throw new errors_exception_1.NotFoundError('Thương hiệu cần cập nhật không tồn tại');
        }
        return updatedBrand;
    }
    async remove(_id) {
        const deletedBrand = await this.brandModel.findOneAndDelete({ _id });
        if (!deletedBrand) {
            throw new errors_exception_1.NotFoundError('Thương hiệu cần xóa không tồn tại');
        }
        return deletedBrand;
    }
};
exports.BrandsService = BrandsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(brand_schema_1.Brand.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], BrandsService);
//# sourceMappingURL=brands.service.js.map