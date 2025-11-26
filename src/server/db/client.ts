import { DataSource } from "typeorm";
import { Category } from "./entities/Category";
import { Product } from "./entities/Product";
import { Order } from "./entities/Order";
import { OrderItem } from "./entities/OrderItem";
import { SiteProfile } from "./entities/SiteProfile";
import { GalleryItem } from "./entities/GalleryItem";
import { BlogItem } from "./entities/BlogItem";
import { InitialSchema1721970000000 } from "./migrations/1721970000000-InitialSchema";
import { AddSiteProfile1722025000000 } from "./migrations/1722025000000-AddSiteProfile";
import { CreateGalleryItems1722026000000 } from "./migrations/1722026000000-CreateGalleryItems";
import { CreateBlogItems1722027000000 } from "./migrations/1722027000000-CreateBlogItems";

let appDataSource: DataSource | null = null;

const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const sslConfig = () => {
  const raw = process.env.DATABASE_SSL;
  if (raw?.toLowerCase() === "false") return false;
  if (raw?.toLowerCase() === "true") return { rejectUnauthorized: false };
  return process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false;
};

export const getDataSource = async () => {
  // Validate env vars before trying to connect (lazy validation)
  const required = ["DATABASE_HOST", "DATABASE_USER", "DATABASE_PASSWORD", "DATABASE_NAME"];
  const missing = required.filter((key) => !process.env[key]);
  
  if (missing.length > 0) {
    const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.local";
    const debugInfo = `Debug: HOST=${!!process.env.DATABASE_HOST}, USER=${!!process.env.DATABASE_USER}, PASSWORD=${!!process.env.DATABASE_PASSWORD}, DB=${!!process.env.DATABASE_NAME}`;
    throw new Error(
      `Missing required database environment variables: ${missing.join(", ")}\n\n` +
      `${debugInfo}\n\n` +
      `Please create a ${envFile} file in the project root with:\n` +
      `DATABASE_HOST=localhost\n` +
      `DATABASE_PORT=5432\n` +
      `DATABASE_USER=your_username\n` +
      `DATABASE_PASSWORD=your_password\n` +
      `DATABASE_NAME=your_database_name\n` +
      `DATABASE_SSL=false\n\n` +
      `Then restart your Next.js development server.`
    );
  }

  // Create DataSource lazily with current env vars
  if (!appDataSource) {
    appDataSource = new DataSource({
      type: "postgres",
      host: process.env.DATABASE_HOST!,
      port: parseNumber(process.env.DATABASE_PORT, 5432),
      username: process.env.DATABASE_USER!,
      password: process.env.DATABASE_PASSWORD!,
      database: process.env.DATABASE_NAME!,
      entities: [Category, Product, Order, OrderItem, SiteProfile, GalleryItem, BlogItem],
      migrations: [InitialSchema1721970000000, AddSiteProfile1722025000000, CreateGalleryItems1722026000000, CreateBlogItems1722027000000],
      migrationsTableName: "typeorm_migrations",
      synchronize: false,
      logging: process.env.NODE_ENV !== "production",
      ssl: sslConfig(),
    });
  }

  if (!appDataSource.isInitialized) {
    try {
      await appDataSource.initialize();
    } catch (error: any) {
      console.error("[getDataSource] Initialization error:", error);
      console.error("[getDataSource] Error code:", error?.code);
      console.error("[getDataSource] Error message:", error?.message);
      // Check if it's a connection error
      if (error?.code === "ECONNREFUSED" || error?.code === "ENOTFOUND" || error?.message?.includes("connect")) {
        throw new Error(
          `Cannot connect to database at ${process.env.DATABASE_HOST || "unknown"}:${process.env.DATABASE_PORT || 5432}.\n` +
          `Please ensure:\n` +
          `1. Your PostgreSQL database is running\n` +
          `2. Connection settings in .env.local are correct\n` +
          `3. The database exists and is accessible\n` +
          `Error: ${error.message}`
        );
      }
      throw error;
    }
  }
  return appDataSource;
};

export const getCategoryRepository = async () => {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Category);
};

export const getProductRepository = async () => {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Product);
};

export const getOrderRepository = async () => {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Order);
};

export const getOrderItemRepository = async () => {
  const dataSource = await getDataSource();
  return dataSource.getRepository(OrderItem);
};

export const getSiteProfileRepository = async () => {
  const dataSource = await getDataSource();
  return dataSource.getRepository(SiteProfile);
};

export const getGalleryItemRepository = async () => {
  const dataSource = await getDataSource();
  return dataSource.getRepository(GalleryItem);
};

export const getBlogItemRepository = async () => {
  const dataSource = await getDataSource();
  return dataSource.getRepository(BlogItem);
};
