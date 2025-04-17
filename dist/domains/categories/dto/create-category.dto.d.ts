import { Types } from 'mongoose';
export declare class CreateCategoryDto {
    name: string;
    parentCategory: Types.ObjectId;
    imageUrl?: string;
}
