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
exports.CategoriesController = void 0;
const common_1 = require("@nestjs/common");
const categories_service_1 = require("./categories.service");
const create_category_dto_1 = require("./dto/create-category.dto");
const update_category_dto_1 = require("./dto/update-category.dto");
const validate_mongo_id_pipe_1 = require("../../core/pipes/validate-mongo-id.pipe");
const response_message_decorator_1 = require("../../core/decorators/response-message.decorator");
const pagination_query_dto_1 = require("../../core/query-string-dtos/pagination-query.dto");
const date_range_query_dto_1 = require("../../core/query-string-dtos/date-range-query.dto");
const validate_date_range_pipe_1 = require("../../core/pipes/validate-date-range.pipe");
const category_query_dto_1 = require("./dto/category-query-dto");
const public_decorator_1 = require("../../core/decorators/public.decorator");
let CategoriesController = exports.CategoriesController = class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }
    create(createCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }
    findAll(paginationQuery, dateRangeQuery, categoryQuery) {
        return this.categoriesService.findAll({ ...paginationQuery, ...dateRangeQuery, ...categoryQuery });
    }
    findOne(id) {
        return this.categoriesService.findOne(id);
    }
    findHierachy(id) {
        return this.categoriesService.getCategoryHierarchy(id);
    }
    update(id, updateCategoryDto) {
        return this.categoriesService.update(id, updateCategoryDto);
    }
    remove(id) {
        return this.categoriesService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_category_dto_1.CreateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "create", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    (0, response_message_decorator_1.ResponseMessage)('Fetch danh sách danh mục thành công'),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)(validate_date_range_pipe_1.ValidateDateRange)),
    __param(2, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_query_dto_1.PaginationQueryDto,
        date_range_query_dto_1.DateRangeQueryDto,
        category_query_dto_1.CategoryQueryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', validate_mongo_id_pipe_1.ValidateMongoIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id/ancestors'),
    __param(0, (0, common_1.Param)('id', validate_mongo_id_pipe_1.ValidateMongoIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "findHierachy", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', validate_mongo_id_pipe_1.ValidateMongoIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_category_dto_1.UpdateCategoryDto]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', validate_mongo_id_pipe_1.ValidateMongoIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CategoriesController.prototype, "remove", null);
exports.CategoriesController = CategoriesController = __decorate([
    (0, common_1.Controller)('categories'),
    __metadata("design:paramtypes", [categories_service_1.CategoriesService])
], CategoriesController);
//# sourceMappingURL=categories.controller.js.map