import {
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/auth/common/decorators';
import { JumiaInterceptor } from 'src/interceptors/Jumia.interceptor';
import { Produits } from './../models';
import { IJumiaService } from './ijumia';

// @UseInterceptors(JumiaInterceptor)
@Public()
@Controller('jumia/products')
export class JumiaController {
  private readonly logger = new Logger(JumiaController.name);

  constructor(
    @Inject('JUMIA_SERVICE') private readonly jumiaService: IJumiaService,
  ) {}

  @Get('all')
  async getJumiaProducts(@Query('limit') limit?: number): Promise<Produits[]> {
    if (limit) this.logger.debug(`Limiting Jumia products to ${limit}`);
    return this.jumiaService.getJumiaProducts(limit);
  }

  @Get('product/:id')
  async getJumiaProductById(@Param('id') id: string): Promise<Produits> {
    return this.jumiaService.getJumiaProductById(id);
  }

  @Get('')
  async getSortedJumiaProducts(
    @Query('sort') sortBy: 'asc' | 'desc',
  ): Promise<Produits[]> {
    this.logger.log(`Sorting Jumia products by ${sortBy}`);
    return this.jumiaService.getSortedJumiaProducts(sortBy);
  }

  @Get('name')
  async getJumiaProductsByName(
    @Query('name') name: string,
  ): Promise<Produits[]> {
    this.logger.log(`Getting Jumia products by name ${name}`);
    return this.jumiaService.getJumiaProductsByName(name);
  }

  @Get('last-three')
  async getLastThreeJumiaProducts(): Promise<Produits[]> {
    return this.jumiaService.getLastThreeJumiaProducts();
  }
}
