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
import {
  fetchAdminSupportMessages,
  updateSupportMessageStatus,
} from "@/services/adminService";

const statusVariant = (status: string) => {
  if (status === "open") return "destructive" as const;
  return "secondary" as const;
};

const AdminSupport = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("open");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "support", search, statusFilter, page],
    queryFn: () =>
      fetchAdminSupportMessages({
        q: search.trim() || undefined,
        status: statusFilter,
        page,
        limit: 20,
      }),
  });

  const resolveMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: "open" | "resolved" }) =>
      updateSupportMessageStatus(id, status),
    onSuccess: (_, { status }) => {
      toast.success(status === "resolved" ? "Marked resolved" : "Reopened");
      qc.invalidateQueries({ queryKey: ["admin", "support"] });
      qc.invalidateQueries({ queryKey: ["admin", "dashboard"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const rows = data?.support_messages ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-gold">Support</h1>
        <p className="text-sm text-muted-foreground">
          Contact-us inquiries from the website and app. Mark resolved when handled.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          className="w-72"
          placeholder="Search name, email, phone, message…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-36">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              {(error as Error)?.message || "Failed to load support messages"}
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>From</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rows.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                        No support messages match your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    rows.map((r) => (
                      <TableRow key={r.id}>
                        <TableCell>
                          <div className="font-medium">{r.customer_name}</div>
                          <div className="text-xs text-muted-foreground">{r.email}</div>
                          {r.phone && (
                            <div className="text-xs text-muted-foreground">{r.phone}</div>
                          )}
                        </TableCell>
                        <TableCell className="max-w-sm text-sm whitespace-pre-wrap">
                          {r.description}
                        </TableCell>
                        <TableCell className="text-sm">
                          {r.business_name ?? r.user_name ?? "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusVariant(r.status)}>{r.status}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {r.status === "open" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              disabled={resolveMutation.isPending}
                              onClick={() =>
                                resolveMutation.mutate({ id: r.id, status: "resolved" })
                              }
                            >
                              Mark resolved
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={resolveMutation.isPending}
                              onClick={() =>
                                resolveMutation.mutate({ id: r.id, status: "open" })
                              }
                            >
                              Reopen
                            </Button>
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
                    messages)
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

export default AdminSupport;
