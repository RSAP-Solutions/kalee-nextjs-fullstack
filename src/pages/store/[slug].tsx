import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import type { NextPageWithMeta } from "@/pages/_app";
import { getProductBySlug, products } from "@/data/products";
import { addToCart } from "@/utils/cart";
import { Facebook, Twitter } from "lucide-react";

const ProductDetail: NextPageWithMeta = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [quantity, setQuantity] = useState(1);

  const product = slug && typeof slug === "string" ? getProductBySlug(slug) : null;

  if (!product) {
    return (
      <div className="min-h-screen py-16">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-navy">Product Not Found</h1>
          <p className="mt-4 text-slate-600">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/store" className="btn-primary mt-6">
            Browse All Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Optional: Show a toast notification
    alert(`${product.title} added to cart!`);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out ${product.title} at Kealee Construction!`;

  // Get related products (same category, excluding current)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto w-full">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-slate-600">
          <Link href="/store" className="hover:text-amber">
            Store
          </Link>
          <span className="mx-2">/</span>
          <span className="text-navy">{product.title}</span>
        </nav>

        {/* Product Details */}
        <div className="mb-16 grid gap-8 lg:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <div className="text-center">
                  <div className="mx-auto mb-4 h-32 w-32 rounded-full border-4 border-slate-400"></div>
                  <p className="text-slate-500">No Image Available</p>
                </div>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl font-semibold text-navy sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-3xl font-bold text-tangerine">
              ${product.price.toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>

            {/* Quantity Selector */}
            <div className="mt-6">
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-navy"
              >
                Quantity
              </label>
              <div className="mt-2 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <input
                  id="quantity"
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="h-10 w-20 rounded-lg border border-slate-300 text-center text-sm font-semibold text-navy focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                />
                <button
                  type="button"
                  onClick={() => handleQuantityChange(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition-colors hover:bg-slate-50"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={handleBuyNow}
                className="btn-primary flex-1 whitespace-nowrap"
              >
                <span className="mx-2">—</span>
                BUY NOW
                <span className="mx-2">—</span>
              </button>
              <button
                onClick={handleAddToCart}
                className="inline-flex flex-1 items-center justify-center rounded-md bg-amber px-5 py-3 font-semibold text-navy shadow-lg shadow-orange-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-amber/90 whitespace-nowrap"
              >
                <span className="mx-2">—</span>
                ADD TO CART
                <span className="mx-2">—</span>
              </button>
            </div>

            {/* Share Options */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-semibold text-navy">Share:</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-navy transition-colors hover:bg-slate-50"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-navy transition-colors hover:bg-slate-50"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            {/* Product Description */}
            <div className="mt-8">
              <h2 className="mb-3 text-lg font-semibold text-navy">
                Description
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-semibold text-navy">
              You May Also Like
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  href={`/store/${relatedProduct.slug}`}
                  className="group card overflow-hidden transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                    {relatedProduct.image ? (
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-slate-200">
                        <div className="text-center">
                          <div className="mx-auto mb-2 h-12 w-12 rounded-full border-2 border-slate-400"></div>
                          <p className="text-xs text-slate-500">No Image</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-base font-semibold text-navy group-hover:text-amber transition-colors">
                      {relatedProduct.title}
                    </h3>
                    <p className="mt-2 text-lg font-bold text-tangerine">
                      $
                      {relatedProduct.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

ProductDetail.meta = {
  title: "Product | Kealee Construction Store",
  description: "View product details and add to cart.",
};

export default ProductDetail;

