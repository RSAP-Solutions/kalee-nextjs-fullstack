import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum GalleryItemStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

@Entity({ name: "gallery_items" })
export class GalleryItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 180 })
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column({ type: "varchar", length: 160, nullable: true })
  location?: string | null;

  @Column({ type: "varchar", length: 255, nullable: true })
  coverImage?: string | null;

  @Column({ type: "text", array: true, default: "{}" })
  imageUrls!: string[];

  @Column({ type: "text", array: true, default: "{}" })
  tags!: string[];

  @Column({ type: "enum", enum: GalleryItemStatus, default: GalleryItemStatus.DRAFT })
  status!: GalleryItemStatus;

  @Column({ type: "timestamptz", nullable: true, name: "published_at" })
  publishedAt?: Date | null;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}
