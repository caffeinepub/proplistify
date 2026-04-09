import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { Navigate } from "@tanstack/react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loginStatus } = useInternetIdentity();

  if (loginStatus === "initializing") {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
          <p className="text-sm text-muted-foreground">
            Verifying authentication...
          </p>
        </div>
      </div>
    );
  }

  // "success" means logged in, anything else means redirect to login
  if (loginStatus !== "success") {
    return <Navigate to="/admin/login" />;
  }

  return <>{children}</>;
}
