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
  ): Promise<ApiResponse<AuthResponse>> {
    try {
      const result = await this.authService.register(registerDto);

      // Return response with token in body for localStorage storage
      return {
        success: true,
        data: result,
        message: 'User registered successfully',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<AuthResponse>> {
    try {
      const result = await this.authService.login(loginDto);

      // Return response with token in body for localStorage storage
      return {
        success: true,
        data: result,
        message: 'Login successful',
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: error.message,
      };
    }
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiResponse<null>> {
    // Clear the auth cookie (for backward compatibility)
    res.clearCookie('auth_token', { path: '/' });

    return {
      success: true,
      data: null,
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
