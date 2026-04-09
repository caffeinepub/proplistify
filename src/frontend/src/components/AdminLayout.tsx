import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Building2,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Star,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const ADMIN_NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Home },
  { href: "/admin/articles", label: "Articles", icon: FileText },
  { href: "/admin/leads", label: "Leads", icon: Users },
  { href: "/admin/reviews", label: "Reviews", icon: Star },
];

function AdminNavLink({
  href,
  label,
  icon: Icon,
  onClick,
}: {
  href: string;
  label: string;
  icon: React.ElementType;
  onClick?: () => void;
}) {
  const loc = useLocation();
  const isActive = loc.pathname === href || loc.pathname.startsWith(`${href}/`);
  const cls = isActive
    ? "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium bg-accent/10 text-accent"
    : "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all duration-200";
  return (
    <Link to={href} onClick={onClick} className={cls}>
      <Icon className="w-4 h-4 shrink-0" />
      <span>{label}</span>
    </Link>
  );
}

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const { clear } = useInternetIdentity();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 shrink-0 bg-sidebar border-r border-sidebar-border">
        <div className="h-16 flex items-center px-5 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
              <Building2 className="w-4 h-4 text-accent-foreground" />
            </div>
            <div>
              <span className="font-display font-semibold text-sm text-sidebar-foreground">
                Skyline
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-muted-foreground">
                Admin
              </span>
            </div>
          </div>
        </div>
        <nav
          className="flex-1 px-3 py-4 space-y-0.5"
          aria-label="Admin navigation"
        >
          {ADMIN_NAV.map((item) => (
            <AdminNavLink key={item.href} {...item} />
          ))}
        </nav>
        <div className="px-3 pb-5 space-y-3">
          <Separator />
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-sidebar-accent transition-colors"
          >
            <Home className="w-4 h-4" />
            <span>View Site</span>
          </Link>
          <Button
            type="button"
            variant="ghost"
            onClick={() => clear()}
            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            role="button"
            tabIndex={0}
            aria-label="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            onKeyDown={(e) => e.key === "Escape" && setSidebarOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-60 bg-sidebar border-r border-sidebar-border flex flex-col z-10">
            <div className="h-16 flex items-center justify-between px-5 border-b border-sidebar-border">
              <span className="font-display font-semibold text-sidebar-foreground">
                Admin
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            <nav className="flex-1 px-3 py-4 space-y-0.5">
              {ADMIN_NAV.map((item) => (
                <AdminNavLink
                  key={item.href}
                  {...item}
                  onClick={() => setSidebarOpen(false)}
                />
              ))}
            </nav>
            <div className="px-3 pb-5">
              <Separator className="mb-3" />
              <Button
                type="button"
                variant="ghost"
                onClick={() => clear()}
                className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </div>
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-card border-b border-border flex items-center px-4 gap-4 sticky top-0 z-40">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <span className="font-display font-semibold text-foreground text-base">
            Admin Panel
          </span>
        </header>
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
