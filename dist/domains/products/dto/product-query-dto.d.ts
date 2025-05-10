import { ProductStatus } from 'core/constants/enum';
export declare class ProductQueryDto {
    sort?: string;
    code?: string;
    name?: string;
    categoryId?: string;
    brandId?: string;
    status?: ProductStatus;
    minPrice?: number;
    maxPrice?: number;
}
