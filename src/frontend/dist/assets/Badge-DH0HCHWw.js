import { j as jsxRuntimeExports, a as cn } from "./index-BANSdmlz.js";
const TYPE_CONFIG = {
  rental: {
    label: "Rental",
    className: "bg-blue-500/10 text-blue-600 border-blue-500/20"
  },
  sale: {
    label: "For Sale",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
  },
  resale: {
    label: "Resale",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20"
  },
  newProject: {
    label: "New Project",
    className: "bg-purple-500/10 text-purple-600 border-purple-500/20"
  },
  plotLand: {
    label: "Plot / Land",
    className: "bg-orange-800/10 text-orange-800 border-orange-800/20"
  }
};
function PropertyBadge({ type, className }) {
  const config = TYPE_CONFIG[type];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border",
        config.className,
        className
      ),
      children: config.label
    }
  );
}
const BADGE_VARIANTS = {
  default: "bg-accent/10 text-accent border-accent/20",
  success: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
  muted: "bg-muted text-muted-foreground border-border"
};
function Badge({
  children,
  variant = "default",
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border",
        BADGE_VARIANTS[variant],
        className
      ),
      children
    }
  );
}
export {
  Badge as B,
  PropertyBadge as P
};
