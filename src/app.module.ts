import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core/core.module'
import { AccountsModule } from './domains/accounts/accounts.module'
import { AuthModule } from 'domains/auth/auth.module'
import { MediaModule } from './domains/media/media.module'
import { ProductsModule } from './domains/products/products.module'
import { CategoriesModule } from './domains/categories/categories.module'
import { OrdersModule } from 'domains/orders/orders.module'
import { CloudinaryModule } from 'domains/cloudinary/cloudinary.module'
import { BrandsModule } from './domains/brands/brands.module'
import { CartModule } from './domains/cart/cart.module'

@Module({
  imports: [
    CoreModule,
    AuthModule,
    AccountsModule,
    MediaModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    CloudinaryModule,
    BrandsModule,
    CartModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
