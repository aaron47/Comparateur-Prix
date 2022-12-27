import { User } from './../models/User.schema';
import { CreateUserRequestDto } from './../dto/create-user-request.dto';
import { UsersRepository } from './users.repository';
import { Injectable } from '@nestjs/common';
import * as argon2 from 'argon2';
import { IUsersService } from './iusersservice';
import { FilterQuery, UpdateQuery } from 'mongoose';

@Injectable()
export class UsersService implements IUsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async createOne(createUserRequest: CreateUserRequestDto): Promise<User> {
    const hashedPassword = await argon2.hash(createUserRequest.password);

    const newUser = await this.usersRepository.createOne({
      ...createUserRequest,
      password: hashedPassword,
    });

    return newUser;
  }

  async updateCarteFidelite(
    email: string,
    carteFidelite: string,
  ): Promise<User> {
    return this.usersRepository.findOneAndUpdate(
      { email },
      {
        carteFidelite,
      },
    );
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ email });
  }

  async findOneById(userId: string): Promise<User> {
    return this.usersRepository.findOneById({ _id: userId });
  }

  async findOne(filterQuery: FilterQuery<User>): Promise<User> {
    return this.usersRepository.findOne(filterQuery);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<User>,
    update: UpdateQuery<User>,
  ) {
    return this.usersRepository.findOneAndUpdate(filterQuery, update);
  }
}
