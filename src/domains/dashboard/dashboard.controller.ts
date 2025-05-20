import { Controller, Get, Query } from '@nestjs/common'
import { ValidateDateRange } from 'core/pipes/validate-date-range.pipe'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'
import { DashboardService } from 'domains/dashboard/dashboard.service'

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  dashboard(@Query(ValidateDateRange) dateRangeQuery: DateRangeQueryDto) {
    return this.dashboardService.statistic(dateRangeQuery.from, dateRangeQuery.to)
  }
}
