export type PropertyType =
  | "rental"
  | "sale"
  | "resale"
  | "newProject"
  | "plotLand";
export type PropertyStatus = "active" | "pending" | "sold" | "inactive";
export type InquiryType =
  | "viewingRequest"
  | "information"
  | "offer"
  | "general";

export interface Property {
  id: string;
  slug: string;
  title: string;
  description: string;
  propertyType: PropertyType;
  price: number;
  heroImage: string;
  galleryImages: string[];
  amenities: string[];
  floorplans: string[];
  overview: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  status: PropertyStatus;
  createdAt: number;
  updatedAt: number;
  isFeatured: boolean;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  content: string;
  featuredImage: string;
  publishedAt: number;
  updatedAt: number;
  author: string;
  isPublished: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: InquiryType;
  propertyId?: string;
  propertyTitle?: string;
  createdAt: number;
  isRead: boolean;
}

export interface Review {
  id: string;
  propertyId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
  createdAt: number;
  isApproved: boolean;
}

export interface PropertyFilters {
  city?: string;
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  status?: PropertyStatus;
  search?: string;
  page?: number;
  limit?: number;
}

export interface PropertyPage {
  properties: Property[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ArticlePage {
  articles: Article[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreatePropertyInput {
  title: string;
  description: string;
  propertyType: PropertyType;
  price: number;
  heroImage: string;
  galleryImages: string[];
  amenities: string[];
  floorplans: string[];
  overview: string;
  address: string;
  city: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  status: PropertyStatus;
  isFeatured: boolean;
}

export interface CreateArticleInput {
  title: string;
  metaDescription: string;
  content: string;
  featuredImage: string;
  author: string;
  isPublished: boolean;
}

export interface SubmitLeadInput {
  name: string;
  email: string;
  phone: string;
  message: string;
  inquiryType: InquiryType;
  propertyId?: string;
  propertyTitle?: string;
}

export interface SubmitReviewInput {
  propertyId: string;
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}
