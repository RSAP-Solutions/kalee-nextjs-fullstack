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
import { Order } from "./Order";
import { Product } from "./Product";

@Entity({ name: "order_items" })
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne(() => Order, (order) => order.orderItems, { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order!: Relation<Order>;

  @ManyToOne(() => Product, { onDelete: "SET NULL", nullable: true })
  @JoinColumn({ name: "product_id" })
  product?: Relation<Product> | null;

  @Column({ type: "int", nullable: false })
  quantity!: number;

  @Column({ name: "unit_price", type: "decimal", precision: 10, scale: 2, nullable: false })
  price!: string;

  @Column({ name: "total_price", type: "decimal", precision: 10, scale: 2, nullable: false })
  totalPrice!: string;

  @Column({ name: "product_title", type: "varchar", length: 160, nullable: false })
  productName!: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  productSlug?: string;

  @Column({ type: "varchar", length: 500, nullable: true })
  productImage?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;

  // Computed properties
  get unitPrice(): number {
    return parseFloat(this.price);
  }

  get discountAmount(): number {
    return 0; // No discount column in database
  }

  get finalUnitPrice(): number {
    return this.unitPrice;
  }

  get totalDiscount(): number {
    return 0;
  }

  get finalTotal(): number {
    return parseFloat(this.totalPrice);
  }
}
