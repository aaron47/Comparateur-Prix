import { NotFoundException } from '@nestjs/common';
import { FilterQuery, Model } from 'mongoose';

export abstract class AbstractRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async findAll(filterQuery: FilterQuery<T>, limit?: number): Promise<T[]> {
    if (limit) {
      this.model.find(filterQuery, {}, { lean: true, limit });
    }

    return this.model.find(filterQuery, {}, { lean: true });
  }

  async findOneById(filterQuery: FilterQuery<T>): Promise<T> {
    const document = await this.model.findOne(filterQuery, {}, { lean: true });

    if (!document) {
      throw new NotFoundException('Document not found');
    }

    return document;
  }

  async getSortedProducts(sortBy: 'asc' | 'desc'): Promise<T[]> {
    return this.model.find(
      {},
      {},
      {
        lean: true,
        sort: {
          price: sortBy === 'asc' ? 1 : -1,
        },
      },
    );
  }

  async getProductsByName(name: string): Promise<T[]> {
    // return all the documents that have a title that includes the name given by the user
    return this.findAll({ title: { $regex: name, $options: 'i' } });
  }

  async getLastThreeProducts(): Promise<T[]> {
    return this.model.find({}, {}, { lean: true, limit: 3, sort: { _id: -1 } });
  }
}
