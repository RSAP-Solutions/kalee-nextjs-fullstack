import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import type { NextPageWithMeta } from "../_app";

const mockActiveOrders = [
  {
    id: "ORD-1024",
    client: "James Carter",
    service: "Whole House Renovation",
    status: "In Progress",
    amount: "$185,000",
    updated: "2h ago",
  },
  {
    id: "ORD-1016",
    client: "Riley Chen",
    service: "Kitchen Remodel",
    status: "Awaiting Materials",
    amount: "$64,800",
    updated: "Today",
  },
  {
    id: "ORD-1009",
    client: "Sofia Patel",
    service: "ADA Accessibility",
    status: "Site Visit",
    amount: "$32,400",
    updated: "Yesterday",
  },
];

const mockTransactions = [
  {
    id: "TX-8895",
    client: "Marcus Hall",
    service: "Exterior Upgrade",
    amount: "$24,950",
    date: "Nov 18, 2025",
    method: "Wire",
  },
  {
    id: "TX-8879",
    client: "Priya Desai",
    service: "Home Addition",
    amount: "$142,300",
    date: "Nov 14, 2025",
    method: "ACH",
  },
  {
    id: "TX-8844",
    client: "Jamal Jenkins",
    service: "Tiny Home Build",
    amount: "$89,100",
    date: "Nov 08, 2025",
    method: "Credit",
  },
];

const profileDefaults = {
  logo: "/Kealee.png",
  contactEmail: "build@kealee.com",
  phone: "(443) 852-9890",
  addressLine1: "1220 19th St NW, Suite 200",
  addressLine2: "Washington, DC 20036",
};

const Dashboard: NextPageWithMeta = () => {
  const [profile, setProfile] = useState(profileDefaults);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  const handleProfileChange = (
    field: keyof typeof profileDefaults,
    value: string
  ) => {
    setProfile((prev) => ({ ...prev, [field]: value }));
    setSaveMessage(null);
  };

  const handleProfileSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaveMessage(
      "Changes staged locally. Connect the upcoming backend to persist updates."
    );
  };

  return (
    <AdminLayout>
      <div className="space-y-10">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Dashboard</h1>
          <p className="mt-2 text-slate-600">Overview and quick stats.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Total Products", value: 10 },
              { label: "Categories", value: 8 },
              { label: "Blog Posts", value: 12 },
              { label: "Gallery Items", value: 24 },
            ].map((s) => (
              <div key={s.label} className="stat-card">
                <p className="text-3xl font-bold text-ocean">{s.value}</p>
                <p className="text-sm text-slate-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <section className="rounded-2xl bg-white p-6 shadow-card">
            <header className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Active Orders
                </p>
                <p className="text-2xl font-semibold text-navy">
                  {mockActiveOrders.length} ongoing
                </p>
              </div>
              <span className="rounded-full bg-amber/20 px-3 py-1 text-xs font-semibold text-amber">
                Mock data
              </span>
            </header>
            <div className="mt-6 space-y-4">
              {mockActiveOrders.map((order) => (
                <div
                  key={order.id}
                  className="rounded-xl border border-slate-100 px-4 py-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-500">
                        {order.id}
                      </p>
                      <p className="text-base font-semibold text-navy">
                        {order.client}
                      </p>
                      <p className="text-sm text-slate-500">{order.service}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-semibold text-navy">
                        {order.amount}
                      </p>
                      <p className="text-xs text-slate-400">Updated {order.updated}</p>
                      <span className="mt-2 inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-white p-6 shadow-card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                  Past Transactions
                </p>
                <p className="text-2xl font-semibold text-navy">Last 3</p>
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
                  {mockTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td className="py-3">
                        <p className="font-semibold text-navy">{tx.client}</p>
                        <p className="text-xs text-slate-400">{tx.id}</p>
                      </td>
                      <td className="py-3 text-slate-600">{tx.service}</td>
                      <td className="py-3 font-semibold text-tangerine">
                        {tx.amount}
                      </td>
                      <td className="py-3 text-slate-600">{tx.date}</td>
                      <td className="py-3">
                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {tx.method}
                        </span>
                      </td>
                    </tr>
                  ))}
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
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Frontend only – awaiting backend hookup
            </span>
          </div>

          <form className="mt-8 grid gap-6" onSubmit={handleProfileSubmit}>
            <div className="grid gap-4 md:grid-cols-[220px_1fr]">
              <div>
                <p className="text-sm font-semibold text-slate-600">Site Logo</p>
                <div className="mt-3 flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200 p-4 text-center">
                  <img
                    src={profile.logo}
                    alt="Current logo"
                    className="h-16 w-auto"
                  />
                  <button
                    type="button"
                    className="mt-3 rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                  >
                    Upload mock file
                  </button>
                  <p className="mt-2 text-xs text-slate-400">
                    File selection is disabled until backend storage is ready.
                  </p>
                </div>
              </div>
              <div className="grid gap-4">
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
              <button type="submit" className="btn-primary">
                Save mock changes
              </button>
              {saveMessage ? (
                <p className="text-sm font-semibold text-amber">{saveMessage}</p>
              ) : (
                <p className="text-sm text-slate-500">
                  No backend connected – values reset on refresh.
                </p>
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

export default Dashboard;
