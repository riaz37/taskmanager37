import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto, RegisterDto } from '../dto/auth.dto';
import { AuthResponse, UserData } from '@repo/types';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    const user = await this.usersService.create(registerDto);
    const token = this.generateToken(user);

    return {
      user,
      token,
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await user.comparePassword(loginDto.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userData = this.sanitizeUser(user);
    const token = this.generateToken(userData);

    return {
      user: userData,
      token,
    };
  }

  private generateToken(user: UserData): string {
    const payload = { email: user.email, sub: user._id };
    return this.jwtService.sign(payload);
  }

  private sanitizeUser(user: any): UserData {
    const { password, ...sanitizedUser } = user.toObject();
    return sanitizedUser as UserData;
  }
}
