import { ValidationError } from 'class-validator';
export declare const extractErrorMessageFromDto: (errors: ValidationError[]) => string[];
export declare const formatNumberToVND: (price: number) => string;
export declare const createMediaUrl: ({ baseUrl, filename, folderName }: {
    baseUrl: string;
    folderName?: string;
    filename: string;
}) => string;
export declare const generateProductCode: () => string;
export declare const generateOrderCode: () => string;
export declare const generateCustomerCode: () => string;
export declare const generateSkuCode: () => string;
