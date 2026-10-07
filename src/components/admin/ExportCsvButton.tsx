import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { downloadCsv, toCsv, type CsvColumn } from "@/lib/csvExport";

const EXPORT_PAGE_SIZE = 100;
/** Safety stop: 100 pages × 100 rows. */
const MAX_PAGES = 100;

type ExportCsvButtonProps<T> = {
  /** Used for the file name: `katmitra-<name>-2026-10-07.csv`. */
  name: string;
  columns: CsvColumn<T>[];
  /** Loads one page of the list with the filters currently applied on screen. */
  fetchPage: (page: number, limit: number) => Promise<{ rows: T[]; totalPages: number }>;
};

/** Downloads every row matching the current filters (not just the visible page) as a CSV file. */
function ExportCsvButton<T>({ name, columns, fetchPage }: ExportCsvButtonProps<T>) {
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    try {
      const all: T[] = [];
      let totalPages = 1;
      for (let page = 1; page <= totalPages && page <= MAX_PAGES; page += 1) {
        const result = await fetchPage(page, EXPORT_PAGE_SIZE);
        all.push(...result.rows);
        totalPages = result.totalPages;
      }
      if (!all.length) {
        toast.info("Nothing to export for the current filters");
        return;
      }
      const date = new Date().toISOString().slice(0, 10);
      downloadCsv(`katmitra-${name}-${date}.csv`, toCsv(all, columns));
      toast.success(`Exported ${all.length} row${all.length === 1 ? "" : "s"}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Export failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button variant="outline" onClick={() => void run()} disabled={busy} className="gap-2">
      {busy ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
      ) : (
        <Download className="h-4 w-4" aria-hidden />
      )}
      {busy ? "Exporting…" : "Export CSV"}
    </Button>
  );
}

export default ExportCsvButton;
