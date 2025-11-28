import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductImageUrls1732741200000 implements MigrationInterface {
  name = "AddProductImageUrls1732741200000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE products 
      ADD COLUMN image_urls jsonb NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE products 
      DROP COLUMN image_urls
    `);
  }
}
