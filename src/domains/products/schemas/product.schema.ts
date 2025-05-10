import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ProductStatus } from 'core/constants/enum'
import { Brand } from 'domains/brands/schemas/brand.schema'
import { Category } from 'domains/categories/schemas/category.schema'
import * as mongoose from 'mongoose'

export type ProductDocument = mongoose.HydratedDocument<Product>

@Schema({ timestamps: true, versionKey: false, collection: 'Products' })
export class Product {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId

  @Prop({ required: true, type: String, unique: true })
  code: string

  @Prop({ required: true, type: String })
  name: string

  @Prop({ required: false, type: String, default: '' })
  description: string

  @Prop({ required: false, default: '', type: String })
  imageUrl: string

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
  category: Category

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Brand' })
  brand: Brand

  @Prop({ required: false, type: String, enum: ProductStatus, default: ProductStatus.Published })
  status: ProductStatus

  @Prop({ required: true, type: Number })
  basePrice: number

  @Prop({ required: true, type: Number })
  minStockLevel: number

  @Prop({ required: true, type: Number })
  maxStockLevel: number

  @Prop({ required: false, type: Number, default: 0 })
  views: number
}

export const ProductSchema = SchemaFactory.createForClass(Product)
