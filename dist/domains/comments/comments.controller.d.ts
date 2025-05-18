import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(createCommentDto: CreateCommentDto): Promise<import("./schemas/comment.schema").Comment>;
    findByProduct(productId: string): Promise<import("./schemas/comment.schema").Comment[]>;
    remove(id: string): Promise<import("./schemas/comment.schema").Comment>;
}
