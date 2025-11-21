import Link from "next/link";
import Image from "next/image";
import type { NextPageWithMeta } from "./_app";
import {
  galleryFilters,
  galleryProjects,
  type GalleryItem,
} from "@/data/gallery";

const placeholderImage =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nNDAwJyBoZWlnaHQ9JDI1MCcgZmlsbD0nI0VCREVGNycgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nNDAwJyBoZWlnaHQ9JzI1MCcgcng9JzE2Jy8+PHRleHQgeD0nMjAwJyB5PScxMjUnIGZvbnQtc2l6ZT0nNDAnIGZpbGw9JyM4MDg4OTAnIHRleHQtYW5jaG9yPSdtaWRkbGUnPkdhbGxlcnk8L3RleHQ+PC9zdmc+";

const GalleryCard = ({ project }: { project: GalleryItem }) => (
  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-xl">
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
  </div>
);

const GalleryPage: NextPageWithMeta = () => (
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
          {galleryFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 transition-colors duration-150 hover:border-ocean hover:text-ocean"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {galleryProjects.map((project) => (
            <GalleryCard key={project.title} project={project} />
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
  </div>
);

GalleryPage.meta = {
  title: "Project Gallery | Kealee Construction",
  description:
    "Browse kitchen remodels, home additions, ADA upgrades, tiny homes, and energy efficiency projects completed by Kealee Construction.",
};

export default GalleryPage;
