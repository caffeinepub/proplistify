import { Badge } from "@/components/Badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDeleteLead, useLeads, useMarkLeadRead } from "@/hooks/use-leads";
import { formatDate } from "@/lib/format";
import { setPageMeta } from "@/seo";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Mail,
  MessageSquare,
  Phone,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const INQUIRY_LABELS: Record<
  string,
  {
    label: string;
    variant: "default" | "success" | "warning" | "destructive" | "muted";
  }
> = {
  viewingRequest: { label: "Viewing Request", variant: "default" },
  information: { label: "Information", variant: "muted" },
  offer: { label: "Offer", variant: "success" },
  general: { label: "General", variant: "muted" },
};

export function AdminLeadsPage() {
  const { data: leads, isLoading } = useLeads();
  const markRead = useMarkLeadRead();
  const deleteLead = useDeleteLead();
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"date" | "name">("date");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  useEffect(() => {
    setPageMeta("Leads — Admin", "Manage incoming property inquiries.");
  }, []);

  function handleSort(col: "date" | "name") {
    if (sortBy === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  }

  async function handleMarkRead(id: string) {
    try {
      await markRead.mutateAsync(id);
    } catch {
      toast.error("Failed to mark lead as read.");
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this lead? This cannot be undone.")) return;
    try {
      await deleteLead.mutateAsync(id);
      toast.success("Lead deleted.");
    } catch {
      toast.error("Failed to delete lead.");
    }
  }

  const sorted = [...(leads ?? [])].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "date") cmp = a.createdAt - b.createdAt;
    else cmp = a.name.localeCompare(b.name);
    return sortDir === "asc" ? cmp : -cmp;
  });

  const unread = leads?.filter((l) => !l.isRead).length ?? 0;

  function SortIcon({ col }: { col: "date" | "name" }) {
    if (sortBy !== col) return null;
    return sortDir === "asc" ? (
      <ChevronUp className="w-3.5 h-3.5 inline ml-1" />
    ) : (
      <ChevronDown className="w-3.5 h-3.5 inline ml-1" />
    );
  }

  return (
    <div className="space-y-5 max-w-5xl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <h1 className="font-display font-bold text-2xl text-foreground">
            Leads
          </h1>
          {unread > 0 && (
            <span className="bg-accent text-accent-foreground text-xs font-bold px-2 py-0.5 rounded-full">
              {unread} new
            </span>
          )}
        </div>
        <p className="text-sm text-muted-foreground">
          {leads?.length ?? 0} total inquiries
        </p>
      </div>

      {/* Desktop table */}
      <div className="hidden lg:block bg-card rounded-xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-5 space-y-3">
            {Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((k) => (
              <Skeleton key={k} className="h-12 w-full" />
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left">
                  <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Status
                  </th>
                  <th
                    className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:text-foreground select-none"
                    onClick={() => handleSort("name")}
                    onKeyDown={(e) => e.key === "Enter" && handleSort("name")}
                  >
                    Name <SortIcon col="name" />
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Inquiry
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider">
                    Property
                  </th>
                  <th
                    className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider cursor-pointer hover:text-foreground select-none"
                    onClick={() => handleSort("date")}
                    onKeyDown={(e) => e.key === "Enter" && handleSort("date")}
                  >
                    Date <SortIcon col="date" />
                  </th>
                  <th className="px-4 py-3 font-medium text-muted-foreground text-xs uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {sorted.map((lead) => (
                  <>
                    <tr
                      key={lead.id}
                      data-ocid="lead-row"
                      className={`hover:bg-muted/20 transition-colors cursor-pointer ${!lead.isRead ? "bg-accent/3" : ""}`}
                      onClick={() =>
                        setExpandedId(expandedId === lead.id ? null : lead.id)
                      }
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        setExpandedId(expandedId === lead.id ? null : lead.id)
                      }
                    >
                      <td className="px-4 py-3">
                        {lead.isRead ? (
                          <span className="text-xs text-muted-foreground font-medium">
                            Read
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-accent/10 text-accent text-xs font-semibold px-2 py-0.5 rounded-full border border-accent/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                            New
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 font-medium text-foreground">
                        {lead.name}
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <a
                            href={`mailto:${lead.email}`}
                            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </a>
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="flex items-center gap-1 text-xs text-muted-foreground hover:text-accent transition-colors"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Phone className="w-3 h-3" />
                              {lead.phone}
                            </a>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant={
                            INQUIRY_LABELS[lead.inquiryType]?.variant ?? "muted"
                          }
                        >
                          {INQUIRY_LABELS[lead.inquiryType]?.label ??
                            lead.inquiryType}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        {lead.propertyId ? (
                          <Link
                            to="/properties/$slug"
                            params={{ slug: lead.propertyId }}
                            className="flex items-center gap-1 text-xs text-accent hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <ExternalLink className="w-3 h-3 shrink-0" />
                            <span className="truncate max-w-[120px]">
                              {lead.propertyTitle ?? lead.propertyId}
                            </span>
                          </Link>
                        ) : (
                          <span className="text-xs text-muted-foreground">
                            General
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(lead.createdAt)}
                      </td>
                      <td className="px-4 py-3">
                        <div
                          className="flex items-center justify-end gap-1"
                          onClick={(e) => e.stopPropagation()}
                          onKeyDown={(e) => e.stopPropagation()}
                        >
                          {!lead.isRead && (
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-xs gap-1 h-7 hover:text-accent"
                              onClick={() => handleMarkRead(lead.id)}
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              Mark Read
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            className="w-7 h-7 text-destructive hover:text-destructive hover:bg-destructive/10"
                            onClick={() => handleDelete(lead.id)}
                            aria-label="Delete lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                    {expandedId === lead.id && (
                      <tr key={`${lead.id}-expanded`} className="bg-muted/20">
                        <td colSpan={7} className="px-4 py-3">
                          <div className="bg-card rounded-lg border border-border p-4">
                            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                              Message
                            </p>
                            <p className="text-sm text-foreground leading-relaxed">
                              {lead.message}
                            </p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!isLoading && leads?.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-sm">
              No leads yet. They'll appear here when visitors submit inquiries.
            </p>
          </div>
        )}
      </div>

      {/* Mobile card list */}
      <div className="lg:hidden space-y-3">
        {isLoading
          ? Array.from({ length: 3 }, (_, i) => `sk-${i}`).map((k) => (
              <Skeleton key={k} className="h-24 w-full rounded-xl" />
            ))
          : sorted.map((lead) => (
              <div
                key={lead.id}
                data-ocid="lead-item"
                className={`bg-card rounded-xl border p-5 transition-all ${!lead.isRead ? "border-accent/30 shadow-card" : "border-border"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      <span className="font-semibold text-foreground">
                        {lead.name}
                      </span>
                      {!lead.isRead && (
                        <span className="bg-accent/10 text-accent text-xs font-medium px-2 py-0.5 rounded-full border border-accent/20">
                          New
                        </span>
                      )}
                      <Badge
                        variant={
                          INQUIRY_LABELS[lead.inquiryType]?.variant ?? "muted"
                        }
                      >
                        {INQUIRY_LABELS[lead.inquiryType]?.label ??
                          lead.inquiryType}
                      </Badge>
                    </div>

                    {lead.propertyTitle && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-medium text-foreground truncate">
                          {lead.propertyTitle}
                        </span>
                      </div>
                    )}

                    <button
                      type="button"
                      className="text-sm text-muted-foreground text-left w-full"
                      onClick={() =>
                        setExpandedId(expandedId === lead.id ? null : lead.id)
                      }
                    >
                      <p
                        className={expandedId === lead.id ? "" : "line-clamp-2"}
                      >
                        {lead.message}
                      </p>
                      <span className="text-xs text-accent mt-1 inline-block">
                        {expandedId === lead.id ? "Show less" : "Show more"}
                      </span>
                    </button>

                    <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap mt-3">
                      <a
                        href={`mailto:${lead.email}`}
                        className="flex items-center gap-1 hover:text-accent transition-colors"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        {lead.email}
                      </a>
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1 hover:text-accent transition-colors"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          {lead.phone}
                        </a>
                      )}
                      <span>{formatDate(lead.createdAt)}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 shrink-0">
                    {!lead.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-xs gap-1 hover:text-accent"
                        onClick={() => handleMarkRead(lead.id)}
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        Mark Read
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-xs gap-1 text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={() => handleDelete(lead.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}

        {!isLoading && leads?.length === 0 && (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <p className="text-muted-foreground text-sm">
              No leads yet. They'll appear here when visitors submit inquiries.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
