import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchAdminUsers, type AdminUserRow } from "@/services/adminService";
import { formatAdminDate } from "@/lib/adminFormat";

const DAY_MS = 24 * 60 * 60 * 1000;
/** Trials ending within this many days are listed alongside the ones already past their end date. */
const WINDOW_DAYS = 7;
const MAX_ROWS = 100;

/** Whole days from today to the trial end date; negative once it has passed. */
function daysLeft(expiry: string): number | null {
  const end = new Date(expiry);
  if (Number.isNaN(end.getTime())) return null;
  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
  return Math.round((startOfDay(end) - startOfDay(new Date())) / DAY_MS);
}

function dueLabel(days: number): string {
  if (days < 0) return `Ended ${-days} day${days === -1 ? "" : "s"} ago`;
  if (days === 0) return "Ends today";
  return `${days} day${days === 1 ? "" : "s"} left`;
}

/**
 * Dashboard panel: caterers on a trial that has ended or ends within a week.
 * The users list keeps showing these as "Trial", so this is where they surface for follow-up.
 */
const TrialsAttention = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["admin", "users", "trials-attention"],
    queryFn: () => fetchAdminUsers({ plan: "trial", status: "active", page: 1, limit: MAX_ROWS }),
  });

  const due = (data?.users ?? [])
    .map((user) => ({ user, days: user.expiry_date ? daysLeft(user.expiry_date) : null }))
    .filter((r): r is { user: AdminUserRow; days: number } => r.days !== null && r.days <= WINDOW_DAYS)
    .sort((a, b) => a.days - b.days);
  const ended = due.filter((r) => r.days < 0).length;

  return (
    <section className="rounded-xl border border-border/60 bg-card p-5 shadow-sm">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold">Trials needing follow-up</h2>
        {due.length ? (
          <p className="text-sm text-muted-foreground">
            {ended} ended · {due.length - ended} ending within {WINDOW_DAYS} days
          </p>
        ) : null}
      </div>

      {isPending ? (
        <div className="mt-4 space-y-2" role="status" aria-busy="true" aria-label="Loading">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      ) : isError ? (
        <p className="mt-4 text-sm text-destructive">Could not load trial accounts.</p>
      ) : due.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground">
          No trials have ended or end in the next {WINDOW_DAYS} days.
        </p>
      ) : (
        <ul className="mt-3 divide-y divide-border/60">
          {due.map(({ user, days }) => (
            <li key={user.id}>
              <Link
                to={`/admin/users/${user.id}`}
                className="flex items-center gap-3 rounded-md px-2 py-3 transition-colors hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
              >
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium">{user.business_name}</span>
                  <span className="block truncate text-sm text-muted-foreground">
                    {user.owner_name} · {user.phone}
                  </span>
                </span>
                <span className="hidden text-sm text-muted-foreground sm:block">
                  {formatAdminDate(user.expiry_date)}
                </span>
                <Badge variant={days < 0 ? "destructive" : "secondary"} className="whitespace-nowrap">
                  {dueLabel(days)}
                </Badge>
                <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      )}
      {(data?.pagination.total ?? 0) > MAX_ROWS ? (
        <p className="mt-3 text-xs text-muted-foreground">
          Checked the first {MAX_ROWS} trial accounts only.
        </p>
      ) : null}
    </section>
  );
};

export default TrialsAttention;
