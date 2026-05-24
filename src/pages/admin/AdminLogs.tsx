import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
import { fetchAdminLogs } from "@/services/adminService";

const typeLabel: Record<string, string> = {
  admin_login: "Admin login",
  access_code: "Access code",
  payment: "Payment",
  offline_payment: "Offline payment",
  notification: "Notification",
};

const typeVariant = (type: string) => {
  if (type === "admin_login") return "default" as const;
  if (type === "payment" || type === "offline_payment") return "secondary" as const;
  if (type === "access_code") return "outline" as const;
  return "secondary" as const;
};

const AdminLogs = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "logs", search, typeFilter, page],
    queryFn: () =>
      fetchAdminLogs({
        q: search.trim() || undefined,
        type: typeFilter,
        page,
        limit: 30,
      }),
  });

  const logs = data?.logs ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-gold">Logs</h1>
        <p className="text-sm text-muted-foreground">
          Admin logins, access codes, payments, and notification broadcasts (merged
          timeline).
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          className="w-72"
          placeholder="Search messages…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Select
          value={typeFilter}
          onValueChange={(v) => {
            setTypeFilter(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All types</SelectItem>
            <SelectItem value="admin_login">Admin login</SelectItem>
            <SelectItem value="access_code">Access code</SelectItem>
            <SelectItem value="payment">Payment</SelectItem>
            <SelectItem value="notification">Notification</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Activity timeline</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              {(error as Error)?.message || "Failed to load logs"}
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>When</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Message</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {logs.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center text-muted-foreground">
                        No log entries match your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(log.created_at).toLocaleString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={typeVariant(log.type)}>
                            {typeLabel[log.type] ?? log.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">{log.message}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
              {pagination && pagination.total_pages > 1 && (
                <div className="flex items-center justify-between mt-4 text-sm text-muted-foreground">
                  <span>
                    Page {pagination.page} of {pagination.total_pages}
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

export default AdminLogs;
