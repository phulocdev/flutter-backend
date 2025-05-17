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
exports.OtpsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const otp_schema_1 = require("./schemas/otp.schema");
const mongoose_2 = require("mongoose");
let OtpsService = exports.OtpsService = class OtpsService {
    constructor(otpModel) {
        this.otpModel = otpModel;
    }
    async create(createOtpDto) {
        const { email, otp } = createOtpDto;
        const optDocument = await this.otpModel.findOne({ otp });
        if (optDocument !== null) {
            return this.otpModel.updateOne({ email }, { otp });
        }
        return this.otpModel.create({ ...createOtpDto });
    }
    async findOtpCodeByUserEmail(email) {
        return this.otpModel.findOne({ email });
    }
    async removeOtpByEmail(email) {
        return this.otpModel.deleteOne({ email });
    }
};
exports.OtpsService = OtpsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(otp_schema_1.Otp.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OtpsService);
//# sourceMappingURL=otps.service.js.map