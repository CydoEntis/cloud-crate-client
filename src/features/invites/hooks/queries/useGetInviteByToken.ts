import { useQuery } from "@tanstack/react-query";
import { getInviteByToken } from "../../api/getInviteByToken";

export const useGetInviteByToken = (token: string) => {
  return useQuery({
    queryKey: ["invite", token],
    queryFn: () => getInviteByToken(token),
    staleTime: 1000 * 60 * 5,
    enabled: !!token,
  });
};
