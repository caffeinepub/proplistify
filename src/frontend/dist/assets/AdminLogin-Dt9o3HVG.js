import { c as createLucideIcon, v as useInternetIdentity, r as reactExports, j as jsxRuntimeExports, N as Navigate, s as Building2, B as Button } from "./index-BANSdmlz.js";
import { s as setPageMeta } from "./seo-CK-m768L.js";
import { L as LoaderCircle } from "./loader-circle-DmH7jCmO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode);
function AdminLoginPage() {
  const { login, loginStatus } = useInternetIdentity();
  reactExports.useEffect(() => {
    setPageMeta(
      "Admin Login — Skyline Properties",
      "Secure admin access for Skyline Properties management."
    );
  }, []);
  if (loginStatus === "success") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Navigate, { to: "/admin/dashboard" });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4 shadow-elevated", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "w-8 h-8 text-accent-foreground" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground mb-1.5", children: "Admin Access" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "Sign in with Internet Identity to manage your listings." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-elevated p-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 bg-muted/40 rounded-xl p-3 mb-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-accent shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Secured by Internet Identity — decentralized, password-free authentication." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          "data-ocid": "admin-login-btn",
          onClick: () => login(),
          disabled: loginStatus === "initializing" || loginStatus === "logging-in",
          className: "w-full bg-accent text-accent-foreground hover:opacity-90 h-11 font-semibold gap-2",
          children: loginStatus === "initializing" || loginStatus === "logging-in" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
            "Initializing..."
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: "Sign In with Internet Identity" })
        }
      )
    ] })
  ] }) });
}
export {
  AdminLoginPage
};
