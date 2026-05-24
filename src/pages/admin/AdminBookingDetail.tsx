import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchAdminBooking } from "@/services/adminService";

type BookingEvent = {
  id?: string;
  event_at?: string | null;
  event_location?: string | null;
  function_type?: string | null;
  guest_count?: number | null;
  status?: string;
};

type BookingDetail = {
  id: string;
  booking_code?: string | null;
  status: string;
  customer_name?: string | null;
  customer_phone?: string | null;
  customer_email?: string | null;
  event_at?: string | null;
  event_location?: string | null;
  function_type?: string | null;
  guest_count?: number | null;
  subtotal?: number;
  service_charge_amount?: number;
  tax_amount?: number;
  total_due?: number;
  amount_paid?: number;
  payment_status?: string;
  menu_items?: Array<{ name_snapshot?: string; quantity?: number }>;
  events?: BookingEvent[];
  payments?: Array<{ amount?: number; method?: string; created_at?: string }>;
  business?: {
    id: string;
    name?: string | null;
    owner_name?: string | null;
    contact_number?: string | null;
    email?: string | null;
  } | null;
  created_at?: string;
  completed_at?: string | null;
};

const fmt = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—";

const AdminBookingDetail = () => {
  const { bookingId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "booking", bookingId],
    queryFn: () => fetchAdminBooking(bookingId!) as Promise<BookingDetail>,
    enabled: Boolean(bookingId),
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading booking…</p>;
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/bookings">← Back to bookings</Link>
        </Button>
        <p className="text-sm text-destructive">
          {(error as Error)?.message || "Booking not found"}
        </p>
      </div>
    );
  }

  const events = data.events ?? [];
  const menuItems = data.menu_items ?? [];
  const payments = data.payments ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/bookings">← Bookings</Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">
            {data.customer_name || "Booking"}
          </h1>
          <p className="text-sm text-muted-foreground font-mono">
            {data.booking_code || data.id}
          </p>
        </div>
        <Badge>{data.status}</Badge>
        {data.payment_status && <Badge variant="outline">{data.payment_status}</Badge>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Caterer</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p>
              <span className="text-muted-foreground">Business: </span>
              {data.business?.name ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Owner: </span>
              {data.business?.owner_name ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Contact: </span>
              {data.business?.contact_number ?? data.business?.email ?? "—"}
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Customer</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p>{data.customer_name ?? "—"}</p>
            <p className="text-muted-foreground">{data.customer_phone ?? "—"}</p>
            <p className="text-muted-foreground">{data.customer_email ?? ""}</p>
            <p className="pt-2">
              <span className="text-muted-foreground">Event: </span>
              {fmt(data.event_at)}
            </p>
            <p>
              <span className="text-muted-foreground">Location: </span>
              {data.event_location ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Guests: </span>
              {data.guest_count ?? "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Totals</CardTitle>
        </CardHeader>
        <CardContent className="text-sm grid gap-1 sm:grid-cols-2">
          <p>Subtotal: ₹{(data.subtotal ?? 0).toLocaleString("en-IN")}</p>
          <p>Service charge: ₹{(data.service_charge_amount ?? 0).toLocaleString("en-IN")}</p>
          <p>Tax: ₹{(data.tax_amount ?? 0).toLocaleString("en-IN")}</p>
          <p className="font-semibold">
            Total due: ₹{(data.total_due ?? 0).toLocaleString("en-IN")}
          </p>
          <p>Paid: ₹{(data.amount_paid ?? 0).toLocaleString("en-IN")}</p>
          <p className="text-muted-foreground">Created {fmt(data.created_at)}</p>
          {data.completed_at && (
            <p className="text-muted-foreground">Completed {fmt(data.completed_at)}</p>
          )}
        </CardContent>
      </Card>

      {events.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Events ({events.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>When</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Guests</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((ev, i) => (
                  <TableRow key={ev.id ?? i}>
                    <TableCell className="text-sm">{fmt(ev.event_at)}</TableCell>
                    <TableCell>{ev.function_type ?? "—"}</TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      {ev.event_location ?? "—"}
                    </TableCell>
                    <TableCell>{ev.guest_count ?? "—"}</TableCell>
                    <TableCell>{ev.status ?? "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {menuItems.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Menu items</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-1">
              {menuItems.map((mi, i) => (
                <li key={i}>
                  {mi.name_snapshot ?? "Item"} × {mi.quantity ?? 1}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {payments.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((p, i) => (
                  <TableRow key={i}>
                    <TableCell>₹{(p.amount ?? 0).toLocaleString("en-IN")}</TableCell>
                    <TableCell>{p.method ?? "—"}</TableCell>
                    <TableCell className="text-sm">{fmt(p.created_at)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminBookingDetail;
