"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let AnyExceptionFilter = class AnyExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const statusCode = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (statusCode === common_1.HttpStatus.INTERNAL_SERVER_ERROR) {
            response.status(statusCode).json({
                timestamp: new Date().toISOString(),
                instance: request.url,
                title: 'Internal Server Error',
                statusCode,
                message: exception.message ?? 'Đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.'
            });
        }
        else {
            response.status(statusCode).json(exception.getResponse());
        }
    }
};
AnyExceptionFilter = __decorate([
    (0, common_1.Catch)()
], AnyExceptionFilter);
exports.default = AnyExceptionFilter;
//# sourceMappingURL=any-exception-filter.js.map