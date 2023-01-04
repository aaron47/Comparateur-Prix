import { Controller, Get, Inject, Param } from '@nestjs/common';
import { IUsersService } from './iusersservice';

@Controller('users')
export class UsersController {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: IUsersService,
  ) {}

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return this.usersService.findOneById(id);
  }
}
