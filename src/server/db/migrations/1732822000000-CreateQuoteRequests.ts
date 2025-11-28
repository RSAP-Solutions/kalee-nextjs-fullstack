import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateQuoteRequests1732822000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "quote_requests",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "source",
            type: "varchar",
            length: "32",
            isNullable: false,
          },
          {
            name: "status",
            type: "varchar",
            length: "32",
            isNullable: false,
            default: "'new'",
          },
          {
            name: "first_name",
            type: "varchar",
            length: "120",
            isNullable: true,
          },
          {
            name: "last_name",
            type: "varchar",
            length: "120",
            isNullable: true,
          },
          {
            name: "full_name",
            type: "varchar",
            length: "240",
            isNullable: true,
          },
          {
            name: "email",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "phone",
            type: "varchar",
            length: "100",
            isNullable: true,
          },
          {
            name: "address_line",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "city",
            type: "varchar",
            length: "180",
            isNullable: true,
          },
          {
            name: "project_type",
            type: "varchar",
            length: "180",
            isNullable: true,
          },
          {
            name: "service",
            type: "varchar",
            length: "180",
            isNullable: true,
          },
          {
            name: "timeline",
            type: "varchar",
            length: "180",
            isNullable: true,
          },
          {
            name: "budget",
            type: "varchar",
            length: "180",
            isNullable: true,
          },
          {
            name: "referral",
            type: "varchar",
            length: "180",
            isNullable: true,
          },
          {
            name: "contact_preference",
            type: "varchar",
            length: "120",
            isNullable: true,
          },
          {
            name: "details",
            type: "text",
            isNullable: true,
          },
          {
            name: "meta",
            type: "jsonb",
            isNullable: true,
          },
          {
            name: "created_at",
            type: "timestamptz",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamptz",
            default: "now()",
          },
        ],
      })
    );

    await queryRunner.createIndex(
      "quote_requests",
      new TableIndex({
        name: "IDX_QUOTE_REQUESTS_STATUS",
        columnNames: ["status"],
      })
    );

    await queryRunner.createIndex(
      "quote_requests",
      new TableIndex({
        name: "IDX_QUOTE_REQUESTS_CREATED_AT",
        columnNames: ["created_at"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex("quote_requests", "IDX_QUOTE_REQUESTS_CREATED_AT");
    await queryRunner.dropIndex("quote_requests", "IDX_QUOTE_REQUESTS_STATUS");
    await queryRunner.dropTable("quote_requests");
  }
}
