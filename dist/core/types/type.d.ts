import { ProductStatus, Role } from 'core/constants/enum';
import mongoose from 'mongoose';
export type AccountType = {
    _id: string | mongoose.Types.ObjectId;
    email: string;
    fullName: string;
    avatarUrl: string;
    role: Role;
    phoneNumber: string;
    address: string;
};
export type AuthTokenPayload = {
    _id: string;
    email: string;
    fullName: string;
    avatarUrl: string;
    role: Role;
    phoneNumber: string;
    address: string;
    iat: number;
    exp: number;
};
export type QueryType = {
    [key: string]: string;
};
export interface ICategory {
    _id: string;
    name: string;
    parentCategory: string | null;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}
export interface IBrand {
    _id: string;
    name: string;
    countryOfOrigin: string | null;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}
export interface IProduct {
    _id: string;
    code: string;
    name: string;
    description: string;
    imageUrl: string;
    category: ICategory | null;
    brand: IBrand | null;
    supplier: ISupplier | null;
    status: ProductStatus;
    basePrice: number;
    createdAt: string;
    updatedAt: string;
    views: number;
    skus: ISku[];
    attributeOptions?: {
        name: string;
        values: string[];
    }[];
}
export interface ISupplier {
    _id: string;
    name: string;
    email: string;
    phoneNumber: string;
    code: string;
    address: string;
    note: string;
    companyName: string;
    taxCode: string;
    createdAt: string;
    updatedAt: string;
}
export interface ISku {
    _id: string;
    sku: string;
    product: Omit<IProduct, 'skus' | 'attributeOptions'>;
    barcode: string;
    costPrice: number;
    stockOnHand: number;
    attributes: {
        value: string;
        name: string;
    }[];
    sellingPrice: number;
    imageUrl: string;
    createdAt: string;
    updatedAt: string;
}
