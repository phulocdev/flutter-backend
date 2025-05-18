import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { CreateCommentDto } from './dto/create-comment.dto'
import { BadRequestError } from 'core/exceptions/errors.exception'

@Injectable()
export class CommentsService {
  constructor(@InjectModel(Comment.name) private commentModel: Model<CommentDocument>) {}

  // Create a new comment or rating
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { stars, accountId } = createCommentDto
    if (stars && !accountId) {
      throw new BadRequestError('Khánh hàng phải đăng nhập thì mới có thể đánh giá')
    }

    const newComment = new this.commentModel(createCommentDto)
    return newComment.save()
  }

  // Get all comments for a specific product
  async findByProduct(productId: string): Promise<Comment[]> {
    return this.commentModel.find({ productId }).sort({ createdAt: -1 }).exec()
  }

  // Delete comment by ID
  async remove(id: string): Promise<Comment | null> {
    return this.commentModel.findByIdAndDelete(id).exec()
  }
}
