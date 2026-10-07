import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  CalendarCheck,
  FileText,
  IndianRupee,
  LifeBuoy,
  Repeat,
  UserX,
  Users,
  type LucideIcon,
} from "lucide-react";
import { fetchDashboardStats } from "@/services/adminService";
import { AdminCardGridSkeleton, AdminErrorState } from "@/components/admin/AdminStates";
import TrialsAttention from "@/components/admin/TrialsAttention";

type StatCard = { label: string; value: string; icon: LucideIcon; to: string };

const formatCount = (n: number | null | undefined) => (n ?? 0).toLocaleString("en-IN");

const AdminDashboard = () => {
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: ["admin", "dashboard"],
    queryFn: fetchDashboardStats,
  });

  const cards: StatCard[] = data
    ? [
        { label: "Total users", value: formatCount(data.total_users), icon: Users, to: "/admin/users" },
        {
          label: "Active subscriptions",
          value: formatCount(data.active_subscriptions),
          icon: Repeat,
          to: "/admin/subscriptions",
        },
        { label: "Expired / lapsed", value: formatCount(data.expired_users), icon: UserX, to: "/admin/users" },
        {
          label: "Total revenue",
          value: `₹${Math.round(data.total_revenue ?? 0).toLocaleString("en-IN")}`,
          icon: IndianRupee,
          to: "/admin/payments",
        },
        {
          label: "Total bookings",
          value: formatCount(data.total_bookings),
          icon: CalendarCheck,
          to: "/admin/bookings",
        },
        {
          label: "Total quotations",
          value: formatCount(data.total_quotations),
          icon: FileText,
          to: "/admin/quotations",
        },
        {
          label: "Support messages (30 days)",
          value: formatCount(data.open_support_messages),
          icon: LifeBuoy,
          to: "/admin/support",
        },
      ]
    : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gradient-gold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Platform-wide totals across all caterers.</p>
      </div>
      {isPending ? (
        <AdminCardGridSkeleton count={7} />
      ) : isError ? (
        <AdminErrorState
          message={(error as Error)?.message || "Could not load dashboard."}
          onRetry={() => void refetch()}
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ label, value, icon: Icon, to }) => (
            <Link
              key={label}
              to={to}
              className="group rounded-xl border border-border/60 bg-card p-5 shadow-sm transition-colors hover:border-gold/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm text-muted-foreground">{label}</p>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gold/15 text-gold">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
              </div>
              <p className="mt-3 text-3xl font-semibold tabular-nums tracking-tight">{value}</p>
            </Link>
          ))}
        </div>
      )}
      <TrialsAttention />
    </div>
  );
};

export default AdminDashboard;
