import { Injectable } from '@nestjs/common'
import { BadRequestError } from 'core/exceptions/errors.exception'
import { AccountsService } from 'domains/accounts/accounts.service'
import { OrdersService } from 'domains/orders/orders.service'
import { ProductsService } from 'domains/products/products.service'

@Injectable()
export class DashboardService {
  constructor(
    private readonly productsService: ProductsService,
    private readonly accountsService: AccountsService,
    private readonly ordersService: OrdersService
  ) {}

  async statistic(from?: Date, to?: Date) {
    if (!from || !to) throw new BadRequestError('from to required')

    const [accountCounts, productCounts, orderCounts, orderTodayCounts, invest] = await Promise.all([
      this.accountsService.countDocs(),
      this.productsService.countDocs(),
      this.ordersService.countDocs(),
      this.ordersService.countDocsToday(),
      this.ordersService.calculateInvest(from, to)
    ])

    return {
      accountCounts,
      productCounts,
      orderCounts,
      orderTodayCounts,
      invest
    }
  }
}
