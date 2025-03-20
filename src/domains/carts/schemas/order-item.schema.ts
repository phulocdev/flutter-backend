import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'

@Schema({ versionKey: false })
export class OrderItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'sku' })
  sku: mongoose.Types.ObjectId

  @Prop({ required: true, type: Number })
  quantity: number

  @Prop({ required: true, type: Number })
  pricePurchase: number

  @Prop({ type: Date, default: Date.now })
  createdAt?: string

  @Prop({ type: Date, default: Date.now })
  updatedAt?: string
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem)
