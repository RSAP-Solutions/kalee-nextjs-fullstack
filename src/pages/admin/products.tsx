import { useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, Column } from "@/components/admin/Table";
import type { NextPageWithMeta } from "@/pages/_app";

type CategoryOption = {
  id: string;
  name: string;
  slug: string;
};

type ProductResponse = {
  id: string;
  title: string;
  slug: string;
  price: number;
  description: string;
  imageUrl?: string | null;
  inStock: boolean;
  category: { id: string; name: string; slug: string } | null;
};

type ProductRow = {
  id: string;
  title: string;
  price: number;
  categoryId: string | null;
  categoryName: string;
  status: "Active" | "Draft";
};

type ProductFormState = {
  title: string;
  slug: string;
  price: string;
  categoryId: string;
  status: "Active" | "Draft";
  description: string;
};

const emptyForm: ProductFormState = {
  title: "",
  slug: "",
  price: "0",
  categoryId: "",
  status: "Draft",
  description: "",
};

const ProductsAdmin: NextPageWithMeta = () => {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [categories, setCategories] = useState<CategoryOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [formState, setFormState] = useState<ProductFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ProductRow | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("[admin.products] Fetching data...");
      const [productRes, categoryRes] = await Promise.all([
        fetch("/api/admin/products"),
        fetch("/api/categories"),
      ]);

      if (!productRes.ok) {
        const errorText = await productRes.text();
        console.error("[admin.products.fetch] Response error:", errorText);
        throw new Error(`Failed to load products (${productRes.status})`);
      }

      if (!categoryRes.ok) {
        const errorText = await categoryRes.text();
        console.error("[admin.products.fetch] Categories response error:", errorText);
        throw new Error(`Failed to load categories (${categoryRes.status})`);
      }

      const productData: ProductResponse[] = await productRes.json();
      const categoryData: CategoryOption[] = await categoryRes.json();

      console.log("[admin.products] Loaded products:", productData.length);
      setProducts(productData);
      setCategories(categoryData);
    } catch (err: unknown) {
      console.error("[admin.products.fetch]", err);
      const message = err instanceof Error ? err.message : "Failed to load data";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const productRows = useMemo<ProductRow[]>(() => {
    return products.map((product) => ({
      id: product.id,
      title: product.title,
      price: Number(product.price) || 0,
      categoryId: product.category?.id ?? null,
      categoryName: product.category?.name ?? "Unassigned",
      status: product.inStock ? "Active" : "Draft",
    }));
  }, [products]);

  const categoryOptions = useMemo(() => categories, [categories]);

  const openCreateModal = useCallback(() => {
    setModalMode("create");
    setEditingId(null);
    setFormState(() => ({
      ...emptyForm,
      categoryId: categoryOptions[0]?.id ?? "",
    }));
    setIsModalOpen(true);
  }, [categoryOptions]);

  const handleEdit = useCallback(
    (row: ProductRow) => {
      const product = products.find((item) => item.id === row.id);
      if (!product) return;

      setModalMode("edit");
      setEditingId(row.id);
      setFormState({
        title: product.title,
        slug: product.slug,
        price: product.price.toString(),
        categoryId: product.category?.id ?? "",
        status: product.inStock ? "Active" : "Draft",
        description: product.description ?? "",
      });
      setIsModalOpen(true);
    },
    [products],
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setFormState(emptyForm);
    setEditingId(null);
  }, []);

  const handleFormChange = useCallback(
    <K extends keyof ProductFormState>(field: K, value: ProductFormState[K]) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSaving(true);
      setError(null);

      const derivedTitle = formState.title.trim() || "Untitled Product";
      const priceValue = Number(formState.price);
      const derivedSlug =
        formState.slug.trim() ||
        derivedTitle
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      const slug = derivedSlug || `product-${Date.now()}`;

      if (!Number.isFinite(priceValue) || priceValue < 0) {
        setError("Price must be a positive number");
        setIsSaving(false);
        return;
      }

      const description = formState.description.trim();
      const payload = {
        title: derivedTitle,
        slug,
        price: priceValue,
        description: description || "",
        inStock: formState.status === "Active",
        imageUrl: null,
        categoryId: formState.categoryId,
      };

      try {
        console.log("[admin.products] Submitting form, mode:", modalMode);
        if (modalMode === "create") {
          console.log("[admin.products] Creating product...");
          const response = await fetch("/api/admin/products", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("[admin.products.save] Response error:", errorText);
            throw new Error(`Failed to save product (${response.status})`);
          }

          console.log("[admin.products] Product created successfully");
        } else {
          console.log("[admin.products] Updating product:", editingId);
          const response = await fetch("/api/admin/products", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editingId, ...payload }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("[admin.products.save] Response error:", errorText);
            throw new Error(`Failed to update product (${response.status})`);
          }

          console.log("[admin.products] Product updated successfully");
        }

        await fetchData();
        closeModal();
      } catch (err: unknown) {
        console.error("[admin.products.save]", err);
        const message = err instanceof Error ? err.message : "Failed to save product";
        setError(message);
      } finally {
        setIsSaving(false);
      }
    },
    [modalMode, editingId, formState, fetchData, closeModal]
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setError(null);

    try {
      console.log("[admin.products] Deleting product:", deleteTarget.id);
      const response = await fetch(`/api/admin/products?id=${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[admin.products.delete] Response error:", errorText);
        throw new Error(`Failed to delete product (${response.status})`);
      }

      console.log("[admin.products] Product deleted successfully");
      await fetchData();
      setDeleteTarget(null);
    } catch (err: unknown) {
      console.error("[admin.products.delete]", err);
      const message = err instanceof Error ? err.message : "Failed to delete product";
      setError(message);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTarget, fetchData]);

  const columns: Column<ProductRow>[] = useMemo(
    () => [
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
        accessor: (row) => row.categoryName,
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
    ],
    [handleEdit],
  );

  return (
    <AdminLayout>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Products</h1>
          <p className="text-sm text-slate-600">
            Manage live products tied to your database. Updates reflect immediately in the store.
          </p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          New Product
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-600">
          Loading products…
        </div>
      ) : (
        <AdminTable<ProductRow> columns={columns} data={productRows} />
      )}

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
                  Slug
                  <input
                    type="text"
                    value={formState.slug}
                    onChange={(event) => handleFormChange("slug", event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    placeholder="energy-starter-pack"
                  />
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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
                <label className="grid gap-2 text-sm font-semibold text-slate-600">
                  Category
                  <select
                    value={formState.categoryId}
                    onChange={(event) => handleFormChange("categoryId", event.target.value)}
                    className="rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    <option value="">Unassigned</option>
                    {categoryOptions.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
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
                <div className="grid gap-2 text-sm font-semibold text-slate-600">
                  <span>Description</span>
                  <textarea
                    rows={4}
                    value={formState.description}
                    onChange={(event) => handleFormChange("description", event.target.value)}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    placeholder="Highlight the project scope, deliverables, and ideal customer fit."
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" className="btn-primary" disabled={isSaving}>
                  {isSaving ? "Saving…" : modalMode === "create" ? "Save Product" : "Update Product"}
                </button>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Changes save to the database
                </p>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteTarget && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <h3 className="text-lg font-semibold text-navy">Delete product?</h3>
            <p className="mt-2 text-sm text-slate-600">
              This will permanently remove the product.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button className="btn-tertiary" onClick={() => setDeleteTarget(null)}>
                Cancel
              </button>
              <button
                className="btn-primary bg-red-600 hover:bg-red-500"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting…" : "Delete"}
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
