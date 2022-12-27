import { AuthDto, CreateUserRequestDto } from './../dto';
import { UsersService } from './../users/users.service';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import {
  JwtPayload,
  JUMIA,
  TUNISIANET,
  BuildResponseOutput,
  Tokens,
} from './common/types';
import { User } from 'src/models';
import { Response } from 'express';
import { IAuthService } from './iauthservice';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject('USERS_SERVICE') private readonly usersService: UsersService,
  ) {}

  async login(authDto: AuthDto, res: Response): Promise<BuildResponseOutput> {
    const user = await this.validateUser(authDto);

    const { accessToken, refreshToken } = await this.generateTokens(
      user._id,
      user.email,
    );

    await this.updateRefreshTokenHash(user._id, refreshToken);

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get<number>('JWT_EXPIRES_IN'),
    );

    const jwtExpires = new Date();
    jwtExpires.setSeconds(
      jwtExpires.getSeconds() +
        this.configService.get<number>('JWT_EXPIRES_IN'),
    );

    const refreshExpires = new Date();
    refreshExpires.setSeconds(
      refreshExpires.getSeconds() +
        this.configService.get<number>('REFRESH_EXPIRES_IN'),
    );

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: jwtExpires,
    });

    res.cookie('refresh', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: refreshExpires,
    });

    return this.buildResponse(user, accessToken);
  }

  async signUp(
    createUserRequest: CreateUserRequestDto,
  ): Promise<BuildResponseOutput> {
    const { magasinSelectionne } = createUserRequest;

    const magasin = await this.validateCreateUserRequest(
      createUserRequest.email,
      magasinSelectionne,
    );

    let carteFidelite = magasin + uuidv4();

    const newUser = await this.usersService.createOne({
      ...createUserRequest,
      magasinSelectionne: magasin as typeof JUMIA | typeof TUNISIANET,
      carteFidelite,
    });

    const tokens = await this.generateTokens(newUser._id, newUser.email);
    await this.updateRefreshTokenHash(newUser._id, tokens.refreshToken);

    return this.buildResponse(newUser, tokens.accessToken, tokens.refreshToken);
  }

  async logout(res: Response, userId: string): Promise<void> {
    await this.usersService.findOneAndUpdate(
      { userId },
      { hashedRefreshToken: null },
    );

    res.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    res.clearCookie('refresh', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
  }

  async refreshTokens(
    userId: string,
    refreshToken: string,
    res: Response,
  ): Promise<Tokens> {
    const user = await this.usersService.findOneById(userId);

    if (!user || !user.hashedRefreshToken) {
      throw new ForbiddenException('User not found');
    }

    const isRefreshTokenValid = await argon2.verify(
      user.hashedRefreshToken,
      refreshToken,
    );

    if (!isRefreshTokenValid) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.generateTokens(user._id, user.email);

    await this.updateRefreshTokenHash(user._id, newRefreshToken);

    const jwtExpires = new Date();
    jwtExpires.setSeconds(
      jwtExpires.getSeconds() +
        this.configService.get<number>('JWT_EXPIRES_IN'),
    );

    const refreshExpires = new Date();
    refreshExpires.setSeconds(
      refreshExpires.getSeconds() +
        this.configService.get<number>('REFRESH_EXPIRES_IN'),
    );

    res.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: jwtExpires,
    });

    res.cookie('refresh', newRefreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      expires: refreshExpires,
    });

    return {
      accessToken,
      refreshToken: newRefreshToken,
    };
  }

  private async validateCreateUserRequest(
    email: string,
    magasinSelectionne: string,
  ): Promise<string> {
    const user = await this.usersService.findOneByEmail(email);
    const uppercaseMagasinSelectionne = magasinSelectionne.toUpperCase();

    if (user) {
      throw new BadRequestException('User already exists');
    }

    if (
      uppercaseMagasinSelectionne !== JUMIA &&
      uppercaseMagasinSelectionne !== TUNISIANET
    ) {
      throw new BadRequestException(
        'Veuillez selectionnez un magasin valide(Jumia ou Tunisianet)',
      );
    }

    return uppercaseMagasinSelectionne;
  }

  private async generateTokens(userId: string, email: string): Promise<Tokens> {
    const payload: JwtPayload = {
      sub: userId,
      email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: `${this.configService.get<number>('JWT_EXPIRES_IN')}s`,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('REFRESH_SECRET'),
        expiresIn: `${this.configService.get<number>('REFRESH_EXPIRES_IN')}s`,
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async validateUser(authDto: AuthDto): Promise<User> {
    const { email, password } = authDto;

    const user = await this.usersService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    return user;
  }

  private async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const hashedRefreshToken = await argon2.hash(refreshToken);

    await this.usersService.findOneAndUpdate(
      { userId },
      {
        hashedRefreshToken,
      },
    );
  }

  private buildResponse(
    user: User,
    access_token?: string,
    refresh_token?: string,
  ): BuildResponseOutput {
    const { email, carteFidelite, magasinSelectionne, _id } = user;

    if (access_token || refresh_token) {
      return {
        email,
        carteFidelite,
        magasinSelectionne,
        _id,
        access_token,
        refresh_token,
      };
    }

    return {
      email,
      carteFidelite,
      magasinSelectionne,
      _id,
    };
  }
}
