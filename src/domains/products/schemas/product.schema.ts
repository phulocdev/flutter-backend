import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ProductActive } from 'core/constants/enum'
import { Category } from 'domains/categories/schemas/category.schema'
import * as mongoose from 'mongoose'

export type ProductDocument = mongoose.HydratedDocument<Product>

@Schema({ timestamps: true, versionKey: false, collection: 'Products' })
export class Product {
  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: true, type: String })
  description: string

  @Prop({ required: false, default: '', type: String })
  imageUrl: string

  // Định nghĩa type là null thì khi findOne() TS không có check null pointer exception
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category | null
  // category: Category
  // category?: Category

  @Prop({ required: true, type: String })
  brand: string

  @Prop({ required: false, type: String, enum: ProductActive, default: ProductActive.Show })
  active: ProductActive
  // active?: ProductActive

  // @Prop({ required: true , type: Number})
  // basePrice: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)
