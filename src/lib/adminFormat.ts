/** `anniversaryDinner`, `booking_deleted`, `CANCELLED` → "Anniversary dinner", "Booking deleted", "Cancelled". */
export function humanizeLabel(value: string | null | undefined, fallback = "—"): string {
  if (!value) return fallback;
  const spaced = value
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[_-]+/g, " ")
    .trim()
    .toLowerCase();
  return spaced ? spaced.charAt(0).toUpperCase() + spaced.slice(1) : fallback;
}

/** `2026-10-04` or an ISO timestamp → "4 Oct 2026". Unparseable values are returned unchanged. */
export function formatAdminDate(value: string | null | undefined, fallback = "—"): string {
  if (!value) return fallback;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

/** "2 bookings, 1 quotation" for a `{ bookings, quotations, dishes }` usage object; "" when unused. */
export function describeCatalogUsage(
  usage: { bookings?: number; quotations?: number; dishes?: number } | undefined,
): string {
  if (!usage) return "";
  const part = (n: number | undefined, one: string, many: string) =>
    n ? `${n} ${n === 1 ? one : many}` : "";
  return [
    part(usage.bookings, "booking", "bookings"),
    part(usage.quotations, "quotation", "quotations"),
    part(usage.dishes, "dish", "dishes"),
  ]
    .filter(Boolean)
    .join(", ");
}
