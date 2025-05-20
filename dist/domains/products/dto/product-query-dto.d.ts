import { ProductStatus } from 'core/constants/enum';
export declare class ProductQueryDto {
    sort?: string;
    code?: string;
    name?: string;
    categoryIds?: string[];
    brandIds?: string[];
    hasDiscount: number;
    status?: ProductStatus;
    minPrice?: number;
    minRating?: number;
    maxPrice?: number;
}
