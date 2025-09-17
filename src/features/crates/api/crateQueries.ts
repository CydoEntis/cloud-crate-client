import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { crateService } from "./crateService";
import type { GetCrateParams, CreateCrateRequest, UpdateCrateRequest, Crate, CrateDetails } from "../crateTypes";
import type { PaginatedResult } from "@/features/auth/authTypes";

export const crateKeys = {
  all: ["crates"] as const,
  lists: () => [...crateKeys.all, "list"] as const,
  list: (params: GetCrateParams) => [...crateKeys.lists(), params] as const,
  details: () => [...crateKeys.all, "detail"] as const,
  detail: (id: string) => [...crateKeys.details(), id] as const,
};

export const useGetCrates = (
  params: GetCrateParams = {
    sortBy: "Name",
    ascending: false,
    page: 0,
    pageSize: 0,
    memberType: "All",
  }
) => {
  return useQuery<PaginatedResult<Crate>, Error>({
    queryKey: crateKeys.list(params),
    queryFn: () => crateService.getCrates(params),
    staleTime: 1000 * 60 * 2,
  });
};

export const useCrateDetails = (crateId: string) => {
  return useQuery<CrateDetails, Error>({
    queryKey: crateKeys.detail(crateId),
    queryFn: () => crateService.getCrate(crateId),
    enabled: !!crateId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateCrateRequest) => crateService.createCrate(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: crateKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Crate created successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to create crate:", error);
      toast.error(error.message || "Failed to create crate");
    },
  });
};

export const useUpdateCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ crateId, request }: { crateId: string; request: UpdateCrateRequest }) =>
      crateService.updateCrate(crateId, request),
    onSuccess: (updatedCrate, { crateId }) => {
      queryClient.setQueryData(crateKeys.detail(crateId), updatedCrate);
      queryClient.invalidateQueries({ queryKey: crateKeys.lists() });
      toast.success("Crate updated successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to update crate:", error);
      toast.error(error.message || "Failed to update crate");
    },
  });
};

export const useDeleteCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (crateId: string) => crateService.deleteCrate(crateId),
    onSuccess: (_, crateId) => {
      queryClient.removeQueries({ queryKey: crateKeys.detail(crateId) });
      queryClient.invalidateQueries({ queryKey: crateKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success("Crate deleted successfully");
    },
    onError: (error: Error) => {
      console.error("Failed to delete crate:", error);
      toast.error(error.message || "Failed to delete crate");
    },
  });
};

export const useLeaveCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (crateId: string) => crateService.leaveCrate(crateId),
    onSuccess: (_, crateId) => {
      queryClient.removeQueries({ queryKey: crateKeys.detail(crateId) });
      queryClient.invalidateQueries({ queryKey: crateKeys.lists() });
      toast.success("Successfully left crate");
    },
    onError: (error: Error) => {
      console.error("Failed to leave crate:", error);
      toast.error(error.message || "Failed to leave crate");
    },
  });
};

export const useBulkDeleteCrates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (crateIds: string[]) => crateService.bulkDeleteCrate(crateIds),
    onSuccess: (_, crateIds) => {
      crateIds.forEach((id) => {
        queryClient.removeQueries({ queryKey: crateKeys.detail(id) });
      });
      queryClient.invalidateQueries({ queryKey: crateKeys.lists() });
      queryClient.invalidateQueries({ queryKey: ["user"] });
      toast.success(`Successfully deleted ${crateIds.length} crates`);
    },
    onError: (error: Error) => {
      console.error("Failed to delete crates:", error);
      toast.error(error.message || "Failed to delete crates");
    },
  });
};

export const useBulkLeaveCrates = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (crateIds: string[]) => crateService.bulkLeaveCrate(crateIds),
    onSuccess: (_, crateIds) => {
      crateIds.forEach((id) => {
        queryClient.removeQueries({ queryKey: crateKeys.detail(id) });
      });
      queryClient.invalidateQueries({ queryKey: crateKeys.lists() });
      toast.success(`Successfully left ${crateIds.length} crates`);
    },
    onError: (error: Error) => {
      console.error("Failed to leave crates:", error);
      toast.error(error.message || "Failed to leave crates");
    },
  });
};
