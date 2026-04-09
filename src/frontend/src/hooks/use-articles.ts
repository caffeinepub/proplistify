import type { Article, ArticlePage, CreateArticleInput } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SAMPLE_ARTICLES: Article[] = [
  {
    id: "1",
    slug: "top-neighborhoods-to-invest-2025",
    title: "Top 10 Neighborhoods to Invest in Real Estate in 2025",
    metaDescription:
      "Discover the most promising real estate investment neighborhoods of 2025, with expert analysis on price trends, ROI projections, and growth potential.",
    content: `
# Top 10 Neighborhoods to Invest in Real Estate in 2025

The real estate market continues to evolve rapidly. With interest rates stabilizing and urban migration patterns shifting, savvy investors are looking at specific neighborhoods that promise exceptional returns.

## 1. Bandra West, Mumbai
Consistently ranked as Mumbai's most coveted address, Bandra West continues to see strong appreciation. The upcoming metro connectivity and commercial development make this a top pick.

## 2. Brooklyn Heights, New York
With remote work normalizing, outer boroughs are seeing unprecedented demand. Brooklyn Heights offers historic charm combined with excellent connectivity.

## 3. Downtown Miami
Miami's luxury market shows no signs of slowing. With favorable tax policies and growing tech sector, Downtown Miami remains a hotspot for both domestic and international buyers.

## Key Metrics to Watch
- Price-to-rent ratios below 20 indicate favorable investment conditions
- Vacancy rates under 5% signal high demand
- Infrastructure spending correlates strongly with appreciation

Investing wisely requires thorough research. Our team of experts is ready to help you identify the right opportunity.
    `.trim(),
    featuredImage: "/assets/generated/blog-hero.jpg",
    publishedAt: (Date.now() - 7 * 24 * 3600 * 1000) * 1_000_000,
    updatedAt: (Date.now() - 5 * 24 * 3600 * 1000) * 1_000_000,
    author: "Sarah Mitchell",
    isPublished: true,
  },
  {
    id: "2",
    slug: "first-time-home-buyer-complete-guide",
    title: "The Complete Guide for First-Time Home Buyers in 2025",
    metaDescription:
      "Everything you need to know as a first-time home buyer: financing, inspections, negotiations, and closing — explained step by step.",
    content: `
# The Complete Guide for First-Time Home Buyers in 2025

Buying your first home is one of the most significant financial decisions you'll make. This comprehensive guide walks you through every step of the process.

## Step 1: Assess Your Financial Readiness
Before you start browsing listings, evaluate your financial situation:
- Credit score (aim for 720+)
- Down payment savings (typically 10-20%)
- Debt-to-income ratio under 43%
- Emergency fund of 3-6 months expenses

## Step 2: Get Pre-Approved
A mortgage pre-approval letter demonstrates you're a serious buyer and helps you understand your budget. Approach multiple lenders to compare rates.

## Step 3: Work with a Buyer's Agent
A qualified buyer's agent represents YOUR interests at no cost to you. They have access to off-market listings and expert negotiation skills.

## The Inspection Process
Never skip a home inspection. A qualified inspector will assess:
- Structural integrity
- Electrical and plumbing systems
- Roof condition
- HVAC systems

Take your time, do your research, and don't let anyone pressure you into a decision you're not comfortable with.
    `.trim(),
    featuredImage: "/assets/generated/blog-hero.jpg",
    publishedAt: (Date.now() - 14 * 24 * 3600 * 1000) * 1_000_000,
    updatedAt: (Date.now() - 12 * 24 * 3600 * 1000) * 1_000_000,
    author: "James Thornton",
    isPublished: true,
  },
  {
    id: "3",
    slug: "luxury-rental-market-trends",
    title: "Luxury Rental Market: Key Trends Reshaping High-End Living",
    metaDescription:
      "Explore how shifting lifestyle preferences and remote work are transforming the luxury rental market across major cities worldwide.",
    content: `
# Luxury Rental Market: Key Trends Reshaping High-End Living

The luxury rental segment is experiencing a renaissance. High-net-worth individuals increasingly prefer renting premium properties for flexibility, while institutional investors are pouring capital into luxury rental developments.

## Rise of the "Renter by Choice"
Wealthy millennials and Gen-Z professionals are choosing luxury rentals over ownership, prioritizing flexibility and experiences over equity building.

## Amenity Arms Race
Luxury rental buildings compete fiercely on amenities:
- Private chefs and dining rooms
- Wellness centers with meditation spaces
- Co-working lounges and private offices
- Concierge and lifestyle management services

## Technology Integration
Smart home technology has moved from premium to expected in the luxury segment. Tenants demand seamless control of lighting, climate, security, and entertainment.

The luxury rental market is expected to grow 15% annually through 2028, making it one of the most attractive segments for investors.
    `.trim(),
    featuredImage: "/assets/generated/blog-hero.jpg",
    publishedAt: (Date.now() - 21 * 24 * 3600 * 1000) * 1_000_000,
    updatedAt: (Date.now() - 20 * 24 * 3600 * 1000) * 1_000_000,
    author: "Priya Sharma",
    isPublished: true,
  },
];

