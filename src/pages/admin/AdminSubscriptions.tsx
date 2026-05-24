import { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
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
import { fetchSubscriptions, updateBillingSubscription } from "@/services/adminService";

const statusVariant = (status: string) => {
  const s = status.toLowerCase();
  if (s.includes("active")) return "default" as const;
  if (s.includes("cancel")) return "secondary" as const;
  if (s.includes("expir")) return "destructive" as const;
  return "outline" as const;
};

const AdminSubscriptions = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "subscriptions", search, planFilter, statusFilter, page],
    queryFn: () =>
      fetchSubscriptions({
        q: search.trim() || undefined,
        plan: planFilter,
        status: statusFilter,
        page,
        limit: 20,
      }),
  });

  const actionMutation = useMutation({
    mutationFn: ({
      id,
      body,
    }: {
      id: string;
      body: Parameters<typeof updateBillingSubscription>[1];
    }) => updateBillingSubscription(id, body),
    onSuccess: () => {
      toast.success("Subscription updated");
      qc.invalidateQueries({ queryKey: ["admin", "subscriptions"] });
      qc.invalidateQueries({ queryKey: ["admin", "users"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const subscriptions = data?.subscriptions ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-gold">Subscriptions</h1>
        <p className="text-sm text-muted-foreground">
          Razorpay billing subscriptions per business.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          className="w-64"
          placeholder="Search business, owner, Razorpay id…"
          value={search}
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
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Subscriptions</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              {(error as Error)?.message || "Failed to load subscriptions"}
            </p>
          ) : subscriptions.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No billing subscriptions yet. They appear after Razorpay checkout. Manage
              business plans from{" "}
              <Link to="/admin/users" className="text-primary underline">
                Users
              </Link>
              .
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Plan</TableHead>
                    <TableHead>Start</TableHead>
                    <TableHead>End</TableHead>
                    <TableHead>Razorpay ID</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subscriptions.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium">{s.business_name}</TableCell>
                      <TableCell>{s.owner_name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{s.plan_code ?? "—"}</Badge>
                      </TableCell>
                      <TableCell className="text-xs">
                        {s.period_start
                          ? new Date(s.period_start).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell className="text-xs">
                        {s.period_end
                          ? new Date(s.period_end).toLocaleDateString()
                          : "—"}
                      </TableCell>
                      <TableCell
                        className="font-mono text-xs max-w-[140px] truncate"
                        title={s.razorpay_subscription_id}
                      >
                        {s.razorpay_subscription_id}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(s.status)}>{s.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={actionMutation.isPending}
                          onClick={() =>
                            actionMutation.mutate({
                              id: s.id,
                              body: { months: 1, status: "active" },
                            })
                          }
                        >
                          Extend
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={actionMutation.isPending}
                          onClick={() =>
                            actionMutation.mutate({
                              id: s.id,
                              body: { status: "active", cancel_at_period_end: false },
                            })
                          }
                        >
                          Activate
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          disabled={actionMutation.isPending}
                          onClick={() =>
                            actionMutation.mutate({
                              id: s.id,
                              body: { status: "cancelled", cancel_at_period_end: true },
                            })
                          }
                        >
                          Cancel
                        </Button>
                        {s.owner_user_id && (
                          <Button size="sm" variant="ghost" asChild>
                            <Link to={`/admin/users/${s.owner_user_id}`}>User</Link>
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {pagination && pagination.total_pages > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                  <span>
                    Page {pagination.page} of {pagination.total_pages} ({pagination.total}{" "}
                    total)
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

export default AdminSubscriptions;
