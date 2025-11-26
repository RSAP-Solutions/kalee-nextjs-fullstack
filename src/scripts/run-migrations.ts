import "reflect-metadata";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local first, then .env as fallback
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

import AppDataSource from "../server/db/data-source";

const run = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const migrations = await AppDataSource.runMigrations();
    if (migrations.length === 0) {
      console.log("✅ No pending migrations. Database is up to date.");
    } else {
      migrations.forEach((migration) => {
        console.log(`➡️  Applied migration: ${migration.name}`);
      });
      console.log("✅ All pending migrations applied successfully.");
    }
  } catch (error) {
    console.error("❌ Failed to run migrations");
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

run();
