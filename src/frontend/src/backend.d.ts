import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export type LeadId = string;
export type Slug = string;
export interface LeadInput {
    inquiryType: InquiryType;
    name: string;
    propertyTitle?: string;
    propertyId?: PropertyId;
    email: string;
    message: string;
    phone: string;
}
export type ArticleId = string;
export interface PropertyInput {
    galleryImages: Array<ExternalBlob>;
    status: PropertyStatus;
    title: string;
    propertyType: PropertyType;
    bedrooms: bigint;
    city: string;
    overview: string;
    slug: Slug;
    description: string;
    amenities: Array<string>;
    heroImage: ExternalBlob;
    isFeatured: boolean;
    address: string;
    areaSqft: number;
    bathrooms: bigint;
    price: number;
    floorplans: Array<ExternalBlob>;
}
export interface Property {
    id: PropertyId;
    galleryImages: Array<ExternalBlob>;
    status: PropertyStatus;
    title: string;
    propertyType: PropertyType;
    bedrooms: bigint;
    city: string;
    createdAt: Timestamp;
    overview: string;
    slug: Slug;
    description: string;
    amenities: Array<string>;
    heroImage: ExternalBlob;
    updatedAt: Timestamp;
    isFeatured: boolean;
    address: string;
    areaSqft: number;
    bathrooms: bigint;
    price: number;
    floorplans: Array<ExternalBlob>;
}
export interface Lead {
    id: LeadId;
    inquiryType: InquiryType;
    name: string;
    createdAt: Timestamp;
    propertyTitle?: string;
    propertyId?: PropertyId;
    isRead: boolean;
    email: string;
    message: string;
    phone: string;
}
export interface PropertyPage {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<Property>;
}
export type PropertyId = string;
export interface ArticlePage {
    total: bigint;
    offset: bigint;
    limit: bigint;
    items: Array<Article>;
}
export interface ArticleInput {
    metaDescription: string;
    title: string;
    content: string;
    isPublished: boolean;
    featuredImage: ExternalBlob;
    slug: Slug;
    author: string;
}
export type ReviewId = string;
export interface PropertyFilters {
    propertyType?: PropertyType;
    offset: bigint;
    minBedrooms?: bigint;
    limit: bigint;
    searchTerm?: string;
    priceMax?: number;
    priceMin?: number;
}
export interface ReviewInput {
    name: string;
    propertyId: PropertyId;
    email: string;
    comment: string;
    rating: bigint;
}
export interface Review {
    id: ReviewId;
    isApproved: boolean;
    name: string;
    createdAt: Timestamp;
    propertyId: PropertyId;
    email: string;
    comment: string;
    rating: bigint;
}
export interface Article {
    id: ArticleId;
    metaDescription: string;
    title: string;
    content: string;
    isPublished: boolean;
    featuredImage: ExternalBlob;
    slug: Slug;
    publishedAt: Timestamp;
    author: string;
    updatedAt: Timestamp;
}
export enum InquiryType {
    offer = "offer",
    information = "information",
    general = "general",
    viewingRequest = "viewingRequest"
}
export enum PropertyStatus {
    active = "active",
    pending = "pending",
    sold = "sold",
    inactive = "inactive"
}
export enum PropertyType {
    rental = "rental",
    resale = "resale",
    newProject = "newProject",
    sale = "sale",
    plotLand = "plotLand"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    approveReview(id: ReviewId): Promise<boolean>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createArticle(input: ArticleInput): Promise<Article>;
    createProperty(input: PropertyInput): Promise<Property>;
    deleteArticle(id: ArticleId): Promise<boolean>;
    deleteLead(id: LeadId): Promise<boolean>;
    deleteProperty(id: PropertyId): Promise<boolean>;
    deleteReview(id: ReviewId): Promise<boolean>;
    getArticle(id: ArticleId): Promise<Article | null>;
    getArticleBySlug(slug: Slug): Promise<Article | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFeaturedProperties(): Promise<Array<Property>>;
    getProperty(id: PropertyId): Promise<Property | null>;
    getPropertyAverageRating(propertyId: PropertyId): Promise<number>;
    getPropertyBySlug(slug: Slug): Promise<Property | null>;
    getRecentArticles(count: bigint): Promise<Array<Article>>;
    isCallerAdmin(): Promise<boolean>;
    listAllReviews(): Promise<Array<Review>>;
    listArticles(offset: bigint, limit: bigint): Promise<ArticlePage>;
    listLeads(): Promise<Array<Lead>>;
    listProperties(filters: PropertyFilters): Promise<PropertyPage>;
    listReviewsByProperty(propertyId: PropertyId): Promise<Array<Review>>;
    markLeadRead(id: LeadId): Promise<boolean>;
    submitLead(input: LeadInput): Promise<Lead>;
    submitReview(input: ReviewInput): Promise<Review>;
    toggleFeatured(id: PropertyId): Promise<boolean>;
    updateArticle(id: ArticleId, input: ArticleInput): Promise<Article | null>;
    updateProperty(id: PropertyId, input: PropertyInput): Promise<Property | null>;
}
