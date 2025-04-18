"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { authService } from "@/app/services/authService";
import type { LogInPayload } from "@/app/types/authType";
import { useRouter } from "next/navigation";

interface AuthContextType {
  login: (payload: LogInPayload) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (payload: LogInPayload) => {
    setLoading(true);

    try {
      const response = await authService.loginAccountByEmail(payload);
      if (response.success) {
        setIsAuthenticated(true);
        router.push("/");
      }
    } catch (err: any) {
      setIsAuthenticated(false);
      console.error("Login failed");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      await authService.logoutAccount();
      setIsAuthenticated(false);
      router.push("/login");
    } catch (err: any) {
      console.error("Logout failed", err);
      setIsAuthenticated(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout, loading, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
