import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CartModule } from './cart/cart.module';
import { CustomerModule } from './customer/customer.module';
import { DiscountModule } from './discount/discount.module';
import { OrderModule } from './order/order.module';
import { PaymentModule } from './payment/payment.module';
import { ProductsModule } from './products/products.module';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SupplierModule } from './supplier/supplier.module';
import { GoodsreceiptModule } from './goodsreceipt/goodsreceipt.module';
import { StatisticalModule } from './statistical/statistical.module';
import { CategoryModule } from './category/category.module';
import { BrandModule } from './brand/brand.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot({ isGlobal: true }), ProductsModule, AccountModule, CustomerModule, DiscountModule, CartModule, OrderModule, PaymentModule, SupplierModule, GoodsreceiptModule, StatisticalModule, CategoryModule, BrandModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule { }
