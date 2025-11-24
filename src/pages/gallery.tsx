import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from "@heroicons/react/24/outline";
import type { NextPageWithMeta } from "./_app";
import {
  galleryFilters,
  galleryProjects,
  type GalleryItem,
} from "@/data/gallery";

const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDAwJyBoZWlnaHQ9JDI1MCcgZmlsbD0nI0VCREVGNycgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzI1MCcgcng9JzE2Jy8+PHRleHQgeD0nMjAwJyB5PScxMjUnIGZvbnQtc2l6ZT0nNDAnIGZpbGw9JyM4MDg4OTAnIHRleHQtYW5jaG9yPSdtaWRkbGUnPkdhbGxlcnk8L3RleHQ+PC9zdmc+";

type GalleryCardProps = {
  project: GalleryItem;
  onSelect: () => void;
};

const GalleryCard = ({ project, onSelect }: GalleryCardProps) => (
  <article
    role="button"
    tabIndex={0}
    onClick={onSelect}
    onKeyDown={(event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        onSelect();
      }
    }}
    className="mb-6 break-inside-avoid cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber"
  >
    <div className="relative h-56 w-full bg-slate-100">
      <Image
        src={project.image ?? placeholderImage}
        alt={project.title}
        fill
        className="object-cover"
        sizes="(min-width: 1024px) 400px, 100vw"
        unoptimized
      />
    </div>
    <div className="space-y-3 px-6 py-5">
      <h3 className="text-lg font-semibold text-navy">{project.title}</h3>
      <p className="text-sm text-slate-600">{project.description}</p>
      <p className="text-sm font-medium text-slate-500">
        <span className="font-semibold text-navy">Location:</span> {project.location}
      </p>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-ocean"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </article>
);

const GalleryPage: NextPageWithMeta = () => {
  const [activeFilter, setActiveFilter] = useState<string>(galleryFilters[0]);
  const [selectedProject, setSelectedProject] = useState<GalleryItem | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "All") {
      return galleryProjects;
    }
    return galleryProjects.filter((project) =>
      project.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase())
    );
  }, [activeFilter]);

  const selectedImages = selectedProject
    ? selectedProject.images?.length
      ? selectedProject.images
      : selectedProject.image
      ? [selectedProject.image]
      : [placeholderImage]
    : [];

  const slideCount = selectedImages.length || 1;

  const closeModal = () => setSelectedProject(null);

  const goNext = useCallback(() => {
    if (!selectedProject) return;
    setActiveSlide((prev) => (prev + 1) % slideCount);
  }, [selectedProject, slideCount]);

  const goPrev = useCallback(() => {
    if (!selectedProject) return;
    setActiveSlide((prev) => (prev - 1 + slideCount) % slideCount);
  }, [selectedProject, slideCount]);

  useEffect(() => {
    if (selectedProject) {
      setActiveSlide(0);
      document.body.style.overflow = "hidden";
      const handleKey = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          closeModal();
        } else if (event.key === "ArrowRight") {
          goNext();
        } else if (event.key === "ArrowLeft") {
          goPrev();
        }
      };
      window.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKey);
      };
    }
    document.body.style.overflow = "";
  }, [selectedProject, goNext, goPrev]);

  return (
    <div className="space-y-16 py-12 sm:py-16">
      <section className="relative -mx-4 overflow-hidden rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-20 text-white sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
          <h1 className="text-3xl font-bold leading-tight sm:text-5xl">
            Project Gallery
          </h1>
          <p className="max-w-2xl text-lg text-white/85">
            Explore recent renovations, additions, and specialty projects built for
            homeowners across the Washington DC, Maryland, and Northern Virginia
            region.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col gap-10">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {galleryFilters.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors duration-150 ${
                    isActive
                      ? "border-amber bg-amber/10 text-navy"
                      : "border-slate-200 text-slate-600 hover:border-ocean hover:text-ocean"
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {filteredProjects.map((project) => (
              <GalleryCard
                key={project.title}
                project={project}
                onSelect={() => setSelectedProject(project)}
              />
            ))}
          </div>

          <p className="text-center text-sm text-slate-600">
            <strong className="font-semibold text-navy">Note:</strong> Replace these
            placeholders with photos of your completed projects by updating the
            image sources in <code className="font-mono text-xs">galleryProjects</code>.
          </p>
        </div>
      </section>

      <section className="rounded-3xl bg-gradient-to-r from-ocean via-navy to-slate-850 px-4 py-16 text-white sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-content flex-col items-center gap-6 text-center">
          <h2 className="text-3xl font-semibold sm:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-white/80">
            Let’s create something amazing together. We handle everything from design
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

      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow focus:outline-none focus:ring-2 focus:ring-amber"
              aria-label="Close gallery"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>

            <div className="grid gap-6 p-6 lg:grid-cols-[3fr_2fr]">
              <div className="space-y-4">
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={selectedImages[activeSlide] ?? placeholderImage}
                    alt={`${selectedProject.title} photo ${activeSlide + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 60vw, 100vw"
                  />
                  {slideCount > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow hover:bg-white"
                        aria-label="Previous photo"
                      >
                        <ChevronLeftIcon className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-slate-700 shadow hover:bg-white"
                        aria-label="Next photo"
                      >
                        <ChevronRightIcon className="h-5 w-5" />
                      </button>
                    </>
                  )}
                </div>

                {slideCount > 1 && (
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {selectedImages.map((image, index) => {
                      const isActive = index === activeSlide;
                      return (
                        <button
                          key={image}
                          type="button"
                          onClick={() => setActiveSlide(index)}
                          className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border-2 ${
                            isActive ? "border-amber" : "border-transparent"
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`${selectedProject.title} thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="112px"
                          />
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber">
                    {selectedProject.tags.join(" • ")}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-navy">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-3 text-slate-600">{selectedProject.description}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-sm font-semibold text-slate-500">Location</p>
                  <p className="text-lg font-semibold text-navy">
                    {selectedProject.location}
                  </p>
                </div>
                <div className="mt-auto flex flex-wrap gap-3">
                  <Link href="/quote" className="btn-primary">
                    Request Similar Project
                  </Link>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="btn-secondary"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

GalleryPage.meta = {
  title: "Project Gallery | Kealee Construction",
  description:
    "Browse kitchen remodels, home additions, ADA upgrades, tiny homes, and energy efficiency projects completed by Kealee Construction.",
};

export default GalleryPage;
