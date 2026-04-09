import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { PropertyFilters, PropertyType } from "@/types";
import { Search } from "lucide-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (filters: PropertyFilters) => void;
  className?: string;
  compact?: boolean;
}

const PROPERTY_TYPES: { value: PropertyType | "all"; label: string }[] = [
  { value: "all", label: "All Types" },
  { value: "rental", label: "Rental" },
  { value: "sale", label: "For Sale" },
  { value: "resale", label: "Resale" },
  { value: "newProject", label: "New Project" },
  { value: "plotLand", label: "Plot / Land" },
];

const PRICE_RANGES = [
  { value: "any", label: "Any Price" },
  { value: "0-500000", label: "Under $500K" },
  { value: "500000-1000000", label: "$500K – $1M" },
  { value: "1000000-2500000", label: "$1M – $2.5M" },
  { value: "2500000-999999999", label: "$2.5M+" },
];

export function SearchBar({
  onSearch,
  className,
  compact = false,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("any");

  function handleSearch() {
    const filters: PropertyFilters = {};
    if (query.trim()) filters.search = query.trim();
    if (type !== "all") filters.propertyType = type as PropertyType;
    if (priceRange !== "any") {
      const [min, max] = priceRange.split("-").map(Number);
      filters.minPrice = min;
      filters.maxPrice = max;
    }
    onSearch(filters);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSearch();
  }

  return (
    <div
      className={cn(
        "flex flex-col md:flex-row gap-2 bg-card rounded-xl p-2 shadow-elevated border border-border",
        className,
      )}
    >
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          data-ocid="search-input"
          type="text"
          placeholder="Search by city, address, or keyword..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          className="pl-9 border-0 bg-transparent focus-visible:ring-0 text-sm h-10"
        />
      </div>

      {!compact && (
        <>
          <div className="w-px bg-border hidden md:block self-stretch my-1" />
          <Select value={type} onValueChange={setType}>
            <SelectTrigger
              data-ocid="search-type-filter"
              className="w-full md:w-40 border-0 bg-transparent focus:ring-0 text-sm h-10"
            >
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>
                  {t.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="w-px bg-border hidden md:block self-stretch my-1" />
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger
              data-ocid="search-price-filter"
              className="w-full md:w-44 border-0 bg-transparent focus:ring-0 text-sm h-10"
            >
              <SelectValue placeholder="Price Range" />
            </SelectTrigger>
            <SelectContent>
              {PRICE_RANGES.map((r) => (
                <SelectItem key={r.value} value={r.value}>
                  {r.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </>
      )}

      <Button
        data-ocid="search-submit"
        onClick={handleSearch}
        className="bg-accent text-accent-foreground hover:opacity-90 h-10 px-5 text-sm font-semibold shrink-0"
      >
        <Search className="w-4 h-4 mr-1.5" />
        Search
      </Button>
    </div>
  );
}
