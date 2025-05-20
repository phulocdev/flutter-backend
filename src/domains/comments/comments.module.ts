import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Comment, CommentSchema } from 'domains/comments/schemas/comment.schema'
import { ProductsModule } from 'domains/products/products.module'
import { CommentsController } from './comments.controller'
import { CommentsService } from './comments.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Comment.name, schema: CommentSchema }]), ProductsModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
