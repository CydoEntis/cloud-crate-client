import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { adminService } from "./adminService";
import type { AdminUserSearchParams, CreateInviteRequest, SubscriptionPlan } from "../adminTypes";
import { toast } from "sonner";

export const adminKeys = {
  all: ["admin"] as const,
  users: () => [...adminKeys.all, "users"] as const,
  usersList: (params: AdminUserSearchParams) => [...adminKeys.users(), params] as const,
  stats: () => [...adminKeys.all, "stats"] as const,
  invites: () => [...adminKeys.all, "invites"] as const,
};

export const useGetAdminUsers = (params: AdminUserSearchParams) => {
  return useQuery({
    queryKey: adminKeys.usersList(params),
    queryFn: () => adminService.getUsers(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetAdminStats = () => {
  return useQuery({
    queryKey: adminKeys.stats(),
    queryFn: () => adminService.getStats(),
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
};

export const useBanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.banUser,
    onSuccess: () => {
      toast.success("User banned successfully");
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to ban user");
    },
  });
};

export const useUnbanUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.unbanUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
};

export const useMakeAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.makeAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
};

export const useRemoveAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.removeAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
  });
};

export const useCreateInvite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: adminService.createInvite,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.invites() });
    },
  });
};

export const useUpdateUserPlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, plan }: { userId: string; plan: SubscriptionPlan }) =>
      adminService.updateUserPlan(userId, plan),
    onSuccess: () => {
      toast.success("User plan updated successfully");
      queryClient.invalidateQueries({ queryKey: adminKeys.users() });
      queryClient.invalidateQueries({ queryKey: adminKeys.stats() });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update user plan");
    },
  });
};
