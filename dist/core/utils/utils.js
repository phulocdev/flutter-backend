"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSkuCode = exports.generateCustomerCode = exports.generateOrderCode = exports.createMediaUrl = exports.extractErrorMessageFromDto = void 0;
const nanoid_1 = require("nanoid");
const crypto_1 = __importDefault(require("crypto"));
const extractErrorMessageFromDto = (errors) => {
    const messages = [];
    errors.forEach((error) => {
        if (error.constraints) {
            messages.push(...Object.values(error.constraints));
        }
        if (error.children && error.children.length > 0) {
            messages.push(...(0, exports.extractErrorMessageFromDto)(error.children));
        }
    });
    return messages;
};
exports.extractErrorMessageFromDto = extractErrorMessageFromDto;
const createMediaUrl = ({ baseUrl, filename, folderName = 'tmp' }) => {
    return `${baseUrl}/public/${folderName}/${filename}`;
};
exports.createMediaUrl = createMediaUrl;
const generateOrderCode = () => {
    const nanoid = (0, nanoid_1.customAlphabet)('0123456789', 6)();
    return `ORD${nanoid}`;
};
exports.generateOrderCode = generateOrderCode;
const generateCustomerCode = () => {
    const nanoid = (0, nanoid_1.customAlphabet)('0123456789', 6)();
    return `CUS${nanoid}`;
};
exports.generateCustomerCode = generateCustomerCode;
const generateSkuCode = ({ brand, attributeValues, productId }) => {
    const uniqueString = `${attributeValues.join('-')}-${productId}`;
    const hash = crypto_1.default.createHash('md5').update(uniqueString).digest('hex').slice(0, 8);
    return `${brand.toUpperCase()}-${hash}`;
};
exports.generateSkuCode = generateSkuCode;
//# sourceMappingURL=utils.js.map