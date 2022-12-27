import { CreateUserRequestDto } from 'src/dto';
import { User } from 'src/models';

export interface IUsersService {
  createOne(createUserRequest: CreateUserRequestDto): Promise<User>;
  updateCarteFidelite(email: string, carteFidelite: string): Promise<User>;
  findOneByEmail(email: string): Promise<User>;
}
