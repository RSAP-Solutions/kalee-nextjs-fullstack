import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, Column } from "@/components/admin/Table";
import type { NextPageWithMeta } from "../_app";

type Row = { id: number; name: string; slug: string; products: number };

const rows: Row[] = [
  { id: 1, name: "Energy Upgrades", slug: "energy", products: 3 },
  { id: 2, name: "HVAC Services", slug: "hvac", products: 1 },
];

const columns: Column<Row>[] = [
  { header: "ID", accessor: "id" },
  { header: "Name", accessor: "name" },
  { header: "Slug", accessor: "slug" },
  { header: "Products", accessor: "products" },
];

const CategoriesAdmin: NextPageWithMeta = () => {
  return (
    <AdminLayout>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Categories</h1>
          <p className="text-slate-600">Manage product categories.</p>
        </div>
        <button className="btn-primary">New Category</button>
      </div>
      <AdminTable<Row> columns={columns} data={rows} />
    </AdminLayout>
  );
};

CategoriesAdmin.meta = {
  title: "Admin Categories | Kealee",
  description: "Manage categories.",
};

export default CategoriesAdmin;
