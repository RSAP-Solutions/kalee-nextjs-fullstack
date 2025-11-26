import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import { OrderItem } from "./OrderItem";

export enum OrderStatus {
  PENDING = "pending",
  PAID = "paid",
  FULFILLED = "fulfilled",
  CANCELLED = "cancelled",
}

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status!: OrderStatus;

  @Column({ name: "total_amount", type: "numeric", precision: 10, scale: 2, default: 0 })
  totalAmount!: number;

  @Column({ name: "shipping_cost", type: "numeric", precision: 10, scale: 2, default: 0 })
  shippingCost!: number;

  @Column({ name: "shipping_full_name", type: "varchar", length: 160 })
  shippingFullName!: string;

  @Column({ name: "shipping_email", type: "varchar", length: 160 })
  shippingEmail!: string;

  @Column({ name: "shipping_phone", type: "varchar", length: 60, nullable: true })
  shippingPhone?: string | null;

  @Column({ name: "shipping_address", type: "varchar", length: 255 })
  shippingAddress!: string;

  @Column({ name: "shipping_city", type: "varchar", length: 100 })
  shippingCity!: string;

  @Column({ name: "shipping_state", type: "varchar", length: 60, nullable: true })
  shippingState?: string | null;

  @Column({ name: "shipping_postal_code", type: "varchar", length: 20 })
  shippingPostalCode!: string;

  @Column({ name: "shipping_method", type: "varchar", length: 80 })
  shippingMethod!: string;

  @Column({ name: "stripe_payment_intent_id", type: "varchar", length: 120, nullable: true })
  stripePaymentIntentId?: string | null;

  @Column({ name: "notes", type: "text", nullable: true })
  notes?: string | null;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, { cascade: true })
  orderItems!: Relation<OrderItem>[];

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}
