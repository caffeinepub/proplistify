import { c as createLucideIcon, j as jsxRuntimeExports, L as Link, H as House } from "./index-BANSdmlz.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode);
function Breadcrumbs({ items }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "nav",
    {
      "aria-label": "Breadcrumb",
      className: "flex items-center gap-1.5 text-xs text-muted-foreground",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            className: "flex items-center hover:text-accent transition-colors",
            "aria-label": "Home",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "w-3.5 h-3.5" })
          }
        ),
        items.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3.5 h-3.5 text-muted-foreground/50" }),
          index === items.length - 1 || !item.href ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "text-foreground font-medium truncate max-w-[180px]",
              "aria-current": index === items.length - 1 ? "page" : void 0,
              children: item.label
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: item.href,
              className: "hover:text-accent transition-colors truncate max-w-[180px]",
              children: item.label
            }
          )
        ] }, item.label))
      ]
    }
  );
}
export {
  Breadcrumbs as B,
  ChevronRight as C
};
