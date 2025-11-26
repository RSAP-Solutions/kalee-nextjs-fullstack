import "reflect-metadata";
import { config } from "dotenv";
import { DataSource } from "typeorm";
import { CreateBlogItems1722027000000 } from "../server/db/migrations/1722027000000-CreateBlogItems";

// Load environment variables from .env.local
config({ path: ".env.local" });

const runMigration = async () => {
  try {
    const dataSource = new DataSource({
      type: "postgres",
      host: process.env.DATABASE_HOST!,
      port: Number(process.env.DATABASE_PORT) || 5432,
      username: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
      ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
      migrations: [CreateBlogItems1722027000000],
    });

    await dataSource.initialize();
    console.log("Database connected");

    await dataSource.runMigrations();
    console.log("Migration completed successfully");

    await dataSource.destroy();
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

runMigration();
