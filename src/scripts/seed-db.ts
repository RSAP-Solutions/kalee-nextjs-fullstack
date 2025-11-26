import "reflect-metadata";
import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local first, then .env as fallback
config({ path: resolve(process.cwd(), ".env.local") });
config({ path: resolve(process.cwd(), ".env") });

import AppDataSource from "../server/db/data-source";
import { Category } from "../server/db/entities/Category";
import { Product } from "../server/db/entities/Product";
import { categories as seedCategories, products as seedProducts } from "../data/products";

const getCategoryDescription = (slug: string): string | null => {
  switch (slug) {
    case "energy":
      return "Energy upgrades and efficiency improvements.";
    case "hvac":
      return "Heating, ventilation, and air conditioning services.";
    case "plumbing":
      return "Comprehensive plumbing solutions for homes.";
    case "carpentry":
      return "Carpentry, repairs, and custom woodwork.";
    case "painting":
      return "Interior and exterior painting and drywall.";
    case "exterior":
      return "Exterior renovations and curb appeal upgrades.";
    case "electrical":
      return "Electrical and smart home technology services.";
    case "accessibility":
      return "Accessibility upgrades and universal design.";
    default:
      return null;
  }
};

const run = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const categoryRepo = AppDataSource.getRepository(Category);
    const productRepo = AppDataSource.getRepository(Product);

    const categoryMap = new Map<string, Category>();

    const categoriesToSeed = seedCategories.filter((category) => category.slug !== "all");

    for (const categorySeed of categoriesToSeed) {
      let category = await categoryRepo.findOne({ where: { slug: categorySeed.slug } });

      if (category) {
        category.name = categorySeed.name;
        category.description = getCategoryDescription(categorySeed.slug);
      } else {
        category = categoryRepo.create({
          name: categorySeed.name,
          slug: categorySeed.slug,
          description: getCategoryDescription(categorySeed.slug),
        });
      }

      const saved = await categoryRepo.save(category);
      categoryMap.set(saved.slug, saved);
    }

    for (const productSeed of seedProducts) {
      let product = await productRepo.findOne({ where: { slug: productSeed.slug }, relations: { category: true } });

      const category = productSeed.category ? categoryMap.get(productSeed.category) ?? null : null;

      if (product) {
        product.title = productSeed.title;
        product.price = Number(productSeed.price);
        product.description = productSeed.description;
        product.imageUrl = productSeed.image ?? null;
        product.inStock = productSeed.inStock ?? true;
        product.category = category;
        product.categorySlug = category?.slug ?? null;
      } else {
        product = productRepo.create({
          title: productSeed.title,
          slug: productSeed.slug,
          price: Number(productSeed.price),
          description: productSeed.description,
          imageUrl: productSeed.image ?? null,
          inStock: productSeed.inStock ?? true,
          category,
          categorySlug: category?.slug ?? null,
        });
      }

      await productRepo.save(product);
    }

    console.log(`✅ Seed completed. Categories: ${categoryMap.size}, Products: ${seedProducts.length}`);
  } catch (error) {
    console.error("❌ Failed to seed database");
    console.error(error);
    process.exitCode = 1;
  } finally {
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  }
};

run();
