import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Account } from 'domains/accounts/schemas/account.schema'
import { CartItem, CartItemSchema } from 'domains/cart/schemas/cart-item.schema'
import * as mongoose from 'mongoose'

@Schema({ timestamps: true, versionKey: false, collection: 'Carts' })
export class Cart {
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Account' })
  account: Account | null // TODO: change to CategoryDocument || null
  // account?:  AccountDocument // TODO: change to CategoryDocument || null
  // account:  AccountDocument // TODO: change to CategoryDocument || null

  @Prop({ required: true, type: [CartItemSchema] })
  items: CartItem[]
}

export const CartSchema = SchemaFactory.createForClass(Cart)

export type CartDocument = mongoose.HydratedDocument<
  Cart,
  {
    items: mongoose.Types.DocumentArray<CartItem>
  }
>
