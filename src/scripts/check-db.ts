import "reflect-metadata";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local first, then .env as fallback
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

import AppDataSource from "../server/db/data-source";

const main = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    await AppDataSource.query("SELECT 1");
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Database connection failed");
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

main();
