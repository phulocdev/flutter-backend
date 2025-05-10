import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Product } from 'domains/products/schemas/product.schema'
import * as mongoose from 'mongoose'

export type SkuDocument = mongoose.HydratedDocument<Sku>

@Schema({ timestamps: true, versionKey: false, collection: 'Skus' })
export class Sku {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
  product: Product | null

  // Mã hàng - Mã SKU
  @Prop({ required: true, type: String, unique: true })
  sku: string

  // Mã vạch - Scan mã,...
  @Prop({ required: true, type: String, unique: true })
  barcode: string

  // Giá vốn
  @Prop({ required: true, type: Number })
  costPrice: number

  // Giá bán
  @Prop({ required: true, type: Number })
  sellingPrice: number

  // Tồn kho
  @Prop({ required: true, type: Number })
  stockOnHand: number

  @Prop({ required: false, type: String, default: '' })
  imageUrl: string
}

export const SkuSchema = SchemaFactory.createForClass(Sku)
