import apiService from "@/shared/lib/api/ApiService";
import type {
  AdminUser,
  AdminUserSearchParams,
  AdminStats,
  CreateInviteRequest,
  SubscriptionPlan,
} from "../adminTypes";
import type { ApiResponse, PaginatedResult } from "@/shared/lib/sharedTypes";
import { use } from "react";

export const adminService = {
  async getUsers(params: AdminUserSearchParams): Promise<PaginatedResult<AdminUser>> {
    const response = await apiService.get<ApiResponse<PaginatedResult<AdminUser>>>("/admin/users", { params });
    const { data: result, isSuccess, message } = response.data;

    if (!isSuccess || !result) {
      throw new Error(message ?? "Failed to fetch users");
    }
    return result;
  },

  async getStats(): Promise<AdminStats> {
    const response = await apiService.get<ApiResponse<AdminStats>>("/admin/stats");
    const { data: result, isSuccess, message } = response.data;

    if (!isSuccess || !result) {
      throw new Error(message ?? "Failed to fetch admin stats");
    }
    return result;
  },

  async banUser(userId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<null>>(`/admin/users/${userId}/ban`);
    const { isSuccess, message } = response.data;

    if (!isSuccess) {
      throw new Error(message ?? "Failed to ban user");
    }
  },

  async unbanUser(userId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<null>>(`/admin/users/${userId}/unban`);
    const { isSuccess, message } = response.data;

    if (!isSuccess) {
      throw new Error(message ?? "Failed to unban user");
    }
  },

  async deleteUser(userId: string): Promise<void> {
    const response = await apiService.delete<ApiResponse<null>>(`/admin/users/${userId}`);
    const { isSuccess, message } = response.data;

    if (!isSuccess) {
      throw new Error(message ?? "Failed to delete user");
    }
  },

  async makeAdmin(userId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<null>>(`/admin/users/${userId}/make-admin`);
    const { isSuccess, message } = response.data;

    if (!isSuccess) {
      throw new Error(message ?? "Failed to promote user");
    }
  },

  async removeAdmin(userId: string): Promise<void> {
    const response = await apiService.post<ApiResponse<null>>(`/admin/users/${userId}/remove-admin`);
    const { isSuccess, message } = response.data;

    if (!isSuccess) {
      throw new Error(message ?? "Failed to remove admin privileges");
    }
  },

  async createInvite(inviteData: CreateInviteRequest): Promise<any> {
    const response = await apiService.post<ApiResponse<any>>("/admin/invites", inviteData);
    const { data: result, isSuccess, message } = response.data;

    if (!isSuccess || !result) {
      throw new Error(message ?? "Failed to create invite");
    }
    return result;
  },

  async updateUserPlan(userId: string, plan: SubscriptionPlan): Promise<void> {
    const response = await apiService.post<ApiResponse<null>>(`/admin/users/${userId}/plan`, { plan });
    const { isSuccess, message } = response.data;

    if (!isSuccess) {
      throw new Error(message ?? "Failed to update user plan");
    }
  },
};
