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
export class JumiaInterceptor implements NestInterceptor {
  private readonly logger = new Logger(JumiaInterceptor.name);

  constructor(
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();
    const token = req.headers.authorization;
    const requestUser = req.user as JwtPayload;

    if (!requestUser || !token)
      throw new UnauthorizedException('Access denied. No token provided.');

    const user = await this.usersService.findOneById(requestUser.sub);
    this.logger.warn(user);
    const userCarteFidelite = user.carteFidelite;

    if (!userCarteFidelite)
      throw new UnauthorizedException('Access denied. No carte fidelite.');

    const jumia = userCarteFidelite.slice(0, 5);

    if (!(jumia === 'JUMIA')) {
      this.logger.debug(user, 'CARTE FIDELITE: ', jumia);
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
