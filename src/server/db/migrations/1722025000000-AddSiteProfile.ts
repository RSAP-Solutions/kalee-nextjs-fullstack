import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddSiteProfile1722025000000 implements MigrationInterface {
  name = "AddSiteProfile1722025000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "site_profiles",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            isNullable: false,
            default: "uuid_generate_v4()",
          },
          {
            name: "logo_url",
            type: "varchar",
            length: "255",
            isNullable: true,
          },
          {
            name: "contact_email",
            type: "varchar",
            length: "160",
            isNullable: false,
            default: "''",
          },
          {
            name: "phone",
            type: "varchar",
            length: "60",
            isNullable: false,
            default: "''",
          },
          {
            name: "address_line_1",
            type: "varchar",
            length: "255",
            isNullable: false,
            default: "''",
          },
          {
            name: "address_line_2",
            type: "varchar",
            length: "255",
            isNullable: false,
            default: "''",
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

    await queryRunner.query(
      "INSERT INTO site_profiles (id, logo_url, contact_email, phone, address_line_1, address_line_2) VALUES (uuid_generate_v4(), NULL, '', '', '', '')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("site_profiles");
  }
}
