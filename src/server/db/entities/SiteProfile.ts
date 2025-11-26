import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "site_profiles" })
export class SiteProfile {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "logo_url", type: "varchar", length: 255, nullable: true })
  logoUrl!: string | null;

  @Column({ name: "contact_email", type: "varchar", length: 160, default: "" })
  contactEmail!: string;

  @Column({ name: "phone", type: "varchar", length: 60, default: "" })
  phone!: string;

  @Column({ name: "address_line_1", type: "varchar", length: 255, default: "" })
  addressLine1!: string;

  @Column({ name: "address_line_2", type: "varchar", length: 255, default: "" })
  addressLine2!: string;

  @CreateDateColumn({ name: "created_at", type: "timestamptz" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamptz" })
  updatedAt!: Date;
}
