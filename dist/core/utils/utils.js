"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateSkuCode = exports.generateCustomerCode = exports.generateOrderCode = exports.generateProductCode = exports.createMediaUrl = exports.formatNumberToVND = exports.extractErrorMessageFromDto = void 0;
const nanoid_1 = require("nanoid");
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
const formatNumberToVND = (price) => {
    return new Intl.NumberFormat().format(price) + ' VNĐ';
};
exports.formatNumberToVND = formatNumberToVND;
const createMediaUrl = ({ baseUrl, filename, folderName = 'tmp' }) => {
    return `${baseUrl}/public/${folderName}/${filename}`;
};
exports.createMediaUrl = createMediaUrl;
const generateProductCode = () => {
    const nanoid = (0, nanoid_1.customAlphabet)('0123456789', 6)();
    return `PRO${nanoid}`;
};
exports.generateProductCode = generateProductCode;
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
const generateSkuCode = () => {
    const randomNumber = Math.floor(100000000 + Math.random() * 900000000);
    return `SKU${randomNumber}`;
};
exports.generateSkuCode = generateSkuCode;
//# sourceMappingURL=utils.js.map