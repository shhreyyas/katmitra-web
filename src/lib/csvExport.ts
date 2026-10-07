export type CsvColumn<T> = { header: string; value: (row: T) => string | number | null | undefined };

/** Quote a cell, and neutralise values a spreadsheet would run as a formula. */
function csvCell(raw: string | number | null | undefined): string {
  let text = raw === null || raw === undefined ? "" : String(raw);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return /[",\n\r]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

export function toCsv<T>(rows: T[], columns: CsvColumn<T>[]): string {
  const lines = [columns.map((c) => csvCell(c.header)).join(",")];
  rows.forEach((row) => lines.push(columns.map((c) => csvCell(c.value(row))).join(",")));
  return lines.join("\r\n");
}

export function downloadCsv(filename: string, csv: string) {
  // BOM so Excel opens Hindi / Gujarati text as UTF-8.
  const blob = new Blob(["﻿", csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
