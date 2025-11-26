import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, Column } from "@/components/admin/Table";
import type { NextPageWithMeta } from "../_app";
import { GalleryItemStatus, type GalleryItemPayload, type GalleryItemResponse } from "@/types/gallery";
import { format } from "date-fns";

type TableRow = {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  id?: string;
  title: string;
  description: string;
  location: string;
  coverImage: string;
  imageUrls: string[];
  tags: string;
  status: GalleryItemStatus;
};

const emptyForm: FormState = {
  title: "",
  description: "",
  location: "",
  coverImage: "",
  imageUrls: [],
  tags: "",
  status: GalleryItemStatus.DRAFT,
};

const columns: Column<TableRow>[] = [
  { header: "Title", accessor: "title" },
  { header: "Status", accessor: "status" },
  { header: "Created", accessor: "createdAt" },
  { header: "Updated", accessor: "updatedAt" },
];

const mapToRow = (item: GalleryItemResponse): TableRow => ({
  id: item.id,
  title: item.title,
  status: item.status === GalleryItemStatus.PUBLISHED ? "Published" : "Draft",
  createdAt: format(new Date(item.createdAt), "MMM d, yyyy"),
  updatedAt: format(new Date(item.updatedAt), "MMM d, yyyy"),
});

const GalleryAdmin: NextPageWithMeta = () => {
  const [items, setItems] = useState<GalleryItemResponse[]>([]);
  const [formState, setFormState] = useState<FormState>(emptyForm);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/gallery");
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data as { error?: string })?.error ?? "Failed to load gallery");
      }
      const data = (await response.json()) as GalleryItemResponse[];
      setItems(data);
    } catch (err: any) {
      console.error("[admin.gallery.fetch]", err);
      setError(err?.message ?? "Failed to load gallery");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchItems();
  }, [fetchItems]);

  const openCreateModal = () => {
    setFormState(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItemResponse) => {
    setFormState({
      id: item.id,
      title: item.title,
      description: item.description,
      location: item.location ?? "",
      coverImage: item.coverImage ?? "",
      imageUrls: item.imageUrls,
      tags: item.tags.join(", "),
      status: item.status,
    });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (key: keyof FormState, value: string | GalleryItemStatus) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleImageUrlsChange = (value: string) => {
    const urls = value
      .split("\n")
      .map((url) => url.trim())
      .filter(Boolean);
    setFormState((prev) => ({ ...prev, imageUrls: urls }));
  };

  const buildPayload = (): GalleryItemPayload => ({
    title: formState.title.trim(),
    description: formState.description.trim(),
    location: formState.location.trim() || undefined,
    coverImage: formState.coverImage.trim() || undefined,
    imageUrls: formState.imageUrls,
    tags: formState.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    status: formState.status,
    publishedAt:
      formState.status === GalleryItemStatus.PUBLISHED
        ? new Date().toISOString()
        : null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    try {
      const payload = buildPayload();
      const isEdit = Boolean(formState.id);

      const response = await fetch("/api/admin/gallery", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...(isEdit ? { id: formState.id } : {}), ...payload }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data as { error?: string })?.error ?? "Failed to save gallery item");
      }

      await fetchItems();
      closeModal();
    } catch (err: any) {
      console.error("[admin.gallery.save]", err);
      setError(err?.message ?? "Failed to save gallery item");
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const cancelDelete = () => setDeleteId(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`/api/admin/gallery?id=${deleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error((data as { error?: string })?.error ?? "Failed to delete gallery item");
      }
      await fetchItems();
      setDeleteId(null);
    } catch (err: any) {
      console.error("[admin.gallery.delete]", err);
      setError(err?.message ?? "Failed to delete gallery item");
    }
  };

  const tableRows = useMemo(() => items.map(mapToRow), [items]);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Gallery</h1>
          <p className="text-slate-600">Manage published projects that appear on the public gallery page.</p>
        </div>
        <button className="btn-primary" onClick={openCreateModal}>
          New Item
        </button>
      </div>

      {error && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <AdminTable<TableRow>
        columns={[...columns,
          {
            header: "Actions",
            accessor: (row) => (
              <div className="flex flex-wrap gap-2">
                <button className="btn-secondary" onClick={() => openEditModal(items.find((item) => item.id === row.id)!)}>
                  Edit
                </button>
                <button className="btn-tertiary" onClick={() => confirmDelete(row.id)}>
                  Delete
                </button>
              </div>
            ),
          },
        ]}
        data={tableRows}
        loading={isLoading}
      />

      {isModalOpen && (
        <div className="fixed inset-0 z-40 flex min-h-full justify-center overflow-y-auto bg-slate-950/60 px-4 py-28">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl modal-pop">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-navy">
                  {formState.id ? "Edit gallery item" : "New gallery item"}
                </h2>
                <p className="text-sm text-slate-500">
                  Add image URLs for your gallery project.
                </p>
              </div>
              <button type="button" className="text-sm text-slate-500 hover:text-navy" onClick={closeModal}>
                Close
              </button>
            </div>

            <form className="mt-6 grid gap-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-navy">
                  Title
                  <input
                    type="text"
                    value={formState.title}
                    onChange={(event) => handleInputChange("title", event.target.value)}
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    required
                  />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-navy">
                  Location
                  <input
                    type="text"
                    value={formState.location}
                    onChange={(event) => handleInputChange("location", event.target.value)}
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    placeholder="e.g. Washington, DC"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-navy">
                Description
                <textarea
                  value={formState.description}
                  onChange={(event) => handleInputChange("description", event.target.value)}
                  className="min-h-[140px] rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  required
                />
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-navy">
                  Cover image URL
                  <input
                    type="url"
                    value={formState.coverImage}
                    onChange={(event) => handleInputChange("coverImage", event.target.value)}
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    placeholder="https://"
                    required
                  />
                  <p className="text-xs text-slate-500">
                    Paste a direct image URL (e.g., from Unsplash, or elsewhere).
                  </p>
                </label>
                <label className="grid gap-2 text-sm font-semibold text-navy">
                  Tags (comma separated)
                  <input
                    type="text"
                    value={formState.tags}
                    onChange={(event) => handleInputChange("tags", event.target.value)}
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    placeholder="Renovation, Kitchen"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-navy">
                Additional images
                <textarea
                  value={formState.imageUrls.join("\n")}
                  onChange={(event) => handleImageUrlsChange(event.target.value)}
                  className="min-h-[120px] rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  placeholder="Paste one image URL per line."
                />
                <p className="text-sm text-slate-500">
                  Add image URLs for your gallery project (one per line). These will appear in the public gallery.
                </p>
                {formState.imageUrls.length > 0 && (
                  <span className="text-xs text-slate-500">
                    {formState.imageUrls.length} image{formState.imageUrls.length === 1 ? "" : "s"} attached
                  </span>
                )}
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-navy">
                  Status
                  <select
                    value={formState.status}
                    onChange={(event) => handleInputChange("status", event.target.value as GalleryItemStatus)}
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    <option value={GalleryItemStatus.DRAFT}>Draft (hidden)</option>
                    <option value={GalleryItemStatus.PUBLISHED}>Published (visible)</option>
                  </select>
                </label>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button type="submit" className="btn-primary" disabled={isSaving}>
                  {isSaving ? "Saving…" : formState.id ? "Save changes" : "Create item"}
                </button>
                <button type="button" className="btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4 py-8">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-xl">
            <h3 className="text-lg font-semibold text-navy">Delete gallery item?</h3>
            <p className="mt-2 text-sm text-slate-600">
              This will permanently remove the item from the gallery.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button className="btn-tertiary" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-primary bg-red-600 hover:bg-red-500" onClick={handleDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

GalleryAdmin.meta = {
  title: "Admin Gallery | Kealee",
  description: "Manage gallery items.",
};

export default GalleryAdmin;
