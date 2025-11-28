import { MigrationInterface, QueryRunner } from "typeorm";

export class AddProductImageUrlsColumn1732741200001 implements MigrationInterface {
  name = "AddProductImageUrlsColumn1732741200001";

  public async up(queryRunner: QueryRunner): Promise<void> {
    // First check if the column exists
    const hasColumn = await queryRunner.hasColumn("products", "image_urls");
    
    if (!hasColumn) {
      await queryRunner.query(`
        ALTER TABLE products 
        ADD COLUMN IF NOT EXISTS image_urls jsonb DEFAULT NULL
      `);
      console.log("✅ Added image_urls column to products table");
    } else {
      console.log("ℹ️ image_urls column already exists in products table");
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Only drop the column if it exists
    const hasColumn = await queryRunner.hasColumn("products", "image_urls");
    
    if (hasColumn) {
      await queryRunner.query(`
        ALTER TABLE products 
        DROP COLUMN image_urls
      `);
      console.log("✅ Removed image_urls column from products table");
    }
  }
}
