import { useEffect, useRef } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { Paged } from "@/services/adminService";
import { useUrlPage } from "@/hooks/useUrlState";

/**
 * A server-paged admin list. `key` identifies the list and its current filters:
 * when it changes the list returns to page 1. If rows are removed so the
 * current page no longer exists, it steps back to the last page.
 */
export function useAdminPagedList<T>(key: unknown[], fetchPage: (page: number) => Promise<Paged<T>>) {
  const filterKey = JSON.stringify(key);
  const [page, setPage] = useUrlPage();

  // Skip the first run so a link straight to `?page=3` is honoured.
  const lastFilterKey = useRef(filterKey);
  useEffect(() => {
    if (lastFilterKey.current === filterKey) return;
    lastFilterKey.current = filterKey;
    setPage(1);
  }, [filterKey, setPage]);

  const query = useQuery({
    queryKey: [...key, "page", page],
    queryFn: () => fetchPage(page),
    placeholderData: keepPreviousData,
  });

  const totalPages = query.data?.pagination?.total_pages ?? 0;
  useEffect(() => {
    if (totalPages > 0 && page > totalPages) setPage(totalPages);
  }, [totalPages, page, setPage]);

  return {
    ...query,
    rows: query.data?.rows ?? [],
    pagination: query.data?.pagination,
    setPage,
  };
}
