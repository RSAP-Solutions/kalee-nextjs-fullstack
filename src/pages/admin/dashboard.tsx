import AdminLayout from "@/components/admin/AdminLayout";
import type { NextPageWithMeta } from "../_app";

const Dashboard: NextPageWithMeta = () => {
  return (
    <AdminLayout>
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
    </AdminLayout>
  );
};

Dashboard.meta = {
  title: "Admin Dashboard | Kealee",
  description: "Admin overview.",
};

export default Dashboard;
