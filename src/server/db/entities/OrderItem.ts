import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import type { Relation } from "typeorm";
import type { Order } from "./Order";
import type { Product } from "./Product";

@Entity({ name: "order_items" })
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne("Order", "orderItems", { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order!: Relation<Order>;

  @ManyToOne("Product", undefined, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "product_id" })
  product?: Relation<Product> | null;

  @Column({ name: "product_title", type: "varchar", length: 160 })
  productTitle!: string;

  @Column({ name: "unit_price", type: "numeric", precision: 10, scale: 2, default: 0 })
  unitPrice!: number;

  @Column({ type: "integer", default: 1 })
  quantity!: number;

  @Column({ name: "total_price", type: "numeric", precision: 10, scale: 2, default: 0 })
  totalPrice!: number;

  @CreateDateColumn({ type: "timestamptz", name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ type: "timestamptz", name: "updated_at" })
  updatedAt!: Date;
}
