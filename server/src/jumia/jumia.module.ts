import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Produits, ProduitsSchema } from './../models';
import { JumiaController } from './jumia.controller';
import { JumiaRepository } from './jumia.repository';
import { JumiaService } from './jumia.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Produits.name, schema: ProduitsSchema },
    ]),
    UsersModule,
  ],
  controllers: [JumiaController],
  providers: [
    {
      provide: 'JUMIA_SERVICE',
      useClass: JumiaService,
    },
    JumiaRepository,
  ],
  exports: [JumiaRepository],
})
export class JumiaModule {}
