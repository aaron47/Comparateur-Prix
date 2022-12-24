import { TunisianetProduits } from './../models';
import { Injectable } from '@nestjs/common';
import { TunisianetRepository } from './tunisianet.repository';
import { ITunisianetService } from './itunisianet';

@Injectable()
export class TunisianetService implements ITunisianetService {
  constructor(private readonly tunisianetRepository: TunisianetRepository) {}

  async getTunisianetProducts(limit?: number): Promise<TunisianetProduits[]> {
    return this.tunisianetRepository.findAll({}, limit);
  }

  async getTunisianetProductById(
    productId: string,
  ): Promise<TunisianetProduits> {
    return this.tunisianetRepository.findOneById({ productId });
  }

  async getSortedTunisianetProducts(sortBy: 'asc' | 'desc') {
    return this.tunisianetRepository.getSortedProducts(sortBy);
  }

  async getTunisianetProductsByName(
    name: string,
  ): Promise<TunisianetProduits[]> {
    return this.tunisianetRepository.getProductsByName(name);
  }

  async getLastThreeTunisianetProducts(): Promise<TunisianetProduits[]> {
    return this.tunisianetRepository.getLastThreeProducts();
  }
}
