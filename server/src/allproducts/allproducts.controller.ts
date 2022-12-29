import { Controller, Get, Param } from '@nestjs/common';
import { Public } from 'src/auth/common/decorators';
import { JumiaRepository } from 'src/jumia/jumia.repository';
import { TunisianetRepository } from 'src/tunisianet/tunisianet.repository';

@Public()
@Controller('allproducts')
export class AllproductsController {
  constructor(
    private readonly jumiaRepository: JumiaRepository,
    private readonly tunisianetRepository: TunisianetRepository,
  ) {}

  @Get('')
  async getAllProducts() {
    const allJumiaProducts = await this.jumiaRepository.findAll({});
    const allTunisianetProducts = await this.tunisianetRepository.findAll({});
    return [...allJumiaProducts, ...allTunisianetProducts];
  }
}
