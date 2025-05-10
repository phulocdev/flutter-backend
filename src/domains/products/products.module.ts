import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Product, ProductSchema } from 'domains/products/schemas/product.schema'
import { ProductAttribute, ProductAttributeSchema } from 'domains/products/schemas/product-attributes.schema'
import { Sku, SkuSchema } from 'domains/products/schemas/sku.schema'
import { ProductAttributeSku, ProductAttributeSkuSchema } from 'domains/products/schemas/product-attribute-sku.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductAttribute.name, schema: ProductAttributeSchema },
      { name: Sku.name, schema: SkuSchema },
      {
        name: ProductAttributeSku.name,
        schema: ProductAttributeSkuSchema
      }
    ])
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService]
})
export class ProductsModule {}
