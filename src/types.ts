export interface User {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  role: "admin" | "seller" | "agent" | "buyer" | "employee";
  points: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  sellerId: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  category: "game" | "software" | "asset";
  tags?: string[];
  status?: "active" | "archived" | "draft";
  inventory?: number;
  rating?: number;
  reviewCount?: number;
  imageUrl?: string;
}

export interface BusinessListing {
  id: string;
  sellerId: string;
  businessName: string;
  description?: string;
  price: number;
  monthlyRevenue?: number;
  monthlyProfit?: number;
  createdAt?: string;
}

export interface Inquiry {
  id: string;
  buyerId: string;
  sellerId: string;
  listingId: string;
  listingName: string;
  message: string;
  buyerEmail?: string;
  createdAt?: string;
}

export interface Property {
  id: string;
  agentId: string;
  title: string;
  address: string;
  price: number;
  propertyType: "residential" | "commercial" | "land";
  bedrooms?: number;
  bathrooms?: number;
  status?: "listing" | "under-contract" | "closed";
  description?: string;
  imageUrl?: string;
}

export interface Task {
  id: string;
  creatorId: string;
  assigneeId?: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  points: number;
  dueDate?: string;
}

export interface Transaction {
  id: string;
  buyerId: string;
  sellerId: string;
  productId?: string;
  propertyId?: string;
  amount: number;
  commission?: number;
  currency?: string;
  status: "pending" | "completed" | "escrow" | "refunded";
  type?: "marketplace" | "real-estate";
}
