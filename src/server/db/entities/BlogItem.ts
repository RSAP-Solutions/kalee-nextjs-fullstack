import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

export enum BlogItemStatus {
  DRAFT = "draft",
  PUBLISHED = "published",
}

@Entity("blog_items")
export class BlogItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "title", type: "varchar", length: 255 })
  title!: string;

  @Column({ name: "content", type: "text" })
  content!: string;

  @Column({ name: "excerpt", type: "varchar", length: 500, nullable: true })
  excerpt!: string | null;

  @Column({ name: "cover_image", type: "varchar", length: 500, nullable: true })
  coverImage!: string | null;

  @Column({ name: "author", type: "varchar", length: 255, nullable: true })
  author!: string | null;

  @Column({
    name: "status",
    type: "enum",
    enum: BlogItemStatus,
    default: BlogItemStatus.DRAFT,
  })
  status!: BlogItemStatus;

  @Column({ name: "tags", type: "text", array: true, default: () => "'{}'" })
  tags!: string[];

  @Column({ name: "published_at", type: "timestamptz", nullable: true })
  publishedAt!: Date | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;
}
