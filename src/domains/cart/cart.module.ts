import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CartsController } from 'domains/cart/cart.controller'
import { Cart, CartSchema } from 'domains/cart/schemas/cart.schema'
import { ProductsModule } from 'domains/products/products.module'
import { CartService } from './cart.service'

@Module({
  imports: [MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]), ProductsModule],
  controllers: [CartsController],
  providers: [CartService]
})
export class CartModule {}
