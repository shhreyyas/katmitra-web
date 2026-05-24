export type BulkImportJob = {
  id: string;
  type: string;
  label: string;
  created_at: string;
  total_rows: number;
  imported: number;
  skipped: number;
  failed: number;
  status: "completed" | "failed";
};

const STORAGE_KEY = "katmitra_admin_bulk_imports";
const MAX_JOBS = 20;

export const loadRecentImports = (): BulkImportJob[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as BulkImportJob[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const saveRecentImport = (job: BulkImportJob) => {
  const list = loadRecentImports();
  list.unshift(job);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, MAX_JOBS)));
};

export const errorsToCsv = (errors: { row: number; message: string }[]) => {
  const lines = ["row,error", ...errors.map((e) => `${e.row},"${e.message.replace(/"/g, '""')}"`)];
  return lines.join("\n");
};
