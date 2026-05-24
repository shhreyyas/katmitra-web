import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchDashboardStats } from "@/services/adminService";

const AdminDashboard = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: fetchDashboardStats,
  });

  const cards = data
    ? [
        ["Total Users", data.total_users],
        ["Active Subscriptions", data.active_subscriptions],
        ["Expired / Lapsed", data.expired_users],
        [
          "Total Revenue",
          `₹ ${Math.round(data.total_revenue).toLocaleString("en-IN")}`,
        ],
        ["Total Bookings", data.total_bookings],
        ["Total Quotations", data.total_quotations],
        ["Support (30d)", data.open_support_messages],
      ]
    : [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gradient-gold">Dashboard</h1>
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading stats…</p>
      ) : isError ? (
        <p className="text-sm text-destructive">Could not load dashboard. Check API and admin role.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(([label, value]) => (
            <Card key={label} className="glass-card-gold">
              <CardHeader>
                <CardTitle className="text-sm text-muted-foreground">{label}</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">{value}</CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
