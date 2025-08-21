import { AuthRequest, RegisterRequest, AuthResponse } from '@repo/types';
import { apiClient } from '../lib/axios';

class AuthService {
  async register(data: RegisterRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', data);
  }

  async login(data: AuthRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', data);
  }

  async logout(): Promise<void> {
    // Call logout endpoint to clear server-side cookie
    await apiClient.post('/auth/logout');
  }

  async verifyToken(): Promise<{ user: any }> {
    return apiClient.get<{ user: any }>('/auth/verify');
  }
}

export const authService = new AuthService(); 