import { Module } from '@nestjs/common'
import { AuthModule } from 'domains/auth/auth.module'
import { CloudinaryModule } from 'domains/cloudinary/cloudinary.module'
import { OrdersModule } from 'domains/orders/orders.module'
import { OtpsService } from 'domains/otps/otps.service'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoreModule } from './core/core.module'
import { AccountsModule } from './domains/accounts/accounts.module'
import { BrandsModule } from './domains/brands/brands.module'
import { CartModule } from './domains/cart/cart.module'
import { CategoriesModule } from './domains/categories/categories.module'
import { MailModule } from './domains/mail/mail.module'
import { MediaModule } from './domains/media/media.module'
import { ProductsModule } from './domains/products/products.module'
import { OtpsModule } from 'domains/otps/otps.module'
import { CommentsModule } from './domains/comments/comments.module'
import { CouponsModule } from './domains/coupons/coupons.module';
import { DashboardModule } from './domains/dashboard/dashboard.module';

@Module({
  imports: [
    CoreModule,
    AuthModule,
    OtpsModule,
    AccountsModule,
    MediaModule,
    OrdersModule,
    ProductsModule,
    CategoriesModule,
    CloudinaryModule,
    BrandsModule,
    CartModule,
    MailModule,
    CommentsModule,
    CouponsModule,
    DashboardModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
