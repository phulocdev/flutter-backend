"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const bcrypt = __importStar(require("bcrypt"));
const errors_exception_1 = require("../../core/exceptions/errors.exception");
const account_schema_1 = require("./schemas/account.schema");
const mongoose_2 = require("mongoose");
let AccountsService = exports.AccountsService = class AccountsService {
    constructor(accountModel) {
        this.accountModel = accountModel;
        this.saltRounds = 10;
    }
    async createForGuest(createGuestAccountDto) {
        const hashedPassword = await this.hashPassword(Math.floor(Math.random() * 1000000).toString());
        const newGuestAccount = await this.accountModel.create({
            ...createGuestAccountDto,
            isGuest: true,
            password: hashedPassword
        });
        return {
            _id: newGuestAccount._id,
            avatarUrl: newGuestAccount.avatarUrl,
            email: newGuestAccount.email,
            fullName: newGuestAccount.fullName,
            role: newGuestAccount.role,
            address: newGuestAccount.address,
            phoneNumber: newGuestAccount.phoneNumber
        };
    }
    async create(createAccountDto) {
        const [accountWithEmail, hashedPassword] = await Promise.all([
            this.accountModel.findOne({ email: createAccountDto.email }),
            this.hashPassword(createAccountDto.password)
        ]);
        if (accountWithEmail) {
            throw new errors_exception_1.BadRequestError('Email này đã tồn tại trên hệ thống');
        }
        const newAccount = await this.accountModel.create({
            ...createAccountDto,
            password: hashedPassword,
            _id: createAccountDto._id
        });
        return {
            _id: newAccount._id,
            email: newAccount.email,
            fullName: newAccount.fullName,
            avatarUrl: newAccount.avatarUrl,
            role: newAccount.role,
            address: newAccount.address,
            phoneNumber: newAccount.phoneNumber
        };
    }
    async findAll(qs) {
        const { page, limit, sort: sortQuery, email, fullName, isActive, role } = qs;
        const filter = {};
        if (email) {
            filter.email = email;
        }
        if (fullName) {
            filter.fullName = { $regex: fullName, $options: 'i' };
        }
        if (isActive) {
            filter.isActive = true;
        }
        else if (isActive === 0) {
            filter.isActive = false;
        }
        if (role) {
            filter.role = role;
        }
        let sort = { createdAt: -1 };
        if (sortQuery) {
            const sortField = sortQuery.split('.')[0];
            const isDescending = sortQuery.split('.')[1] === 'desc';
            sort = isDescending ? { [sortField]: -1 } : { [sortField]: 1 };
        }
        const query = this.accountModel.find(filter).sort(sort);
        if (limit && page) {
            query.skip((page - 1) * limit).limit(limit);
        }
        const [data, totalDocuments] = await Promise.all([query, this.accountModel.countDocuments(filter)]);
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
        const account = await this.accountModel.findOne({ _id: id });
        if (!account) {
            throw new errors_exception_1.NotFoundError('Tài khoản không tồn tại');
        }
        return this.accountModel.findById(id);
    }
    findByEmail(email) {
        return this.accountModel.findOne({ email });
    }
    findByRefreshToken(refreshToken) {
        return this.accountModel.findOne({ refreshToken });
    }
    async findAccountByEmailAndPassword({ email, password }) {
        const account = await this.findByEmail(email);
        if (!account)
            return null;
        const isMatchPassword = await this.comparePassword(password, account.password);
        return isMatchPassword ? account : null;
    }
    async update(id, updateAccountDto) {
        const { isChangeEmail, isChangePhoneNumber, email, phoneNumber } = updateAccountDto;
        const account = await this.accountModel.findOne({ _id: id });
        if (isChangePhoneNumber) {
            const isExistAccountWithPhoneNumber = (await this.accountModel.findOne({ phoneNumber })) !== null;
            if (isExistAccountWithPhoneNumber) {
                throw new errors_exception_1.BadRequestError('Số điện thoại này đã tồn tại');
            }
        }
        if (isChangeEmail) {
            const isExistAccountWithEmail = (await this.accountModel.findOne({ email })) !== null;
            if (isExistAccountWithEmail) {
                throw new errors_exception_1.BadRequestError('Email này đã tồn tại');
            }
        }
        if (!account) {
            throw new errors_exception_1.NotFoundError('Tài khoản không tồn tại');
        }
        return this.accountModel.updateOne({ _id: id }, { ...updateAccountDto });
    }
    async findOneAndUpdateByEmail(email, updateAccountDto) {
        const hashedPassword = await this.hashPassword(updateAccountDto.password);
        const updatedAccount = await this.accountModel.findOneAndUpdate({ email }, { ...updateAccountDto, password: hashedPassword }, { $new: true });
        return {
            _id: updatedAccount._id,
            avatarUrl: updatedAccount.avatarUrl,
            email: updatedAccount.email,
            fullName: updatedAccount.fullName,
            role: updatedAccount.role,
            address: updatedAccount.address,
            phoneNumber: updatedAccount.phoneNumber
        };
    }
    async updateRefreshToken(id, refreshToken) {
        return this.accountModel.updateOne({ _id: id }, { refreshToken });
    }
    async updatePassword(id, password) {
        const hashedPassword = await this.hashPassword(password);
        return this.accountModel.updateOne({ _id: id }, {
            password: hashedPassword
        });
    }
    async updatePasswordByEmail(email, password) {
        const hashedPassword = await this.hashPassword(password);
        return this.accountModel.updateOne({ email }, {
            password: hashedPassword
        });
    }
    async remove(id) {
        const account = await this.accountModel.findOne({ _id: id });
        if (!account) {
            throw new errors_exception_1.NotFoundError('Tài khoản không tồn tại');
        }
        return this.accountModel.deleteOne({ _id: id });
    }
    hashPassword(password) {
        return bcrypt.hash(password, this.saltRounds);
    }
    comparePassword(password, hashedPassword) {
        return bcrypt.compare(password, hashedPassword);
    }
    countDocs() {
        return this.accountModel.countDocuments();
    }
};
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(account_schema_1.Account.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map