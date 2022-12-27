import { JUMIA, TUNISIANET } from './../auth/common/types/Magasins.type';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserRequestDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @IsNotEmpty()
  magasinSelectionne: typeof JUMIA | typeof TUNISIANET;

  @IsOptional()
  carteFidelite?: string;
}
