import { CartService } from 'domains/cart/cart.service'
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { AddToCartDto } from 'domains/cart/dto/add-to-cart.dto'
import { Account } from 'core/decorators/account.decorator'
import { AccountType } from 'core/types/type'
import { UpdateCartItemDto } from 'domains/cart/dto/update-cart-item.dto'
import { DeleteCartItemsDto } from 'domains/cart/dto/delete-cart-items.dto'

@Controller('cart')
export class CartsController {
  constructor(private readonly cartService: CartService) {}

  @Post('items')
  addToCart(@Body() addToCartDto: AddToCartDto, @Account() account: AccountType) {
    return this.cartService.addToCart(addToCartDto, account)
  }

  @Patch('items')
  update(@Body() updateCartItemDto: UpdateCartItemDto, @Account() account: AccountType) {
    return this.cartService.updateCartItem(updateCartItemDto, account)
  }

  @Get()
  findCart(@Account() account: AccountType) {
    return this.cartService.findCart(account)
  }

  @Delete('items')
  remove(@Body() deleteCartItemsDto: DeleteCartItemsDto, @Account() account: AccountType) {
    return this.cartService.removeCartItem(deleteCartItemsDto, account)
  }
}
