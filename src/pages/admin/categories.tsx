import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, Column } from "@/components/admin/Table";
import type { AdminSession } from "@/types/admin";
import { withAdminGuard } from "@/server/auth/adminSession";
import type { NextPageWithMeta } from "@/pages/_app";

type CategoryResponse = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  productCount: number;
  imageUrl?: string | null;
  imageUrlPreview?: string | null;
};

type ProductResponse = {
  id: string;
  title: string;
  slug: string;
  category: { id: string; name: string; slug: string } | null;
};

type AdminCategoryRow = {
  id: string;
  name: string;
  slug: string;
  productIds: string[];
  imageUrl: string | null;
  imageUrlPreview: string | null;
};

type FormState = {
  name: string;
  slug: string;
  description: string;
  productIds: string[];
  imageUrl: string | null;
};

const emptyForm: FormState = {
  name: "",
  slug: "",
  description: "",
  productIds: [],
  imageUrl: null,
};

type CategoriesAdminProps = {
  session: AdminSession;
};

const CategoriesAdmin: NextPageWithMeta<CategoriesAdminProps> = ({ session }) => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formState, setFormState] = useState<FormState>(() => ({ ...emptyForm }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"create" | "edit">("create");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<AdminCategoryRow | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [existingImagePreview, setExistingImagePreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [shouldRemoveImage, setShouldRemoveImage] = useState(false);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("[admin.categories] Fetching data...");
      const [categoryRes, productRes] = await Promise.all([
        fetch("/api/admin/categories"),
        fetch("/api/products"),
      ]);

      if (!categoryRes.ok) {
        const errorText = await categoryRes.text();
        console.error("[admin.categories.fetch] Response error:", errorText);
        throw new Error(`Failed to load categories (${categoryRes.status})`);
      }

      if (!productRes.ok) {
        const errorText = await productRes.text();
        console.error("[admin.categories.fetch] Products response error:", errorText);
        throw new Error(`Failed to load products (${productRes.status})`);
      }

      const categoryData: CategoryResponse[] = await categoryRes.json();
      const productData: ProductResponse[] = await productRes.json();

      console.log("[admin.categories] Loaded categories:", categoryData.length);
      setCategories(categoryData);
      setProducts(productData);
    } catch (err: unknown) {
      console.error("[admin.categories.fetch]", err);
      const message = err instanceof Error ? err.message : "Failed to load data";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchData();
  }, [fetchData]);

  const categoryRows = useMemo<AdminCategoryRow[]>(() => {
    return categories.map((category) => {
      const productIds = products
        .filter((product) => product.category?.id === category.id)
        .map((product) => product.id);

      return {
        id: category.id,
        name: category.name,
        slug: category.slug,
        productIds,
        imageUrl: category.imageUrl ?? null,
        imageUrlPreview: category.imageUrlPreview ?? null,
      };
    });
  }, [categories, products]);

  const productOptions = useMemo(() => products, [products]);

  const openCreateModal = useCallback(() => {
    setModalMode("create");
    setEditingId(null);
    setFormState(() => ({ ...emptyForm }));
    setImageFile(null);
    setImagePreview(null);
    setExistingImagePreview(null);
    setShouldRemoveImage(false);
    setIsUploading(false);
    setIsModalOpen(true);
  }, []);

  const handleEdit = useCallback(
    (row: AdminCategoryRow) => {
      const category = categories.find((item) => item.id === row.id);
      setModalMode("edit");
      setEditingId(row.id);
      setFormState({
        name: category?.name ?? "",
        slug: category?.slug ?? "",
        description: category?.description ?? "",
        productIds: row.productIds,
        imageUrl: category?.imageUrl ?? null,
      });
      setImageFile(null);
      setImagePreview(null);
      setExistingImagePreview(category?.imageUrlPreview ?? null);
      setShouldRemoveImage(false);
      setIsUploading(false);
      setIsModalOpen(true);
    },
    [categories],
  );

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setFormState(() => ({ ...emptyForm }));
    setEditingId(null);
    setImageFile(null);
    setImagePreview(null);
    setExistingImagePreview(null);
    setShouldRemoveImage(false);
    setIsUploading(false);
  }, []);

  const handleFormChange = useCallback(
    <K extends keyof FormState>(field: K, value: FormState[K]) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    [],
  );

  const handleImageChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    event.target.value = "";

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    setError(null);
    setImageFile(file);
    setShouldRemoveImage(false);
    setExistingImagePreview(null);

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleRemoveImage = useCallback(() => {
    setImageFile(null);
    setImagePreview(null);
    setExistingImagePreview(null);
    setFormState((prev) => ({ ...prev, imageUrl: null }));
    setShouldRemoveImage(true);
  }, []);

  const uploadImageToS3 = useCallback(async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const s3Key = `categories/category-${timestamp}-${sanitizedFileName}`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", s3Key);
    formData.append("contentType", file.type);

    try {
      const uploadResponse = await fetch("/api/admin/s3/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorText = await uploadResponse.text();
        console.error("[admin.categories] Image upload error response:", errorText);
        throw new Error(errorText || `Upload failed with status ${uploadResponse.status}`);
      }

      const data: { key?: string } = await uploadResponse.json();
      const uploadedKey = data?.key ?? s3Key;
      console.log("[admin.categories] Image uploaded successfully with key:", uploadedKey);
      return uploadedKey;
    } catch (error) {
      console.error("[admin.categories] Image upload failed:", error);
      throw new Error("UPLOAD_CATEGORY_IMAGE");
    }
  }, []);

  const syncProductAssignments = useCallback(
    async (categoryId: string, selectedProductIds: string[]) => {
      const currentlyAssigned = products
        .filter((product) => product.category?.id === categoryId)
        .map((product) => product.id);

      const toAssign = selectedProductIds.filter((productId) => !currentlyAssigned.includes(productId));
      const toUnassign = currentlyAssigned.filter((productId) => !selectedProductIds.includes(productId));

      const updateCategoryForProduct = async (productId: string, categoryValue: string) => {
        const response = await fetch("/api/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: productId, categoryId: categoryValue }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error ?? "Failed to update product assignments");
        }
      };

      for (const productId of toAssign) {
        await updateCategoryForProduct(productId, categoryId);
      }

      for (const productId of toUnassign) {
        await updateCategoryForProduct(productId, "");
      }
    },
    [products],
  );

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setIsSaving(true);
      setError(null);

      const trimmedName = formState.name.trim();
      const derivedName = trimmedName || "Untitled Category";
      const baseSlug =
        formState.slug.trim() ||
        derivedName
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      const slug = baseSlug || `category-${Date.now()}`;
      const description = formState.description.trim();
      let imageKey: string | null = formState.imageUrl?.trim() || null;

      if (shouldRemoveImage) {
        imageKey = null;
      }

      if (imageFile) {
        try {
          setIsUploading(true);
          imageKey = await uploadImageToS3(imageFile);
        } catch (uploadError) {
          console.error("[admin.categories] Category image upload failed", uploadError);
          setError("Failed to upload category image. Please try again.");
          setIsSaving(false);
          setIsUploading(false);
          return;
        } finally {
          setIsUploading(false);
        }
      }

      const payload = {
        name: derivedName,
        slug,
        description: description || null,
        imageUrl: imageKey,
      };

      try {
        console.log("[admin.categories] Submitting form, mode:", modalMode);
        let categoryId = editingId;

        if (modalMode === "create") {
          console.log("[admin.categories] Creating category...");
          const response = await fetch("/api/admin/categories", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("[admin.categories.save] Response error:", errorText);
            throw new Error(`Failed to save category (${response.status})`);
          }

          console.log("[admin.categories] Category created successfully");
          const created: CategoryResponse = await response.json();
          categoryId = created.id;
        } else if (editingId) {
          console.log("[admin.categories] Updating category:", editingId);
          const response = await fetch("/api/admin/categories", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: editingId, ...payload }),
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("[admin.categories.save] Response error:", errorText);
            throw new Error(`Failed to update category (${response.status})`);
          }

          console.log("[admin.categories] Category updated successfully");
        }

        if (categoryId) {
          await syncProductAssignments(categoryId, formState.productIds);
        }

        await fetchData();
        closeModal();
      } catch (err: unknown) {
        console.error("[admin.categories.save]", err);
        const message = err instanceof Error ? err.message : "Failed to save category";
        setError(message);
      } finally {
        setIsSaving(false);
        setIsUploading(false);
      }
    },
    [
      closeModal,
      editingId,
      fetchData,
      formState,
      modalMode,
      imageFile,
      shouldRemoveImage,
      uploadImageToS3,
      syncProductAssignments,
    ],
  );

  const handleDelete = useCallback(async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    setError(null);

    try {
      console.log("[admin.categories] Deleting category:", deleteTarget.id);
      
      // First, remove category from all products
      await syncProductAssignments(deleteTarget.id, []);

      const response = await fetch(`/api/admin/categories?id=${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[admin.categories.delete] Response error:", errorText);
        throw new Error(`Failed to delete category (${response.status})`);
      }

      console.log("[admin.categories] Category deleted successfully");
      await fetchData();
      setDeleteTarget(null);
    } catch (err: unknown) {
      console.error("[admin.categories.delete]", err);
      const message = err instanceof Error ? err.message : "Failed to delete category";
      setError(message);
    } finally {
      setIsDeleting(false);
    }
  }, [deleteTarget, fetchData, syncProductAssignments]);

  const columns: Column<AdminCategoryRow>[] = useMemo(
    () => [
      { header: "Name", accessor: "name" },
      { header: "Slug", accessor: "slug" },
      {
        header: "Products",
        accessor: (row) => <span className="font-semibold text-navy">{row.productIds.length}</span>,
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
    ],
    [handleEdit],
  );

  return (
    <AdminLayout session={session}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Categories</h1>
          <p className="text-sm text-slate-600">
            Manage product groupings backed by the live database. Updates immediately reflect across the store.
          </p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          New Category
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 whitespace-pre-line">
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white px-4 py-6 text-center text-sm text-slate-600">
          Loading categories…
        </div>
      ) : (
        <AdminTable<AdminCategoryRow> columns={columns} data={categoryRows} />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex min-h-full justify-center overflow-y-auto bg-slate-950/60 px-4 py-28">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl modal-pop">
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
                <label className="grid gap-2 text-sm font-semibold text-slate-600">
                  Description
                  <textarea
                    rows={3}
                    value={formState.description}
                    onChange={(event) => handleFormChange("description", event.target.value)}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 shadow-sm focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    placeholder="Optional: describe what fits in this category."
                  />
                </label>

                <div className="grid gap-2 text-sm font-semibold text-slate-600">
                  <span>Category Image</span>
                  <div className="space-y-4">
                    <div className="relative">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={isUploading}
                        className="absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:cursor-not-allowed"
                      />
                      <div className="w-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center transition-colors hover:bg-slate-100">
                        <div className="text-slate-600">
                          <svg
                            className="mx-auto h-12 w-12 text-slate-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                          >
                            <path
                              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          <p className="mt-2 text-sm font-medium">
                            {isUploading ? "Uploading…" : "Click or drag to upload image"}
                          </p>
                          <p className="text-xs text-slate-500">PNG, JPG, or WEBP recommended</p>
                        </div>
                      </div>
                    </div>

                    {(imagePreview || existingImagePreview) && (
                      <div className="relative w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                        <div className="relative aspect-video w-full">
                          <Image
                            src={imagePreview || existingImagePreview || ""}
                            alt="Category image preview"
                            fill
                            className="object-cover"
                            sizes="(min-width: 1024px) 400px, 100vw"
                            unoptimized
                          />
                        </div>
                        <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-500">
                          <span>{imageFile?.name ?? "Existing image"}</span>
                          <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="text-xs font-semibold text-red-500 hover:text-red-600"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-600">Assign Products</p>
                  <p className="text-xs text-slate-500">
                    Products selected here will be updated to point at this category.
                  </p>
                  <div className="mt-3 max-h-48 space-y-2 overflow-y-auto rounded-2xl border border-slate-100 p-3">
                    {productOptions.length === 0 ? (
                      <p className="text-xs text-slate-500">No products available yet.</p>
                    ) : (
                      productOptions.map((product) => {
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
                                const { checked: isChecked } = event.target;
                                setFormState((prev) => {
                                  const next = isChecked
                                    ? [...prev.productIds, product.id]
                                    : prev.productIds.filter((id) => id !== product.id);
                                  return { ...prev, productIds: next };
                                });
                              }}
                            />
                            <span>
                              {product.title}
                              {product.category?.slug && (
                                <span className="ml-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                                  {product.category.slug}
                                </span>
                              )}
                            </span>
                          </label>
                        );
                      })
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button type="submit" className="btn-primary" disabled={isSaving || isUploading}>
                    {isSaving || isUploading
                      ? isUploading
                        ? "Uploading image…"
                        : "Saving…"
                      : modalMode === "create"
                      ? "Save Category"
                      : "Update Category"}
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
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-950/60 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h3 className="text-xl font-semibold text-navy">Delete Category?</h3>
            <p className="mt-2 text-sm text-slate-600">
              “{deleteTarget.name}” will be removed. Products assigned to it will be unlinked first.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="btn-secondary"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-red-600 disabled:opacity-60"
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

export const getServerSideProps = withAdminGuard<CategoriesAdminProps>(async (_context, session) => ({
  props: { session },
}));

CategoriesAdmin.meta = {
  title: "Admin Categories | Kealee",
  description: "Manage categories.",
};

export default CategoriesAdmin;
