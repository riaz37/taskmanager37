"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { UserData } from "@repo/types";
import { AuthContextType, AuthProviderProps } from "@repo/types/src/react";
import { authService } from "@/services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated on mount
    const checkAuth = async () => {
      try {
        // First check localStorage for immediate user data
        const storedUser = authService.getUser();
        const storedToken = authService.getToken();
        
        if (storedUser && storedToken) {
          setUser(storedUser);
          setLoading(false);
          
          // Verify token with server in background
          try {
            const response = await authService.verifyToken();
            if (response.user) {
              // Update with fresh user data from server
              setUser(response.user);
              authService.setUser(response.user);
            }
          } catch (error) {
            console.error("Token verification failed:", error);
            // Token is invalid, clear storage and redirect
            authService.clearAuth();
            setUser(null);
            if (typeof window !== "undefined") {
              window.location.href = "/auth/sign-in";
            }
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.login({ email, password });
      setUser(response.user);
      // Redirect to dashboard after successful login
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      const response = await authService.register({ name, email, password });
      setUser(response.user);
      // Redirect to dashboard after successful registration
      if (typeof window !== "undefined") {
        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await authService.logout();
      setUser(null);
      // Redirect to sign-in page after logout
      if (typeof window !== "undefined") {
        window.location.href = "/auth/sign-in";
      }
    } catch (error) {
      console.error("Logout failed:", error);
      // Still clear user state and redirect even if logout API fails
      setUser(null);
      if (typeof window !== "undefined") {
        window.location.href = "/auth/sign-in";
      }
    } finally {
      setLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
