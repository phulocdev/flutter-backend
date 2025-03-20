import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Account } from 'domains/accounts/schemas/account.schema'
import { OrderItem, OrderItemSchema } from 'domains/carts/schemas/order-item.schema'
import * as mongoose from 'mongoose'

@Schema({ timestamps: true, versionKey: false, collection: 'Orders' })
export class Order {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account | null // TODO: change to CategoryDocument || null
  // account?:  AccountDocument // TODO: change to CategoryDocument || null
  // account:  AccountDocument // TODO: change to CategoryDocument || null

  @Prop({ required: true, type: [OrderItemSchema] })
  items: OrderItem[]
}

export const OrderSchema = SchemaFactory.createForClass(Order)

export type OrderDocument = mongoose.HydratedDocument<
  Order,
  {
    items: mongoose.Types.DocumentArray<OrderItem>
  }
>
