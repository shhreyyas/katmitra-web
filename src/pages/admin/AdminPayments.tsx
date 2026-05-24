import { useState } from "react";
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
import { fetchPayments, updatePaymentStatus } from "@/services/adminService";

const isPaid = (status: string) =>
  ["captured", "paid", "success"].includes(status.toLowerCase());

const statusVariant = (status: string) => {
  if (isPaid(status)) return "default" as const;
  if (status.toLowerCase().includes("fail")) return "destructive" as const;
  return "secondary" as const;
};

const methodLabel: Record<string, string> = {
  razorpay: "Razorpay",
  offline: "Offline",
  other: "Other",
};

const AdminPayments = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: [
      "admin",
      "payments",
      search,
      statusFilter,
      methodFilter,
      fromDate,
      toDate,
      page,
    ],
    queryFn: () =>
      fetchPayments({
        q: search.trim() || undefined,
        status: statusFilter,
        method: methodFilter,
        from_date: fromDate || undefined,
        to_date: toDate || undefined,
        page,
        limit: 20,
      }),
  });

  const markPaidMutation = useMutation({
    mutationFn: (id: string) => updatePaymentStatus(id, "captured"),
    onSuccess: () => {
      toast.success("Marked as paid");
      qc.invalidateQueries({ queryKey: ["admin", "payments"] });
      qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const payments = data?.payments ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-gold">Payments</h1>
        <p className="text-sm text-muted-foreground">
          Platform (Razorpay) and offline payments recorded for businesses.
        </p>
      </div>

      <Card className="glass-card border-primary/20">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">Revenue this month (captured)</p>
          <p className="text-3xl font-bold text-gradient-gold">
            ₹{(data?.revenue_this_month ?? 0).toLocaleString("en-IN")}
          </p>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-2">
        <Input
          className="w-56"
          placeholder="Search business, transaction id…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Select
          value={methodFilter}
          onValueChange={(v) => {
            setMethodFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All methods</SelectItem>
            <SelectItem value="razorpay">Razorpay</SelectItem>
            <SelectItem value="offline">Offline</SelectItem>
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
            <SelectItem value="captured">Paid</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="date"
          className="w-40"
          value={fromDate}
          onChange={(e) => {
            setFromDate(e.target.value);
            setPage(1);
          }}
        />
        <Input
          type="date"
          className="w-40"
          value={toDate}
          onChange={(e) => {
            setToDate(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Payment history</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              {(error as Error)?.message || "Failed to load payments"}
            </p>
          ) : payments.length === 0 ? (
            <p className="text-sm text-muted-foreground">No payments found</p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Business</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium">{p.business_name}</TableCell>
                      <TableCell>₹{p.amount.toLocaleString("en-IN")}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {methodLabel[p.method] ?? p.method}
                        </Badge>
                      </TableCell>
                      <TableCell
                        className="font-mono text-xs max-w-[160px] truncate"
                        title={p.transaction_id ?? ""}
                      >
                        {p.transaction_id ?? "—"}
                      </TableCell>
                      <TableCell className="text-xs">
                        {new Date(p.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusVariant(p.status)}>{p.status}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {!isPaid(p.status) && (
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={markPaidMutation.isPending}
                            onClick={() => markPaidMutation.mutate(p.id)}
                          >
                            Mark paid
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

export default AdminPayments;
