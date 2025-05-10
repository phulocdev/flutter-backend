import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Product } from 'domains/products/schemas/product.schema'
import * as mongoose from 'mongoose'

export type ProductAttributeDocument = mongoose.HydratedDocument<ProductAttribute>

@Schema({ timestamps: true, versionKey: false, collection: 'ProductAttributes' })
export class ProductAttribute {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product

  @Prop({ required: true, type: String })
  name: string
}

export const ProductAttributeSchema = SchemaFactory.createForClass(ProductAttribute)

ProductAttributeSchema.index({ product: 1, name: 1 }, { unique: true })
