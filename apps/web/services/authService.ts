import { AuthRequest, RegisterRequest, AuthResponse } from "@repo/types";
import { apiClient } from "../lib/axios";

class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_KEY = 'user_data';

  // Get token from localStorage
  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.TOKEN_KEY);
    }
    return null;
  }

  // Set token in localStorage
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  // Remove token from localStorage
  removeToken(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.TOKEN_KEY);
    }
  }

  // Get user data from localStorage
  getUser(): any | null {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem(this.USER_KEY);
      return userData ? JSON.parse(userData) : null;
    }
    return null;
  }

  // Set user data in localStorage
  setUser(user: any): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  }

  // Remove user data from localStorage
  removeUser(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.USER_KEY);
    }
  }

  // Clear all auth data
  clearAuth(): void {
    this.removeToken();
    this.removeUser();
  }

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await apiClient.post<AuthResponse>("/api/auth/register", data);
    
    console.log("🔍 Register response structure:", response);
    
    // The apiClient.post() already extracts response.data.data, so response is directly { user: {...}, token: "..." }
    if (response && response.token && response.user) {
      this.setToken(response.token);
      this.setUser(response.user);
      console.log("💾 Registration auth data stored in localStorage");
      console.log("🔑 Token stored:", response.token.substring(0, 20) + "...");
      console.log("👤 User stored:", response.user.email);
    } else {
      console.warn("⚠️ Invalid registration response structure:", response);
      console.warn("⚠️ Expected: { user: {...}, token: '...' }");
      console.warn("⚠️ Received:", JSON.stringify(response, null, 2));
    }
    
    return response;
  }

  async login(data: AuthRequest): Promise<AuthResponse> {
    try {
      console.log("🔐 Attempting login for:", data.email);
      console.log("🌐 API URL:", process.env.NEXT_PUBLIC_API_URL || "NOT SET");
      
      const response = await apiClient.post<AuthResponse>("/api/auth/login", data);
      
      console.log("✅ Login successful:", response.user.email);
      console.log("🔍 Response structure:", response);
      
      // The apiClient.post() already extracts response.data.data, so response is directly { user: {...}, token: "..." }
      if (response && response.token && response.user) {
        this.setToken(response.token);
        this.setUser(response.user);
        console.log("💾 Auth data stored in localStorage");
        console.log("🔑 Token stored:", response.token.substring(0, 20) + "...");
        console.log("👤 User stored:", response.user.email);
      } else {
        console.warn("⚠️ Invalid response structure:", response);
        console.warn("⚠️ Expected: { user: {...}, token: '...' }");
        console.warn("⚠️ Received:", JSON.stringify(response, null, 2));
      }
      
      return response;
    } catch (error: any) {
      console.error("❌ Login failed:", error);
      console.error("🔍 Error details:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config
      });
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      // Call logout endpoint to clear server-side session
      await apiClient.post("/api/auth/logout");
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local storage regardless of API call success
      this.clearAuth();
    }
  }

  async verifyToken(): Promise<{ user: any }> {
    return apiClient.get<{ user: any }>("/api/auth/verify");
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }
}

export const authService = new AuthService();
