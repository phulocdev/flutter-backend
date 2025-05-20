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
exports.CommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_schema_1 = require("./schemas/comment.schema");
const errors_exception_1 = require("../../core/exceptions/errors.exception");
const products_service_1 = require("../products/products.service");
let CommentsService = exports.CommentsService = class CommentsService {
    constructor(commentModel, productsService) {
        this.commentModel = commentModel;
        this.productsService = productsService;
    }
    async create(createCommentDto) {
        const { stars, accountId, productId } = createCommentDto;
        if (stars && !accountId) {
            throw new errors_exception_1.BadRequestError('Khánh hàng phải đăng nhập thì mới có thể đánh giá');
        }
        const totalCommentWithStarCounts = (await this.commentModel.find({ productId })).filter((comment) => !!comment.stars).length;
        const currentRating = (await this.productsService.findOne(productId)).star;
        const updatedRating = (stars + currentRating) / (1 + totalCommentWithStarCounts);
        await this.productsService.update(productId, { star: updatedRating });
        const newComment = new this.commentModel(createCommentDto);
        return newComment.save();
    }
    async findByProduct(productId) {
        return this.commentModel.find({ productId }).sort({ createdAt: -1 }).exec();
    }
    async remove(id) {
        return this.commentModel.findByIdAndDelete(id).exec();
    }
};
exports.CommentsService = CommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_schema_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        products_service_1.ProductsService])
], CommentsService);
//# sourceMappingURL=comments.service.js.map