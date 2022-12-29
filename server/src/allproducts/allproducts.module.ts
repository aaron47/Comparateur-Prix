import { JumiaModule } from './../jumia/jumia.module';
import { Module } from '@nestjs/common';
import { AllproductsController } from './allproducts.controller';
import { TunisianetModule } from 'src/tunisianet/tunisianet.module';

@Module({
  imports: [JumiaModule, TunisianetModule],
  controllers: [AllproductsController],
})
export class AllproductsModule {}
