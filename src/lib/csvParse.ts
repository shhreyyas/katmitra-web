/** Minimal RFC4180-style CSV parser (no dependencies). */
export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const c = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (c === '"' && next === '"') {
        field += '"';
        i += 1;
      } else if (c === '"') {
        inQuotes = false;
      } else {
        field += c;
      }
      continue;
    }

    if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || (c === "\r" && next === "\n")) {
      row.push(field);
      field = "";
      if (row.some((cell) => cell.trim() !== "")) {
        rows.push(row);
      }
      row = [];
      if (c === "\r") i += 1;
    } else if (c !== "\r") {
      field += c;
    }
  }

  row.push(field);
  if (row.some((cell) => cell.trim() !== "")) {
    rows.push(row);
  }

  return rows;
}

export function csvToObjects(
  matrix: string[][],
  hasHeader: boolean,
): { headers: string[]; rows: Record<string, string>[] } {
  if (!matrix.length) {
    return { headers: [], rows: [] };
  }
  const headers = hasHeader
    ? matrix[0].map((h, i) => h.trim() || `column_${i + 1}`)
    : matrix[0].map((_, i) => `column_${i + 1}`);
  const dataRows = hasHeader ? matrix.slice(1) : matrix;
  const rows = dataRows.map((cells) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, i) => {
      obj[h] = cells[i] ?? "";
    });
    return obj;
  });
  return { headers, rows };
}
