import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Produits } from './../models';
import { AbstractRepository } from './../utils/AbstractRepository.repository';

@Injectable()
export class JumiaRepository extends AbstractRepository<Produits> {
  constructor(
    @InjectModel(Produits.name)
    produitsModel: Model<Produits>,
  ) {
    super(produitsModel);
  }
}
