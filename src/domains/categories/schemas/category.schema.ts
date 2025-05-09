import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

export type CategoryDocument = mongoose.HydratedDocument<Category>

@Schema({ versionKey: false, collection: 'Categories', timestamps: true })
export class Category {
  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null })
  parentCategory: CategoryDocument

  @Prop({ required: false, default: '', type: String })
  imageUrl: string
}

export const CategorySchema = SchemaFactory.createForClass(Category)

CategorySchema.index({ name: 1, parentCategory: 1 }, { unique: true })
