import { TousProduits } from 'src/models/TousProduits.schema';
import { AllproductsRepository } from './allproducts.repository';
import {
  Controller,
  Get,
  Param,
  Logger,
  Inject,
  CACHE_MANAGER,
  CacheKey,
  CacheTTL,
} from '@nestjs/common';
import { Public } from 'src/auth/common/decorators';
import { Cache } from 'cache-manager';

@Public()
@Controller('allproducts')
export class AllproductsController {
  // private readonly logger = new Logger(AllproductsController.name);

  constructor(
    private readonly allproductsRepository: AllproductsRepository,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  @Get('')
  @CacheKey('ALL_PRODUCTS')
  @CacheTTL(600)
  async getAllProducts(): Promise<TousProduits[]> {
    // return this.allproductsRepository.findAll({});
    await this.cacheManager.set(
      'ALL_PRODUCTS',
      await this.allproductsRepository.findAll({}),
    );
    return await this.cacheManager.get('ALL_PRODUCTS');
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
