import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, User } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  className?: string;
  featured?: boolean;
}

export function ArticleCard({
  article,
  className,
  featured = false,
}: ArticleCardProps) {
  return (
    <article
      data-ocid="article-card"
      className={cn(
        "group bg-card rounded-xl overflow-hidden border border-border shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-0.5 flex flex-col",
        featured && "lg:flex-row",
        className,
      )}
    >
      {/* Image */}
      <Link
        to="/blog/$slug"
        params={{ slug: article.slug }}
        className={cn(
          "relative block overflow-hidden",
          featured ? "lg:w-2/5 aspect-[16/9] lg:aspect-auto" : "aspect-[16/9]",
        )}
      >
        <img
          src={article.featuredImage || "/assets/images/placeholder.svg"}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      {/* Content */}
      <div
        className={cn(
          "flex flex-col flex-1 p-5",
          featured && "lg:p-8 justify-center",
        )}
      >
        {/* Meta */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            {formatDate(article.publishedAt)}
          </span>
          <span className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            {article.author}
          </span>
        </div>

        <h3
          className={cn(
            "font-display font-semibold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors",
            featured
              ? "text-xl lg:text-2xl line-clamp-3"
              : "text-base line-clamp-2",
          )}
        >
          <Link to="/blog/$slug" params={{ slug: article.slug }}>
            {article.title}
          </Link>
        </h3>

        <p
          className={cn(
            "text-sm text-muted-foreground leading-relaxed mb-4",
            featured ? "line-clamp-4" : "line-clamp-3",
          )}
        >
          {article.metaDescription}
        </p>

        <div className="mt-auto">
          <Link
            to="/blog/$slug"
            params={{ slug: article.slug }}
            data-ocid="article-card-cta"
            className="inline-flex items-center gap-1.5 text-accent text-sm font-medium hover:gap-3 transition-all duration-200"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
