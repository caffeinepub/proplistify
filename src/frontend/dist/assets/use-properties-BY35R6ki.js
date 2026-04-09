import { u as useQuery, a as useMutation } from "./useMutation-B9otopnZ.js";
import { a9 as useQueryClient } from "./index-BANSdmlz.js";
const SAMPLE_PROPERTIES = [
  {
    id: "1",
    slug: "luxury-penthouse-downtown-skyline",
    title: "Luxury Penthouse with Downtown Skyline Views",
    description: "Breathtaking 3-bedroom penthouse on the 42nd floor featuring panoramic city views, premium finishes, and world-class amenities.",
    propertyType: "sale",
    price: 285e4,
    heroImage: "/assets/generated/hero-property.jpg",
    galleryImages: ["/assets/generated/hero-property.jpg"],
    amenities: [
      "Swimming Pool",
      "Gym",
      "Concierge",
      "Parking",
      "Rooftop Terrace",
      "Smart Home"
    ],
    floorplans: [],
    overview: "This exceptional penthouse offers unrivaled luxury living in the heart of the city. The open-plan living spaces are bathed in natural light with floor-to-ceiling windows framing spectacular skyline views.",
    address: "100 Park Avenue, Unit PH-42",
    city: "New York",
    bedrooms: 3,
    bathrooms: 3,
    areaSqft: 3200,
    status: "active",
    createdAt: Date.now() * 1e6,
    updatedAt: Date.now() * 1e6,
    isFeatured: true
  },
  {
    id: "2",
    slug: "modern-villa-beverly-hills",
    title: "Modern Contemporary Villa in Beverly Hills",
    description: "Stunning architectural masterpiece featuring a private pool, home theater, and lush landscaped gardens.",
    propertyType: "sale",
    price: 52e5,
    heroImage: "/assets/generated/hero-property.jpg",
    galleryImages: [],
    amenities: [
      "Private Pool",
      "Home Theater",
      "Wine Cellar",
      "6-Car Garage",
      "Guest House"
    ],
    floorplans: [],
    overview: "A true architectural gem nestled in the prestigious hills of Beverly. This home redefines modern luxury living with seamless indoor-outdoor design.",
    address: "432 Hillcrest Drive",
    city: "Beverly Hills",
    bedrooms: 6,
    bathrooms: 7,
    areaSqft: 8500,
    status: "active",
    createdAt: Date.now() * 1e6,
    updatedAt: Date.now() * 1e6,
    isFeatured: true
  },
  {
    id: "3",
    slug: "oceanfront-condo-miami-beach",
    title: "Oceanfront Condo — Miami Beach",
    description: "Wake up to ocean waves in this beautifully renovated 2BR condo with direct beach access and resort-style amenities.",
    propertyType: "rental",
    price: 6500,
    heroImage: "/assets/generated/hero-property.jpg",
    galleryImages: [],
    amenities: [
      "Beach Access",
      "Pool",
      "Spa",
      "Fitness Center",
      "Valet Parking"
    ],
    floorplans: [],
    overview: "Experience the ultimate Miami lifestyle in this gorgeous oceanfront residence with floor-to-ceiling windows and private balcony overlooking the Atlantic.",
    address: "1500 Collins Ave, Unit 804",
    city: "Miami Beach",
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1450,
    status: "active",
    createdAt: Date.now() * 1e6,
    updatedAt: Date.now() * 1e6,
    isFeatured: true
  },
  {
    id: "4",
    slug: "greenfield-residential-plots-pune",
    title: "Greenfield Residential Plots — Pune Outskirts",
    description: "Premium plotted development with clear titles, RERA registered, surrounded by nature and excellent connectivity.",
    propertyType: "plotLand",
    price: 85e3,
    heroImage: "/assets/generated/hero-property.jpg",
    galleryImages: [],
    amenities: [
      "Gated Community",
      "24/7 Security",
      "Wide Roads",
      "Utility Connections"
    ],
    floorplans: [],
    overview: "Build your dream home on these premium plots situated in a serene green neighbourhood just 25km from Pune city center.",
    address: "Greenfield Township, Khed",
    city: "Pune",
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 2400,
    status: "active",
    createdAt: Date.now() * 1e6,
    updatedAt: Date.now() * 1e6,
    isFeatured: false
  },
  {
    id: "5",
    slug: "the-heights-new-launch-mumbai",
    title: "The Heights — Premium New Launch, Mumbai",
    description: "Iconic new residential tower launching in Bandra West with 1, 2 & 3 BHK homes, world-class amenities and panoramic sea views.",
    propertyType: "newProject",
    price: 12e5,
    heroImage: "/assets/generated/hero-property.jpg",
    galleryImages: [],
    amenities: [
      "Sky Lounge",
      "Infinity Pool",
      "Clubhouse",
      "Children's Play Area",
      "EV Charging"
    ],
    floorplans: [],
    overview: "A landmark residential development redefining skyline living. The Heights offers meticulously designed homes with cutting-edge architecture.",
    address: "Linking Road, Bandra West",
    city: "Mumbai",
    bedrooms: 2,
    bathrooms: 2,
    areaSqft: 1100,
    status: "active",
    createdAt: Date.now() * 1e6,
    updatedAt: Date.now() * 1e6,
    isFeatured: true
  },
  {
    id: "6",
    slug: "renovated-townhouse-brooklyn",
    title: "Fully Renovated Townhouse — Brooklyn Heights",
    description: "Charming 4-bedroom townhouse fully gut-renovated with chef's kitchen, private garden, and rooftop deck.",
    propertyType: "resale",
    price: 175e4,
    heroImage: "/assets/generated/hero-property.jpg",
    galleryImages: [],
    amenities: [
      "Private Garden",
      "Rooftop Deck",
      "Chef's Kitchen",
      "Finished Basement",
      "Bike Storage"
    ],
    floorplans: [],
    overview: "This stunning brownstone townhouse blends historic Brooklyn charm with contemporary design. Fully renovated to the highest standards.",
    address: "87 Willow Street",
    city: "Brooklyn",
    bedrooms: 4,
    bathrooms: 3,
    areaSqft: 2800,
    status: "active",
    createdAt: Date.now() * 1e6,
    updatedAt: Date.now() * 1e6,
    isFeatured: false
  }
];
function applyFilters(properties, filters) {
  return properties.filter((p) => {
    if (filters.propertyType && p.propertyType !== filters.propertyType)
      return false;
    if (filters.city && !p.city.toLowerCase().includes(filters.city.toLowerCase()))
      return false;
    if (filters.minPrice && p.price < filters.minPrice) return false;
    if (filters.maxPrice && p.price > filters.maxPrice) return false;
    if (filters.minBedrooms && p.bedrooms < filters.minBedrooms) return false;
    if (filters.status && p.status !== filters.status) return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (!p.title.toLowerCase().includes(q) && !p.city.toLowerCase().includes(q) && !p.address.toLowerCase().includes(q))
        return false;
    }
    return true;
  });
}
function useProperties(filters = {}) {
  return useQuery({
    queryKey: ["properties", filters],
    queryFn: async () => {
      const page = filters.page ?? 1;
      const limit = filters.limit ?? 9;
      const filtered = applyFilters(SAMPLE_PROPERTIES, filters);
      const start = (page - 1) * limit;
      return {
        properties: filtered.slice(start, start + limit),
        total: filtered.length,
        page,
        limit,
        totalPages: Math.ceil(filtered.length / limit)
      };
    },
    staleTime: 3e4
  });
}
function useProperty(id) {
  return useQuery({
    queryKey: ["property", id],
    queryFn: async () => SAMPLE_PROPERTIES.find((p) => p.id === id) ?? null,
    enabled: !!id
  });
}
function usePropertyBySlug(slug) {
  return useQuery({
    queryKey: ["property-slug", slug],
    queryFn: async () => SAMPLE_PROPERTIES.find((p) => p.slug === slug) ?? null,
    enabled: !!slug
  });
}
function useFeaturedProperties() {
  return useQuery({
    queryKey: ["featured-properties"],
    queryFn: async () => SAMPLE_PROPERTIES.filter((p) => p.isFeatured),
    staleTime: 6e4
  });
}
function useCreateProperty() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (input) => {
      const newProp = {
        ...input,
        id: `prop-${Date.now()}`,
        slug: input.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        createdAt: Date.now() * 1e6,
        updatedAt: Date.now() * 1e6
      };
      SAMPLE_PROPERTIES.push(newProp);
      return newProp;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["properties"] });
      qc.invalidateQueries({ queryKey: ["featured-properties"] });
    }
  });
}
function useUpdateProperty() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const idx = SAMPLE_PROPERTIES.findIndex((p) => p.id === id);
      if (idx < 0) throw new Error("Property not found");
      SAMPLE_PROPERTIES[idx] = {
        ...SAMPLE_PROPERTIES[idx],
        ...updates,
        updatedAt: Date.now() * 1e6
      };
      return SAMPLE_PROPERTIES[idx];
    },
    onSuccess: (_data, vars) => {
      qc.invalidateQueries({ queryKey: ["properties"] });
      qc.invalidateQueries({ queryKey: ["property", vars.id] });
    }
  });
}
function useDeleteProperty() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const idx = SAMPLE_PROPERTIES.findIndex((p) => p.id === id);
      if (idx >= 0) SAMPLE_PROPERTIES.splice(idx, 1);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["properties"] });
    }
  });
}
export {
  useProperties as a,
  usePropertyBySlug as b,
  useDeleteProperty as c,
  useUpdateProperty as d,
  useProperty as e,
  useCreateProperty as f,
  useFeaturedProperties as u
};
