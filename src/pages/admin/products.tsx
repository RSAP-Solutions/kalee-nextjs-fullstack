import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, Column } from "@/components/admin/Table";
import type { NextPageWithMeta } from "../_app";

type Row = { id: number; title: string; price: string; category: string; status: string };

const rows: Row[] = [
  { id: 1, title: "Energy Starter Pack", price: "$1,500.00", category: "Energy Upgrades", status: "Active" },
  { id: 2, title: "Green Home Combo", price: "$7,200.00", category: "Energy Upgrades", status: "Active" },
];

const columns: Column<Row>[] = [
  { header: "ID", accessor: "id" },
  { header: "Title", accessor: "title" },
  { header: "Price", accessor: "price" },
  { header: "Category", accessor: "category" },
  { header: "Status", accessor: "status" },
];

const ProductsAdmin: NextPageWithMeta = () => {
  return (
    <AdminLayout>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Products</h1>
          <p className="text-slate-600">Manage products offered in the store.</p>
        </div>
        <button className="btn-primary">New Product</button>
      </div>
      <AdminTable<Row> columns={columns} data={rows} />
    </AdminLayout>
  );
};

ProductsAdmin.meta = {
  title: "Admin Products | Kealee",
  description: "Manage products.",
};

export default ProductsAdmin;
