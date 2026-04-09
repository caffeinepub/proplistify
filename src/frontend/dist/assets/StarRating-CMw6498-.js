import { j as jsxRuntimeExports, S as Star, a as cn } from "./index-BANSdmlz.js";
const SIZE_MAP = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6"
};
function StarRating({
  value,
  onChange,
  max = 5,
  size = "md",
  readOnly = false
}) {
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "fieldset",
    {
      className: "flex items-center gap-0.5 border-0 p-0 m-0",
      "aria-label": `Rating: ${value} out of ${max} stars`,
      children: stars.map((star) => {
        const filled = star <= value;
        return readOnly ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          Star,
          {
            className: cn(
              SIZE_MAP[size],
              filled ? "fill-accent text-accent" : "fill-muted text-muted-foreground/30"
            )
          },
          star
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => onChange == null ? void 0 : onChange(star),
            onKeyDown: (e) => e.key === "Enter" && (onChange == null ? void 0 : onChange(star)),
            "aria-label": `Rate ${star} star${star !== 1 ? "s" : ""}`,
            className: cn(
              "transition-transform duration-100 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded",
              !readOnly && "cursor-pointer"
            ),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: cn(
                  SIZE_MAP[size],
                  filled ? "fill-accent text-accent" : "fill-transparent text-muted-foreground/50 hover:text-accent/70"
                )
              }
            )
          },
          star
        );
      })
    }
  );
}
export {
  StarRating as S
};
