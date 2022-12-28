import { TunisianetProduits } from './../models';
import { Controller, Get, Inject, Logger, Param, Query, UseInterceptors } from '@nestjs/common';
import { ITunisianetService } from './itunisianet';
import { TunisianetInterceptor } from 'src/interceptors';
import { Public } from 'src/auth/common/decorators';

// @UseInterceptors(TunisianetInterceptor)
@Public()
@Controller('tunisianet/products')
export class TunisianetController {
  private readonly logger = new Logger(TunisianetController.name);

  constructor(
    @Inject('TUNISIANET_SERVICE')
    private readonly tunisianetService: ITunisianetService,
  ) {}

  @Get('all')
  async getTunisianetProducts(@Query('limit') limit?: number): Promise<TunisianetProduits[]> {
    this.logger.log('Logging all products');
    return this.tunisianetService.getTunisianetProducts(limit);
  }

  @Get('product/:id')
  async getTunisianetProductById(
    @Param('id') id: string,
  ): Promise<TunisianetProduits> {
    this.logger.log(`Logging a single product by id ${id}`);
    return this.tunisianetService.getTunisianetProductById(id);
  }

  @Get('')
  async getSortedTunisianetProducts(
    @Query('sort') sortBy: 'asc' | 'desc',
  ): Promise<TunisianetProduits[]> {
    this.logger.log(`Sorting Tunisianet products by ${sortBy}`);
    return this.tunisianetService.getSortedTunisianetProducts(sortBy);
  }

  @Get('name')
  async getTunisianetProductsByName(
    @Query('name') name: string,
  ): Promise<TunisianetProduits[]> {
    this.logger.log(`Getting Tunisianet products by name ${name}`);
    return this.tunisianetService.getTunisianetProductsByName(name);
  }

  @Get('last-three')
  async getLastThreeTunisianetProducts(): Promise<TunisianetProduits[]> {
    return this.tunisianetService.getLastThreeTunisianetProducts();
  }
}
