import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateGalleryItems1722026000000 implements MigrationInterface {
  name = "CreateGalleryItems1722026000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "gallery_items",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          {
            name: "title",
            type: "varchar",
            length: "180",
            isNullable: false,
          },
          {
            name: "description",
            type: "text",
            isNullable: false,
          },
          {
            name: "location",
            type: "varchar",
            length: "160",
            isNullable: true,
          },
          {
            name: "coverImage",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "imageUrls",
            type: "text",
            isArray: true,
            // Use a quoted empty array literal for Postgres text[] default
            default: "'{}'",
            isNullable: false,
          },
          {
            name: "tags",
            type: "text",
            isArray: true,
            default: "'{}'",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            length: "20",
            isNullable: false,
            default: "'draft'",
          },
          {
            name: "published_at",
            type: "timestamptz",
            isNullable: true,
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("gallery_items");
  }
}
