import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { adminLogout, getAdminUser } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";

type NavItem = { label: string; path: string };

const mainNav: NavItem[] = [
  { label: "Dashboard", path: "/admin/dashboard" },
  { label: "Users", path: "/admin/users" },
];

const catalogNav: NavItem[] = [
  { label: "Menu Categories", path: "/admin/menu-categories" },
  { label: "Menu Items", path: "/admin/menu-items" },
  { label: "Supply Categories", path: "/admin/supply-categories" },
  { label: "Supply Items", path: "/admin/supply-items" },
  { label: "Units", path: "/admin/units" },
  { label: "Service Types", path: "/admin/service-types" },
  { label: "Extra Services", path: "/admin/extra-services" },
  { label: "Bulk Import", path: "/admin/bulk-import" },
];

const billingNav: NavItem[] = [
  { label: "Subscriptions", path: "/admin/subscriptions" },
  { label: "Payments", path: "/admin/payments" },
  { label: "Access Codes", path: "/admin/access-codes" },
];

const opsNav: NavItem[] = [
  { label: "Bookings", path: "/admin/bookings" },
  { label: "Quotations", path: "/admin/quotations" },
  { label: "Notifications", path: "/admin/notifications" },
  { label: "Support", path: "/admin/support" },
  { label: "App Version", path: "/admin/app-version" },
  { label: "Settings", path: "/admin/settings" },
  { label: "Logs", path: "/admin/logs" },
];

const NavLink = ({ item }: { item: NavItem }) => {
  const location = useLocation();
  const active = location.pathname === item.path;
  return (
    <Link
      to={item.path}
      className={`block rounded-md px-3 py-2 text-sm transition-colors ${
        active
          ? "bg-gradient-gold text-accent-foreground shadow-md"
          : "text-foreground/80 hover:bg-secondary"
      }`}
    >
      {item.label}
    </Link>
  );
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = getAdminUser();

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="flex w-72 shrink-0 flex-col border-r border-border/50 bg-card/50 p-4 backdrop-blur-xl">
          <h1 className="mb-1 text-xl font-bold text-gradient-gold">Katmitra Admin</h1>
          {user?.email ? (
            <p className="mb-4 truncate text-xs text-muted-foreground">{user.email}</p>
          ) : null}
          <nav className="flex-1 space-y-4 overflow-y-auto">
            <div className="space-y-1">
              {mainNav.map((item) => (
                <NavLink key={item.path} item={item} />
              ))}
            </div>
            <div>
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Catalog
              </p>
              <div className="space-y-1">
                {catalogNav.map((item) => (
                  <NavLink key={item.path} item={item} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Billing
              </p>
              <div className="space-y-1">
                {billingNav.map((item) => (
                  <NavLink key={item.path} item={item} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1 px-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Operations
              </p>
              <div className="space-y-1">
                {opsNav.map((item) => (
                  <NavLink key={item.path} item={item} />
                ))}
              </div>
            </div>
          </nav>
          <Button
            className="mt-4 w-full"
            variant="outline"
            onClick={() => {
              adminLogout();
              navigate("/admin/login");
            }}
          >
            Logout
          </Button>
        </aside>
        <main className="min-w-0 flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
