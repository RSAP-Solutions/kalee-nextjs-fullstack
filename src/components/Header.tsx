import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Bars3Icon, XMarkIcon, PhoneIcon } from "@heroicons/react/24/outline";
import { ShoppingCart } from "lucide-react";
import { useCartCount } from "@/hooks/useCartCount";
import { useSiteProfile } from "@/context/SiteProfileContext";
import { formatPhoneHref } from "@/types/siteProfile";

type NavLink = {
  label: string;
  href: string;
  children?: Array<{ label: string; href: string; description?: string }>;
};

const primaryLinks: NavLink[] = [
  // { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
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
    ],
  },
  { label: "Financing", href: "/financing" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Blog", href: "/blog-listing" },
  { label: "FAQ", href: "/faq" },
  // { label: "Contact", href: "/contact" },
];

const mobileCTA = [
  { label: "Request a Quote", href: "/quote" },
  { label: "Financing Options", href: "/financing" },
];

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const cartCount = useCartCount();
  const { logoUrl, phone } = useSiteProfile();

  const logoSrc = useMemo(() => {
    const raw = (logoUrl ?? "").trim();
    if (!raw) return "/Kealee.png";
    if (raw.startsWith("http")) return raw;
    if (raw.startsWith("/")) return raw;
    return `/${raw.replace(/^[\/]+/, "")}`;
  }, [logoUrl]);

  const phoneLabel = phone?.trim() || "(443) 852-9890";
  const phoneHref = formatPhoneHref(phoneLabel) ?? "tel:4438529890";

  const isActive = (href: string) => {
    if (href === "/") {
      return router.pathname === href;
    }
    return router.pathname.startsWith(href);
  };

  return (
    <header className="bg-navy text-white shadow-header sticky top-0 z-50">
      <div className="mx-auto w-full max-w-content px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6 py-4">
          <Link href="/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={logoSrc}
              alt="Kealee Construction"
              className="h-12 w-auto"
            />
            <span className="sr-only">Kealee Construction</span>
          </Link>

          <nav className="hidden flex-1 items-center lg:flex">
            <ul className="mx-auto flex items-center justify-center gap-6 text-sm font-medium uppercase tracking-wide">
              {primaryLinks.map((link) => {
                const active = isActive(link.href);
                const isServices = link.label === "Services" && link.children;

                if (!isServices) {
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className={`transition-colors hover:text-amber ${
                          active ? "text-amber" : "text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                }

                return (
                  <li key={link.href} className="group relative">
                    <Link
                      href={link.href}
                      className={`flex items-center gap-2 transition-colors hover:text-amber ${
                        active ? "text-amber" : "text-white"
                      }`}
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {link.label}
                    </Link>
                    <div className="invisible absolute left-1/2 top-10 z-40 w-72 -translate-x-1/2 rounded-2xl bg-white p-4 text-left opacity-0 shadow-xl transition-all duration-200 group-hover:visible group-hover:opacity-100">
                      <div className="grid gap-2 text-sm text-slate-700">
                        {link.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="rounded-lg px-3 py-2 font-semibold text-navy transition-colors hover:bg-slate-100 hover:text-amber"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="flex items-center gap-4">
              <a
                href={phoneHref}
                className="flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold text-white transition-colors hover:border-white/40 hover:bg-white/10"
              >
                <PhoneIcon className="h-4 w-4" />
                <span>{phoneLabel}</span>
              </a>
              <Link href="/store" className="btn-secondary whitespace-nowrap">
                Store Front
              </Link>
              <Link
                href="/cart"
                className="relative rounded-md border border-white/20 p-2 text-white transition-colors hover:border-white/40 hover:bg-white/10"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber text-xs font-bold text-navy">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </nav>

          <button
            type="button"
            className="rounded-md border border-white/20 p-2 text-white lg:hidden"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden">
          <div className="space-y-6 border-t border-white/10 bg-navy/95 px-4 py-6 sm:px-6">
            <div className="flex flex-col gap-4">
              {primaryLinks.map((link) => {
                const active = isActive(link.href);
                const isServices = link.children;

                if (!isServices) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`text-base font-semibold transition-colors hover:text-amber ${
                        active ? "text-amber" : "text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                }

                return (
                  <div key={link.href} className="space-y-3">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between rounded-lg bg-white/10 px-3 py-2 text-left text-base font-semibold text-white"
                      onClick={() => setServicesOpen((prev) => !prev)}
                    >
                      <span>{link.label}</span>
                      <span className="text-sm font-medium text-amber">
                        {servicesOpen ? "Hide" : "View"}
                      </span>
                    </button>
                    {servicesOpen && (
                      <div className="space-y-2 border-l border-white/10 pl-4">
                        {link.children?.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm font-medium text-white/90 hover:text-amber"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="space-y-3 border-t border-white/10 pt-6">
              <a
                href={phoneHref}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                <PhoneIcon className="h-5 w-5" />
                <span>{phoneLabel}</span>
              </a>
              {mobileCTA.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15"
                >
                  {cta.label}
                </Link>
              ))}
              <Link
                href="/store"
                onClick={() => setMobileOpen(false)}
                className="block rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                Store Front
              </Link>
              <Link
                href="/cart"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 rounded-lg bg-white/10 px-4 py-3 text-sm font-semibold text-white hover:bg-white/15"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Shopping Cart</span>
                {cartCount > 0 && (
                  <span className="ml-auto rounded-full bg-amber px-2 py-1 text-xs font-bold text-navy">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