export function useArticles(page = 1, limit = 9) {
  return useQuery<ArticlePage>({
    queryKey: ["articles", page, limit],
    queryFn: async () => {
      const published = SAMPLE_ARTICLES.filter((a) => a.isPublished);
      const start = (page - 1) * limit;
      return {
        articles: published.slice(start, start + limit),
        total: published.length,
        page,
        limit,
        totalPages: Math.ceil(published.length / limit),
      };
    },
    staleTime: 60_000,
  });
}

export function useArticle(id: string) {
  return useQuery<Article | null>({
    queryKey: ["article", id],
    queryFn: async () => SAMPLE_ARTICLES.find((a) => a.id === id) ?? null,
    enabled: !!id,
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery<Article | null>({
    queryKey: ["article-slug", slug],
    queryFn: async () => SAMPLE_ARTICLES.find((a) => a.slug === slug) ?? null,
    enabled: !!slug,
  });
}

export function useRecentArticles(count = 3) {
  return useQuery<Article[]>({
    queryKey: ["recent-articles", count],
    queryFn: async () =>
      SAMPLE_ARTICLES.filter((a) => a.isPublished)
        .sort((a, b) => b.publishedAt - a.publishedAt)
        .slice(0, count),
    staleTime: 60_000,
  });
}

export function useAllArticles() {
  return useQuery<Article[]>({
    queryKey: ["all-articles"],
    queryFn: async () => SAMPLE_ARTICLES,
    staleTime: 30_000,
  });
}

export function useCreateArticle() {
  const qc = useQueryClient();
  return useMutation<Article, Error, CreateArticleInput>({
    mutationFn: async (input) => {
      const article: Article = {
        ...input,
        id: `art-${Date.now()}`,
        slug: input.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, ""),
        publishedAt: Date.now() * 1_000_000,
        updatedAt: Date.now() * 1_000_000,
      };
      SAMPLE_ARTICLES.push(article);
      return article;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      qc.invalidateQueries({ queryKey: ["recent-articles"] });
      qc.invalidateQueries({ queryKey: ["all-articles"] });
    },
  });
}

export function useUpdateArticle() {
  const qc = useQueryClient();
  return useMutation<
    Article,
    Error,
    { id: string } & Partial<CreateArticleInput>
  >({
    mutationFn: async ({ id, ...updates }) => {
      const idx = SAMPLE_ARTICLES.findIndex((a) => a.id === id);
      if (idx < 0) throw new Error("Article not found");
      SAMPLE_ARTICLES[idx] = {
        ...SAMPLE_ARTICLES[idx],
        ...updates,
        updatedAt: Date.now() * 1_000_000,
      };
      return SAMPLE_ARTICLES[idx];
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      qc.invalidateQueries({ queryKey: ["article", vars.id] });
      qc.invalidateQueries({ queryKey: ["all-articles"] });
    },
  });
}

export function useDeleteArticle() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const idx = SAMPLE_ARTICLES.findIndex((a) => a.id === id);
      if (idx >= 0) SAMPLE_ARTICLES.splice(idx, 1);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["articles"] });
      qc.invalidateQueries({ queryKey: ["all-articles"] });
    },
  });
}
