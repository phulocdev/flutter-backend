import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose from 'mongoose'

export type CommentDocument = mongoose.HydratedDocument<Comment>

@Schema({ versionKey: false, collection: 'Comments', timestamps: true })
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true })
  productId: mongoose.Types.ObjectId

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: false, default: null })
  accountId: mongoose.Types.ObjectId

  @Prop({ type: String, required: false, default: '' })
  content: string

  @Prop({ type: String, required: false, default: '' })
  name?: string

  @Prop({ type: Number, required: false, min: 1, max: 5, default: null })
  stars: number

  @Prop({ type: String, required: false, default: '' })
  email?: string
}

export const CommentSchema = SchemaFactory.createForClass(Comment)
