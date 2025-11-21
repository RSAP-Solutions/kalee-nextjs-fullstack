import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPageWithMeta } from "./_app";
import { categories, getProductsByCategory } from "@/data/products";
import { Product } from "@/types/product";

const Store: NextPageWithMeta = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");

  // Sync category from URL query
  useEffect(() => {
    if (router.isReady) {
      const categoryFromQuery = router.query.category as string;
      setSelectedCategory(categoryFromQuery || "all");
    }
  }, [router.isReady, router.query.category]);

  const filteredProducts = getProductsByCategory(selectedCategory);

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "name") return a.title.localeCompare(b.title);
    // Default: most popular (by ID order for now)
    return a.id.localeCompare(b.id);
  });

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const url = categorySlug !== "all" ? `/store?category=${categorySlug}` : "/store";
    router.push(url, undefined, { shallow: true });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto grid w-full gap-8 lg:grid-cols-[250px_1fr]">
        {/* Sidebar - Categories */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-2 rounded-xl bg-white p-6 shadow-card">
            <h2 className="mb-4 text-lg font-semibold text-navy">Categories</h2>
            <nav className="space-y-1">
              {categories.map((category) => {
                const isActive = selectedCategory === category.slug;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-amber text-navy"
                        : "text-slate-700 hover:bg-slate-100 hover:text-navy"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="w-full">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
              {categories.find((c) => c.slug === selectedCategory)?.name ||
                "All Products"}
            </h1>
            <div className="flex items-center gap-3">
              <label
                htmlFor="sort"
                className="text-sm font-medium text-slate-600"
              >
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              >
                <option value="popular">Most popular</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Mobile Categories */}
          <div className="mb-6 lg:hidden">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((category) => {
                const isActive = selectedCategory === category.slug;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-amber text-navy"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product Grid */}
          {sortedProducts.length === 0 ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-card">
              <p className="text-lg text-slate-600">
                No products found in this category.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Link
      href={`/store/${product.slug}`}
      className="group card flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-200">
            <div className="text-center">
              <div className="mx-auto mb-2 h-16 w-16 rounded-full border-2 border-slate-400"></div>
              <p className="text-xs text-slate-500">No Image</p>
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-navy group-hover:text-amber transition-colors">
          {product.title}
        </h3>
        <p className="mt-2 text-xl font-bold text-tangerine">
          ${product.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </p>
      </div>
    </Link>
  );
};

Store.meta = {
  title: "Store Front | Kealee Construction",
  description:
    "Browse our comprehensive selection of construction services, energy upgrades, and home improvement products.",
};

export default Store;

