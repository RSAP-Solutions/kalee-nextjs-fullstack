//comment//

import { useEffect, useMemo, useState } from "react";
import { getProductRepository } from "@/server/db/client";
import { getS3PublicUrl } from "@/server/services/s3";
import Image from "next/image";
import Link from "next/link";
import type { NextPageWithMeta } from "@/pages/_app";
import { GetServerSideProps } from "next";

type ProductForPage = {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  imageUrl: string | null;
  imageUrls: string[];
  inStock: boolean;
  category: { id: string; name: string; slug: string } | null;
};

type ProductPageProps = {
  product: ProductForPage | null;
};

const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nODAwJyBoZWlnaHQ9JzQwMCcgZmlsbD0nI0VCREVGNycgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nODAwJyBoZWlnaHQ9JzQwMCcgcng9JzE2Jy8+PHRleHQgeD0nNDAwJyB5PScyMDAnIGZvbnQtc2l6ZT0nNDAnIGZpbGw9JyM4MDg4OTAnIHRleHQtYW5jaG9yPSdtaWRkbGcnPlByb2R1Y3Q8L3RleHQ+PC9zdmc+";

const ProductPage: NextPageWithMeta<ProductPageProps> = ({ product }) => {
  const galleryImages = useMemo(() => {
    if (!product) {
      return [placeholderImage];
    }

    const unique = new Set<string>();
    product.imageUrls.forEach((url) => {
      if (url) unique.add(url);
    });

    if (product.imageUrl) {
      unique.add(product.imageUrl);
    }

    const images = Array.from(unique);
    return images.length > 0 ? images : [placeholderImage];
  }, [product]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [galleryImages]);

  const displayImage = galleryImages[activeIndex] ?? placeholderImage;

  const hasMultipleImages = galleryImages.length > 1;

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-navy">Product Not Found</h1>
          <p className="mt-2 text-slate-600">The product you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/products" className="mt-4 inline-block btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-16 py-12 sm:py-16">
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col gap-12">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-12">
            <div className="lg:w-1/2 space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100">
                <Image
                  key={displayImage}
                  src={displayImage}
                  alt={product.title}
                  fill
                  className="object-cover transition-opacity duration-300"
                  sizes="(min-width: 1024px) 600px, 100vw"
                  unoptimized
                />
                {hasMultipleImages && (
                  <>
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous image"
                      className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow-md transition hover:bg-white"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 4.293a1 1 0 010 1.414L9.414 9l3.293 3.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next image"
                      className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-slate-700 shadow-md transition hover:bg-white"
                    >
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M7.293 4.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L10.586 9 7.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </>
                )}
                {!product.inStock && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
                    <span className="rounded-lg bg-slate-800 px-4 py-2 text-lg font-semibold text-white">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>

              {hasMultipleImages && (
                <div className="flex items-center justify-center gap-3">
                  {galleryImages.map((image, index) => (
                    <button
                      key={image}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`View image ${index + 1}`}
                      className={`relative h-16 w-16 overflow-hidden rounded-xl border transition ${
                        index === activeIndex
                          ? "border-ocean shadow-lg"
                          : "border-slate-200 hover:border-ocean/60"
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                        unoptimized
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="lg:w-1/2">
              <div className="space-y-6">
                <div>
                  <nav className="mb-4 text-sm text-slate-500">
                    <Link href="/products" className="hover:text-ocean">
                      Products
                    </Link>
                    <span className="mx-2">/</span>
                    <span className="text-slate-700">{product.title}</span>
                  </nav>
                  <h1 className="text-3xl font-bold text-navy sm:text-4xl lg:text-5xl">
                    {product.title}
                  </h1>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-ocean">
                    ${product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                    product.inStock 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                {product.category && (
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-slate-600">Category:</span>
                    <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                      {product.category.name}
                    </span>
                  </div>
                )}

                <div className="prose prose-slate max-w-none">
                  <p className="text-lg text-slate-600">{product.description}</p>
                </div>

                <div className="flex flex-wrap gap-4">
                  {product.inStock ? (
                    <Link href="/quote" className="btn-primary">
                      Get Free Quote
                    </Link>
                  ) : (
                    <button disabled className="btn-primary opacity-50 cursor-not-allowed">
                      Out of Stock
                    </button>
                  )}
                  <a href="tel:4438529890" className="btn-secondary">
                    Call (443) 852-9890
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-12">
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold text-navy mb-4">Project Details</h2>
                <div className="space-y-4 text-slate-600">
                  <p>
                    This comprehensive renovation package includes everything you need 
                    to transform your space. Our expert team handles all aspects of the 
                    project from start to finish.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Professional design consultation</li>
                    <li>High-quality materials and fixtures</li>
                    <li>Expert installation and craftsmanship</li>
                    <li>Project management and coordination</li>
                    <li>Final inspection and walkthrough</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-semibold text-navy mb-4">Why Choose Us</h2>
                <div className="space-y-4 text-slate-600">
                  <p>
                    With years of experience in home renovations, we bring expertise 
                    and attention to detail to every project. Our commitment to quality 
                    and customer satisfaction sets us apart.
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Licensed and insured professionals</li>
                    <li>Transparent pricing with no hidden fees</li>
                    <li>Timely project completion</li>
                    <li>Excellent customer reviews</li>
                    <li>Warranty on all workmanship</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-navy mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-slate-600 mb-6">
              Contact us today for a free consultation and estimate.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/quote" className="btn-primary">
                Get Free Estimate
              </Link>
              <a href="tel:4438529890" className="btn-secondary">
                Call (443) 852-9890
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<ProductPageProps> = async ({ params }) => {
  if (!params || typeof params.slug !== "string") {
    return { notFound: true };
  }

  try {
    const repo = await getProductRepository();
    const product = await repo.findOne({ 
      where: { slug: params.slug },
      relations: { category: true }
    });

    if (!product) {
      return { notFound: true };
    }

    const mappedImageUrls = (product.imageUrls ?? [])
      .map((url) => getS3PublicUrl(url) ?? url)
      .filter((url): url is string => Boolean(url));

    const normalized: ProductForPage = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: Number(product.price),
      description: product.description,
      imageUrl: getS3PublicUrl(product.imageUrl) ?? product.imageUrl ?? null,
      imageUrls: mappedImageUrls,
      inStock: product.inStock,
      category: product.category
        ? {
            id: product.category.id,
            name: product.category.name,
            slug: product.category.slug,
          }
        : null,
    };

    return {
      props: {
        product: normalized,
      },
    };
  } catch (error) {
    console.error("Error fetching product:", error);
    return { notFound: true };
  }
};

ProductPage.meta = {
  title: "Product | Kealee Construction",
  description: "Product details for Kealee Construction",
};

export default ProductPage;
