import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PropertyCard } from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { useProperties } from "@/hooks/use-properties";
import { generateBreadcrumbJsonLD, setPageMeta } from "@/seo";
import type { PropertyFilters, PropertyType } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Filter, SearchX, SlidersHorizontal, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

// ─── constants ────────────────────────────────────────────────────────────────

const PAGE_SIZE = 12;

const PROPERTY_TYPES: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "rental", label: "Rental" },
  { value: "sale", label: "For Sale" },
  { value: "resale", label: "Resale" },
  { value: "newProject", label: "New Project" },
  { value: "plotLand", label: "Plots & Land" },
];

const BEDROOM_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
];

// ─── helpers ──────────────────────────────────────────────────────────────────

type SearchParams = {
  type?: string;
  priceMin?: string;
  priceMax?: string;
  beds?: string;
  city?: string;
  sort?: string;
  page?: string;
};

function buildFilters(params: SearchParams): PropertyFilters {
  return {
    propertyType:
      params.type && params.type !== "all"
        ? (params.type as PropertyType)
        : undefined,
    minPrice: params.priceMin ? Number(params.priceMin) : undefined,
    maxPrice: params.priceMax ? Number(params.priceMax) : undefined,
    minBedrooms:
      params.beds && params.beds !== "any" ? Number(params.beds) : undefined,
    city: params.city || undefined,
    search: undefined,
    page: params.page ? Number(params.page) : 1,
    limit: PAGE_SIZE,
  };
}

function buildSeoTitle(params: SearchParams): string {
  const typeLabel =
    PROPERTY_TYPES.find((t) => t.value === params.type)?.label ?? "";
  const city = params.city?.trim();
  if (typeLabel && typeLabel !== "All Types" && city) {
    return `${typeLabel} Properties in ${city} | PropListify`;
  }
  if (typeLabel && typeLabel !== "All Types") {
    return `${typeLabel} Properties | PropListify`;
  }
  if (city) {
    return `Properties in ${city} | PropListify`;
  }
  return "PropListify Properties | Browse All Listings";
}

function buildSeoDescription(params: SearchParams): string {
  const typeLabel =
    PROPERTY_TYPES.find((t) => t.value === params.type)?.label ?? "";
  const city = params.city?.trim();
  if (typeLabel && city)
    return `Browse ${typeLabel.toLowerCase()} listings in ${city}. Discover your perfect home on PropListify.`;
  if (typeLabel)
    return `Explore ${typeLabel.toLowerCase()} listings across top locations. Find the perfect property with PropListify.`;
  return "Browse rentals, homes for sale, resales, new projects, and plots. Your next home starts here on PropListify.";
}

