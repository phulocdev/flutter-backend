"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpsModule = void 0;
const common_1 = require("@nestjs/common");
const otps_service_1 = require("./otps.service");
const mongoose_1 = require("@nestjs/mongoose");
const otp_schema_1 = require("./schemas/otp.schema");
let OtpsModule = exports.OtpsModule = class OtpsModule {
};
exports.OtpsModule = OtpsModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: otp_schema_1.Otp.name, schema: otp_schema_1.OtpSchema }])],
        providers: [otps_service_1.OtpsService],
        exports: [otps_service_1.OtpsService]
    })
], OtpsModule);
//# sourceMappingURL=otps.module.js.map