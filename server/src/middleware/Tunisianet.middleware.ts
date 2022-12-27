import { UsersService } from './../users/users.service';
import { JwtPayload } from './../auth/common/types/JwtPayload.type';
import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class TunisianetMiddleware implements NestMiddleware {
  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  async use(req: Request, _res: Response, next: NextFunction) {
    const requestUser = req.user as JwtPayload;

    if (!requestUser)
      throw new UnauthorizedException('Access denied. No token provided.');

    const user = await this.usersService.findOneById(requestUser.sub);
    const userCarteFidelite = user.carteFidelite;

    if (!userCarteFidelite)
      throw new UnauthorizedException('Access denied. No carte fidelite.');

    if (!userCarteFidelite.startsWith('TUNISIANET'))
      throw new UnauthorizedException(
        'You do not have the privilege to access this endpoint',
      );

    next();
  }
}
