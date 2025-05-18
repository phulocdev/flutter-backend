import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CouponsController } from './coupons.controller'
import { CouponsService } from './coupons.service'
import { Coupon, CouponSchema } from './schemas/coupon.schema'
import { OrdersModule } from '../orders/orders.module'

@Module({
  imports: [MongooseModule.forFeature([{ name: Coupon.name, schema: CouponSchema }]), OrdersModule],
  controllers: [CouponsController],
  providers: [CouponsService],
  exports: [CouponsService]
})
export class CouponsModule {}