function getPageRange(current: number, total: number): number[] {
  const maxShown = 5;
  if (total <= maxShown) return Array.from({ length: total }, (_, i) => i + 1);
  const half = Math.floor(maxShown / 2);
  let start = Math.max(1, current - half);
  const end = Math.min(total, start + maxShown - 1);
  start = Math.max(1, end - maxShown + 1);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function hasActiveFilters(params: SearchParams) {
  return !!(
    (params.type && params.type !== "all") ||
    params.priceMin ||
    params.priceMax ||
    (params.beds && params.beds !== "any") ||
    params.city
  );
}

// ─── filter panel (shared between sidebar + bottom drawer) ───────────────────

interface FilterPanelProps {
  draft: SearchParams;
  onDraftChange: (d: SearchParams) => void;
  onApply: () => void;
  onClear: () => void;
}

function FilterPanel({
  draft,
  onDraftChange,
  onApply,
  onClear,
}: FilterPanelProps) {
  return (
    <div className="flex flex-col gap-5 flex-1 overflow-y-auto px-1">
      {/* Property Type */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Property Type
        </p>
        <div className="space-y-2.5">
          {PROPERTY_TYPES.map((t) => (
            <div key={t.value} className="flex items-center gap-2.5">
              <Checkbox
                id={`filter-type-${t.value}`}
                data-ocid={`filter-type-${t.value}`}
                checked={
                  t.value === "all"
                    ? !draft.type || draft.type === "all"
                    : draft.type === t.value
                }
                onCheckedChange={() =>
                  onDraftChange({
                    ...draft,
                    type: t.value === "all" ? "all" : t.value,
                  })
                }
              />
              <label
                htmlFor={`filter-type-${t.value}`}
                className="text-sm text-foreground hover:text-accent transition-colors cursor-pointer"
              >
                {t.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Price Range
        </p>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">
              Min Price
            </Label>
            <Input
              data-ocid="filter-price-min"
              type="number"
              placeholder="0"
              value={draft.priceMin ?? ""}
              onChange={(e) =>
                onDraftChange({
                  ...draft,
                  priceMin: e.target.value || undefined,
                })
              }
              className="h-9 text-sm"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground mb-1 block">
              Max Price
            </Label>
            <Input
              data-ocid="filter-price-max"
              type="number"
              placeholder="Any"
              value={draft.priceMax ?? ""}
              onChange={(e) =>
                onDraftChange({
                  ...draft,
                  priceMax: e.target.value || undefined,
                })
              }
              className="h-9 text-sm"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Bedrooms */}
      <div>
        <p
          id="bedrooms-label"
          className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3"
        >
          Bedrooms
        </p>
        <div className="flex gap-2 flex-wrap">
          {BEDROOM_OPTIONS.map((b) => (
            <button
              key={b.value}
              type="button"
              data-ocid={`filter-beds-${b.value}`}
              onClick={() => onDraftChange({ ...draft, beds: b.value })}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all duration-150 ${
                (draft.beds ?? "any") === b.value
                  ? "bg-accent text-accent-foreground border-accent"
                  : "bg-card text-foreground border-border hover:border-accent/60"
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* City / Location */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          City / Location
        </p>
        <Input
          data-ocid="filter-city"
          type="text"
          placeholder="e.g. Mumbai, New York…"
          value={draft.city ?? ""}
          onChange={(e) =>
            onDraftChange({ ...draft, city: e.target.value || undefined })
          }
          className="h-9 text-sm"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <Button
          data-ocid="filter-apply"
          onClick={onApply}
          className="flex-1 bg-accent text-accent-foreground hover:opacity-90"
          size="sm"
        >
          Apply Filters
        </Button>
        <Button
          data-ocid="filter-clear"
          onClick={onClear}
          variant="outline"
          size="sm"
        >
          <X className="w-3.5 h-3.5" />
          Clear
        </Button>
      </div>
    </div>
  );
}

// ─── card skeleton ─────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-border bg-card shadow-card">
      <Skeleton className="aspect-[4/3] w-full" />
      <div className="p-4 space-y-2.5">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-3 pt-1">
          <Skeleton className="h-3.5 w-14" />
          <Skeleton className="h-3.5 w-14" />
          <Skeleton className="h-3.5 w-16" />
        </div>
        <Skeleton className="h-9 w-full mt-2 rounded-lg" />
      </div>
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

export function PropertiesPage() {
  const rawSearch = useSearch({ strict: false }) as SearchParams;
  const navigate = useNavigate();

  // Draft state for the filter panel (committed to URL on Apply)
  const [draft, setDraft] = useState<SearchParams>({
    type: rawSearch.type ?? "all",
    priceMin: rawSearch.priceMin,
    priceMax: rawSearch.priceMax,
    beds: rawSearch.beds ?? "any",
    city: rawSearch.city,
  });

  const currentSort = rawSearch.sort ?? "newest";
  const currentPage = rawSearch.page ? Number(rawSearch.page) : 1;
  const filters = useMemo(() => buildFilters(rawSearch), [rawSearch]);

  const { data, isLoading, isFetching } = useProperties(filters);

  // Sync draft when URL changes externally (e.g. browser back)
  useEffect(() => {
    setDraft({
      type: rawSearch.type ?? "all",
      priceMin: rawSearch.priceMin,
      priceMax: rawSearch.priceMax,
      beds: rawSearch.beds ?? "any",
      city: rawSearch.city,
    });
  }, [
    rawSearch.type,
    rawSearch.priceMin,
    rawSearch.priceMax,
    rawSearch.beds,
    rawSearch.city,
  ]);

  // SEO: update meta on filter change
  useEffect(() => {
    const title = buildSeoTitle(rawSearch);
    const desc = buildSeoDescription(rawSearch);
    setPageMeta(title, desc, undefined, window.location.href);

    const breadcrumbItems: Array<{ label: string; href?: string }> = [
      { label: "Home", href: "/" },
      { label: "Properties", href: "/properties" },
    ];
    const typeLabel = PROPERTY_TYPES.find(
      (t) => t.value === rawSearch.type,
    )?.label;
    if (typeLabel && typeLabel !== "All Types") {
      breadcrumbItems.push({ label: typeLabel });
    }
    generateBreadcrumbJsonLD(breadcrumbItems);
  }, [rawSearch]);

  function pushParams(updates: SearchParams) {
    void navigate({
      // @ts-expect-error strict routing not used here
      search: (prev: SearchParams) => ({
        ...prev,
        ...updates,
      }),
    });
  }

  function applyDraft() {
    pushParams({ ...draft, page: "1" });
  }

  function clearFilters() {
    setDraft({ type: "all", beds: "any" });
    pushParams({
      type: undefined,
      priceMin: undefined,
      priceMax: undefined,
      beds: undefined,
      city: undefined,
      page: "1",
    });
  }

  function setSort(value: string) {
    pushParams({ ...rawSearch, sort: value, page: "1" });
  }

  function setPage(p: number) {
    pushParams({ ...rawSearch, page: String(p) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const typeLabel = PROPERTY_TYPES.find(
    (t) => t.value === rawSearch.type,
  )?.label;
  const activeFilterCount = [
    rawSearch.type && rawSearch.type !== "all",
    rawSearch.priceMin,
    rawSearch.priceMax,
    rawSearch.beds && rawSearch.beds !== "any",
    rawSearch.city,
  ].filter(Boolean).length;

  const breadcrumbItems: Array<{ label: string; href?: string }> = [
    { label: "Properties", href: "/properties" },
  ];
  if (typeLabel && typeLabel !== "All Types") {
    breadcrumbItems.push({ label: typeLabel });
  }

  const totalPages = data?.totalPages ?? 0;
  const pageRange = getPageRange(currentPage, totalPages);
  const isFiltered = hasActiveFilters(rawSearch);
  const loading = isLoading || isFetching;

  return (
    <div className="min-h-screen bg-background">
      {/* Page header band */}
      <div className="bg-card border-b border-border py-6">
        <div className="container max-w-7xl mx-auto px-4">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-3 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-foreground leading-tight">
                {typeLabel && typeLabel !== "All Types"
                  ? `${typeLabel} Properties`
                  : "Browse All Properties"}
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                {loading
                  ? "Loading listings…"
                  : data
                    ? `${data.total.toLocaleString()} propert${data.total === 1 ? "y" : "ies"} found`
                    : ""}
                {rawSearch.city ? ` in ${rawSearch.city}` : ""}
              </p>
            </div>

            {/* Sort (desktop) */}
            <div className="flex items-center gap-2 shrink-0">
              <Filter className="w-4 h-4 text-muted-foreground hidden sm:block" />
              <Select value={currentSort} onValueChange={setSort}>
                <SelectTrigger
                  data-ocid="sort-select"
                  className="w-48 text-sm h-9 border-input"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active filter chips */}
          {isFiltered && (
            <div className="flex flex-wrap gap-2 mt-3">
              {rawSearch.type && rawSearch.type !== "all" && (
                <FilterChip
                  label={typeLabel ?? rawSearch.type}
                  onRemove={() =>
                    pushParams({ ...rawSearch, type: undefined, page: "1" })
                  }
                />
              )}
              {(rawSearch.priceMin || rawSearch.priceMax) && (
                <FilterChip
                  label={`$${rawSearch.priceMin ?? 0}–${rawSearch.priceMax ? `$${rawSearch.priceMax}` : "Any"}`}
                  onRemove={() =>
                    pushParams({
                      ...rawSearch,
                      priceMin: undefined,
                      priceMax: undefined,
                      page: "1",
                    })
                  }
                />
              )}
              {rawSearch.beds && rawSearch.beds !== "any" && (
                <FilterChip
                  label={`${rawSearch.beds}+ Beds`}
                  onRemove={() =>
                    pushParams({ ...rawSearch, beds: undefined, page: "1" })
                  }
                />
              )}
              {rawSearch.city && (
                <FilterChip
                  label={rawSearch.city}
                  onRemove={() =>
                    pushParams({ ...rawSearch, city: undefined, page: "1" })
                  }
                />
              )}
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-muted-foreground hover:text-destructive transition-colors underline underline-offset-2 ml-1"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Body: sidebar + grid */}
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 bg-card rounded-xl border border-border p-5 shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-display font-semibold text-foreground text-sm">
                  Filters
                </h2>
                {activeFilterCount > 0 && (
                  <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-semibold">
                    {activeFilterCount} active
                  </span>
                )}
              </div>
              <FilterPanel
                draft={draft}
                onDraftChange={setDraft}
                onApply={applyDraft}
                onClear={clearFilters}
              />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Mobile controls bar */}
            <div className="flex items-center justify-between gap-3 mb-5 lg:hidden">
              {/* Mobile filter button → bottom drawer */}
              <Drawer>
                <DrawerTrigger asChild>
                  <Button
                    data-ocid="mobile-filter-btn"
                    variant="outline"
                    size="sm"
                    className="gap-2 relative"
                  >
                    <SlidersHorizontal className="w-4 h-4" />
                    Filters
                    {activeFilterCount > 0 && (
                      <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                        {activeFilterCount}
                      </span>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <DrawerHeader className="border-b border-border">
                    <DrawerTitle className="font-display font-bold">
                      Filter Properties
                    </DrawerTitle>
                  </DrawerHeader>
                  <div className="flex flex-col gap-0 flex-1 overflow-hidden px-4 py-4">
                    <FilterPanel
                      draft={draft}
                      onDraftChange={setDraft}
                      onApply={applyDraft}
                      onClear={clearFilters}
                    />
                  </div>
                  <DrawerFooter className="border-t border-border pt-3">
                    <DrawerClose asChild>
                      <Button variant="outline" size="sm">
                        Close
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>

              {/* Mobile sort */}
              <Select value={currentSort} onValueChange={setSort}>
                <SelectTrigger
                  data-ocid="sort-select-mobile"
                  className="w-44 text-sm h-9 border-input"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SORT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Property grid */}
            <div
              className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 transition-opacity duration-200 ${
                isFetching && !isLoading ? "opacity-60" : "opacity-100"
              }`}
            >
              {isLoading
                ? ["s0", "s1", "s2", "s3", "s4", "s5"].map((key) => (
                    <CardSkeleton key={key} />
                  ))
                : (data?.properties ?? []).map((property, i) => (
                    <motion.div
                      key={property.id}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                    >
                      <PropertyCard property={property} />
                    </motion.div>
                  ))}
            </div>

            {/* Empty state */}
            {!isLoading && (data?.properties.length ?? 0) === 0 && (
              <div
                data-ocid="empty-state"
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mb-5">
                  <SearchX className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-xl mb-2">
                  No properties found
                </h3>
                <p className="text-muted-foreground text-sm max-w-sm mb-7">
                  We couldn't find any listings matching your current filters.
                  Try widening your search or clearing some filters.
                </p>
                <Button
                  data-ocid="empty-clear-filters"
                  onClick={clearFilters}
                  variant="outline"
                  className="gap-2"
                >
                  <X className="w-4 h-4" />
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && totalPages > 1 && (
              <div
                data-ocid="pagination"
                className="flex items-center justify-center gap-1.5 mt-10"
              >
                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="pagination-prev"
                  onClick={() => setPage(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="h-9 px-3 text-xs"
                >
                  Previous
                </Button>

                {pageRange[0] > 1 && (
                  <>
                    <PageBtn page={1} current={currentPage} onClick={setPage} />
                    {pageRange[0] > 2 && (
                      <span className="text-muted-foreground text-sm px-1">
                        …
                      </span>
                    )}
                  </>
                )}

                {pageRange.map((p) => (
                  <PageBtn
                    key={p}
                    page={p}
                    current={currentPage}
                    onClick={setPage}
                  />
                ))}

                {pageRange[pageRange.length - 1] < totalPages && (
                  <>
                    {pageRange[pageRange.length - 1] < totalPages - 1 && (
                      <span className="text-muted-foreground text-sm px-1">
                        …
                      </span>
                    )}
                    <PageBtn
                      page={totalPages}
                      current={currentPage}
                      onClick={setPage}
                    />
                  </>
                )}

                <Button
                  variant="outline"
                  size="sm"
                  data-ocid="pagination-next"
                  onClick={() => setPage(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="h-9 px-3 text-xs"
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── sub-components ────────────────────────────────────────────────────────────

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-1 text-xs font-medium bg-accent/10 text-accent border border-accent/20 px-2.5 py-1 rounded-full">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="hover:text-destructive transition-colors ml-0.5"
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}

function PageBtn({
  page,
  current,
  onClick,
}: {
  page: number;
  current: number;
  onClick: (p: number) => void;
}) {
  const active = page === current;
  return (
    <button
      type="button"
      data-ocid={`pagination-page-${page}`}
      onClick={() => onClick(page)}
      aria-label={`Go to page ${page}`}
      aria-current={active ? "page" : undefined}
      className={`w-9 h-9 rounded-lg text-sm font-semibold transition-all duration-150 ${
        active
          ? "bg-accent text-accent-foreground shadow-sm"
          : "bg-card border border-border text-foreground hover:border-accent/60 hover:text-accent"
      }`}
    >
      {page}
    </button>
  );
}
