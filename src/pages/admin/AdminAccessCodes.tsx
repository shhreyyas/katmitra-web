import { useState } from "react";
import { useDebouncedValue, useUrlPage, useUrlParam } from "@/hooks/useUrlState";
import { AdminTableSkeleton } from "@/components/admin/AdminStates";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ConfirmButton from "@/components/admin/ConfirmButton";
import { Input } from "@/components/ui/input";
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
import {
  createAccessCodes,
  fetchAccessCodes,
  deleteAccessCode,
  updateAccessCodeStatus,
} from "@/services/adminService";

const statusVariant = (status: string) => {
  if (status === "unused") return "default" as const;
  if (status === "used") return "secondary" as const;
  if (status === "disabled" || status === "expired") return "outline" as const;
  return "outline" as const;
};

const AdminAccessCodes = () => {
  const qc = useQueryClient();
  const [planType, setPlanType] = useState("1M");
  const [count, setCount] = useState(5);
  const countValid = Number.isInteger(count) && count >= 1 && count <= 100;
  const [statusFilter, setStatusFilter] = useUrlParam("status", "all");
  const [planFilter, setPlanFilter] = useUrlParam("plan", "all");
  const [searchInput, setSearch] = useUrlParam("q", "");
  const search = useDebouncedValue(searchInput);
  const [page, setPage] = useUrlPage();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "access-codes", statusFilter, planFilter, search, page],
    queryFn: () =>
      fetchAccessCodes({
        status: statusFilter,
        plan: planFilter,
        q: search.trim() || undefined,
        page,
        limit: 20,
      }),
  });

  const createMutation = useMutation({
    mutationFn: () => createAccessCodes({ plan_type: planType, count }),
    onSuccess: (created) => {
      toast.success(`Generated ${created.length} code(s)`);
      qc.invalidateQueries({ queryKey: ["admin", "access-codes"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => deleteAccessCode(id),
    onSuccess: () => {
      toast.success("Access code deleted");
      qc.invalidateQueries({ queryKey: ["admin", "access-codes"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const disableMutation = useMutation({
    mutationFn: (id: string) => updateAccessCodeStatus(id, "disabled"),
    onSuccess: () => {
      toast.success("Code disabled");
      qc.invalidateQueries({ queryKey: ["admin", "access-codes"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rows = data?.access_codes ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-gold">Access Codes</h1>
        <p className="text-sm text-muted-foreground">
          Generate 6-digit codes for caterers to activate subscription plans.
        </p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Generate codes</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap items-end gap-3">
          <div className="grid gap-1">
            <span className="text-xs text-muted-foreground">Plan</span>
            <Select value={planType} onValueChange={setPlanType}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1M">1 month</SelectItem>
                <SelectItem value="6M">6 months</SelectItem>
                <SelectItem value="12M">12 months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-1">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <Input
              type="number"
              min={1}
              max={100}
              className="w-24"
              value={count}
              onChange={(e) => setCount(Number(e.target.value))}
            />
          </div>
          <Button
            onClick={() => createMutation.mutate()}
            disabled={createMutation.isPending || !countValid}
          >
            {createMutation.isPending ? "Generating…" : "Generate"}
          </Button>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Input
          className="w-48"
          placeholder="Search code or user…"
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
          <SelectTrigger className="w-28">
            <SelectValue placeholder="Plan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All plans</SelectItem>
            <SelectItem value="1M">1M</SelectItem>
            <SelectItem value="6M">6M</SelectItem>
            <SelectItem value="12M">12M</SelectItem>
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
            <SelectItem value="unused">Unused</SelectItem>
            <SelectItem value="used">Used</SelectItem>
            <SelectItem value="disabled">Disabled</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card">
        <CardContent className="pt-6">
          {isLoading ? (
            <AdminTableSkeleton columns={6} />
          ) : isError ? (
            <p className="text-sm text-destructive">
              {(error as Error)?.message || "Failed to load access codes"}
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Code</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Assigned to</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No access codes yet — generate some above
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell className="font-mono font-medium tracking-widest">
                          {r.code}
                        </TableCell>
                        <TableCell>{r.plan_type}</TableCell>
                        <TableCell>
                          <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {r.assigned_business_name ?? r.assigned_user_name ?? "—"}
                        </TableCell>
                        <TableCell className="text-xs text-muted-foreground">
                          {new Date(r.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {r.status === "unused" && (
                            <ConfirmButton
                              size="sm"
                              variant="outline"
                              title="Disable this access code?"
                              description="The code can no longer be used to activate a plan."
                              confirmLabel="Disable"
                              disabled={disableMutation.isPending}
                              onConfirm={() => disableMutation.mutate(r.id)}
                            >
                              Disable
                            </ConfirmButton>
                          )}
                          {r.status !== "used" && (
                            <ConfirmButton
                              size="sm"
                              variant="ghost"
                              className="ml-1 text-destructive"
                              title="Delete this access code?"
                              description="The code is removed permanently. Codes that were already used cannot be deleted."
                              confirmLabel="Delete"
                              disabled={deleteMutation.isPending}
                              onConfirm={() => deleteMutation.mutate(r.id)}
                            >
                              Delete
                            </ConfirmButton>
                          )}
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
                    codes)
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
    </div>
  );
};

export default AdminAccessCodes;
