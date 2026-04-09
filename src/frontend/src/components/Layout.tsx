import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Phone,
  Twitter,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const SOCIAL_ICONS = [
  { Icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { Icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

function NavLink({
  href,
  label,
  onClick,
}: { href: string; label: string; onClick?: () => void }) {
  const loc = useLocation();
  const isActive =
    loc.pathname === href || (href !== "/" && loc.pathname.startsWith(href));
  return (
    <Link
      to={href}
      onClick={onClick}
      className={`text-sm font-medium transition-colors duration-200 hover:text-accent ${isActive ? "text-accent" : "text-foreground/80"}`}
    >
      {label}
    </Link>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-card">
        <div className="container max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-200">
              <Building2 className="w-5 h-5 text-accent-foreground" />
            </div>
            <div className="leading-tight">
              <span className="font-display font-semibold text-lg text-foreground tracking-tight">
                Prop
              </span>
              <span className="font-display font-semibold text-lg text-accent tracking-tight">
                Listify
              </span>
            </div>
          </Link>

          <nav
            className="hidden md:flex items-center gap-7"
            aria-label="Main navigation"
          >
            {NAV_LINKS.map((l) => (
              <NavLink key={l.href} {...l} />
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/admin/dashboard">
              <Button variant="ghost" size="sm" className="text-xs font-medium">
                Admin
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                size="sm"
                className="bg-accent text-accent-foreground hover:opacity-90 text-xs font-semibold"
              >
                List Property
              </Button>
            </Link>
          </div>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                {mobileOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 bg-card pt-12">
              <nav
                className="flex flex-col gap-4"
                aria-label="Mobile navigation"
              >
                {NAV_LINKS.map((l) => (
                  <NavLink
                    key={l.href}
                    {...l}
                    onClick={() => setMobileOpen(false)}
                  />
                ))}
                <Separator />
                <Link
                  to="/admin/dashboard"
                  onClick={() => setMobileOpen(false)}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start text-sm"
                  >
                    Admin Panel
                  </Button>
                </Link>
                <Link to="/contact" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-accent text-accent-foreground hover:opacity-90 text-sm">
                    List Your Property
                  </Button>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-muted/40 border-t border-border">
        <div className="container max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="font-display font-semibold text-foreground">
                  PropListify
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Your trusted partner in finding exceptional properties. Premium
                real estate services since 2010.
              </p>
              <div className="flex items-center gap-3 mt-4">
                {SOCIAL_ICONS.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-accent hover:border-accent transition-colors duration-200"
                    aria-label={label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                Quick Links
              </h3>
              <ul className="space-y-2">
                {[
                  { href: "/properties", label: "All Properties" },
                  { href: "/properties?type=rental", label: "Rentals" },
                  { href: "/properties?type=sale", label: "For Sale" },
                  {
                    href: "/properties?type=newProject",
                    label: "New Projects",
                  },
                  { href: "/blog", label: "Blog & Articles" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                Property Types
              </h3>
              <ul className="space-y-2">
                {[
                  "Apartments",
                  "Villas & Bungalows",
                  "Commercial Spaces",
                  "Plots & Land",
                  "New Developments",
                  "Resale Properties",
                ].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 mt-0.5 text-accent shrink-0" />
                  <span>100 Park Avenue, Suite 1200, New York, NY 10017</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-accent shrink-0" />
                  <a
                    href="tel:+12125551234"
                    className="hover:text-accent transition-colors"
                  >
                    +1 (212) 555-1234
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-accent shrink-0" />
                  <a
                    href="mailto:hello@skyline.com"
                    className="hover:text-accent transition-colors"
                  >
                    hello@skyline.com
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="mb-6" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()} PropListify. All rights reserved.
            </span>
            <span>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                className="hover:text-accent transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
