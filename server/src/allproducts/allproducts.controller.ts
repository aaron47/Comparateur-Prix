import { TousProduits } from 'src/models/TousProduits.schema';
import { AllproductsRepository } from './allproducts.repository';
import { Controller, Get, Param, Logger } from '@nestjs/common';
import { Public } from 'src/auth/common/decorators';

@Public()
@Controller('allproducts')
export class AllproductsController {
  // private readonly logger = new Logger(AllproductsController.name);

  constructor(private readonly allproductsRepository: AllproductsRepository) {}

  @Get('')
  async getAllProducts(): Promise<TousProduits[]> {
    return this.allproductsRepository.findAll({});
  }

  @Get('manufacturer/:manufacturer')
  async getProductsByManufacturer(
    @Param('manufacturer') manufacturer: string,
  ): Promise<TousProduits[]> {
    return this.allproductsRepository.findAll({
      manufacturer: manufacturer.toLowerCase(),
    });
  }

  @Get(':id')
  async getOneProduct(@Param('id') id: string): Promise<TousProduits> {
    return this.allproductsRepository.findOneById({ _id: id });
  }

  @Get('sort/:sort')
  async getSortedProducts(
    @Param('sort') sort: 'asc' | 'desc',
  ): Promise<TousProduits[]> {
    return this.allproductsRepository.getSortedProducts(sort);
  }
}
