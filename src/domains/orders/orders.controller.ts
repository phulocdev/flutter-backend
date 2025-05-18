import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common'
import { OrdersService } from './orders.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { ResponseMessage } from 'core/decorators/response-message.decorator'
import { Account } from 'core/decorators/account.decorator'
import { AccountType } from 'core/types/type'
import { PaginationQueryDto } from 'core/query-string-dtos/pagination-query.dto'
import { ValidateDateRange } from 'core/pipes/validate-date-range.pipe'
import { DateRangeQueryDto } from 'core/query-string-dtos/date-range-query.dto'
import { OrderQueryDto } from 'domains/orders/dto/order-query.dto'
import { ValidateMongoIdPipe } from 'core/pipes/validate-mongo-id.pipe'
import { BulkDeleteOrderDto } from 'domains/orders/dto/bulk-delete-order.dto'
import { Public } from 'core/decorators/public.decorator'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Public()
  @Post()
  @ResponseMessage('Tạo mới đơn hàng thành công')
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto)
  }

  @Get()
  @ResponseMessage('Fetch danh sách đơn hàng thành công')
  findAll(
    @Query() paginationQuery: PaginationQueryDto,
    @Query(ValidateDateRange) dateRangeQuery: DateRangeQueryDto,
    @Query() orderQuery: OrderQueryDto
  ) {
    return this.ordersService.findAll({ ...paginationQuery, ...dateRangeQuery, ...orderQuery })
  }

  @Get('customer')
  @ResponseMessage('Fetch danh sách đơn hàng của KH thành công')
  findAllByCustomer(@Query() paginationQuery: PaginationQueryDto = {}, @Account() account: AccountType) {
    return this.ordersService.findAllByCustomer({ ...paginationQuery }, account)
  }

  @Get('a/:id')
  @ResponseMessage('Fetch chi tiết đơn hàng thành công')
  findOneA(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.ordersService.findOrderDoc(id)
  }

  @Get(':id')
  @ResponseMessage('Fetch chi tiết đơn hàng thành công')
  findOne(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.ordersService.findOne(id)
  }

  @Patch(':id')
  @ResponseMessage('Cập nhật đơn hàng thành công')
  update(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body() updateOrderDto: UpdateOrderDto,
    @Account() account: AccountType
  ) {
    return this.ordersService.update(id, updateOrderDto, account)
  }

  @Delete('bulk-delete')
  bulkRemove(@Body() bulkDeleteOrderDto: BulkDeleteOrderDto) {
    return this.ordersService.bulkRemove(bulkDeleteOrderDto.ids)
  }

  @Delete(':id')
  remove(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.ordersService.remove(id)
  }
}
