import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { DiscountModule } from './discount/discount.module';
import { Product } from './product/entities/product.entity';
import { Category } from './category/entities/category.entity';
import { Discount } from './discount/entities/discount.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST', 'localhost'),
        port: configService.get('DB_PORT', 5432),
        username: configService.get('DB_USERNAME', 'postgres'),
        password: configService.get('DB_PASSWORD', '1'),
        database: configService.get('DB_NAME', 'nestjs'),
        entities: [User, Product, Category, Discount],
        synchronize: false, // فقط در توسعه (در production false)
      }),
    }),
    UserModule,
    JwtModule.register({
      global: true,
      secret: 'asdsadsadsadasd12121',
      signOptions: { expiresIn: '30s' },
    }),
    ProductModule,
    CategoryModule,
    DiscountModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
