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

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  price!: string;

  @Column({ 
    type: "decimal", 
    precision: 5, 
    scale: 2, 
    nullable: true,
    default: 0.00
  })
  discount?: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  productName?: string;

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
    return parseFloat(this.discount || "0");
  }

  get finalUnitPrice(): number {
    return this.unitPrice - this.discountAmount;
  }

  get totalPrice(): number {
    return this.finalUnitPrice * this.quantity;
  }

  get totalDiscount(): number {
    return this.discountAmount * this.quantity;
  }

  get finalTotal(): number {
    return this.totalPrice;
  }
}
