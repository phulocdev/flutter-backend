import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto';
import { DashboardService } from 'domains/dashboard/dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
    dashboard(dateRangeQuery: DateRangeQueryDto): Promise<{
        accountCounts: number;
        productCounts: number;
        orderCounts: number;
        orderTodayCounts: number;
        invest: any;
    }>;
}
