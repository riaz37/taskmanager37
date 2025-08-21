import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { AuthResponse, ApiResponse, UserData } from '@repo/types';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() registerDto: RegisterDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<Omit<AuthResponse, 'token'>>> {
    try {
      const result = await this.authService.register(registerDto);

      // Set HTTP-only cookie with JWT token
      res.cookie('auth_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
      });

      // Return response without token in body
      const { token, ...userData } = result;
      return {
        success: true,
        data: userData,
        message: 'User registered successfully',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<Omit<AuthResponse, 'token'>>> {
    try {
      const result = await this.authService.login(loginDto);

      // Set HTTP-only cookie with JWT token
      res.cookie('auth_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        path: '/',
      });

      // Return response without token in body
      const { token, ...userData } = result;
      return {
        success: true,
        data: userData,
        message: 'Login successful',
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<null>> {
    // Clear the auth cookie
    res.clearCookie('auth_token', { path: '/' });

    return {
      success: true,
      message: 'Logout successful',
    };
  }

  @Get('verify')
  @UseGuards(JwtAuthGuard)
  async verifyToken(@Request() req): Promise<ApiResponse<{ user: UserData }>> {
    return {
      success: true,
      data: { user: req.user },
      message: 'Token is valid',
    };
  }
}
