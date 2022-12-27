import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { JwtPayloadWithRt } from '../types';

export const GetCurrentUser = createParamDecorator(
  (data: keyof JwtPayloadWithRt, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const user = request.user as JwtPayloadWithRt;

    if (data) {
      return user[data];
    }

    return user;
  },
);
