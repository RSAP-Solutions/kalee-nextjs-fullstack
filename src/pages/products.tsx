import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { NextPageWithMeta } from "@/pages/_app";

const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDAwJyBoZWlnaHQ9JzMwMCcgZmlsbD0nI0VCREVGNycgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzMwMCcgcng9JzE2Jy8+PHRleHQgeD0nMjAwJyB5PScxNTAnIGZvbnQtc2l6ZT0nNDAnIGZpbGw9JyM4MDg4OTAnIHRleHQtYW5jaG9yPSdtaWRkbGUnPlByb2R1Y3Q8L3RleHQ+PC9zdmc+";

type ProductResponse = {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  imageUrl: string | null;
  inStock: boolean;
  category: { id: string; name: string; slug: string } | null;
  createdAt: string;
  updatedAt: string;
};

type ProductCardProps = {
  product: ProductResponse;
};

const ProductCard = ({ product }: ProductCardProps) => (
  <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
    <Link href={`/products/${product.slug}`}>
      <div className="block cursor-pointer">
        <div className="relative h-48 w-full bg-slate-100">
          <Image
            src={product.imageUrl ?? placeholderImage}
            alt={product.title}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 400px, 100vw"
            unoptimized
          />
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
              <span className="rounded-lg bg-slate-800 px-3 py-1 text-sm font-semibold text-white">
                Out of Stock
              </span>
            </div>
          )}
        </div>
        <div className="space-y-3 px-6 py-5">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-navy line-clamp-1">{product.title}</h3>
            <span className="text-lg font-bold text-ocean">
              ${product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>
          {product.category && (
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span className="inline-flex rounded-full bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                {product.category.name}
              </span>
            </div>
          )}
          <p className="text-sm text-slate-600 line-clamp-3">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className={`text-xs font-medium ${
              product.inStock ? "text-green-600" : "text-red-600"
            }`}>
              {product.inStock ? "In Stock" : "Out of Stock"}
            </span>
            <button className="text-sm font-semibold text-ocean hover:text-ocean/80">
              View Details →
            </button>
          </div>
        </div>
      </div>
    </Link>
  </article>
);

const ProductsPage: NextPageWithMeta = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("[products] Fetching products...");
        const response = await fetch("/api/products");
        if (!response.ok) {
          const errorText = await response.text();
          console.error("[products.fetch] Response error:", errorText);
          throw new Error(`Failed to load products (${response.status})`);
        }
        const data = await response.json();
        console.log("[products] Loaded products:", data.length);
        setProducts(data);
      } catch (err: unknown) {
        console.error("[products.fetch]", err);
      } finally {
        setIsLoading(false);
      }
    };
    void fetchProducts();
  }, []);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    products.forEach((p) => {
      if (p.category?.name) {
        categories.add(p.category.name);
      }
    });
    return Array.from(categories);
  }, [products]);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (selectedCategory !== "All") {
      filtered = filtered.filter((product) =>
        product.category?.name === selectedCategory
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.title.toLowerCase().includes(term) ||
          product.description.toLowerCase().includes(term) ||
          product.category?.name.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  return (
    <div className="space-y-16 py-12 sm:py-16">
      <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Products
          </h1>
          <p className="max-w-2xl text-lg text-white/85">
            Browse our complete selection of renovation packages and services
            designed to transform your home.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col gap-10">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setSelectedCategory("All")}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                  selectedCategory === "All"
                    ? "border-amber bg-amber/10 text-navy"
                    : "border-slate-200 text-slate-600 hover:border-ocean hover:text-ocean"
                }`}
              >
                All
              </button>
              {allCategories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                    selectedCategory === category
                      ? "border-amber bg-amber/10 text-navy"
                      : "border-slate-200 text-slate-600 hover:border-ocean hover:text-ocean"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products..."
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
            />
          </div>

          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {isLoading ? (
              <p className="col-span-full text-center text-slate-600">Loading products...</p>
            ) : filteredProducts.length === 0 ? (
              <p className="col-span-full text-center text-slate-600">
                {searchTerm || selectedCategory !== "All" ? "No products found matching your criteria." : "No products available yet."}
              </p>
            ) : (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-white/80">
            Let&apos;s create something amazing together. We handle everything from design
            to final walkthrough.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/quote" className="btn-primary">
              Get Free Estimate
            </Link>
            <a href="tel:4438529890" className="btn-secondary border-white/40 text-white">
              Call (443) 852-9890
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

ProductsPage.meta = {
  title: "Products | Kealee Construction",
  description: "Browse our complete selection of renovation packages and services.",
};

export default ProductsPage;
