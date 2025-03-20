import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core/core.module'
import { AccountsModule } from './domains/accounts/accounts.module'
import { AuthModule } from 'domains/auth/auth.module'
import { MediaModule } from './domains/media/media.module'
import { ProductsModule } from './domains/products/products.module'
import { CartsModule } from './domains/carts/carts.module'
import { CategoriesModule } from './domains/categories/categories.module'
import { OrdersModule } from 'domains/orders/orders.module'

@Module({
  imports: [
    CoreModule,
    AuthModule,
    AccountsModule,
    MediaModule,
    OrdersModule,
    ProductsModule,
    CartsModule,
    CategoriesModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
