import {
  CreateNewSectionPayload,
  UpdateSectionPayload,
} from "@/app/types/sectionType";
import { apiService } from "@/app/lib/http/apiService";
import { handleApiError } from "@/app/components/ui/HandleError";
import { ApiResponse } from "@/app/lib/http/apiService";

class SectionService {
  async createSection(payload: CreateNewSectionPayload): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "POST",
      url: "/section/create-new-section",
      data: payload,
    });
    handleApiError(response, "创建板块失败", "error");
    return response;
  }

  async updateSection(payload: UpdateSectionPayload): Promise<ApiResponse> {
    const response = await apiService.request({
      method: "PATCH",
      url: "/section/update-section",
      data: payload,
    });
    handleApiError(response, "更新板块失败", "error");
    return response;
  }

  async sectionLists(): Promise<any[]> {
    const response = await apiService.request({
      method: "GET",
      url: "/section/section-lists",
    });
    handleApiError(response, "获取板块列表失败", "error");
    return response.data;
  }

  async deleteSection(section_id: number): Promise<ApiResponse> {
    if (!Number.isInteger(section_id) || section_id <= 0) {
      throw new Error("无效的分区 ID");
    }

    const response = await apiService.request({
      method: "DELETE",
      url: "/section/delete-section",
      data: { section_id },
    });

    handleApiError(response, "删除分区失败", "error");
    return response;
  }
}

export const sectionService = new SectionService();
