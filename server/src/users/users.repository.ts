import { User } from './../models';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AbstractRepository } from 'src/utils/AbstractRepository.repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model, FilterQuery, UpdateQuery } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  constructor(
    @InjectModel(User.name) protected readonly userModel: Model<User>,
  ) {
    super(userModel);
  }

  async createOne(user: Partial<User>) {
    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async findOne(filterQuery: FilterQuery<User>) {
    const user = this.userModel.findOne(filterQuery, {}, { lean: true });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<User>,
    update: UpdateQuery<User>,
  ) {
    const user = this.userModel.findOneAndUpdate(filterQuery, update, {
      new: true,
      lean: true,
    });

    if (!user) {
      throw new BadRequestException(
        'User not found with that email, cannot update...',
      );
    }

    return user;
  }
}
