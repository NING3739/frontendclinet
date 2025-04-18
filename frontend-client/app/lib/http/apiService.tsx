"use client";

import { redirect } from "next/navigation";
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "https://127.0.0.1:8000/api",
  timeout: 10000,
};

const ERROR_MESSAGES: Record<number, string> = {
  400: "请求参数错误",
  401: "未授权或登录已过期",
  403: "访问被拒绝",
  404: "请求的资源不存在",
  500: "服务器内部错误",
};

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    status?: number;
    details?: any;
  };
  detail?: string;
}

class APIService {
  private api: AxiosInstance;
  private isRefreshing = false;
  private refreshSubscribers: (() => void)[] = [];

  constructor() {
    this.api = this.createAPI();
    this.setupInterceptors();
  }

  private createAPI(): AxiosInstance {
    return axios.create({
      ...API_CONFIG,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
  }

  private setupInterceptors(): void {
    this.api.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error) => {
        const originalRequest = error.config;
        const status = error.response?.status;

        if (status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
            await this.handleTokenRefresh();
            return this.api(originalRequest);
          } catch {
            redirect("/login");
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private async handleTokenRefresh(): Promise<void> {
    if (this.isRefreshing) {
      return new Promise((resolve, reject) => {
        this.refreshSubscribers.push(resolve);
      });
    }

    this.isRefreshing = true;

    try {
      const response = await this.api.patch("/auth/refresh-access-token");

      if (!response.data.success) {
        throw new Error("刷新失败");
      }

      this.refreshSubscribers.forEach((callback) => callback());
    } catch (error) {
      this.refreshSubscribers = [];
      throw error;
    } finally {
      this.isRefreshing = false;
    }
  }

  async request<T = any>({
    method,
    url,
    params,
    data,
    headers,
  }: {
    method: string;
    url: string;
    params?: any;
    data?: any;
    headers?: Record<string, string>;
  }): Promise<ApiResponse<T>> {
    try {
      const config: AxiosRequestConfig = {
        method,
        url,
        ...(method === "GET" ? { params } : { data }),
        headers,
      };

      const response = await this.api(config);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      const status = error.response?.status;
      return {
        success: false,
        error: {
          message: ERROR_MESSAGES[status] || "未知错误",
          status,
          details: error.response?.data || null,
        },
        data: error.response?.data || null,
      };
    }
  }

  // 快捷请求方法
  get<T = any>(url: string, params = null, headers = {}) {
    return this.request<T>({ method: "GET", url, params, headers });
  }

  post<T = any>(url: string, data = null, headers = {}) {
    return this.request<T>({ method: "POST", url, data, headers });
  }

  put<T = any>(url: string, data = null, headers = {}) {
    return this.request<T>({ method: "PUT", url, data, headers });
  }

  patch<T = any>(url: string, data = null, headers = {}) {
    return this.request<T>({ method: "PATCH", url, data, headers });
  }

  delete<T = any>(url: string, params = null, headers = {}) {
    return this.request<T>({ method: "DELETE", url, params, headers });
  }
}

export const apiService = new APIService();
