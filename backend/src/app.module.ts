import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_INTERCEPTOR, APP_GUARD } from '@nestjs/core';

// Config
import { databaseConfig, jwtConfig, redisConfig } from './config';

// Common
import { AllExceptionsFilter } from './common/filters';
import { TransformInterceptor } from './common/interceptors';

// Entities
import { User, Game, GameKey, Promo, Cart, Order } from './database/entities';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { GamesModule } from './modules/games/games.module';
import { CartModule } from './modules/cart/cart.module';
import { PromosModule } from './modules/promos/promos.module';
import { OrdersModule } from './modules/orders/orders.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    // Config
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, redisConfig],
    }),

    // Rate Limiting
    ThrottlerModule.forRoot([{
      ttl: 60000,
      limit: 100,
    }]),

    // Database
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        port: configService.get('database.port'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        entities: [User, Game, GameKey, Promo, Cart, Order],
        synchronize: process.env.NODE_ENV !== 'production',
      }),
      inject: [ConfigService],
    }),

    // Feature Modules
    AuthModule,
    GamesModule,
    CartModule,
    PromosModule,
    OrdersModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule { }
