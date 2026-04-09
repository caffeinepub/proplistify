import type { Lead, SubmitLeadInput } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const SAMPLE_LEADS: Lead[] = [
  {
    id: "lead-1",
    name: "Alexandra Chen",
    email: "alex.chen@email.com",
    phone: "+1 (555) 234-5678",
    message:
      "I'm very interested in scheduling a viewing for the Penthouse. Please contact me at your earliest convenience.",
    inquiryType: "viewingRequest",
    propertyId: "1",
    propertyTitle: "Luxury Penthouse with Downtown Skyline Views",
    createdAt: (Date.now() - 2 * 24 * 3600 * 1000) * 1_000_000,
    isRead: false,
  },
  {
    id: "lead-2",
    name: "Marcus Williams",
    email: "marcus.w@gmail.com",
    phone: "+1 (555) 987-6543",
    message:
      "Can you provide more information about the Greenfield Plots? Specifically interested in plot sizes and available amenities.",
    inquiryType: "information",
    propertyId: "4",
    propertyTitle: "Greenfield Residential Plots",
    createdAt: (Date.now() - 5 * 24 * 3600 * 1000) * 1_000_000,
    isRead: true,
  },
  {
    id: "lead-3",
    name: "Priya Kapoor",
    email: "priya.kapoor@outlook.com",
    phone: "+91 98765 43210",
    message:
      "Interested in making an offer on the Brooklyn Townhouse. Please share more details about the asking price and negotiation room.",
    inquiryType: "offer",
    propertyId: "6",
    propertyTitle: "Fully Renovated Townhouse — Brooklyn Heights",
    createdAt: (Date.now() - 1 * 24 * 3600 * 1000) * 1_000_000,
    isRead: false,
  },
];

export function useLeads() {
  return useQuery<Lead[]>({
    queryKey: ["leads"],
    queryFn: async () =>
      [...SAMPLE_LEADS].sort((a, b) => b.createdAt - a.createdAt),
    staleTime: 10_000,
  });
}

export function useSubmitLead() {
  const qc = useQueryClient();
  return useMutation<Lead, Error, SubmitLeadInput>({
    mutationFn: async (input) => {
      const lead: Lead = {
        ...input,
        id: `lead-${Date.now()}`,
        createdAt: Date.now() * 1_000_000,
        isRead: false,
      };
      SAMPLE_LEADS.push(lead);
      return lead;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useMarkLeadRead() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const lead = SAMPLE_LEADS.find((l) => l.id === id);
      if (lead) lead.isRead = true;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}

export function useDeleteLead() {
  const qc = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      const idx = SAMPLE_LEADS.findIndex((l) => l.id === id);
      if (idx >= 0) SAMPLE_LEADS.splice(idx, 1);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["leads"] });
    },
  });
}
