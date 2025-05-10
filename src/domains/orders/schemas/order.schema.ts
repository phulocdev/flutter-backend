import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { OrderStatus, PaymentMethod } from 'core/constants/enum'
import { ShippingInfo, ShippingInfoSchema } from 'domains/orders/schemas/shipping-info.schema'
import mongoose from 'mongoose'

@Schema({ timestamps: true, versionKey: false, collection: 'Orders' })
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  _id: mongoose.Types.ObjectId

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  user: mongoose.Types.ObjectId

  @Prop({ required: true, type: String })
  code: string

  @Prop({ required: false, type: Number, enum: OrderStatus, default: OrderStatus.PROCESSING })
  status: OrderStatus

  @Prop({ required: true, type: Number })
  totalPrice: number

  @Prop({ required: false, type: Number, enum: PaymentMethod, default: PaymentMethod.COD })
  paymentMethod: PaymentMethod

  @Prop({ required: false, type: Date, default: '' })
  paymentAt: Date

  @Prop({ required: false, type: Date, default: '' })
  deliveredAt: Date

  @Prop({ required: false, type: Date, default: '' })
  cancelledAt: Date

  @Prop(ShippingInfoSchema)
  shippingInfo: ShippingInfo

  @Prop({ required: false, type: mongoose.Schema.Types.ObjectId, default: null })
  updateBy: mongoose.Types.ObjectId
}

export const OrderSchema = SchemaFactory.createForClass(Order)

export type OrderDocument = mongoose.HydratedDocument<
  Order,
  {
    shippingInfo: ShippingInfo
  }
>
