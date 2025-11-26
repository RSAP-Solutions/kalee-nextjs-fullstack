import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import type { AdminSession } from "@/types/admin";
import { fetchSession, logout } from "@/utils/adminAuth";

const adminLinks = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Gallery", href: "/admin/gallery" },
  { label: "Blogs", href: "/admin/blogs" },
  { label: "Categories", href: "/admin/categories" },
  { label: "Products", href: "/admin/products" },
];

type AdminLayoutProps = {
  children: ReactNode;
  session?: AdminSession;
};

export default function AdminLayout({ children, session: initialSession }: AdminLayoutProps) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AdminSession | null>(initialSession ?? null);

  useEffect(() => {
    let cancelled = false;

    if (initialSession) {
      setUser(initialSession);
      setReady(true);
      return () => {
        cancelled = true;
      };
    }

    const ensureSession = async () => {
      try {
        const session = await fetchSession();
        if (cancelled) return;

        if (!session) {
          router.replace("/admin");
          return;
        }

        setUser(session);
        setReady(true);
      } catch (error) {
        console.error("[AdminLayout] Failed to load session", error);
        if (!cancelled) {
          router.replace("/admin");
        }
      }
    };

    ensureSession();

    return () => {
      cancelled = true;
    };
  }, [initialSession, router]);

  if (!ready) {
    return (
      <div className="min-h-screen p-8 text-center text-slate-600">Loading…</div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto flex w-full max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-24 rounded-xl bg-white p-4 shadow-card">
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase text-slate-500">Admin</p>
              <p className="mt-1 text-sm font-semibold text-navy">{user?.username}</p>
            </div>
            <nav className="grid gap-1">
              {adminLinks.map((l) => {
                const active = router.pathname === l.href;
                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`rounded-md px-3 py-2 text-sm font-semibold transition-colors ${
                      active
                        ? "bg-amber text-navy"
                        : "text-slate-700 hover:bg-slate-100 hover:text-navy"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
            </nav>
            <button
              onClick={async () => {
                try {
                  await logout();
                } catch (error) {
                  console.error("[AdminLayout] Logout failed", error);
                } finally {
                  router.replace("/admin");
                }
              }}
              className="mt-4 w-full rounded-md border border-slate-200 px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100"
            >
              Logout
            </button>
          </div>
        </aside>
        <main className="flex-1">
          <div className="rounded-xl bg-white p-6 shadow-card">{children}</div>
        </main>
      </div>
    </div>
  );
}
