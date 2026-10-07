import { AlertTriangle, Inbox, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const AdminErrorState = ({
  message = "Something went wrong while loading this page.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) => (
  <div
    role="alert"
    className="flex flex-col items-center gap-3 rounded-xl border border-destructive/30 bg-destructive/5 px-6 py-10 text-center"
  >
    <AlertTriangle className="h-8 w-8 text-destructive" aria-hidden />
    <p className="max-w-md text-sm text-foreground">{message}</p>
    {onRetry ? (
      <Button variant="outline" size="sm" onClick={onRetry} className="gap-2">
        <RefreshCw className="h-4 w-4" aria-hidden />
        Try again
      </Button>
    ) : null}
  </div>
);

export const AdminEmptyState = ({ message }: { message: string }) => (
  <div className="flex flex-col items-center gap-2 px-6 py-10 text-center text-muted-foreground">
    <Inbox className="h-8 w-8" aria-hidden />
    <p className="text-sm">{message}</p>
  </div>
);

export const AdminCardGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-busy="true" aria-label="Loading">
    {Array.from({ length: count }, (_, i) => (
      <Skeleton key={i} className="h-28 rounded-xl" />
    ))}
  </div>
);

/** Placeholder for a list table while its first page loads. */
export const AdminTableSkeleton = ({ rows = 8, columns = 5 }: { rows?: number; columns?: number }) => (
  <div className="space-y-3" role="status" aria-busy="true" aria-label="Loading">
    <div className="flex gap-4 border-b border-border/60 pb-3">
      {Array.from({ length: columns }, (_, c) => (
        <Skeleton key={c} className="h-4 flex-1" />
      ))}
    </div>
    {Array.from({ length: rows }, (_, r) => (
      <div key={r} className="flex items-center gap-4 py-1.5">
        {Array.from({ length: columns }, (_, c) => (
          <Skeleton key={c} className={c === 0 ? "h-5 flex-[1.5]" : "h-5 flex-1"} />
        ))}
      </div>
    ))}
  </div>
);

/** Placeholder for a detail page: a heading and a few info cards. */
export const AdminDetailSkeleton = () => (
  <div className="space-y-6" role="status" aria-busy="true" aria-label="Loading">
    <div className="space-y-2">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-64 max-w-full" />
    </div>
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 3 }, (_, i) => (
        <Skeleton key={i} className="h-40 rounded-xl" />
      ))}
    </div>
    <Skeleton className="h-56 rounded-xl" />
  </div>
);

/** Placeholder for a settings-style form: labelled fields in a card. */
export const AdminFormSkeleton = ({ fields = 4 }: { fields?: number }) => (
  <div className="max-w-xl space-y-5" role="status" aria-busy="true" aria-label="Loading">
    {Array.from({ length: fields }, (_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
  </div>
);
