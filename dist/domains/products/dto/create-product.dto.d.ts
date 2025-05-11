import { SkuDto } from 'domains/products/dto/sku.dto';
export declare class CreateProductDto {
    name: string;
    description: string;
    category: string;
    brand: string;
    basePrice: number;
    imageUrl?: string;
    minStockLevel: number;
    maxStockLevel: number;
    attributeNames?: string[];
    skus: SkuDto[];
}
