import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CreateCommentDto } from './dto/create-comment.dto'
import { Public } from 'core/decorators/public.decorator'

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Public()
  @Post()
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentsService.create(createCommentDto)
  }

  @Public()
  @Get('product/:productId')
  findByProduct(@Param('productId') productId: string) {
    return this.commentsService.findByProduct(productId)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.commentsService.remove(id)
  }
}
