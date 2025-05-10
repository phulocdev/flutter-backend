import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

@Schema({ versionKey: false })
export class CartItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sku' })
  sku: mongoose.Types.ObjectId

  @Prop({ required: true, type: Number })
  quantity: number

  @Prop({ type: Date, default: Date.now })
  createdAt?: string

  @Prop({ type: Date, default: Date.now })
  updatedAt?: string
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem)
