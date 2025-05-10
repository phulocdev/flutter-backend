import { Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { AccountType, ISku } from 'core/types/type'
import { AddToCartDto } from 'domains/cart/dto/add-to-cart.dto'
import { DeleteCartItemsDto } from 'domains/cart/dto/delete-cart-items.dto'
import { UpdateCartItemDto } from 'domains/cart/dto/update-cart-item.dto'
import { Cart } from 'domains/cart/schemas/cart.schema'
import { ProductsService } from 'domains/products/products.service'
import { Model } from 'mongoose'
import { firstValueFrom } from 'rxjs'

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private readonly cartModel: Model<Cart>,
    private readonly productsService: ProductsService
  ) {}

  create(account: AccountType) {
    return this.cartModel.create({ account: account._id, items: [] })
  }

  async addToCart(addToCartDto: AddToCartDto, account: AccountType) {
    // Validate: Must check quantity in DTO with stockOnHand value of SKU in Database
    const { skuId, quantity } = addToCartDto
    const skuDocument = await this.productsService.findOneSku(skuId)
    const adjustedQuantity = Math.min(quantity, skuDocument.stockOnHand)

    const cart = await this.cartModel.findOne({ account: account._id })
    const existingSkuInCart = cart?.items?.find((item) => item.sku.toString() === skuId)

    // If SKU is existing in cart of User - Increase quantity
    if (existingSkuInCart) {
      const prevQuantity = existingSkuInCart.quantity
      const newQuantity = prevQuantity + quantity
      const adjustedQuantity = Math.min(newQuantity, skuDocument.stockOnHand)

      return this.cartModel.updateOne(
        { account: account._id, 'items.sku': skuId },
        { $set: { 'items.$.quantity': adjustedQuantity } }
      )
    }

    // If SKU is not existing in cart of User - Push new Cart Item to items field
    return this.cartModel.updateOne(
      { account: account._id },
      {
        $push: {
          items: {
            sku: skuId,
            quantity: adjustedQuantity
          }
        }
      }
    )
  }

  async updateCartItem(updateCartItemDto: UpdateCartItemDto, account: AccountType) {
    const {
      skuId,
      quantity // quantity này là đã được increase || decrease
    } = updateCartItemDto

    const skuDocument = await this.productsService.findOneSku(skuId)
    const adjustedQuantity = Math.min(quantity, skuDocument.stockOnHand)

    return this.cartModel.updateOne(
      { account: account._id, 'items.sku': skuId },
      { $set: { 'items.$.quantity': adjustedQuantity } }
    )
  }

  async findCart(account: AccountType) {
    const cart = await this.cartModel.findOne({ account: account._id }).lean()

    if (!cart) return []

    const skuIds = cart.items.map((item) => item.sku.toString())

    // Call Product service to get sku details with populated product info
    const skus: ISku[] = await this.productsService.findAllSkus(skuIds)

    // Convert to map for faster lookup
    const skuMap = new Map(skus.map((skuDocument) => [skuDocument._id, skuDocument]))

    // Merge sku info into each item
    const enrichedItems = cart.items.map((cartItem) => {
      const skuInfo = skuMap.get(cartItem.sku.toString())
      return {
        ...cartItem,
        sku: skuInfo ?? null // Attach sku info if exists
      }
    })

    return enrichedItems
  }

  removeCartItem(deleteCartItemsDto: DeleteCartItemsDto, account: AccountType) {
    const { skuIds } = deleteCartItemsDto
    return this.cartModel.updateOne(
      {
        account: account._id
      },
      {
        $pull: {
          items: { sku: { $in: skuIds } }
        }
      }
    )
  }
}
