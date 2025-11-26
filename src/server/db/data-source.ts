import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local first, then .env as fallback (for scripts that run outside Next.js)
if (typeof window === "undefined" && !process.env.DATABASE_HOST) {
  config({ path: resolve(process.cwd(), ".env.local") });
  config({ path: resolve(process.cwd(), ".env") });
}

import { Category } from "./entities/Category";
import { Product } from "./entities/Product";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
import { SiteProfile } from "./entities/SiteProfile";
import { GalleryItem } from "./entities/GalleryItem";
import { InitialSchema1721970000000 } from "./migrations/1721970000000-InitialSchema";
import { AddSiteProfile1722025000000 } from "./migrations/1722025000000-AddSiteProfile";
import { CreateGalleryItems1722026000000 } from "./migrations/1722026000000-CreateGalleryItems";

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const sslConfig = () => {
  const raw = process.env.DATABASE_SSL;
  if (raw?.toLowerCase() === "false") return false;
  if (raw?.toLowerCase() === "true") return { rejectUnauthorized: false };
  // Default to requiring SSL in production
  return process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false;
};


// Create DataSource options function (lazy evaluation)
const getDataSourceOptions = (): DataSourceOptions => {
  return {
    type: "postgres",
    host: process.env.DATABASE_HOST!,
    port: parseNumber(process.env.DATABASE_PORT, 5432),
    username: process.env.DATABASE_USER!,
    password: process.env.DATABASE_PASSWORD!,
    database: process.env.DATABASE_NAME!,
    entities: [Category, Product, Order, OrderItem, SiteProfile, GalleryItem],
    migrations: [InitialSchema1721970000000, AddSiteProfile1722025000000, CreateGalleryItems1722026000000],
    migrationsTableName: "typeorm_migrations",
    synchronize: false,
    logging: process.env.NODE_ENV !== "production",
    ssl: sslConfig(),
  };
};

// Create DataSource only if env vars are available (for scripts)
// In Next.js API routes, use getDataSource() from client.ts instead
let _appDataSource: DataSource | null = null;

const createDataSource = (): DataSource => {
  if (!_appDataSource) {
    // Only validate and create if env vars are present (scripts context)
    // In Next.js, this will be created lazily via client.ts
    if (process.env.DATABASE_HOST && process.env.DATABASE_USER && process.env.DATABASE_PASSWORD && process.env.DATABASE_NAME) {
      _appDataSource = new DataSource(getDataSourceOptions());
    } else {
      // Create a placeholder that will fail on initialize (for scripts that load dotenv)
      _appDataSource = new DataSource({
        type: "postgres",
        host: "",
        port: 5432,
        username: "",
        password: "",
        database: "",
        entities: [],
        migrations: [],
      });
    }
  }
  return _appDataSource;
};

export const AppDataSource = createDataSource();
export default AppDataSource;
