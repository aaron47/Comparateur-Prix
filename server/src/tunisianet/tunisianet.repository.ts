import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from './../utils/AbstractRepository.repository';
import { TunisianetProduits } from './../models';

@Injectable()
export class TunisianetRepository extends AbstractRepository<TunisianetProduits> {
  constructor(
    @InjectModel(TunisianetProduits.name)
    protected readonly produitsModel: Model<TunisianetProduits>,
  ) {
    super(produitsModel);
  }
}
