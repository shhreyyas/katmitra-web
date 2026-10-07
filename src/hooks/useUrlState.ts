import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

type Navigate = ReturnType<typeof useNavigate>;

/**
 * Writes one query-string parameter, replacing the history entry. It reads the
 * live URL rather than the last render's params so that two setters called in
 * the same handler (e.g. a filter and then `setPage(1)`) both land.
 */
function writeParam(navigate: Navigate, key: string, value: string, defaultValue: string) {
  const next = new URLSearchParams(window.location.search);
  if (value === defaultValue || value === "") next.delete(key);
  else next.set(key, value);
  const qs = next.toString();
  navigate({ search: qs ? `?${qs}` : "" }, { replace: true });
}

/** A string filter kept in the URL, so refresh, Back and shared links keep the same view. */
export function useUrlParam<T extends string = string>(
  key: string,
  // NoInfer: without an explicit type argument the value is a plain string, not the default's literal type.
  defaultValue: NoInfer<T>,
): [T, (value: T) => void] {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const value = (params.get(key) ?? defaultValue) as T;
  const setValue = useCallback(
    (next: T) => writeParam(navigate, key, next, defaultValue),
    [navigate, key, defaultValue],
  );
  return [value, setValue];
}

const toPage = (raw: string | null) => Math.max(1, parseInt(raw ?? "1", 10) || 1);

/** The current page number kept in the URL (`?page=3`); page 1 is left out of the URL. */
export function useUrlPage(key = "page"): [number, (next: number | ((page: number) => number)) => void] {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const page = toPage(params.get(key));
  const setPage = useCallback(
    (next: number | ((page: number) => number)) => {
      const current = toPage(new URLSearchParams(window.location.search).get(key));
      const resolved = Math.max(1, typeof next === "function" ? next(current) : next);
      writeParam(navigate, key, String(resolved), "1");
    },
    [navigate, key],
  );
  return [page, setPage];
}

/** `value`, but only after it has stopped changing for `delayMs` — keeps typing from firing a request per key. */
export function useDebouncedValue<T>(value: T, delayMs = 300): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(id);
  }, [value, delayMs]);
  return debounced;
}
