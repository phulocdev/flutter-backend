import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type CategoryDocument = mongoose.HydratedDocument<Category>

@Schema({ timestamps: true, versionKey: false, collection: 'Categories' })
export class Category {
  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, type: String })
  description: string

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  parentCategory: Category | null
  // parentCategory:  CategoryDocument
  // parentCategory?:  CategoryDocument

  @Prop({ required: false, default: '', type: String })
  imageUrl: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)
