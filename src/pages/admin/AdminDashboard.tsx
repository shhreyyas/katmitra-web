import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats } from "@/data/adminMock";

const AdminDashboard = () => {
  const cards = [
    ["Total Users", dashboardStats.totalUsers],
    ["Active Subscriptions", dashboardStats.activeSubscriptions],
    ["Expired Users", dashboardStats.expiredUsers],
    ["Total Revenue", `Rs ${dashboardStats.totalRevenue.toLocaleString()}`],
    ["Total Bookings", dashboardStats.totalBookings],
    ["Total Quotations", dashboardStats.totalQuotations],
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gradient-gold">Dashboard</h1>
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
    </div>
  );
};

export default AdminDashboard;
