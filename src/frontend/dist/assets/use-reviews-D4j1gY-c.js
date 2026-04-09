import { u as useQuery, a as useMutation } from "./useMutation-B9otopnZ.js";
import { a9 as useQueryClient } from "./index-BANSdmlz.js";
const SAMPLE_REVIEWS = [
  {
    id: "rev-1",
    propertyId: "1",
    name: "Jonathan Park",
    email: "j.park@email.com",
    rating: 5,
    comment: "Absolutely spectacular views and the building management is top-notch. The concierge service is exceptional.",
    createdAt: (Date.now() - 10 * 24 * 3600 * 1e3) * 1e6,
    isApproved: true
  },
  {
    id: "rev-2",
    propertyId: "1",
    name: "Elena Rodriguez",
    email: "e.rodriguez@gmail.com",
    rating: 4,
    comment: "Beautiful property in a prime location. The amenities are excellent. Slightly pricey but worth every penny.",
    createdAt: (Date.now() - 20 * 24 * 3600 * 1e3) * 1e6,
    isApproved: true
  },
  {
    id: "rev-3",
    propertyId: "3",
    name: "David Kim",
    email: "d.kim@outlook.com",
    rating: 5,
    comment: "Waking up to ocean views every morning is priceless. The beach access is private and the resort amenities are fantastic.",
    createdAt: (Date.now() - 15 * 24 * 3600 * 1e3) * 1e6,
    isApproved: true
  },
  {
    id: "rev-4",
    propertyId: "2",
    name: "Ashley Turner",
    email: "a.turner@gmail.com",
    rating: 5,
    comment: "The most beautiful home I've ever seen. The architecture is stunning and the grounds are immaculate.",
    createdAt: (Date.now() - 5 * 24 * 3600 * 1e3) * 1e6,
    isApproved: false
  }
];
function useReviews(propertyId) {
  return useQuery({
    queryKey: ["reviews", propertyId],
    queryFn: async () => SAMPLE_REVIEWS.filter((r) => r.propertyId === propertyId && r.isApproved),
    enabled: !!propertyId
  });
}
function useAllReviews() {
  return useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => [...SAMPLE_REVIEWS].sort((a, b) => b.createdAt - a.createdAt),
    staleTime: 1e4
  });
}
function usePropertyRating(propertyId) {
  return useQuery({
    queryKey: ["property-rating", propertyId],
    queryFn: async () => {
      const approved = SAMPLE_REVIEWS.filter(
        (r) => r.propertyId === propertyId && r.isApproved
      );
      if (!approved.length) return { average: 0, count: 0 };
      const sum = approved.reduce((acc, r) => acc + r.rating, 0);
      return {
        average: Math.round(sum / approved.length * 10) / 10,
        count: approved.length
      };
    },
    enabled: !!propertyId
  });
}
function useSubmitReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      const review = {
        ...input,
        id: `rev-${Date.now()}`,
        createdAt: Date.now() * 1e6,
        isApproved: false
      };
      SAMPLE_REVIEWS.push(review);
      return review;
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["reviews", vars.propertyId] });
      qc.invalidateQueries({ queryKey: ["all-reviews"] });
    }
  });
}
function useApproveReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const rev = SAMPLE_REVIEWS.find((r) => r.id === id);
      if (rev) rev.isApproved = true;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-reviews"] });
      qc.invalidateQueries({ queryKey: ["reviews"] });
    }
  });
}
function useDeleteReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const idx = SAMPLE_REVIEWS.findIndex((r) => r.id === id);
      if (idx >= 0) SAMPLE_REVIEWS.splice(idx, 1);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["all-reviews"] });
    }
  });
}
export {
  usePropertyRating as a,
  useSubmitReview as b,
  useAllReviews as c,
  useApproveReview as d,
  useDeleteReview as e,
  useReviews as u
};
