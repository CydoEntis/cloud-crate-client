import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Route as CrateIndexRoute } from "@/routes/(protected)/crates/$crateId/"; // 👈 import the actual typed route

export function useFolderPagination(folderId: string | null) {
  const search = CrateIndexRoute.useSearch(); // ✅ gets strongly typed search object
  const navigate = useNavigate();

  const page = search.page ?? 1;
  const pageSize = search.pageSize ?? 10;

  useEffect(() => {
    if (page !== 1) {
      navigate({
        to: CrateIndexRoute.fullPath, // ✅ required for scoped navigation
        search: (old) => ({
          ...old,
          page: 1,
          pageSize,
        }),
        replace: true,
      });
    }
  }, [folderId]);

  const setPage = (newPage: number) => {
    navigate({
      to: CrateIndexRoute.fullPath,
      search: (old) => ({
        ...old,
        page: newPage,
        pageSize,
      }),
    });
  };

  const setPageSize = (newPageSize: number) => {
    navigate({
      to: CrateIndexRoute.fullPath,
      search: (old) => ({
        ...old,
        page,
        pageSize: newPageSize,
      }),
    });
  };

  return { page, setPage, pageSize, setPageSize };
}
