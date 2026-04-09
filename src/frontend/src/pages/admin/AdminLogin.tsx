import { Button } from "@/components/ui/button";
import { setPageMeta } from "@/seo";
import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";
import { Building2, Loader2, Shield } from "lucide-react";
import { useEffect } from "react";

export function AdminLoginPage() {
  const { login, loginStatus } = useInternetIdentity();

  useEffect(() => {
    setPageMeta(
      "Admin Login — Skyline Properties",
      "Secure admin access for Skyline Properties management.",
    );
  }, []);

  if (loginStatus === "success") {
    return <Navigate to="/admin/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4 shadow-elevated">
            <Building2 className="w-8 h-8 text-accent-foreground" />
          </div>
          <h1 className="font-display font-bold text-2xl text-foreground mb-1.5">
            Admin Access
          </h1>
          <p className="text-muted-foreground text-sm">
            Sign in with Internet Identity to manage your listings.
          </p>
        </div>

        <div className="bg-card rounded-2xl border border-border shadow-elevated p-6">
          <div className="flex items-center gap-2 bg-muted/40 rounded-xl p-3 mb-5">
            <Shield className="w-4 h-4 text-accent shrink-0" />
            <p className="text-xs text-muted-foreground">
              Secured by Internet Identity — decentralized, password-free
              authentication.
            </p>
          </div>

          <Button
            data-ocid="admin-login-btn"
            onClick={() => login()}
            disabled={
              loginStatus === "initializing" || loginStatus === "logging-in"
            }
            className="w-full bg-accent text-accent-foreground hover:opacity-90 h-11 font-semibold gap-2"
          >
            {loginStatus === "initializing" || loginStatus === "logging-in" ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Initializing...
              </>
            ) : (
              <>Sign In with Internet Identity</>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
