import { Model } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsService {
    private commentModel;
    constructor(commentModel: Model<CommentDocument>);
    create(createCommentDto: CreateCommentDto): Promise<Comment>;
    findByProduct(productId: string): Promise<Comment[]>;
    remove(id: string): Promise<Comment | null>;
}
