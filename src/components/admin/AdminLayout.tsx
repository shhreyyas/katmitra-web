import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { adminLogout } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";

const navItems = [
  ["Dashboard", "/admin/dashboard"],
  ["Users", "/admin/users"],
  ["Access Codes", "/admin/access-codes"],
  ["Subscriptions", "/admin/subscriptions"],
  ["Payments", "/admin/payments"],
  ["Bookings", "/admin/bookings"],
  ["Quotations", "/admin/quotations"],
  ["Notifications", "/admin/notifications"],
  ["Support", "/admin/support"],
  ["Settings", "/admin/settings"],
  ["Logs", "/admin/logs"],
];

const AdminLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-dark">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <aside className="w-72 border-r border-border/50 bg-card/50 p-4 backdrop-blur-xl">
          <h1 className="mb-6 text-xl font-bold text-gradient-gold">Katmitra Admin</h1>
          <nav className="space-y-1">
            {navItems.map(([label, path]) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-gradient-gold text-primary-foreground shadow-md"
                      : "text-foreground/80 hover:bg-secondary"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <Button
            className="mt-6 w-full"
            variant="outline"
            onClick={() => {
              adminLogout();
              navigate("/admin/login");
            }}
          >
            Logout
          </Button>
        </aside>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
