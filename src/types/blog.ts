export enum BlogItemStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export interface BlogItemResponse {
  id: string;
  title: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  author: string | null;
  status: BlogItemStatus;
  tags: string[];
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface BlogItemPayload {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  author?: string;
  status: BlogItemStatus;
  tags: string[];
  publishedAt?: string | null;
}
