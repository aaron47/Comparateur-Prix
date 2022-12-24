import { TunisianetProduits, TunisianetProduitsSchema } from './../models';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TunisianetController } from './tunisianet.controller';
import { TunisianetRepository } from './tunisianet.repository';
import { TunisianetService } from './tunisianet.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TunisianetProduits.name, schema: TunisianetProduitsSchema },
    ]),
  ],
  controllers: [TunisianetController],
  providers: [
    {
      provide: 'TUNISIANET_SERVICE',
      useClass: TunisianetService,
    },
    TunisianetRepository,
  ],
})
export class TunisianetModule {}
