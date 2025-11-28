import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCategoryImageUrl1732815000000 implements MigrationInterface {
  name = "AddCategoryImageUrl1732815000000";

  public async up(queryRunner: QueryRunner): Promise<void> {
    const hasColumn = await queryRunner.hasColumn("categories", "image_url");

    if (!hasColumn) {
      await queryRunner.query(`
        ALTER TABLE categories
        ADD COLUMN IF NOT EXISTS image_url varchar(255)
      `);
      console.log("✅ Added image_url column to categories table");
    } else {
      console.log("ℹ️ image_url column already exists in categories table");
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const hasColumn = await queryRunner.hasColumn("categories", "image_url");

    if (hasColumn) {
      await queryRunner.query(`
        ALTER TABLE categories
        DROP COLUMN image_url
      `);
      console.log("✅ Removed image_url column from categories table");
    }
  }
}
