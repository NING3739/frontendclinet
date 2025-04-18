"use client";

import React, { createContext, useState, useEffect, ReactNode } from "react";
import { authService } from "@/app/services/authService";
import type { LogInPayload } from "@/app/types/authType";
import { useRouter } from "next/navigation";

interface AuthContextType {
  login: (payload: LogInPayload) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
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

  // 挂载时检查是否已登录
  useEffect(() => {
    const checkLogInStatus = async () => {
      try {
        const response = await authService.checkLogInStatus();
        console.log("Header - isAuthenticated:", response);
        if (response.success === true) {
          setIsAuthenticated(true);
        } else {
          console.log("Header - isAuthenticated:", response);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    // 调用检查登录状态的函数
    checkLogInStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ login, logout, loading, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};
