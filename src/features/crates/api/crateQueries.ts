import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { crateService } from "./crateService";
import type {
  GetCrateParams,
  CreateCrateRequest,
  UpdateCrateRequest,
  Crate,
  CrateDetails,
  CrateSummary,
} from "../crateTypes";
import type { PaginatedResult } from "@/shared/lib/sharedTypes";
import { SHARED_KEYS } from "../../shared/queryKeys";

export const crateKeys = {
  all: ["crates"] as const,
  lists: () => [...crateKeys.all, "list"] as const,
  list: (params: GetCrateParams) => [...crateKeys.lists(), params] as const,
  details: () => [...crateKeys.all, "detail"] as const,
  detail: (id: string) => [...crateKeys.details(), id] as const,
  recent: () => [...crateKeys.all, "recent"] as const,
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
  return useQuery<PaginatedResult<CrateSummary>, Error>({
    queryKey: crateKeys.list(params),
    queryFn: () => crateService.getCrates(params),
    staleTime: 1000 * 15,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
  });
};

export const useCrateDetails = (crateId: string) => {
  const queryClient = useQueryClient();

  return useQuery<CrateDetails, Error>({
    queryKey: SHARED_KEYS.crateDetails(crateId),
    queryFn: async () => {
      const result = await crateService.getCrate(crateId);
      queryClient.invalidateQueries({ queryKey: crateKeys.recent() });
      return result;
    },
    enabled: !!crateId,
    staleTime: 1000 * 15,
    refetchOnWindowFocus: true,
    refetchInterval: 30000,
    refetchIntervalInBackground: false,
  });
};

export const useCreateCrate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: CreateCrateRequest) => crateService.createCrate(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: crateKeys.lists() });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.user() });
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
      console.log(updatedCrate);
      console.log(crateId);
      queryClient.setQueryData(SHARED_KEYS.crateDetails(crateId), updatedCrate);
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
      queryClient.removeQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
      queryClient.invalidateQueries({ queryKey: crateKeys.lists() });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.user() });
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
      queryClient.removeQueries({ queryKey: SHARED_KEYS.crateDetails(crateId) });
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
        queryClient.removeQueries({ queryKey: SHARED_KEYS.crateDetails(id) });
      });
      queryClient.invalidateQueries({ queryKey: crateKeys.lists() });
      queryClient.invalidateQueries({ queryKey: SHARED_KEYS.user() });
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
        queryClient.removeQueries({ queryKey: SHARED_KEYS.crateDetails(id) });
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

export const useRecentlyAccessedCrates = (count: number = 5) => {
  return useQuery<CrateSummary[], Error>({
    queryKey: [...crateKeys.recent(), count],
    queryFn: () => crateService.getRecentlyAccessedCrates(count),
    staleTime: 1000 * 30, // 30 seconds - more aggressive since this changes frequently
    refetchOnWindowFocus: true,
    refetchInterval: 60000, // Refetch every minute
    refetchIntervalInBackground: false,
  });
};
