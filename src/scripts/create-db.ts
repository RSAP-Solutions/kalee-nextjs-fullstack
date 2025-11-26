import "reflect-metadata";
import { config } from "dotenv";
import { resolve } from "path";
import { Client } from "pg";

// Load .env.local first, then .env as fallback
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

const createDatabase = async () => {
  const dbName = process.env.DATABASE_NAME;
  const dbHost = process.env.DATABASE_HOST;
  const dbPort = parseInt(process.env.DATABASE_PORT || "5432", 10);
  const dbUser = process.env.DATABASE_USER;
  const dbPassword = process.env.DATABASE_PASSWORD;

  if (!dbName || !dbHost || !dbUser || !dbPassword) {
    console.error("❌ Missing required database environment variables");
    process.exit(1);
  }

  // Connect to default 'postgres' database to create the target database
  const adminClient = new Client({
    host: dbHost,
    port: dbPort,
    user: dbUser,
    password: dbPassword,
    database: "postgres", // Connect to default database
    ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  });

  try {
    await adminClient.connect();
    console.log("✅ Connected to PostgreSQL server");

    // Check if database exists
    const checkResult = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [dbName]
    );

    if (checkResult.rows.length > 0) {
      console.log(`✅ Database "${dbName}" already exists`);
    } else {
      // Create the database
      await adminClient.query(`CREATE DATABASE "${dbName}"`);
      console.log(`✅ Database "${dbName}" created successfully`);
    }
  } catch (error: unknown) {
    if ((error as { code?: string })?.code === "3D000") {
      // Database doesn't exist, try creating it
      try {
        await adminClient.query(`CREATE DATABASE "${dbName}"`);
        console.log(`✅ Database "${dbName}" created successfully`);
      } catch (createError: unknown) {
        console.error(`❌ Failed to create database "${dbName}"`);
        console.error(createError instanceof Error ? createError.message : String(createError));
        process.exit(1);
      }
    } else {
      console.error("❌ Failed to connect or create database");
      console.error(error instanceof Error ? error.message : String(error));
      process.exit(1);
    }
  } finally {
    await adminClient.end();
  }
};

createDatabase();

