import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ProductsService } from 'domains/products/products.service';
export declare class CommentsService {
    private commentModel;
    private readonly productsService;
    constructor(commentModel: Model<CommentDocument>, productsService: ProductsService);
    create(createCommentDto: CreateCommentDto): Promise<Comment>;
    findByProduct(productId: string): Promise<Comment[]>;
    remove(id: string): Promise<Comment | null>;
}
