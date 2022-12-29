import { AbstractRepository } from 'src/utils/AbstractRepository.repository';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TousProduits } from 'src/models';

@Injectable()
export class AllproductsRepository extends AbstractRepository<TousProduits> {
  constructor(
    @InjectModel(TousProduits.name) produitsModel: Model<TousProduits>,
  ) {
    super(produitsModel);
  }
}
