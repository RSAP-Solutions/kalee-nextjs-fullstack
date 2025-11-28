import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Category } from "./Category";

@Entity({ name: "products" })
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 160 })
  title!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 160 })
  slug!: string;

  @Column({ type: "numeric", precision: 10, scale: 2, default: 0 })
  price!: number;

  @Column({ type: "text" })
  description!: string;

  @Column({ name: "image_url", type: "varchar", length: 255, nullable: true })
  imageUrl?: string | null;

  @Column({ name: "image_urls", type: "jsonb", nullable: true })
  imageUrls?: string[] | null;

  @Column({ name: "in_stock", type: "boolean", default: true })
  inStock!: boolean;

  @ManyToOne(() => Category, {
    onDelete: "SET NULL",
    nullable: true,
  })
  @JoinColumn({ name: "category_id" })
  category?: Category | null;

  @Column({ name: "category_slug", type: "varchar", length: 120, nullable: true })
  categorySlug?: string | null;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}
