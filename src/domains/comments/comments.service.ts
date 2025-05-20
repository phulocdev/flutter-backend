import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Comment, CommentDocument } from './schemas/comment.schema'
import { CreateCommentDto } from './dto/create-comment.dto'
import { BadRequestError } from 'core/exceptions/errors.exception'
import { ProductsService } from 'domains/products/products.service'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
    private readonly productsService: ProductsService
  ) {}

  // Create a new comment or rating
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const { stars, accountId, productId } = createCommentDto
    if (stars && !accountId) {
      throw new BadRequestError('Khánh hàng phải đăng nhập thì mới có thể đánh giá')
    }

    // update value in star field of product doc
    const totalCommentWithStarCounts = (await this.commentModel.find({ productId })).filter(
      (comment) => !!comment.stars
    ).length
    const currentRating = (await this.productsService.findOne(productId)).star
    const updatedRating = (stars + currentRating) / (1 + totalCommentWithStarCounts)

    await this.productsService.update(productId, { star: updatedRating })

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
