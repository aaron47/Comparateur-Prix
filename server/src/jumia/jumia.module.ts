import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Produits, ProduitsSchema } from './../models';
import { JumiaController } from './jumia.controller';
import { JumiaRepository } from './jumia.repository';
import { JumiaService } from './jumia.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Produits.name, schema: ProduitsSchema },
    ]),
  ],
  controllers: [JumiaController],
  providers: [
    {
      provide: 'JUMIA_SERVICE',
      useClass: JumiaService,
    },
    JumiaRepository,
  ],
})
export class JumiaModule {}
