import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { CouponQueryDto, CreateCouponDto, UpdateCouponDto } from 'domains/coupons/dto/create-coupon.dto'
import { CouponsService } from './coupons.service'
import { Public } from 'core/decorators/public.decorator'

@Controller('coupons')
export class CouponsController {
  constructor(private readonly couponsService: CouponsService) {}

  @Post()
  create(@Body() createCouponDto: CreateCouponDto) {
    return this.couponsService.create(createCouponDto)
  }

  @Get()
  findAll(@Query() qs: PaginationQueryDto & DateRangeQueryDto & CouponQueryDto) {
    return this.couponsService.findAll(qs)
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.couponsService.findById(id)
  }

  @Get('code/:code')
  findByCode(@Param('code') code: string) {
    return this.couponsService.findByCode(code)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCouponDto: UpdateCouponDto) {
    return this.couponsService.update(id, updateCouponDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.couponsService.remove(id)
  }

  @Post(':id/apply/:orderId')
  applyCoupon(@Param('id') id: string, @Param('orderId') orderId: string) {
    return this.couponsService.applyCoupon(id, orderId)
  }

  @Public()
  @Post('validate/:code')
  validateCoupon(@Param('code') code: string, @Body('totalAmount') totalAmount: number) {
    return this.couponsService.validateCoupon(code, totalAmount)
  }
}
