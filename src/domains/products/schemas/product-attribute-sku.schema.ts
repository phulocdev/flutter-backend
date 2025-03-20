import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ProductAttribute } from 'domains/products/schemas/product-attributes.schema'
import { Sku } from 'domains/products/schemas/sku.schema'
import * as mongoose from 'mongoose'

export type ProductAttributeSkuDocument = mongoose.HydratedDocument<ProductAttributeSku>

@Schema({ timestamps: true, versionKey: false, collection: 'ProductAttributeSku' })
export class ProductAttributeSku {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'ProductAttribute' })
  productAttribute: ProductAttribute | null
  // productAttribute: ProductAttribute
  // productAttribute?: ProductAttribute

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Sku' })
  sku: Sku | null
  // sku: Sku
  // sku?: Sku

  // Attribute Value
  @Prop({ required: true, type: String })
  value: string
}

export const ProductAttributeSkuSchema = SchemaFactory.createForClass(ProductAttributeSku)

ProductAttributeSkuSchema.index({ productAttribute: 1, sku: 1 }, { unique: true })
