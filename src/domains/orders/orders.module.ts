import { Module } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { OrdersController } from './orders.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Order, OrderSchema } from 'domains/orders/schemas/order.schema'
import { OrderItem, OrderItemSchema } from 'domains/orders/schemas/order-item.schema'
import { ProductsService } from 'domains/products/products.service'
import { ProductsModule } from 'domains/products/products.module'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: OrderItem.name, schema: OrderItemSchema }
    ]),
    ProductsModule
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
  exports: [OrdersService]
})
export class OrdersModule {}
