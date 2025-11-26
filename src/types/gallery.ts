export enum GalleryItemStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

export type GalleryItemResponse = {
  id: string;
  title: string;
  description: string;
  location?: string | null;
  coverImage?: string | null;
  imageUrls: string[];
  tags: string[];
  status: GalleryItemStatus;
  publishedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

export type GalleryItemPayload = {
  title: string;
  description: string;
  location?: string | null;
  coverImage?: string | null;
  imageUrls?: string[];
  tags?: string[];
  status?: GalleryItemStatus;
  publishedAt?: string | null;
};
