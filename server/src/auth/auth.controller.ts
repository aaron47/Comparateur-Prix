import { AuthDto, CreateUserRequestDto } from 'src/dto';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Inject,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { IAuthService } from './iauthservice';
import { Response } from 'express';
import { RefreshTokenGuard } from './common/guards';
import { GetCurrentUser, Public } from './common/decorators';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: IAuthService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post('signup')
  async signUp(@Body() createUserRequest: CreateUserRequestDto) {
    return this.authService.signUp(createUserRequest);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Body() authDto: AuthDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.login(authDto, res);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response,
    @GetCurrentUser('sub') userId: string,
  ) {
    return this.authService.logout(res, userId);
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  async refresh(
    @Res({ passthrough: true }) res: Response,
    @GetCurrentUser('sub') userId: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ) {
    return this.authService.refreshTokens(userId, refreshToken, res);
  }
}
