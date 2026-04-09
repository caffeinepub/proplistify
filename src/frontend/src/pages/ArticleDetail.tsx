import { ArticleCard } from "@/components/ArticleCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useArticleBySlug, useRecentArticles } from "@/hooks/use-articles";
import { formatDate } from "@/lib/format";
import {
  generateArticleJsonLD,
  generateBreadcrumbJsonLD,
  setPageMeta,
} from "@/seo";
import type { Article } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calendar,
  Share2,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";

// ─── Article content renderer ─────────────────────────────────────────────────
function ArticleContent({ content }: { content: string }) {
  const lines = content.split("\n");

  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        const key = `cl-${i}`;
        if (line.startsWith("# "))
          return (
            <h2
              key={key}
              className="font-display font-bold text-2xl md:text-3xl text-foreground mt-8 mb-3 leading-snug"
            >
              {line.slice(2)}
            </h2>
          );
        if (line.startsWith("## "))
          return (
            <h3
              key={key}
              className="font-display font-semibold text-xl text-foreground mt-7 mb-2"
            >
              {line.slice(3)}
            </h3>
          );
        if (line.startsWith("### "))
          return (
            <h4
              key={key}
              className="font-display font-semibold text-lg text-foreground mt-5 mb-2"
            >
              {line.slice(4)}
            </h4>
          );
        if (line.startsWith("- "))
          return (
            <li
              key={key}
              className="text-foreground/80 leading-relaxed ml-5 list-disc"
            >
              {line.slice(2)}
            </li>
          );
        if (line.trim() === "") return <div key={key} className="h-3" />;
        return (
          <p key={key} className="text-foreground/80 leading-relaxed text-base">
            {line}
          </p>
        );
      })}
    </div>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function ArticleSidebar({
  recentArticles,
  currentSlug,
}: {
  recentArticles: Article[];
  currentSlug: string;
}) {
  const recent = recentArticles
    .filter((a) => a.slug !== currentSlug)
    .slice(0, 3);

  return (
    <aside className="space-y-8">
      {/* Recent articles */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-display font-semibold text-base text-foreground mb-4 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-accent" />
          Recent Articles
        </h3>
        {recent.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No other articles yet.
          </p>
        ) : (
          <ul className="space-y-4">
            {recent.map((art) => (
              <li key={art.id}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: art.slug }}
                  data-ocid="sidebar-recent-article"
                  className="group flex gap-3 items-start"
                >
                  <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={
                        art.featuredImage || "/assets/images/placeholder.svg"
                      }
                      alt={art.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug group-hover:text-accent transition-colors">
                      {art.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDate(art.publishedAt)}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Browse Properties CTA */}
      <div className="bg-accent/10 border border-accent/20 rounded-xl p-5 text-center">
        <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-3">
          <ArrowRight className="w-5 h-5 text-accent" />
        </div>
        <h3 className="font-display font-semibold text-foreground text-sm mb-2">
          Ready to Find Your Property?
        </h3>
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Browse our curated listings of rentals, sales, new projects, and
          plots.
        </p>
        <Button
          asChild
          className="w-full cta-primary"
          size="sm"
          data-ocid="sidebar-browse-cta"
        >
          <Link to="/properties">Browse Properties</Link>
        </Button>
      </div>
    </aside>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────
function ArticleLoadingSkeleton() {
  return (
    <div className="py-10" data-ocid="article-loading">
      <div className="container max-w-7xl mx-auto px-4">
        <Skeleton className="h-4 w-40 mb-6" />
        <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-10">
          <div>
            <Skeleton className="aspect-[16/9] w-full rounded-2xl mb-8" />
            <Skeleton className="h-10 w-3/4 mb-3" />
            <Skeleton className="h-10 w-1/2 mb-6" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
            </div>
            <Skeleton className="h-px w-full mb-6" />
            <div className="space-y-3">
              {Array.from({ length: 8 }, (_, i) => `s-${i}`).map((k) => (
                <Skeleton key={k} className="h-4 w-full" />
              ))}
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>
          <div className="hidden lg:block space-y-4 mt-8">
            <Skeleton className="h-64 w-full rounded-xl" />
            <Skeleton className="h-40 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export function ArticleDetailPage() {
  const { slug } = useParams({ strict: false }) as { slug: string };
  const { data: article, isLoading } = useArticleBySlug(slug);
  const { data: recentArticles = [] } = useRecentArticles(4);

  useEffect(() => {
    if (!article) return;
    setPageMeta(
      article.title,
      article.metaDescription,
      article.featuredImage,
      window.location.href,
      "article",
    );
    generateArticleJsonLD(article);
    generateBreadcrumbJsonLD([
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: article.title },
    ]);
  }, [article]);

  if (isLoading) return <ArticleLoadingSkeleton />;

  // 404 state
  if (!article) {
    return (
      <div
        data-ocid="article-not-found"
        className="flex flex-col items-center justify-center min-h-[65vh] gap-5 px-4 text-center"
      >
        <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center">
          <BookOpen className="w-10 h-10 text-muted-foreground" />
        </div>
        <div>
          <h1 className="font-display font-bold text-3xl text-foreground mb-2">
            Article Not Found
          </h1>
          <p className="text-muted-foreground text-sm max-w-sm">
            The article you're looking for may have been removed or the link may
            be incorrect.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/blog">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </Button>
          <Button asChild>
            <Link to="/">Go Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedArticles = recentArticles
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <div className="bg-background">
      {/* Top breadcrumb bar */}
      <div className="bg-muted/40 border-b border-border py-3">
        <div className="container max-w-7xl mx-auto px-4">
          <Breadcrumbs
            items={[{ label: "Blog", href: "/blog" }, { label: article.title }]}
          />
        </div>
      </div>

      <div className="py-10">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="lg:grid lg:grid-cols-[1fr_320px] lg:gap-12">
            {/* Main content */}
            <motion.article
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
            >
              {/* Hero image — full width */}
              <div className="rounded-2xl overflow-hidden aspect-[16/9] mb-8 shadow-elevated">
                <img
                  src={
                    article.featuredImage || "/assets/images/placeholder.svg"
                  }
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Article header */}
              <header className="mb-8">
                <h1 className="font-display font-bold text-3xl md:text-4xl lg:text-5xl text-foreground leading-tight mb-5">
                  {article.title}
                </h1>

                {/* Lead / meta description */}
                <p className="italic text-muted-foreground text-lg leading-relaxed border-l-4 border-accent/40 pl-4 mb-5">
                  {article.metaDescription}
                </p>

                <div className="flex items-center flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-accent" />
                    <span className="font-medium text-foreground">
                      {article.author}
                    </span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-auto gap-1.5 text-xs hover:text-accent"
                    data-ocid="article-share"
                    onClick={() =>
                      navigator.share?.({
                        title: article.title,
                        url: window.location.href,
                      })
                    }
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    Share
                  </Button>
                </div>
              </header>

              <Separator className="mb-8" />

              {/* Article body */}
              <ArticleContent content={article.content} />

              <Separator className="my-12" />

              {/* Related articles */}
              {relatedArticles.length > 0 && (
                <section>
                  <h2 className="font-display font-bold text-2xl text-foreground mb-6">
                    Related Articles
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {relatedArticles.map((art, i) => (
                      <motion.div
                        key={art.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <ArticleCard article={art} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )}

              {/* Back to blog */}
              <div className="mt-10">
                <Button
                  asChild
                  variant="outline"
                  className="gap-2"
                  data-ocid="article-back"
                >
                  <Link to="/blog">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Blog
                  </Link>
                </Button>
              </div>
            </motion.article>

            {/* Sidebar — desktop only */}
            <div className="hidden lg:block mt-0">
              <div className="sticky top-24">
                <ArticleSidebar
                  recentArticles={recentArticles}
                  currentSlug={slug}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
