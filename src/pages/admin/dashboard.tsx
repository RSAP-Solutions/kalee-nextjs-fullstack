import { useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import type { AdminSession } from "@/types/admin";
import { withAdminGuard } from "@/server/auth/adminSession";
import type { NextPageWithMeta } from "@/pages/_app";

type DashboardData = {
  totals: {
    products: number;
    categories: number;
    orders: number;
    revenue: number;
  };
  activeOrders: Array<{
    id: string;
    customerName: string;
    status: string;
    totalAmount: number;
    updatedAt: string;
    headlineItem: string;
  }>;
  recentTransactions: Array<{
    id: string;
    customerName: string;
    totalAmount: number;
    date: string;
    method: string | null;
  }>;
};

const profileDefaults = {
  logoUrl: "/Kealee.png",
  contactEmail: "build@kealee.com",
  phone: "(443) 852-9890",
  addressLine1: "1220 19th St NW, Suite 200",
  addressLine2: "Washington, DC 20036",
};

type DashboardProps = {
  session: AdminSession;
};

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const Dashboard: NextPageWithMeta<DashboardProps> = ({ session }) => {
  const [profile, setProfile] = useState(profileDefaults);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadDashboard = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch("/api/admin/dashboard", {
          signal: controller.signal,
        });

        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error((payload as { error?: string })?.error ?? "Failed to load dashboard data");
        }

        const payload = (await response.json()) as DashboardData;
        setDashboardData(payload);
      } catch (fetchError: unknown) {
        if (controller.signal.aborted) return;
        console.error("[Dashboard]", fetchError);
        const message = fetchError instanceof Error ? fetchError.message : "Unexpected error while loading dashboard data";
        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadDashboard();

    const loadProfile = async () => {
      try {
        const response = await fetch("/api/admin/profile", {
          signal: controller.signal,
        });

        if (!response.ok) {
          // Silent fail on profile load or log it
          console.warn("Failed to load profile");
          return;
        }

        const data = await response.json();
        if (data) {
          setProfile({
            logoUrl: data.logoUrl ?? profileDefaults.logoUrl,
            contactEmail: data.contactEmail ?? profileDefaults.contactEmail,
            phone: data.phone ?? profileDefaults.phone,
            addressLine1: data.addressLine1 ?? profileDefaults.addressLine1,
            addressLine2: data.addressLine2 ?? profileDefaults.addressLine2,
          });
        }
      } catch (err) {
        // ignore aborts
        if ((err as Error).name !== "AbortError") {
          console.warn("[Dashboard] profile load error", err);
        }
      }
    };

    loadProfile();

    return () => controller.abort();
  }, []);

  const totals = dashboardData?.totals ?? { products: 0, categories: 0, orders: 0, revenue: 0 };

  const statCards = useMemo(
    () => {
      const cards: Array<{ label: string; value: string; helper?: string }> = [
        { label: "Total Products", value: totals.products.toLocaleString() },
        { label: "Categories", value: totals.categories.toLocaleString() },
        { label: "Orders", value: totals.orders.toLocaleString() },
        { label: "Gross Revenue", value: currencyFormatter.format(totals.revenue) },
      ];

      const phoneDisplay = profile.phone?.trim() || profileDefaults.phone;
      const emailDisplay = profile.contactEmail?.trim() || profileDefaults.contactEmail;
      cards.push({ label: "Primary Phone", value: phoneDisplay, helper: emailDisplay });

      return cards;
    },
    [profile.contactEmail, profile.phone, totals.categories, totals.orders, totals.products, totals.revenue],
  );

  const logoPreviewSrc = useMemo(() => {
    const raw = (profile.logoUrl ?? "").trim();
    if (!raw) return "/Kealee.png";
    if (raw.startsWith("http") || raw.startsWith("/")) return raw;
    return `/${raw.replace(/^[\/]+/, "")}`;
  }, [profile.logoUrl]);

  const trimmedLogo = (profile.logoUrl ?? "").trim();

  const handleProfileChange = (
    field: keyof typeof profileDefaults,
    value: string
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaveMessage(null);
  };

  const handleProfileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveMessage(null);
    setIsSavingProfile(true);

    try {
      const response = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });

      if (!response.ok) {
        const payload = await response.json().catch(() => ({}));
        throw new Error((payload as { error?: string })?.error ?? "Failed to update profile");
      }

      const payload = (await response.json()) as typeof profileDefaults;
      setProfile(payload);
      setSaveMessage("Profile updated successfully.");
    } catch (saveError: unknown) {
      console.error("[Dashboard][profile.submit]", saveError);
      const message = saveError instanceof Error ? saveError.message : "Failed to save profile.";
      setSaveMessage(message);
    } finally {
      setIsSavingProfile(false);
    }
  };

  return (
    <AdminLayout session={session}>
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Dashboard</h1>
          <p className="mt-2 text-slate-600">Overview and quick stats.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {statCards.map((card) => (
              <div key={card.label} className="stat-card">
                <p className="text-3xl font-bold text-ocean">{card.value}</p>
                <p className="text-sm text-slate-600">{card.label}</p>
                {card.helper && <p className="text-xs text-slate-400">{card.helper}</p>}
              </div>
            ))}
          </div>
          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-card">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Active Orders
                </p>
                <p className="text-2xl font-semibold text-navy">
                  {isLoading ? "Loading…" : `${dashboardData?.activeOrders.length ?? 0} ongoing`}
                </p>
              </div>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-600">
                Live data
              </span>
            </header>
            <div className="mt-6 space-y-4">
              {isLoading ? (
                <p className="text-sm text-slate-500">Loading orders…</p>
              ) : (dashboardData?.activeOrders.length ?? 0) === 0 ? (
                <p className="text-sm text-slate-500">No active orders at the moment.</p>
              ) : (
                dashboardData?.activeOrders.map((order) => (
                  <div
                    key={order.id}
                    className="rounded-xl border border-slate-100 px-4 py-3"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-500">{order.id}</p>
                        <p className="text-base font-semibold text-navy">{order.customerName}</p>
                        <p className="text-sm text-slate-500">{order.headlineItem}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-semibold text-navy">
                          {currencyFormatter.format(order.totalAmount)}
                        </p>
                        <p className="text-xs text-slate-400">
                          Updated {dateFormatter.format(new Date(order.updatedAt))}
                        </p>
                        <span className="mt-2 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                          {order.status.replace(/_/g, " ")}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Past Transactions
                </p>
                <p className="text-2xl font-semibold text-navy">Recent</p>
              </div>
            </div>
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs uppercase tracking-wide text-slate-400">
                    <th className="pb-3">Client</th>
                    <th className="pb-3">Service</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Date</th>
                    <th className="pb-3">Method</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {isLoading ? (
                    <tr>
                      <td className="py-4 text-center text-sm text-slate-500" colSpan={5}>
                        Loading transactions…
                      </td>
                    </tr>
                  ) : (dashboardData?.recentTransactions.length ?? 0) === 0 ? (
                    <tr>
                      <td className="py-4 text-center text-sm text-slate-500" colSpan={5}>
                        No recent transactions found.
                      </td>
                    </tr>
                  ) : (
                    dashboardData?.recentTransactions.map((tx) => (
                      <tr key={tx.id}>
                        <td className="py-3">
                          <p className="font-semibold text-navy">{tx.customerName}</p>
                          <p className="text-xs text-slate-400">{tx.id}</p>
                        </td>
                        <td className="py-3 text-slate-600">{tx.method ?? "—"}</td>
                        <td className="py-3 font-semibold text-tangerine">
                          {currencyFormatter.format(tx.totalAmount)}
                        </td>
                        <td className="py-3 text-slate-600">{dateFormatter.format(new Date(tx.date))}</td>
                        <td className="py-3">
                          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                            {tx.method ?? "N/A"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="rounded-2xl bg-white p-6 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Profile Management
              </p>
              <p className="text-2xl font-semibold text-navy">
                Branding & Contact Details
              </p>
            </div>
          </div>

          <form className="mt-8 grid gap-6" onSubmit={handleProfileSubmit}>
            <div className="grid gap-4 md:grid-cols-[220px_1fr]">
              <div>
                <p className="text-sm font-semibold text-slate-600">Site Logo</p>
                <div className="mt-3 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 p-4 text-center">
                  {/* eslint-disable @next/next/no-img-element */}
                  {trimmedLogo ? (
                    <img src={logoPreviewSrc} alt="Current logo" className="h-16 w-auto" />
                  ) : (
                    <>
                      <img src="/Kealee.png" alt="Default logo" className="h-16 w-auto" />
                      <span className="mt-2 text-xs text-slate-400">
                        Enter a public URL or project-relative path (e.g., Kealee.png)
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="grid gap-4">
                <label className="grid gap-1 text-sm font-semibold text-slate-600">
                  Logo URL
                  <input
                    type="text"
                    value={profile.logoUrl ?? ""}
                    onChange={(e) => handleProfileChange("logoUrl", e.target.value)}
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    placeholder="https://"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-slate-600">
                  Contact Email
                  <input
                    type="email"
                    value={profile.contactEmail}
                    onChange={(e) =>
                      handleProfileChange("contactEmail", e.target.value)
                    }
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-slate-600">
                  Phone Number
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => handleProfileChange("phone", e.target.value)}
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-slate-600">
                  Address Line 1
                  <input
                    type="text"
                    value={profile.addressLine1}
                    onChange={(e) =>
                      handleProfileChange("addressLine1", e.target.value)
                    }
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </label>
                <label className="grid gap-1 text-sm font-semibold text-slate-600">
                  Address Line 2
                  <input
                    type="text"
                    value={profile.addressLine2}
                    onChange={(e) =>
                      handleProfileChange("addressLine2", e.target.value)
                    }
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  />
                </label>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary" disabled={isSavingProfile}>
                {isSavingProfile ? "Saving…" : "Save Changes"}
              </button>
              {saveMessage && (
                <p className="text-sm font-semibold text-amber">{saveMessage}</p>
              )}
            </div>
          </form>
        </section>
      </div>
    </AdminLayout>
  );
};

Dashboard.meta = {
  title: "Admin Dashboard | Kealee",
  description: "Admin overview.",
};

export const getServerSideProps = withAdminGuard<DashboardProps>(async (_context, session) => ({
  props: { session },
}));

export default Dashboard;
