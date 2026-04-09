import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticles } from "@/hooks/use-articles";
import { generateBreadcrumbJsonLD, setPageMeta } from "@/seo";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { BookOpen, ChevronLeft, ChevronRight, PenLine } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

const ARTICLES_PER_PAGE = 9;

export function BlogPage() {
  const navigate = useNavigate();
  // Read ?page= from URL — TanStack Router search params
  const search = useSearch({ strict: false }) as { page?: string };
  const currentPage = Math.max(1, Number.parseInt(search.page ?? "1", 10) || 1);

  const { data, isLoading } = useArticles(currentPage, ARTICLES_PER_PAGE);

  useEffect(() => {
    setPageMeta(
      "Real Estate Blog | PropListify Insights",
      "Expert real estate guides, market analysis, investment strategies, and neighborhood spotlights from the Skyline Properties team.",
      "/assets/generated/blog-hero.dim_800x450.jpg",
      window.location.href,
    );
    generateBreadcrumbJsonLD([{ label: "Home", href: "/" }, { label: "Blog" }]);
  }, []);

  const totalPages = data?.totalPages ?? 1;

  function goToPage(page: number) {
    void navigate({ to: "/blog", search: { page: String(page) } });
  }

  return (
    <div>
      {/* Hero banner */}
      <section className="bg-card border-b border-border py-14">
        <div className="container max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-center mb-4">
              <Breadcrumbs items={[{ label: "Blog" }]} />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-foreground mb-4 leading-tight">
              Real Estate Insights
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Market analysis, investment strategies, buyer guides, and
              neighborhood spotlights — everything you need to make smart
              property decisions.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background py-12">
        <div className="container max-w-7xl mx-auto px-4">
          {/* Featured article (first page only) */}
          {!isLoading && currentPage === 1 && data?.articles[0] && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center gap-2 mb-4">
                <PenLine className="w-4 h-4 text-accent" />
                <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-accent">
                  Featured Article
                </h2>
              </div>
              <ArticleCard article={data.articles[0]} featured />
            </motion.div>
          )}

          {/* Article grid heading */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display font-semibold text-xl text-foreground">
              {currentPage === 1
                ? "All Articles"
                : `Articles — Page ${currentPage}`}
            </h2>
            {data && data.total > 0 && (
              <span className="text-sm text-muted-foreground">
                {data.total} article{data.total !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Loading skeletons */}
          {isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }, (_, i) => `skel-${i}`).map((key) => (
                <div
                  key={key}
                  className="rounded-xl overflow-hidden border border-border bg-card"
                >
                  <Skeleton className="aspect-[16/9] w-full" />
                  <div className="p-5 space-y-3">
                    <div className="flex gap-2">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                    <Skeleton className="h-4 w-1/3 mt-2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Article grid */}
          {!isLoading && data && data.articles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(currentPage === 1 ? data.articles.slice(1) : data.articles).map(
                (article, i) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ),
              )}
            </div>
          )}

          {/* Empty state */}
          {!isLoading && (!data?.articles || data.articles.length === 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              data-ocid="blog-empty-state"
              className="flex flex-col items-center justify-center py-24 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
                <BookOpen className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="font-display font-semibold text-xl text-foreground mb-2">
                No articles published yet
              </h3>
              <p className="text-muted-foreground text-sm max-w-sm mb-6">
                Our editorial team is crafting expert insights. Check back soon
                for real estate guides and market analysis.
              </p>
              <Button asChild variant="outline">
                <Link to="/">Browse Properties Instead</Link>
              </Button>
            </motion.div>
          )}

          {/* Pagination */}
          {!isLoading && totalPages > 1 && (
            <div
              data-ocid="blog-pagination"
              className="flex items-center justify-center gap-2 mt-12"
            >
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage <= 1}
                onClick={() => goToPage(currentPage - 1)}
                aria-label="Previous page"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => {
                  const isActive = page === currentPage;
                  const isNearby =
                    Math.abs(page - currentPage) <= 2 ||
                    page === 1 ||
                    page === totalPages;

                  if (!isNearby) {
                    if (page === currentPage - 3 || page === currentPage + 3) {
                      return (
                        <span
                          key={page}
                          className="text-muted-foreground text-sm px-1"
                        >
                          …
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <Button
                      key={page}
                      variant={isActive ? "default" : "outline"}
                      size="icon"
                      onClick={() => goToPage(page)}
                      aria-label={`Page ${page}`}
                      aria-current={isActive ? "page" : undefined}
                      className="w-9 h-9 text-sm"
                    >
                      {page}
                    </Button>
                  );
                },
              )}

              <Button
                variant="outline"
                size="icon"
                disabled={currentPage >= totalPages}
                onClick={() => goToPage(currentPage + 1)}
                aria-label="Next page"
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
