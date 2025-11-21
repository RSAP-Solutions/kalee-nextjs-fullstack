import Link from "next/link";
import Image from "next/image";

const services = [
  { label: "Home Additions", href: "/services/home-additions" },
  {
    label: "Kitchen & Bathroom",
    href: "/services/kitchen-bathroom-renovation",
  },
  {
    label: "Whole House Renovation",
    href: "/services/whole-house-renovation",
  },
  { label: "ADA Accessibility", href: "/services/ada-accessibility" },
  { label: "Tiny Homes & ADU", href: "/services/tiny-homes-adu" },
  { label: "Energy & Smart Home", href: "/services/energy-smart-home" },
  {
    label: "Exterior & Outdoor Living",
    href: "/services/exterior-outdoor-living",
  },
  { label: "Emergency Repair", href: "/services/emergency-repair" },
];

const supportLinks = [
  { label: "Request a Quote", href: "/quote" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Consultation Services", href: "/consultation-services" },
  { label: "Blog & Resources", href: "/blog" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Kealee", href: "/contact" },
];

const serviceAreas = [
  "Washington, DC",
  "Prince George’s County, MD",
  "Montgomery County, MD",
  "Southern Maryland",
  "Northern Virginia",
  "Baltimore & Surrounding Areas",
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto w-full max-w-content px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr,1fr,1fr]">
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/Kealee.png"
                alt="Kealee Construction"
                width={180}
                height={48}
                className="h-12 w-auto"
              />
              <span className="sr-only">Kealee Construction</span>
            </Link>
            <p className="text-slate-200">
              Licensed general contractor specializing in high-quality
              residential construction, renovations, and custom additions across
              the DMV region.
            </p>
            <div className="space-y-2 text-sm text-slate-300">
              <p>License #: MHIC #123456 • DC #7654321</p>
              <p>24/7 Emergency Response • Fully Insured & Bonded</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="tel:4438529890"
                className="btn-primary bg-amber text-navy hover:bg-amber/90"
              >
                Call (443) 852-9890
              </a>
              <Link href="/quote" className="btn-secondary">
                Request a Quote
              </Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-amber">Services</h4>
            <ul className="mt-4 grid gap-2 text-sm text-slate-200">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="transition-colors hover:text-amber"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <h4 className="text-lg font-semibold text-amber">Explore</h4>
              <ul className="mt-4 grid gap-2 text-sm text-slate-200">
                {supportLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="transition-colors hover:text-amber"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold text-amber">
                Service Areas
              </h4>
              <ul className="mt-4 grid gap-2 text-sm text-slate-200">
                {serviceAreas.map((area) => (
                  <li key={area}>{area}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-sm text-slate-400">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {new Date().getFullYear()} Kealee Construction. All rights
              reserved.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link className="hover:text-amber" href="/privacy-policy">
                Privacy Policy
              </Link>
              <Link className="hover:text-amber" href="/terms-of-service">
                Terms of Service
              </Link>
              <Link className="hover:text-amber" href="/sitemap">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
