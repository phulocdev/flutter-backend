import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { Types } from 'mongoose'

@Schema({ versionKey: false, collection: 'OrderDetails' })
export class OrderItem {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Order' })
  order: Types.ObjectId

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  sku: Types.ObjectId

  @Prop({ required: true, type: Number })
  quantity: number

  @Prop({ required: true, type: Number })
  sellingPrice: number

  @Prop({ required: true, type: Number })
  costPrice: number

  @Prop({ type: Date, default: Date.now })
  createdAt?: string

  @Prop({ type: Date, default: Date.now })
  updatedAt?: string
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem)
