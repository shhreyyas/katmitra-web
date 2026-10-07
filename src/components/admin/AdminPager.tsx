import { Button } from "@/components/ui/button";
import type { Pagination } from "@/services/adminService";

type AdminPagerProps = {
  pagination?: Pagination;
  onPageChange: (page: number) => void;
  noun?: string;
};

/** Row range, total and Previous / Next for a server-paged admin list. */
const AdminPager = ({ pagination, onPageChange, noun = "items" }: AdminPagerProps) => {
  if (!pagination || pagination.total === 0) return null;
  const { page, limit, total, total_pages } = pagination;
  const from = (page - 1) * limit + 1;
  const to = Math.min(page * limit, total);

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-sm text-muted-foreground">
      <span>
        Showing {from}–{to} of {total} {noun}
      </span>
      {total_pages > 1 ? (
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </Button>
          <span className="tabular-nums">
            Page {page} of {total_pages}
          </span>
          <Button
            size="sm"
            variant="outline"
            disabled={page >= total_pages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default AdminPager;
