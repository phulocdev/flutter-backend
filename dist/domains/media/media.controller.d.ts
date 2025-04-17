/// <reference types="multer" />
/// <reference types="cookie-parser" />
import { CloudinaryService } from 'domains/cloudinary/cloudinary.service';
import { Request as RequestType } from 'express';
export declare class MediaController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadImage(file: Express.Multer.File, req: RequestType): Promise<{
        result: any;
    }>;
    uploadMultipleFiles(files: Array<Express.Multer.File>, req: RequestType): Promise<{
        result: string[];
    }>;
}
