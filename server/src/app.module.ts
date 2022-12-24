import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { JumiaModule } from './jumia/jumia.module';
import { TunisianetModule } from './tunisianet/tunisianet.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        PORT: Joi.number().required(),
        THROTTLE_TTL: Joi.number().required(),
        THROTTLE_LIMIT: Joi.number().required(),
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: configService.get<number>('THROTTLE_TTL'),
        limit: configService.get<number>('THROTTLE_LIMIT'),
      }),
    }),
    JumiaModule,
    TunisianetModule,
  ],

  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
