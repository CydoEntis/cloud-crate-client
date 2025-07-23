import { useQuery } from "@tanstack/react-query";
import { getInviteByToken } from "../../api/getInvite";

export const useGetInviteByToken = (token: string) => {
  return useQuery({
    queryKey: ["invite", token],
    queryFn: () => getInviteByToken(token),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });
};
