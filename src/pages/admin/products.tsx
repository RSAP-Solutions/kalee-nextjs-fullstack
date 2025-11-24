import { useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, Column } from "@/components/admin/Table";
import type { NextPageWithMeta } from "../_app";
import { categories, products as productSeed } from "@/data/products";

type AdminProduct = {
  id: string;
  title: string;
  price: number;
  category: string;
  status: "Active" | "Draft";
};

type ProductFormState = {
  title: string;
  price: string;
  category: string;
  status: "Active" | "Draft";
  description: string;
};

const initialProducts: AdminProduct[] = productSeed.map((product) => ({
  id: product.id,
  title: product.title,
  price: product.price,
  category: product.category,
  status: "Active",
}));

const emptyProductForm: ProductFormState = {
  title: "",
  price: "0",
  category: categories[1]?.slug ?? "energy",
  status: "Draft",
  description: "",
};

const ProductsAdmin: NextPageWithMeta = () => {
  const [productRows, setProductRows] = useState<AdminProduct[]>(initialProducts);
  const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
  const [formState, setFormState] = useState<ProductFormState>(emptyProductForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null);

  const categoryOptions = useMemo(() => categories.filter((c) => c.slug !== "all"), []);

  const columns: Column<AdminProduct>[] = [
    { header: "Title", accessor: "title" },
    {
      header: "Price",
      accessor: (row) => (
        <span className="font-semibold text-navy">
          ${row.price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      header: "Category",
      accessor: (row) => {
        const category = categoryOptions.find((cat) => cat.slug === row.category);
        return category?.name ?? row.category;
      },
    },
    { header: "Status", accessor: "status" },
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
    setFormState(emptyProductForm);
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEdit = (row: AdminProduct) => {
    setModalMode("edit");
    setSelectedProduct(row);
    setFormState({
      title: row.title,
      price: row.price.toString(),
      category: row.category,
      status: row.status,
      description: "Mock product description.",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormState(emptyProductForm);
    setSelectedProduct(null);
  };

  const handleFormChange = <T extends keyof ProductFormState>(field: T, value: ProductFormState[T]) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsedPrice = parseFloat(formState.price) || 0;
    const payload: AdminProduct = {
      id: selectedProduct?.id ?? crypto.randomUUID(),
      title: formState.title.trim() || "Untitled Product",
      price: parsedPrice,
      category: formState.category,
      status: formState.status,
    };

    setProductRows((prev) => {
      if (modalMode === "edit" && selectedProduct) {
        return prev.map((product) => (product.id === selectedProduct.id ? payload : product));
      }
      return [payload, ...prev];
    });
    closeModal();
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    setProductRows((prev) => prev.filter((product) => product.id !== deleteTarget.id));
    setDeleteTarget(null);
  };

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Products</h1>
          <p className="text-sm text-slate-600">
            Create, update, and stage products before wiring up the backend. Changes persist only for this session.
          </p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          New Product
        </button>
      </div>

      <AdminTable<AdminProduct> columns={columns} data={productRows} />

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 px-4 py-8">
          <div className="w-full max-w-3xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-amber">
                  {modalMode === "create" ? "Add Product" : "Edit Product"}
                </p>
                <h2 className="text-2xl font-semibold text-navy">
                  {modalMode === "create" ? "Create a new product" : formState.title}
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
              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-600">
                  Product Title
                  <input
                    type="text"
                    value={formState.title}
                    onChange={(event) => handleFormChange("title", event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    placeholder="Energy Starter Pack"
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-600">
                  Price (USD)
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formState.price}
                    onChange={(event) => handleFormChange("price", event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    placeholder="1500"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-600">
                  Category
                  <select
                    value={formState.category}
                    onChange={(event) => handleFormChange("category", event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category.id} value={category.slug}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-600">
                  Status
                  <select
                    value={formState.status}
                    onChange={(event) =>
                      handleFormChange("status", event.target.value as "Active" | "Draft")
                    }
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    <option value="Active">Active</option>
                    <option value="Draft">Draft</option>
                  </select>
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-slate-600">
                Short Description
                <textarea
                  rows={4}
                  value={formState.description}
                  onChange={(event) => handleFormChange("description", event.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  placeholder="Highlight the project scope, deliverables, and ideal customer fit."
                />
              </label>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="btn-primary">
                  {modalMode === "create" ? "Save Product" : "Update Product"}
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
            <h3 className="text-xl font-semibold text-navy">Delete Product?</h3>
            <p className="mt-2 text-sm text-slate-600">
              “{deleteTarget.title}” will be removed from this mock list. This action only affects your current session.
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

ProductsAdmin.meta = {
  title: "Admin Products | Kealee",
  description: "Manage products.",
};

export default ProductsAdmin;
