import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, Column } from "@/components/admin/Table";
import type { NextPageWithMeta } from "../_app";

type Row = { id: number; title: string; author: string; status: string; createdAt: string };

const rows: Row[] = [
  { id: 1, title: "Energy Upgrades 101", author: "Team Kealee", status: "Published", createdAt: "2025-09-20" },
  { id: 2, title: "Choosing the Right Contractor", author: "Team Kealee", status: "Draft", createdAt: "2025-10-02" },
];

const columns: Column<Row>[] = [
  { header: "ID", accessor: "id" },
  { header: "Title", accessor: "title" },
  { header: "Author", accessor: "author" },
  { header: "Status", accessor: "status" },
  { header: "Created", accessor: "createdAt" },
];

const BlogsAdmin: NextPageWithMeta = () => {
  return (
    <AdminLayout>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Blogs</h1>
          <p className="text-slate-600">Manage blog posts.</p>
        </div>
        <button className="btn-primary">New Post</button>
      </div>
      <AdminTable<Row> columns={columns} data={rows} />
    </AdminLayout>
  );
};

BlogsAdmin.meta = {
  title: "Admin Blogs | Kealee",
  description: "Manage blogs.",
};

export default BlogsAdmin;
