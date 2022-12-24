import { Produits } from './../models';
import { JumiaRepository } from './jumia.repository';
import { Injectable } from '@nestjs/common';
import { IJumiaService } from './ijumia';

@Injectable()
export class JumiaService implements IJumiaService {
  constructor(private readonly jumiaRepository: JumiaRepository) {}

  async getJumiaProducts(limit?: number): Promise<Produits[]> {
    return this.jumiaRepository.findAll({}, limit);
  }

  async getJumiaProductById(productId: string): Promise<Produits> {
    return this.jumiaRepository.findOneById({ productId });
  }

  async getSortedJumiaProducts(sortBy: 'asc' | 'desc'): Promise<Produits[]> {
    return this.jumiaRepository.getSortedProducts(sortBy);
  }

  async getJumiaProductsByName(name: string): Promise<Produits[]> {
    return this.jumiaRepository.getProductsByName(name);
  }

  async getLastThreeJumiaProducts(): Promise<Produits[]> {
    return this.jumiaRepository.getLastThreeProducts();
  }
}
