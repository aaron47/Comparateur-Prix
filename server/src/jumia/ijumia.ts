import { Produits } from 'src/models/JumiaProduits.schema';

export interface IJumiaService {
  getJumiaProducts(limit?: number): Promise<Produits[]>;
  getJumiaProductById(productId: string): Promise<Produits>;
  getSortedJumiaProducts(sortBy: 'asc' | 'desc'): Promise<Produits[]>;
  getJumiaProductsByName(name: string): Promise<Produits[]>;
  getLastThreeJumiaProducts(): Promise<Produits[]>;
}
