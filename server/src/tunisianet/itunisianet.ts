import { TunisianetProduits } from 'src/models/TunisiaNetProduits.schema';

export interface ITunisianetService {
  getTunisianetProducts(limit?: number): Promise<TunisianetProduits[]>;
  getTunisianetProductById(productId: string): Promise<TunisianetProduits>;
  getSortedTunisianetProducts(
    sortBy: 'asc' | 'desc',
  ): Promise<TunisianetProduits[]>;
  getTunisianetProductsByName(name: string): Promise<TunisianetProduits[]>;
  getLastThreeTunisianetProducts(): Promise<TunisianetProduits[]>;
}
