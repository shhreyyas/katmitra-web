import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  Bell,
  CalendarCheck,
  CreditCard,
  FileText,
  KeyRound,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Package,
  Repeat,
  Ruler,
  ScrollText,
  Settings,
  Smartphone,
  Sparkles,
  Tags,
  Upload,
  Users,
  UtensilsCrossed,
  Boxes,
  type LucideIcon,
} from "lucide-react";
import { adminLogout, getAdminUser } from "@/lib/adminAuth";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import ThemeToggle from "@/components/ThemeToggle";
import mainLogo from "@/assets/main-logo.jpg";
import { cn } from "@/lib/utils";

type NavItem = { label: string; path: string; icon: LucideIcon };
type NavGroup = { title?: string; items: NavItem[] };

const navGroups: NavGroup[] = [
  {
    items: [
      { label: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Users", path: "/admin/users", icon: Users },
    ],
  },
  {
    title: "Catalog",
    items: [
      { label: "Menu Categories", path: "/admin/menu-categories", icon: Tags },
      { label: "Menu Items", path: "/admin/menu-items", icon: UtensilsCrossed },
      { label: "Supply Categories", path: "/admin/supply-categories", icon: Boxes },
      { label: "Supply Items", path: "/admin/supply-items", icon: Package },
      { label: "Units", path: "/admin/units", icon: Ruler },
      { label: "Service Types", path: "/admin/service-types", icon: Layers },
      { label: "Extra Services", path: "/admin/extra-services", icon: Sparkles },
      { label: "Bulk Import", path: "/admin/bulk-import", icon: Upload },
    ],
  },
  {
    title: "Billing",
    items: [
      { label: "Subscriptions", path: "/admin/subscriptions", icon: Repeat },
      { label: "Payments", path: "/admin/payments", icon: CreditCard },
      { label: "Access Codes", path: "/admin/access-codes", icon: KeyRound },
    ],
  },
  {
    title: "Operations",
    items: [
      { label: "Bookings", path: "/admin/bookings", icon: CalendarCheck },
      { label: "Quotations", path: "/admin/quotations", icon: FileText },
      { label: "Notifications", path: "/admin/notifications", icon: Bell },
      { label: "Support", path: "/admin/support", icon: LifeBuoy },
      { label: "App Version", path: "/admin/app-version", icon: Smartphone },
      { label: "Settings", path: "/admin/settings", icon: Settings },
      { label: "Logs", path: "/admin/logs", icon: ScrollText },
    ],
  },
];

const allNavItems = navGroups.flatMap((g) => g.items);

/** Detail and nested routes (`/admin/users/42`, `/admin/bulk-import/map`) keep their section highlighted. */
const isActivePath = (pathname: string, itemPath: string) =>
  pathname === itemPath || pathname.startsWith(`${itemPath}/`);

const SidebarContent = ({ onNavigate }: { onNavigate?: () => void }) => {
  const { pathname } = useLocation();

  return (
    <div className="flex h-full flex-col">
      <Link
        to="/admin/dashboard"
        onClick={onNavigate}
        className="flex items-center gap-3 px-5 py-5"
      >
        <img src={mainLogo} alt="" className="h-9 w-9 rounded-md object-contain" />
        <span className="leading-tight">
          <span className="block font-display text-lg font-bold">
            <span className="text-gold">KAT</span>MITRA
          </span>
          <span className="block text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
            Admin
          </span>
        </span>
      </Link>

      <nav aria-label="Admin" className="flex-1 space-y-5 overflow-y-auto px-3 pb-4">
        {navGroups.map((group, i) => (
          <div key={group.title ?? i}>
            {group.title ? (
              <p className="mb-1.5 px-3 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {group.title}
              </p>
            ) : null}
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActivePath(pathname, item.path);
                const Icon = item.icon;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={onNavigate}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60",
                        active
                          ? "bg-gold/15 text-gold"
                          : "text-foreground/75 hover:bg-secondary hover:text-foreground",
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" aria-hidden />
                      <span className="truncate">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
};

const AdminLayout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const user = getAdminUser();
  const [mobileOpen, setMobileOpen] = useState(false);

  const current = allNavItems.find((item) => isActivePath(pathname, item.path));

  useEffect(() => {
    document.title = current ? `${current.label} · Katmitra Admin` : "Katmitra Admin";
    return () => {
      document.title = "Katmitra - Catering Management Platform";
    };
  }, [current]);

  const logout = () => {
    adminLogout();
    navigate("/admin/login");
  };

  const initial = (user?.name || user?.email || "A").trim().charAt(0).toUpperCase();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border/60 bg-card/60 backdrop-blur-xl lg:block">
        <SidebarContent />
      </aside>

      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Admin navigation</SheetTitle>
          <SidebarContent onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-border/60 bg-background/90 px-4 backdrop-blur-xl sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <p className="min-w-0 flex-1 truncate text-sm font-medium text-muted-foreground">
            {current?.label ?? "Admin"}
          </p>
          <ThemeToggle className="hidden sm:flex" />
          <div className="flex items-center gap-2 border-l border-border/60 pl-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/20 text-sm font-semibold text-gold"
              aria-hidden
            >
              {initial}
            </span>
            <span className="hidden max-w-[200px] truncate text-sm md:block" title={user?.email}>
              {user?.name || user?.email}
            </span>
            <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
              <LogOut className="h-4 w-4" aria-hidden />
              <span className="hidden sm:inline">Logout</span>
              <span className="sr-only sm:hidden">Logout</span>
            </Button>
          </div>
        </header>

        <main className="mx-auto w-full max-w-[1400px] min-w-0 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
