import {
  EmailPayload,
  RegisterPayload,
  LogInPayload,
  ResetPasswordPayload,
  ChangeLoggedInAccountPasswordPayload,
} from "@/app/types/authType";
import { apiService } from "@/app/lib/http/apiService";
import { handleApiError } from "@/app/components/ui/HandleError";
import { ApiResponse } from "@/app/lib/http/apiService";

class AuthService {
  async sendVerificationCode(payload: EmailPayload): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "POST",
      url: "/auth/send-verification-code",
      data: payload,
    });
    handleApiError(response, "发送验证码失败", "error");
    return response;
  }

  async emailRegisterAccount(payload: RegisterPayload): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "POST",
      url: "/auth/email-registed-account",
      data: payload,
    });
    handleApiError(response, "注册失败", "error");
    return response;
  }

  async loginAccountByEmail(payload: LogInPayload): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "POST",
      url: "/auth/login-account-by-email",
      data: payload,
    });
    handleApiError(response, "登录失败", "error");
    return response;
  }

  async sendResetPasswordCode(payload: EmailPayload): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "POST",
      url: "/auth/send-reset-password-code",
      data: payload,
    });

    handleApiError(response, "发送重置密码验证码失败", "error");
    return response;
  }

  async resetPassword(payload: ResetPasswordPayload): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "PATCH",
      url: "/auth/reset-password",
      data: payload,
    });
    handleApiError(response, "重置密码失败", "error");
    return response;
  }

  async changeLoggedinAccountPassword(
    payload: ChangeLoggedInAccountPasswordPayload
  ): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "PATCH",
      url: "/auth/change-logged-in-account-password",
      data: payload,
    });
    handleApiError(response, "修改密码失败", "error");
    return response;
  }

  async checkLogInStatus(): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "GET",
      url: "/auth/check-log-in-status",
    });
    handleApiError(response, "非法访问", "error");
    return response.data;
  }

  async refreshAccessToken(): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "PATCH",
      url: "/auth/refresh-access-token",
    });
    handleApiError(response);
    return response.data;
  }

  async githubLogin(): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "GET",
      url: "/auth/github-login",
    });
    handleApiError(response, "GitHub登录失败", "error");
    return response.data;
  }

  async githubLoginCallback(): Promise<ApiResponse> {
    try {
      const response = await apiService.request({
        method: "GET",
        url: "/auth/github/callback",
      });
      handleApiError(response, "GitHub登录回调失败", "error");
      return response.data;
    } catch (error) {
      console.error("GitHub登录回调失败:", error);
      throw error;
    }
  }

  async microsoftLogin(): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "GET",
      url: "/auth/microsoft-login",
    });
    handleApiError(response, "Microsoft登录失败", "error");
    return response.data;
  }

  async microsoftLoginCallback(): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "GET",
      url: "/auth/microsoft/callback",
    });
    handleApiError(response, "Microsoft登录回调失败", "error");
    return response.data;
  }

  async logoutAccount(): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "DELETE",
      url: "/auth/logout-account",
    });
    handleApiError(response, "登出失败", "error");
    return response.data;
  }
}

export const authService = new AuthService();
