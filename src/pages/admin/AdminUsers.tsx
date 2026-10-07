import { useState } from "react";
import type { AdminUserRow } from "@/services/adminService";
import ExportCsvButton from "@/components/admin/ExportCsvButton";
import { useDebouncedValue, useUrlPage, useUrlParam } from "@/hooks/useUrlState";
import { AdminTableSkeleton } from "@/components/admin/AdminStates";
import { formatAdminDate, humanizeLabel } from "@/lib/adminFormat";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import RowActions from "@/components/admin/RowActions";
import DeleteUsersDialog, { type UserToDelete } from "@/components/admin/DeleteUsersDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAdminUsers } from "@/services/adminService";

const planVariant = (plan: string) => {
  const p = plan.toUpperCase();
  if (p === "EXPIRED") return "destructive" as const;
  if (p === "TRIAL") return "secondary" as const;
  if (p === "FREE") return "outline" as const;
  return "default" as const;
};

const AdminUsers = () => {
  const navigate = useNavigate();
  const [searchInput, setSearch] = useUrlParam("q", "");
  const search = useDebouncedValue(searchInput);
  const [planFilter, setPlanFilter] = useUrlParam("plan", "all");
  const [statusFilter, setStatusFilter] = useUrlParam("status", "all");
  const [page, setPage] = useUrlPage();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "users", search, planFilter, statusFilter, page],
    queryFn: () =>
      fetchAdminUsers({
        q: search.trim() || undefined,
        plan: planFilter,
        status: statusFilter,
        page,
        limit: 20,
      }),
  });

  const users = data?.users ?? [];
  const pagination = data?.pagination;

  const qc = useQueryClient();
  // Selection is by id and survives paging, so users from several pages can be deleted together.
  const [selected, setSelected] = useState<Map<string, string>>(new Map());
  const [toDelete, setToDelete] = useState<UserToDelete[]>([]);

  const labelFor = (u: AdminUserRow) => `${u.business_name} — ${u.owner_name}`;
  const toggleUser = (u: AdminUserRow, checked: boolean) =>
    setSelected((prev) => {
      const next = new Map(prev);
      if (checked) next.set(u.id, labelFor(u));
      else next.delete(u.id);
      return next;
    });
  const allOnPageSelected = users.length > 0 && users.every((u) => selected.has(u.id));
  const someOnPageSelected = users.some((u) => selected.has(u.id));
  const togglePage = (checked: boolean) =>
    setSelected((prev) => {
      const next = new Map(prev);
      users.forEach((u) => (checked ? next.set(u.id, labelFor(u)) : next.delete(u.id)));
      return next;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">Users</h1>
          <p className="text-sm text-muted-foreground">
            Caterer accounts and subscription overview.
          </p>
        </div>
        <ExportCsvButton<AdminUserRow>
          name="users"
          columns={[
            { header: "Business", value: (u) => u.business_name },
            { header: "Owner", value: (u) => u.owner_name },
            { header: "Phone", value: (u) => u.phone },
            { header: "Email", value: (u) => u.email },
            { header: "Plan", value: (u) => u.plan_type },
            { header: "Expiry", value: (u) => u.expiry_date },
            { header: "Status", value: (u) => u.status },
            { header: "Joined", value: (u) => u.created_at },
          ]}
          fetchPage={(page, limit) =>
            fetchAdminUsers({
              q: search.trim() || undefined,
              plan: planFilter,
              status: statusFilter,
              page,
              limit,
            }).then((d) => ({ rows: d.users, totalPages: d.pagination.total_pages }))
          }
        />
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          className="w-64"
          placeholder="Search business, owner, email, phone…"
          value={searchInput}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Select
          value={planFilter}
          onValueChange={(v) => {
            setPlanFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All plans</SelectItem>
            <SelectItem value="free">Free</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="subscribed">Subscribed</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card">
        <CardHeader className="flex flex-row flex-wrap items-center justify-between gap-3 space-y-0">
          <CardTitle className="text-base">Users list</CardTitle>
          {selected.size > 0 ? (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-muted-foreground">{selected.size} selected</span>
              <Button size="sm" variant="ghost" onClick={() => setSelected(new Map())}>
                Clear
              </Button>
              <Button
                size="sm"
                variant="destructive"
                className="gap-2"
                onClick={() =>
                  setToDelete([...selected].map(([id, label]) => ({ id, label })))
                }
              >
                <Trash2 className="h-4 w-4" aria-hidden />
                Delete selected
              </Button>
            </div>
          ) : null}
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <AdminTableSkeleton columns={7} />
          ) : isError ? (
            <p className="text-sm text-destructive">
              {(error as Error)?.message || "Failed to load users"}
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox
                        aria-label="Select all users on this page"
                        checked={allOnPageSelected ? true : someOnPageSelected ? "indeterminate" : false}
                        onCheckedChange={(v) => togglePage(v === true)}
                      />
                    </TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={9} className="text-center text-muted-foreground">
                        No users found
                      </TableCell>
                    </TableRow>
                  ) : (
                    users.map((u) => (
                      <TableRow
                        key={u.id}
                        className="cursor-pointer"
                        onClick={() => navigate(`/admin/users/${u.id}`)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            aria-label={`Select ${u.business_name}`}
                            checked={selected.has(u.id)}
                            onCheckedChange={(v) => toggleUser(u, v === true)}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{u.business_name}</TableCell>
                        <TableCell>{u.owner_name}</TableCell>
                        <TableCell>{u.phone}</TableCell>
                        <TableCell className="text-xs">{u.email}</TableCell>
                        <TableCell>
                          <Badge variant={planVariant(u.plan_type)}>{humanizeLabel(u.plan_type)}</Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{formatAdminDate(u.expiry_date)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={u.status === "active" ? "default" : "secondary"}
                          >
                            {u.status === "active" ? "Active" : "Suspended"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                          <RowActions
                            name={u.business_name}
                            actions={[
                              { label: "View", onSelect: () => navigate(`/admin/users/${u.id}`) },
                              {
                                label: "Delete permanently",
                                destructive: true,
                                onSelect: () => setToDelete([{ id: u.id, label: labelFor(u) }]),
                              },
                            ]}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {pagination && pagination.total_pages > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                  <span>
                    Page {pagination.page} of {pagination.total_pages} ({pagination.total}{" "}
                    users)
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={page <= 1}
                      onClick={() => setPage((p) => p - 1)}
                    >
                      Previous
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={page >= pagination.total_pages}
                      onClick={() => setPage((p) => p + 1)}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
      <DeleteUsersDialog
        users={toDelete}
        onClose={() => setToDelete([])}
        onDone={(result) => {
          setSelected((prev) => {
            const next = new Map(prev);
            result.deleted.forEach((d) => next.delete(d.id));
            return next;
          });
          void qc.invalidateQueries({ queryKey: ["admin", "users"] });
          void qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
        }}
      />
    </div>
  );
};

export default AdminUsers;
