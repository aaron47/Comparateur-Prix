import { BuildResponseOutput, Tokens } from './common/types';
import { AuthDto, CreateUserRequestDto } from './../dto';
import { Response } from 'express';

export interface IAuthService {
  signUp(createUserRequest: CreateUserRequestDto): Promise<BuildResponseOutput>;
  login(authDto: AuthDto, res: Response): Promise<BuildResponseOutput>;
  refreshTokens(
    userId: string,
    refreshToken: string,
    res: Response,
  ): Promise<Tokens>;
  logout(res: Response, userId: string): Promise<void>;
}
