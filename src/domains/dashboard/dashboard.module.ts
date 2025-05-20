import { Module } from '@nestjs/common'
import { AccountsService } from 'domains/accounts/accounts.service'
import { OrdersService } from 'domains/orders/orders.service'
import { ProductsModule } from 'domains/products/products.module'
import { DashboardController } from './dashboard.controller'
import { DashboardService } from './dashboard.service'
import { OrdersModule } from 'domains/orders/orders.module'
import { AccountsModule } from 'domains/accounts/accounts.module'

@Module({
  imports: [ProductsModule, OrdersModule, AccountsModule],
  controllers: [DashboardController],
  providers: [DashboardService]
})
export class DashboardModule {}
