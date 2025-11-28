import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { QuoteRequestSource, QuoteRequestStatus } from "@/types/quote";

@Entity("quote_requests")
export class QuoteRequest {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "source", type: "varchar", length: 32 })
  source!: QuoteRequestSource;

  @Column({ name: "status", type: "varchar", length: 32, default: "new" })
  status!: QuoteRequestStatus;

  @Column({ name: "first_name", type: "varchar", length: 120, nullable: true })
  firstName!: string | null;

  @Column({ name: "last_name", type: "varchar", length: 120, nullable: true })
  lastName!: string | null;

  @Column({ name: "full_name", type: "varchar", length: 240, nullable: true })
  fullName!: string | null;

  @Column({ name: "email", type: "varchar", length: 255, nullable: true })
  email!: string | null;

  @Column({ name: "phone", type: "varchar", length: 100, nullable: true })
  phone!: string | null;

  @Column({ name: "address_line", type: "varchar", length: 255, nullable: true })
  addressLine!: string | null;

  @Column({ name: "city", type: "varchar", length: 180, nullable: true })
  city!: string | null;

  @Column({ name: "project_type", type: "varchar", length: 180, nullable: true })
  projectType!: string | null;

  @Column({ name: "service", type: "varchar", length: 180, nullable: true })
  service!: string | null;

  @Column({ name: "timeline", type: "varchar", length: 180, nullable: true })
  timeline!: string | null;

  @Column({ name: "budget", type: "varchar", length: 180, nullable: true })
  budget!: string | null;

  @Column({ name: "referral", type: "varchar", length: 180, nullable: true })
  referral!: string | null;

  @Column({ name: "contact_preference", type: "varchar", length: 120, nullable: true })
  contactPreference!: string | null;

  @Column({ name: "details", type: "text", nullable: true })
  details!: string | null;

  @Column({ name: "meta", type: "jsonb", nullable: true })
  meta!: Record<string, unknown> | null;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;
}
