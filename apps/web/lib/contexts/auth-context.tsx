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
        console.log("🔍 Checking authentication status...");
        
        // First check localStorage for immediate user data
        const storedUser = authService.getUser();
        const storedToken = authService.getToken();
        
        console.log("📦 Stored data:", { 
          hasUser: !!storedUser, 
          hasToken: !!storedToken,
          user: storedUser?.email,
          tokenLength: storedToken?.length 
        });
        
        // Debug: Check raw localStorage values
        if (typeof window !== 'undefined') {
          const rawToken = localStorage.getItem('auth_token');
          const rawUser = localStorage.getItem('user_data');
          console.log("🔍 Raw localStorage values:", {
            rawToken: rawToken ? rawToken.substring(0, 20) + "..." : null,
            rawUser: rawUser ? JSON.parse(rawUser)?.email : null
          });
        }
        
        // Debug: Check localStorage directly
        if (typeof window !== 'undefined') {
          console.log("🔍 Direct localStorage check:", {
            authToken: localStorage.getItem('auth_token'),
            userData: localStorage.getItem('user_data')
          });
        }
        
        if (storedUser && storedToken) {
          console.log("✅ Found stored user data, setting user state");
          setUser(storedUser);
          setLoading(false);
          
          // Verify token with server in background
          try {
            console.log("🔐 Verifying token with server...");
            const response = await authService.verifyToken();
            if (response.user) {
              console.log("✅ Token verification successful, updating user data");
              // Update with fresh user data from server
              setUser(response.user);
              authService.setUser(response.user);
            }
          } catch (error) {
            console.error("❌ Token verification failed:", error);
            // Token is invalid, clear storage and redirect
            console.log("🧹 Clearing invalid auth data and redirecting...");
            authService.clearAuth();
            setUser(null);
            if (typeof window !== "undefined") {
              window.location.href = "/auth/sign-in";
            }
          }
        } else {
          console.log("❌ No stored auth data found");
          setLoading(false);
        }
      } catch (error) {
        console.error("❌ Auth check failed:", error);
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      console.log("🚀 Starting login for:", email);
      
      const response = await authService.login({ email, password });
      console.log("✅ Login successful, response:", response);
      
      // Set user state
      setUser(response.user);
      console.log("👤 User state set:", response.user.email);
      
      // Verify that data was stored in localStorage
      const storedToken = authService.getToken();
      const storedUser = authService.getUser();
      console.log("🔍 Verification - Stored token:", storedToken ? "YES" : "NO");
      console.log("🔍 Verification - Stored user:", storedUser ? "YES" : "NO");
      
      // Add a small delay to ensure localStorage is updated
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Redirect to dashboard after successful login
      if (typeof window !== "undefined") {
        console.log("🔄 Redirecting to dashboard...");
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
      console.log("🚀 Starting registration for:", email);
      
      const response = await authService.register({ name, email, password });
      console.log("✅ Registration successful, response:", response);
      
      // Set user state
      setUser(response.user);
      console.log("👤 User state set:", response.user.email);
      
      // Verify that data was stored in localStorage
      const storedToken = authService.getToken();
      const storedUser = authService.getUser();
      console.log("🔍 Verification - Stored token:", storedToken ? "YES" : "NO");
      console.log("🔍 Verification - Stored user:", storedUser ? "YES" : "NO");
      
      // Add a small delay to ensure localStorage is updated
      await new Promise(resolve => setTimeout(resolve, 100));
      
      // Redirect to dashboard after successful registration
      if (typeof window !== "undefined") {
        console.log("🔄 Redirecting to dashboard...");
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
