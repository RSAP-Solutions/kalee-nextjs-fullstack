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
import type { Relation } from "typeorm";
import type { Order } from "./Order";
import type { Product } from "./Product";

@Entity({ name: "order_items" })
@Index("IDX_ORDER_ITEMS_ORDER_ID", ["order_id"])
@Index("IDX_ORDER_ITEMS_PRODUCT_ID", ["product_id"])
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @ManyToOne("Order", "orderItems", { onDelete: "CASCADE" })
  @JoinColumn({ name: "order_id" })
  order!: Relation<Order>;

  @ManyToOne("Product", undefined, { onDelete: "SET NULL", nullable: true })
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
