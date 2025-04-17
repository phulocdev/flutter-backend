import { ProductStatus } from 'core/constants/enum';
import { SkuDto } from 'domains/products/dto/sku.dto';
import { Types } from 'mongoose';
export declare class CreateProductDto {
    name: string;
    description: string;
    category: Types.ObjectId;
    brand: string;
    status?: ProductStatus;
    basePrice: number;
    imageUrl?: string | undefined;
    attributeNames?: string[] | undefined;
    skus?: SkuDto[] | undefined;
}
