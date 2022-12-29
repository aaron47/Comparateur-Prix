import { TousProduits, TousProduitsSchema } from './../models';
import { Module } from '@nestjs/common';
import { AllproductsController } from './allproducts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AllproductsRepository } from './allproducts.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TousProduits.name, schema: TousProduitsSchema },
    ]),
  ],
  controllers: [AllproductsController],
  providers: [AllproductsRepository],
})
export class AllproductsModule {}
