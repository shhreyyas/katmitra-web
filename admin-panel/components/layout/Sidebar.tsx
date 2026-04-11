"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const items = [
  ["Dashboard", "/dashboard"],
  ["Users", "/users"],
  ["Access Codes", "/access-codes"],
  ["Subscriptions", "/subscriptions"],
  ["Payments", "/payments"],
  ["Bookings", "/bookings"],
  ["Quotations", "/quotations"],
  ["Notifications", "/notifications"],
  ["Support", "/support"],
  ["Settings", "/settings"],
  ["Logs", "/logs"],
] as const;

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white p-4">
      <h1 className="mb-6 text-xl font-bold">Katmitra Admin</h1>
      <nav className="space-y-1">
        {items.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            className={cn(
              "block rounded-md px-3 py-2 text-sm",
              pathname === href
                ? "bg-slate-900 text-white"
                : "text-slate-700 hover:bg-slate-100",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};
