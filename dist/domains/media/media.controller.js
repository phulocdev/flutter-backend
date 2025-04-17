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
exports.MediaController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const response_message_decorator_1 = require("../../core/decorators/response-message.decorator");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const multer_options_1 = require("./multer.options");
const LIMIT_UPLOAD_SINGLE_FILE = 4 * 1024 * 1024;
const MAX_COUNT_UPLOAD_MULTIPLE_FILE = 10;
const LIMIT_UPLOAD_MULTIPLE_FILE = MAX_COUNT_UPLOAD_MULTIPLE_FILE * LIMIT_UPLOAD_SINGLE_FILE;
let MediaController = exports.MediaController = class MediaController {
    constructor(cloudinaryService) {
        this.cloudinaryService = cloudinaryService;
    }
    async uploadImage(file, req) {
        const res = await this.cloudinaryService.uploadFile(file, req);
        return {
            result: res.secure_url
        };
    }
    async uploadMultipleFiles(files, req) {
        console.log('herer 123');
        const urls = await this.cloudinaryService.uploadFiles(files, req);
        return {
            result: urls
        };
    }
};
__decorate([
    (0, common_1.Post)('upload/single'),
    (0, response_message_decorator_1.ResponseMessage)('Upload hình ảnh thành công'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', (0, multer_options_1.createMulterOptions)(LIMIT_UPLOAD_SINGLE_FILE))),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadImage", null);
__decorate([
    (0, common_1.Post)('upload/multiple'),
    (0, response_message_decorator_1.ResponseMessage)('Upload danh sách hình ảnh thành công'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('files', MAX_COUNT_UPLOAD_MULTIPLE_FILE, (0, multer_options_1.createMulterOptions)(LIMIT_UPLOAD_MULTIPLE_FILE))),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array, Object]),
    __metadata("design:returntype", Promise)
], MediaController.prototype, "uploadMultipleFiles", null);
exports.MediaController = MediaController = __decorate([
    (0, common_1.Controller)('media'),
    __metadata("design:paramtypes", [cloudinary_service_1.CloudinaryService])
], MediaController);
//# sourceMappingURL=media.controller.js.map