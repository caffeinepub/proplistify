import { AdminLayout } from "@/components/AdminLayout";
import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Lazy-load pages for better performance
const HomePage = lazy(() =>
  import("@/pages/Home").then((m) => ({ default: m.HomePage })),
);
const PropertiesPage = lazy(() =>
  import("@/pages/Properties").then((m) => ({ default: m.PropertiesPage })),
);
const PropertyDetailPage = lazy(() =>
  import("@/pages/PropertyDetail").then((m) => ({
    default: m.PropertyDetailPage,
  })),
);
const BlogPage = lazy(() =>
  import("@/pages/Blog").then((m) => ({ default: m.BlogPage })),
);
const ArticleDetailPage = lazy(() =>
  import("@/pages/ArticleDetail").then((m) => ({
    default: m.ArticleDetailPage,
  })),
);
const ContactPage = lazy(() =>
  import("@/pages/Contact").then((m) => ({ default: m.ContactPage })),
);
const AdminLoginPage = lazy(() =>
  import("@/pages/admin/AdminLogin").then((m) => ({
    default: m.AdminLoginPage,
  })),
);
const AdminDashboardPage = lazy(() =>
  import("@/pages/admin/AdminDashboard").then((m) => ({
    default: m.AdminDashboardPage,
  })),
);
const AdminPropertiesPage = lazy(() =>
  import("@/pages/admin/AdminProperties").then((m) => ({
    default: m.AdminPropertiesPage,
  })),
);
const AdminPropertyFormPage = lazy(() =>
  import("@/pages/admin/AdminPropertyForm").then((m) => ({
    default: m.AdminPropertyFormPage,
  })),
);
const AdminArticlesPage = lazy(() =>
  import("@/pages/admin/AdminArticles").then((m) => ({
    default: m.AdminArticlesPage,
  })),
);
const AdminArticleFormPage = lazy(() =>
  import("@/pages/admin/AdminArticleForm").then((m) => ({
    default: m.AdminArticleFormPage,
  })),
);
const AdminLeadsPage = lazy(() =>
  import("@/pages/admin/AdminLeads").then((m) => ({
    default: m.AdminLeadsPage,
  })),
);
const AdminReviewsPage = lazy(() =>
  import("@/pages/admin/AdminReviews").then((m) => ({
    default: m.AdminReviewsPage,
  })),
);

function PageLoader() {
  return (
    <div className="p-6 space-y-4">
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  );
}

function WithLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <Suspense fallback={<PageLoader />}>{children}</Suspense>
    </Layout>
  );
}

function WithAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedRoute>
      <AdminLayout>
        <Suspense fallback={<PageLoader />}>{children}</Suspense>
      </AdminLayout>
    </ProtectedRoute>
  );
}

// Root route
const rootRoute = createRootRoute({ component: Outlet });

// Public routes
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <WithLayout>
      <HomePage />
    </WithLayout>
  ),
});

const propertiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties",
  component: () => (
    <WithLayout>
      <PropertiesPage />
    </WithLayout>
  ),
});

const propertyDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/properties/$slug",
  component: () => (
    <WithLayout>
      <PropertyDetailPage />
    </WithLayout>
  ),
});

const blogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog",
  component: () => (
    <WithLayout>
      <BlogPage />
    </WithLayout>
  ),
});

const articleDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/blog/$slug",
  component: () => (
    <WithLayout>
      <ArticleDetailPage />
    </WithLayout>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <WithLayout>
      <ContactPage />
    </WithLayout>
  ),
});

// Admin redirect
const adminRedirectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  beforeLoad: () => {
    throw redirect({ to: "/admin/dashboard" });
  },
});

const adminLoginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/login",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AdminLoginPage />
    </Suspense>
  ),
});

// Admin protected routes
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: () => (
    <WithAdminLayout>
      <AdminDashboardPage />
    </WithAdminLayout>
  ),
});

const adminPropertiesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/properties",
  component: () => (
    <WithAdminLayout>
      <AdminPropertiesPage />
    </WithAdminLayout>
  ),
});

const adminNewPropertyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/properties/new",
  component: () => (
    <WithAdminLayout>
      <AdminPropertyFormPage />
    </WithAdminLayout>
  ),
});

const adminEditPropertyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/properties/$id/edit",
  component: () => (
    <WithAdminLayout>
      <AdminPropertyFormPage />
    </WithAdminLayout>
  ),
});

const adminArticlesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/articles",
  component: () => (
    <WithAdminLayout>
      <AdminArticlesPage />
    </WithAdminLayout>
  ),
});

const adminNewArticleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/articles/new",
  component: () => (
    <WithAdminLayout>
      <AdminArticleFormPage />
    </WithAdminLayout>
  ),
});

const adminEditArticleRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/articles/$id/edit",
  component: () => (
    <WithAdminLayout>
      <AdminArticleFormPage />
    </WithAdminLayout>
  ),
});

const adminLeadsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/leads",
  component: () => (
    <WithAdminLayout>
      <AdminLeadsPage />
    </WithAdminLayout>
  ),
});

const adminReviewsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/reviews",
  component: () => (
    <WithAdminLayout>
      <AdminReviewsPage />
    </WithAdminLayout>
  ),
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  propertiesRoute,
  propertyDetailRoute,
  blogRoute,
  articleDetailRoute,
  contactRoute,
  adminRedirectRoute,
  adminLoginRoute,
  adminDashboardRoute,
  adminPropertiesRoute,
  adminNewPropertyRoute,
  adminEditPropertyRoute,
  adminArticlesRoute,
  adminNewArticleRoute,
  adminEditArticleRoute,
  adminLeadsRoute,
  adminReviewsRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
