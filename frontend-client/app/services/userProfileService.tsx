import { UpdateMyProfilePayload } from "@/app/types/userProfileType";
import { apiService } from "@/app//lib/http/apiService";
import { handleApiError } from "@/app/components/ui/HandleError";
import { ApiResponse } from "@/app//lib/http/apiService";

class UserProfileService {
  async showMyProfile(): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "GET",
      url: "/user-profile/show-my-profile",
    });
    handleApiError(response);
    return response;
  }

  async showOtherProfile(user_id: number): Promise<ApiResponse> {
    if (!Number.isInteger(user_id) || user_id <= 0) {
      throw new Error("无效的用户ID");
    }
    const response = await apiService.request({
      method: "POST",
      url: "/user-profile/show-other-profile",
      data: { user_id },
    });
    handleApiError(response);
    return response;
  }

  async updateMyProfile(payload: UpdateMyProfilePayload): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "PATCH",
      url: "/user-profile/update-my-profile",
      data: payload,
    });
    handleApiError(response);
    return response;
  }
}

export const userProfileService = new UserProfileService();
