import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);

  use(req: Request, _res: Response, next: NextFunction) {
    const token = req.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('Access denied. No token provided.');
    }

    next();
  }
}
