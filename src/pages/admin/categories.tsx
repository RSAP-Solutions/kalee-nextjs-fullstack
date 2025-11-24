import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, Column } from "@/components/admin/Table";
import type { NextPageWithMeta } from "../_app";
import { categories as baseCategories, products } from "@/data/products";

type AdminCategory = {
  id: string;
  name: string;
  slug: string;
  productIds: string[];
};

type FormState = {
  name: string;
  slug: string;
  productIds: string[];
};

const initialCategories: AdminCategory[] = baseCategories
  .filter((category) => category.slug !== "all")
  .map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    productIds: products
      .filter((product) => product.category === category.slug)
      .map((product) => product.id),
  }));

const emptyForm: FormState = {
  name: "",
  slug: "",
  productIds: [],
};

const CategoriesAdmin: NextPageWithMeta = () => {
  const [categoryRows, setCategoryRows] = useState<AdminCategory[]>(initialCategories);
  const [formState, setFormState] = useState<FormState>(emptyForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminCategory | null>(null);

  const productOptions = useMemo(() => products, []);

  const columns: Column<AdminCategory>[] = [
    { header: "Name", accessor: "name" },
    { header: "Slug", accessor: "slug" },
    {
      header: "Products",
      accessor: (row) => (
        <span className="font-semibold text-navy">{row.productIds.length}</span>
      ),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleEdit(row)}
            className="text-sm font-semibold text-ocean hover:text-amber"
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setDeleteTarget(row)}
            className="text-sm font-semibold text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const openCreateModal = () => {
    setModalMode("create");
    setEditingId(null);
    setFormState(emptyForm);
    setIsModalOpen(true);
  };

  const handleEdit = (row: AdminCategory) => {
    setModalMode("edit");
    setEditingId(row.id);
    setFormState({
      name: row.name,
      slug: row.slug,
      productIds: row.productIds,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormState(emptyForm);
    setEditingId(null);
  };

  const handleFormChange = (field: keyof FormState, value: string | string[]) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: AdminCategory = {
      id: editingId ?? crypto.randomUUID(),
      name: formState.name.trim() || "Untitled Category",
      slug:
        formState.slug.trim() ||
        formState.name.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      productIds: formState.productIds,
    };

    setCategoryRows((prev) => {
      if (modalMode === "edit" && editingId) {
        return prev.map((category) => (category.id === editingId ? payload : category));
      }
      return [payload, ...prev];
    });
    closeModal();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setCategoryRows((prev) => prev.filter((category) => category.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Categories</h1>
          <p className="text-sm text-slate-600">
            Manage product groupings and assign mock products. Data resets on refresh until the backend is ready.
          </p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          New Category
        </button>
      </div>

      <AdminTable<AdminCategory> columns={columns} data={categoryRows} />

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 px-4 py-8">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber">
                  {modalMode === "create" ? "Create" : "Edit"} Category
                </p>
                <h2 className="text-2xl font-semibold text-navy">
                  {modalMode === "create" ? "Add new category" : formState.name}
                </h2>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="text-sm font-semibold text-slate-500 hover:text-slate-700"
              >
                Close
              </button>
            </div>

            <form className="mt-6 grid gap-5" onSubmit={handleSubmit}>
              <label className="grid gap-2 text-sm font-semibold text-slate-600">
                Category Name
                <input
                  type="text"
                  value={formState.name}
                  onChange={(event) => handleFormChange("name", event.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  placeholder="Kitchen Renovations"
                />
              </label>
              <label className="grid gap-2 text-sm font-semibold text-slate-600">
                Slug
                <input
                  type="text"
                  value={formState.slug}
                  onChange={(event) => handleFormChange("slug", event.target.value)}
                  className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  placeholder="kitchen-renovations"
                />
              </label>

              <div>
                <p className="text-sm font-semibold text-slate-600">Assign Products</p>
                <p className="text-xs text-slate-500">
                  Select which mock products belong in this category. (Frontend only)
                </p>
                <div className="mt-3 max-h-48 space-y-2 overflow-y-auto rounded-2xl border border-slate-100 p-3">
                  {productOptions.map((product) => {
                    const checked = formState.productIds.includes(product.id);
                    return (
                      <label
                        key={product.id}
                        className="flex items-center gap-3 rounded-xl px-2 py-1 text-sm font-medium text-slate-700 hover:bg-slate-50"
                      >
                        <input
                          type="checkbox"
                          className="h-4 w-4 rounded border-slate-300 text-amber focus:ring-amber"
                          checked={checked}
                          onChange={(event) => {
                            const { checked } = event.target;
                            setFormState((prev) => {
                              const next = checked
                                ? [...prev.productIds, product.id]
                                : prev.productIds.filter((id) => id !== product.id);
                              return { ...prev, productIds: next };
                            });
                          }}
                        />
                        <span>
                          {product.title}
                          <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                            {product.category}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="btn-primary">
                  {modalMode === "create" ? "Save Category" : "Update Category"}
                </button>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Mock data only
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h3 className="text-xl font-semibold text-navy">Delete Category?</h3>
            <p className="mt-2 text-sm text-slate-600">
              “{deleteTarget.name}” will be removed from this mock list. This action is local to your browser.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

CategoriesAdmin.meta = {
  title: "Admin Categories | Kealee",
  description: "Manage categories.",
};

export default CategoriesAdmin;
