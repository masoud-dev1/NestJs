// data-source.ts
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { User } from './src/user/entities/user.entity';
import { Product } from './src/product/entities/product.entity';
import { Category } from './src/category/entities/category.entity';
import { Discount } from './src/discount/entities/discount.entity';

// بارگذاری متغیرهای محیطی (مشابه کاری که NestJS در AppModule انجام می‌دهد)
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('DB_HOST', 'localhost'),
  port: configService.get('DB_PORT', 5432),
  username: configService.get('DB_USERNAME', 'postgres'),
  password: configService.get('DB_PASSWORD', '1'),
  database: configService.get('DB_NAME', 'nestjs'),
  entities: [User, Product, Category, Discount], // بعد از build
  migrations: ['src/migrations/*.ts'],
  synchronize: false, // هماهنگ با app.module که معمولاً false برای migration
  logging: true,
});
