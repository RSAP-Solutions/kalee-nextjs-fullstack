import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class InitialSchema1721970000000 implements MigrationInterface {
  name = "InitialSchema1721970000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

    await queryRunner.createTable(
      new Table({
        name: "categories",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          { name: "name", type: "varchar", length: "120", isNullable: false },
          { name: "slug", type: "varchar", length: "120", isNullable: false, isUnique: true },
          { name: "description", type: "text", isNullable: true },
          {
            name: "created_at",
            type: "timestamptz",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "now()",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "products",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          { name: "title", type: "varchar", length: "160", isNullable: false },
          { name: "slug", type: "varchar", length: "160", isNullable: false, isUnique: true },
          {
            name: "price",
            type: "numeric",
            precision: 10,
            scale: 2,
            default: "0",
            isNullable: false,
          },
          { name: "description", type: "text", isNullable: false },
          { name: "image_url", type: "varchar", length: "255", isNullable: true },
          { name: "in_stock", type: "boolean", default: "true", isNullable: false },
          { name: "category_id", type: "uuid", isNullable: true },
          { name: "category_slug", type: "varchar", length: "120", isNullable: true },
          {
            name: "created_at",
            type: "timestamptz",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "now()",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "products",
      new TableForeignKey({
        columnNames: ["category_id"],
        referencedTableName: "categories",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.query(
      "CREATE TYPE \"orders_status_enum\" AS ENUM ('pending','paid','fulfilled','cancelled')"
    );

    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          {
            name: "status",
            type: "enum",
            enumName: "orders_status_enum",
            default: "'pending'",
            isNullable: false,
          },
          {
            name: "total_amount",
            type: "numeric",
            precision: 10,
            scale: 2,
            default: "0",
            isNullable: false,
          },
          {
            name: "shipping_cost",
            type: "numeric",
            precision: 10,
            scale: 2,
            default: "0",
            isNullable: false,
          },
          { name: "shipping_full_name", type: "varchar", length: "160", isNullable: false },
          { name: "shipping_email", type: "varchar", length: "160", isNullable: false },
          { name: "shipping_phone", type: "varchar", length: "60", isNullable: true },
          { name: "shipping_address", type: "varchar", length: "255", isNullable: false },
          { name: "shipping_city", type: "varchar", length: "100", isNullable: false },
          { name: "shipping_state", type: "varchar", length: "60", isNullable: true },
          { name: "shipping_postal_code", type: "varchar", length: "20", isNullable: false },
          { name: "shipping_method", type: "varchar", length: "80", isNullable: false },
          {
            name: "stripe_payment_intent_id",
            type: "varchar",
            length: "120",
            isNullable: true,
          },
          { name: "notes", type: "text", isNullable: true },
          {
            name: "created_at",
            type: "timestamptz",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "now()",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "order_items",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          { name: "order_id", type: "uuid", isNullable: false },
          { name: "product_id", type: "uuid", isNullable: true },
          { name: "product_title", type: "varchar", length: "160", isNullable: false },
          {
            name: "unit_price",
            type: "numeric",
            precision: 10,
            scale: 2,
            default: "0",
            isNullable: false,
          },
          { name: "quantity", type: "integer", default: "1", isNullable: false },
          {
            name: "total_price",
            type: "numeric",
            precision: 10,
            scale: 2,
            default: "0",
            isNullable: false,
          },
          {
            name: "created_at",
            type: "timestamptz",
            default: "now()",
            isNullable: false,
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "now()",
            isNullable: false,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      "order_items",
      new TableForeignKey({
        columnNames: ["order_id"],
        referencedTableName: "orders",
        referencedColumnNames: ["id"],
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      })
    );

    await queryRunner.createForeignKey(
      "order_items",
      new TableForeignKey({
        columnNames: ["product_id"],
        referencedTableName: "products",
        referencedColumnNames: ["id"],
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const orderItemsTable = await queryRunner.getTable("order_items");
    if (orderItemsTable) {
      for (const fk of orderItemsTable.foreignKeys) {
        await queryRunner.dropForeignKey("order_items", fk);
      }
    }

    await queryRunner.dropTable("order_items");

    const productsTable = await queryRunner.getTable("products");
    if (productsTable) {
      for (const fk of productsTable.foreignKeys) {
        await queryRunner.dropForeignKey("products", fk);
      }
    }

    await queryRunner.dropTable("orders");
    await queryRunner.query('DROP TYPE IF EXISTS "orders_status_enum"');

    await queryRunner.dropTable("products");
    await queryRunner.dropTable("categories");
  }
}
