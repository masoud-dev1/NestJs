import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DiscountModule } from '../discount/discount.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Discount } from '../discount/entities/discount.entity';

@Module({
  imports: [DiscountModule, TypeOrmModule.forFeature([Product, Discount])],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
