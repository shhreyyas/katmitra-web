import { useState } from "react";
import { Link } from "react-router-dom";
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
import { fetchAdminQuotations } from "@/services/adminService";

const statusVariant = (status: string) => {
  if (status === "ACCEPTED") return "default" as const;
  if (status === "SENT") return "secondary" as const;
  if (status === "DRAFT") return "outline" as const;
  return "secondary" as const;
};

const formatEventDate = (iso: string | null) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString(undefined, { dateStyle: "medium" });
};

const AdminQuotations = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventDate, setEventDate] = useState("");
  const [businessId, setBusinessId] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "quotations", search, statusFilter, eventDate, businessId, page],
    queryFn: () =>
      fetchAdminQuotations({
        q: search.trim() || undefined,
        status: statusFilter,
        event_date: eventDate || undefined,
        business_id: businessId.trim() || undefined,
        page,
        limit: 20,
      }),
  });

  const quotations = data?.quotations ?? [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-gold">Quotations</h1>
        <p className="text-sm text-muted-foreground">
          Read-only list of caterer quotations across the platform.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        <Input
          className="w-64"
          placeholder="Search client, business…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <Input
          type="date"
          className="w-40"
          value={eventDate}
          onChange={(e) => {
            setEventDate(e.target.value);
            setPage(1);
          }}
        />
        <Input
          className="w-56"
          placeholder="Business ID (optional)"
          value={businessId}
          onChange={(e) => {
            setBusinessId(e.target.value);
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
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="SALE">Sale</SelectItem>
            <SelectItem value="SENT">Sent</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Quotations list</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <p className="text-sm text-muted-foreground">Loading…</p>
          ) : isError ? (
            <p className="text-sm text-destructive">
              {(error as Error)?.message || "Failed to load quotations"}
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Event</TableHead>
                    <TableHead>Business</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right">View</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {quotations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No quotations match your filters
                      </TableCell>
                    </TableRow>
                  ) : (
                    quotations.map((q) => (
                      <TableRow key={q.id}>
                        <TableCell>
                          <div className="font-medium">{q.client_name}</div>
                          {q.client_phone && (
                            <div className="text-xs text-muted-foreground">{q.client_phone}</div>
                          )}
                        </TableCell>
                        <TableCell className="text-sm">
                          <div>{formatEventDate(q.event_date)}</div>
                          <div className="text-muted-foreground">
                            {q.function_type ?? "—"}
                            {q.guest_count > 0 ? ` · ${q.guest_count} guests` : ""}
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{q.business_name}</TableCell>
                        <TableCell>
                          <Badge variant={statusVariant(q.status)}>{q.status}</Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          ₹{q.total.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button size="sm" variant="outline" asChild>
                            <Link to={`/admin/quotations/${q.id}`}>Details</Link>
                          </Button>
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
                    quotations)
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

export default AdminQuotations;
