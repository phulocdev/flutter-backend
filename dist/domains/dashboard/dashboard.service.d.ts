import { AccountsService } from 'domains/accounts/accounts.service';
import { OrdersService } from 'domains/orders/orders.service';
import { ProductsService } from 'domains/products/products.service';
export declare class DashboardService {
    private readonly productsService;
    private readonly accountsService;
    private readonly ordersService;
    constructor(productsService: ProductsService, accountsService: AccountsService, ordersService: OrdersService);
    statistic(from?: Date, to?: Date): Promise<{
        accountCounts: number;
        productCounts: number;
        orderCounts: number;
        orderTodayCounts: number;
        invest: any;
    }>;
}
