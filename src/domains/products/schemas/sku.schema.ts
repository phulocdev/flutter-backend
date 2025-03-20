import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Product } from 'domains/products/schemas/product.schema'
import * as mongoose from 'mongoose'

export type SkuDocument = mongoose.HydratedDocument<Sku>

@Schema({ timestamps: true, versionKey: false, collection: 'Skus' })
export class Sku {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product | null
  // product: Product
  // product?: Product

  @Prop({ required: true, type: String, unique: true })
  sku: string

  @Prop({ required: true, type: Number })
  basePrice: number

  @Prop({ required: true, type: Number })
  stockQuantity: number

  @Prop({ default: [], type: [String] })
  images: string[]
}

export const SkuSchema = SchemaFactory.createForClass(Sku)
