import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, Column } from "@/components/admin/Table";
import type { NextPageWithMeta } from "../_app";

type Row = { id: number; title: string; status: string; createdAt: string };

const rows: Row[] = [
  { id: 1, title: "Attic Insulation", status: "Published", createdAt: "2025-10-01" },
  { id: 2, title: "Kitchen Remodel", status: "Draft", createdAt: "2025-10-15" },
];

const columns: Column<Row>[] = [
  { header: "ID", accessor: "id" },
  { header: "Title", accessor: "title" },
  { header: "Status", accessor: "status" },
  { header: "Created", accessor: "createdAt" },
];

const GalleryAdmin: NextPageWithMeta = () => {
  return (
    <AdminLayout>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Gallery</h1>
          <p className="text-slate-600">Manage gallery items.</p>
        </div>
        <button className="btn-primary">New Item</button>
      </div>
      <AdminTable<Row> columns={columns} data={rows} />
    </AdminLayout>
  );
};

GalleryAdmin.meta = {
  title: "Admin Gallery | Kealee",
  description: "Manage gallery items.",
};

export default GalleryAdmin;
