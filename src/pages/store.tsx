import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import type { NextPageWithMeta } from "./_app";

const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgZmlsbD0nI0VCREVGNycgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMjAwJyBoZWlnaHQ9JzIwMCcgcng9JzE2Jy8+PHRleHQgeD0nMTAwJyB5PScxMDAnIGZvbnQtc2l6ZT0nMjUnIGZpbGw9JyM4MDg4OTAnIHRleHQtYW5jaG9yPSdtaWRkbGUnPkltYWdlPC90ZXh0Pjwvc3ZnPg==";

type CategoryResponse = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productCount: number;
  imageUrl: string | null;
  imageUrlPreview: string | null;
};

type ProductResponse = {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  imageUrl: string | null;
  imageUrls: string[];
  inStock: boolean;
  category: { id: string; name: string; slug: string } | null;
  createdAt: string;
  updatedAt: string;
};

const resolveProxyUrl = (value: string | null | undefined): string | null => {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;

  if (trimmed.startsWith("/api/images/")) {
    return trimmed;
  }

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    try {
      const url = new URL(trimmed);
      if (url.hostname.includes("amazonaws.com") || url.hostname.includes("s3.")) {
        const key = url.pathname.replace(/^\/+/, "");
        return `/api/images/${key}`;
      }
      return trimmed;
    } catch {
      return trimmed;
    }
  }

  const key = trimmed.replace(/^\/+/, "");
  return `/api/images/${key}`;
};

const Store: NextPageWithMeta = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("popular");
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const categoryFromQuery = router.query.category as string;
    setSelectedCategory(categoryFromQuery || "all");
  }, [router.isReady, router.query.category]);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          const errorText = await response.text();
          console.error("[store.categories] Response error:", errorText);
          throw new Error(`Failed to load categories (${response.status})`);
        }
        const data: CategoryResponse[] = await response.json();
        setCategories([
          {
            id: "all",
            name: "All Products",
            slug: "all",
            description: "Browse every product in one place.",
            productCount: data.reduce((acc, item) => acc + item.productCount, 0),
            imageUrl: null,
            imageUrlPreview: null,
          },
          ...data,
        ]);
      } catch (fetchError) {
        console.error("[store.categories]", fetchError);
        const message = fetchError instanceof Error ? fetchError.message : "Failed to load categories";
        setError(message);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          const errorText = await response.text();
          console.error("[store.products] Response error:", errorText);
          throw new Error(`Failed to load products (${response.status})`);
        }
        const data: ProductResponse[] = await response.json();
        setProducts(data);
      } catch (fetchError) {
        console.error("[store.products]", fetchError);
        const message = fetchError instanceof Error ? fetchError.message : "Failed to load products";
        setError(message);
      } finally {
        setIsLoadingProducts(false);
      }
    };

    void Promise.all([fetchCategories(), fetchProducts()]);
  }, []);

  const visibleCategories = categories;

  const filteredProducts = useMemo(() => {
    const activeCategory = selectedCategory === "all" ? null : selectedCategory;
    const filtered = activeCategory
      ? products.filter((product) => product.category?.slug === activeCategory)
      : products;

    const sorted = [...filtered];
    if (sortBy === "price-low") sorted.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") sorted.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") sorted.sort((a, b) => a.title.localeCompare(b.title));
    else sorted.sort((a, b) => (b.createdAt ?? "")?.localeCompare?.(a.createdAt ?? ""));

    return sorted;
  }, [products, selectedCategory, sortBy]);

  const currentCategory = categories.find((category) => category.slug === selectedCategory);

  const handleCategoryChange = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const url = categorySlug !== "all" ? `/store?category=${categorySlug}` : "/store";
    router.push(url, undefined, { shallow: true });
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto grid w-full gap-8 lg:grid-cols-[minmax(280px,360px)_1fr]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-4 rounded-2xl bg-white p-6 shadow-card">
            <div>
              <h2 className="text-lg font-semibold text-navy">Categories</h2>
              <p className="text-xs text-slate-500">Explore by focus area</p>
            </div>
            <nav className="space-y-2">
              {isLoadingCategories ? (
                <p className="text-sm text-slate-500">Loading categories…</p>
              ) : (
                visibleCategories.map((category) => {
                  const isActive = selectedCategory === category.slug;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm font-medium transition-all ${
                        isActive
                          ? "bg-amber/15 text-navy shadow-sm ring-1 ring-amber/30"
                          : "text-slate-700 hover:bg-slate-100 hover:text-navy"
                      }`}
                    >
                      <CategoryAvatar name={category.name} imageUrl={resolveProxyUrl(category.imageUrlPreview ?? category.imageUrl)} />
                      <div className="flex flex-1 items-center justify-between gap-2">
                        <span className="text-sm font-semibold leading-tight break-words">{category.name}</span>
                        <span className="shrink-0 rounded-full bg-white/80 px-2 py-1 text-xs font-semibold text-slate-600">
                          {category.productCount}
                        </span>
                      </div>
                    </button>
                  );
                })
              )}
            </nav>
          </div>
        </aside>

        <div className="w-full">
          <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
                {currentCategory?.name ?? "All Products"}
              </h1>
              {currentCategory?.description && (
                <p className="mt-1 max-w-2xl text-sm text-slate-600">
                  {currentCategory.description}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm font-medium text-slate-600">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
              >
                <option value="popular">Most popular</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <div className="mb-6 lg:hidden">
            <div className="flex flex-wrap gap-3 pb-2">
              {visibleCategories.map((category) => {
                const isActive = selectedCategory === category.slug;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-amber bg-amber/10 text-navy"
                        : "border-slate-200 text-slate-600 hover:border-ocean hover:text-ocean"
                    }`}
                  >
                    <CategoryAvatar name={category.name} imageUrl={resolveProxyUrl(category.imageUrlPreview ?? category.imageUrl)} size="sm" />
                    {category.name}
                  </button>
                );
              })}
            </div>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {isLoadingProducts ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-card">
              <p className="text-lg text-slate-600">Loading products…</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="rounded-xl bg-white p-12 text-center shadow-card">
              <p className="text-lg text-slate-600">
                No products found in this category.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CategoryAvatar = ({ name, imageUrl, size = "md" }: { name: string; imageUrl: string | null; size?: "sm" | "md" }) => {
  const wrapperClasses = size === "sm" ? "h-8 w-8" : "h-11 w-11";

  if (!imageUrl) {
    return (
      <div
        className={`flex ${wrapperClasses} shrink-0 items-center justify-center rounded-full bg-slate-200 text-xs font-semibold text-slate-500`}
      >
        {name.charAt(0).toUpperCase()}
      </div>
    );
  }

  return (
    <div className={`relative ${wrapperClasses} shrink-0 overflow-hidden rounded-full border border-slate-100 bg-slate-100`}>
      <Image
        src={imageUrl}
        alt={`${name} preview`}
        fill
        className="object-cover"
        sizes="44px"
        unoptimized
      />
      <span className="pointer-events-none absolute inset-0 ring-1 ring-white/60" aria-hidden />
    </div>
  );
};

const ProductCard = ({ product }: { product: ProductResponse }) => {
  const displayImage = (() => {
    if (product.imageUrls && product.imageUrls.length > 0) {
      return product.imageUrls[0] ?? placeholderImage;
    }

    if (product.imageUrl) {
      return product.imageUrl;
    }

    return placeholderImage;
  })();

  return (
    <Link
      href={`/store/${product.slug}`}
      className="group card flex flex-col overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
        <Image
          src={displayImage}
          alt={product.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
        />
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

