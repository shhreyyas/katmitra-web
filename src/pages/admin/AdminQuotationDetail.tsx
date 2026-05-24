import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchAdminQuotation } from "@/services/adminService";

type QuotationDetail = {
  id: string;
  status: string;
  client_name: string;
  client_phone?: string | null;
  function_type?: string | null;
  event_date?: string | null;
  guest_count?: number;
  discount_amount?: number;
  service_charge_pct?: number;
  tax_pct?: number;
  subtotal?: number;
  service_charge_amount?: number;
  tax_amount?: number;
  total?: number;
  plate_price?: number | null;
  menu_items?: Array<{
    name_snapshot?: string | null;
    price_per_plate_snapshot?: number;
  }>;
  business?: {
    id: string;
    name?: string | null;
    owner_name?: string | null;
    contact_number?: string | null;
    email?: string | null;
  } | null;
  created_at?: string;
  updated_at?: string;
};

const fmt = (iso?: string | null) =>
  iso ? new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" }) : "—";

const AdminQuotationDetail = () => {
  const { quotationId } = useParams();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["admin", "quotation", quotationId],
    queryFn: () => fetchAdminQuotation(quotationId!) as Promise<QuotationDetail>,
    enabled: Boolean(quotationId),
  });

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading quotation…</p>;
  }

  if (isError || !data) {
    return (
      <div className="space-y-4">
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/quotations">← Back to quotations</Link>
        </Button>
        <p className="text-sm text-destructive">
          {(error as Error)?.message || "Quotation not found"}
        </p>
      </div>
    );
  }

  const menuItems = data.menu_items ?? [];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="outline" size="sm" asChild>
          <Link to="/admin/quotations">← Quotations</Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gradient-gold">{data.client_name}</h1>
          <p className="text-sm text-muted-foreground font-mono">{data.id}</p>
        </div>
        <Badge>{data.status}</Badge>
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
            <CardTitle className="text-base">Client & event</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-1">
            <p>{data.client_name}</p>
            <p className="text-muted-foreground">{data.client_phone ?? "—"}</p>
            <p className="pt-2">
              <span className="text-muted-foreground">Event date: </span>
              {fmt(data.event_date)}
            </p>
            <p>
              <span className="text-muted-foreground">Function: </span>
              {data.function_type ?? "—"}
            </p>
            <p>
              <span className="text-muted-foreground">Guests: </span>
              {data.guest_count ?? "—"}
            </p>
            {data.plate_price != null && (
              <p>
                <span className="text-muted-foreground">Plate price: </span>₹
                {data.plate_price.toLocaleString("en-IN")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="text-base">Pricing</CardTitle>
        </CardHeader>
        <CardContent className="text-sm grid gap-1 sm:grid-cols-2">
          <p>Subtotal: ₹{(data.subtotal ?? 0).toLocaleString("en-IN")}</p>
          <p>
            Service ({data.service_charge_pct ?? 0}%): ₹
            {(data.service_charge_amount ?? 0).toLocaleString("en-IN")}
          </p>
          <p>
            Tax ({data.tax_pct ?? 0}%): ₹{(data.tax_amount ?? 0).toLocaleString("en-IN")}
          </p>
          <p>Discount: ₹{(data.discount_amount ?? 0).toLocaleString("en-IN")}</p>
          <p className="font-semibold sm:col-span-2">
            Total: ₹{(data.total ?? 0).toLocaleString("en-IN")}
          </p>
          <p className="text-muted-foreground">Created {fmt(data.created_at)}</p>
          <p className="text-muted-foreground">Updated {fmt(data.updated_at)}</p>
        </CardContent>
      </Card>

      {menuItems.length > 0 && (
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-base">Menu items ({menuItems.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm space-y-2">
              {menuItems.map((mi, i) => (
                <li key={i} className="flex justify-between gap-4">
                  <span>{mi.name_snapshot ?? "Item"}</span>
                  <span className="text-muted-foreground shrink-0">
                    ₹{(mi.price_per_plate_snapshot ?? 0).toLocaleString("en-IN")}/plate
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AdminQuotationDetail;
