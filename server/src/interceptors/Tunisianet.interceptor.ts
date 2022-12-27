import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable, tap } from 'rxjs';
import { JwtPayload } from 'src/auth/common/types';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TunisianetInterceptor implements NestInterceptor {
  private readonly logger = new Logger(TunisianetInterceptor.name);

  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const requestUser = req.user as JwtPayload;

    if (!requestUser)
      throw new UnauthorizedException('Access denied. No token provided.');

    const user = await this.usersService.findOneById(requestUser.sub);
    const userCarteFidelite = user.carteFidelite;

    if (!userCarteFidelite)
      throw new UnauthorizedException('Access denied. No carte fidelite.');

    const tunisianet = userCarteFidelite.slice(0, 10);

    if (!(tunisianet === 'TUNISIANET')) {
      throw new UnauthorizedException(
        'You do not have the privilege to access this endpoint',
      );
    }

    return next.handle().pipe(
      tap(() => {
        this.logger.debug(user);
      }),
    );
  }
}
