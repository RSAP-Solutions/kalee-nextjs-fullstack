import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Product } from "./Product";

@Entity({ name: "categories" })
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar", length: 120 })
  name!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 120 })
  slug!: string;

  @Column({ type: "text", nullable: true })
  description?: string | null;

  @Column({ name: "image_url", type: "varchar", length: 255, nullable: true })
  imageUrl?: string | null;

  @OneToMany(() => Product, "category")
  products!: Product[];

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}
