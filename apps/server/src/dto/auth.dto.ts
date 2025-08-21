import { IsEmail, IsString, MinLength, IsNotEmpty } from 'class-validator';
import { AuthRequest, RegisterRequest } from '@repo/types';

export class LoginDto implements AuthRequest {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto implements RegisterRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
