import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBlogItems1722027000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "blog_items",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "title",
            type: "varchar",
            length: "255",
            isNullable: false,
          },
          {
            name: "content",
            type: "text",
            isNullable: false,
          },
          {
            name: "excerpt",
            type: "varchar",
            length: "500",
            isNullable: true,
          },
          {
            name: "cover_image",
            type: "varchar",
            length: "500",
            isNullable: true,
          },
          {
            name: "author",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "status",
            type: "enum",
            enum: ["draft", "published"],
            default: "'draft'",
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
        indices: [
          {
            name: "IDX_BLOG_ITEMS_STATUS",
            columnNames: ["status"],
          },
          {
            name: "IDX_BLOG_ITEMS_PUBLISHED_AT",
            columnNames: ["published_at"],
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("blog_items");
  }
}
