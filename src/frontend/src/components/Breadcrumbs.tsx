import type { BreadcrumbItem } from "@/types";
import { Link } from "@tanstack/react-router";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex items-center gap-1.5 text-xs text-muted-foreground"
    >
      <Link
        to="/"
        className="flex items-center hover:text-accent transition-colors"
        aria-label="Home"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>
      {items.map((item, index) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
          {index === items.length - 1 || !item.href ? (
            <span
              className="text-foreground font-medium truncate max-w-[180px]"
              aria-current={index === items.length - 1 ? "page" : undefined}
            >
              {item.label}
            </span>
          ) : (
            <Link
              to={item.href}
              className="hover:text-accent transition-colors truncate max-w-[180px]"
            >
              {item.label}
            </Link>
          )}
        </span>
      ))}
    </nav>
  );
}
