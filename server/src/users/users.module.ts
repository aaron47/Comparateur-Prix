import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from 'src/models';
import { UsersRepository } from './users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  providers: [
    {
      provide: 'USERS_SERVICE',
      useClass: UsersService,
    },
    UsersRepository,
  ],
  controllers: [UsersController],
  exports: ['USERS_SERVICE'],
})
export class UsersModule {}
