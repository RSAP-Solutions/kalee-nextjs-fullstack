import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, Column } from "@/components/admin/Table";
import type { NextPageWithMeta } from "@/pages/_app";
import { BlogItemStatus, type BlogItemPayload, type BlogItemResponse } from "@/types/blog";
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
  content: string;
  excerpt: string;
  coverImage: string;
  author: string;
  tags: string;
  status: BlogItemStatus;
};

const emptyForm: FormState = {
  title: "",
  content: "",
  excerpt: "",
  coverImage: "",
  author: "",
  tags: "",
  status: BlogItemStatus.DRAFT,
};

const columns: Column<TableRow>[] = [
  { header: "Title", accessor: "title" },
  { header: "Status", accessor: "status" },
  { header: "Created", accessor: "createdAt" },
  { header: "Updated", accessor: "updatedAt" },
];

const normalizeTags = (tags: unknown): string[] => {
  if (Array.isArray(tags)) {
    return tags
      .map((tag) => (typeof tag === "string" ? tag : String(tag)))
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }

  return [];
};

const mapToRow = (item: BlogItemResponse): TableRow => ({
  id: item.id,
  title: item.title,
  status: item.status === BlogItemStatus.PUBLISHED ? "Published" : "Draft",
  createdAt: format(new Date(item.createdAt), "MMM d, yyyy"),
  updatedAt: format(new Date(item.updatedAt), "MMM d, yyyy"),
});

const BlogsAdmin: NextPageWithMeta = () => {
  const [items, setItems] = useState<BlogItemResponse[]>([]);
  const [formState, setFormState] = useState<FormState>(() => ({ ...emptyForm }));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [existingCoverPreview, setExistingCoverPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [shouldRemoveCover, setShouldRemoveCover] = useState(false);

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/blog");
      if (!response.ok) {
        const errorText = await response.text();
        console.error("[admin.blog.fetch] Response error:", errorText);
        const data = await response.json().catch(() => null);
        throw new Error((data as { error?: string })?.error ?? "Failed to load blog posts");
      }

      const data = (await response.json()) as Array<BlogItemResponse & { tags?: unknown }>;
      const normalized = data.map((item) => ({
        ...item,
        tags: normalizeTags(item.tags),
      }));
      setItems(normalized);
    } catch (err: unknown) {
      console.error("[admin.blog.fetch]", err);
      const message = err instanceof Error ? err.message : "Failed to load blog posts";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchItems();
  }, [fetchItems]);

  const openCreateModal = () => {
    setFormState(() => ({ ...emptyForm }));
    setCoverFile(null);
    setCoverPreview(null);
    setExistingCoverPreview(null);
    setShouldRemoveCover(false);
    setIsUploading(false);
    setIsModalOpen(true);
  };

  const openEditModal = (item: BlogItemResponse) => {
    setFormState({
      id: item.id,
      title: item.title,
      content: item.content,
      excerpt: item.excerpt ?? "",
      coverImage: item.coverImage ?? "",
      author: item.author ?? "",
      tags: normalizeTags(item.tags).join(", "),
      status: item.status,
    });
    setCoverFile(null);
    setCoverPreview(null);
    setExistingCoverPreview(item.coverImagePreview ?? null);
    setShouldRemoveCover(false);
    setIsUploading(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormState(() => ({ ...emptyForm }));
    setCoverFile(null);
    setCoverPreview(null);
    setExistingCoverPreview(null);
    setShouldRemoveCover(false);
    setIsUploading(false);
  };

  const handleInputChange = (key: keyof FormState, value: string | BlogItemStatus) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const handleCoverChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
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
    setCoverFile(file);
    setShouldRemoveCover(false);
    setExistingCoverPreview(null);

    const reader = new FileReader();
    reader.onload = () => {
      setCoverPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleRemoveCover = useCallback(() => {
    setCoverFile(null);
    setCoverPreview(null);
    setExistingCoverPreview(null);
    setShouldRemoveCover(true);
    setFormState((prev) => ({ ...prev, coverImage: "" }));
  }, []);

  const uploadCoverToS3 = useCallback(async (file: File): Promise<string> => {
    const timestamp = Date.now();
    const sanitized = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const s3Key = `blogs/blog-${timestamp}-${sanitized}`;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", s3Key);
    formData.append("contentType", file.type);

    const response = await fetch("/api/admin/s3/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("[admin.blog] Cover upload error:", errorText);
      throw new Error(errorText || `Upload failed with status ${response.status}`);
    }

    const data: { key?: string } = await response.json();
    return data?.key ?? s3Key;
  }, []);

  const buildPayload = (coverKey: string | null): BlogItemPayload => ({
    title: formState.title.trim(),
    content: formState.content.trim(),
    excerpt: formState.excerpt.trim() || undefined,
    coverImage: coverKey,
    author: formState.author.trim() || undefined,
    tags: formState.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    status: formState.status,
    publishedAt:
      formState.status === BlogItemStatus.PUBLISHED
        ? new Date().toISOString()
        : null,
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setError(null);
    let coverKey: string | null = formState.coverImage.trim() || null;

    if (shouldRemoveCover) {
      coverKey = null;
    }

    if (coverFile) {
      try {
        setIsUploading(true);
        coverKey = await uploadCoverToS3(coverFile);
      } catch (uploadError) {
        console.error("[admin.blog] Cover upload failed", uploadError);
        setError("Failed to upload cover image. Please try again.");
        setIsSaving(false);
        setIsUploading(false);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    try {
      const payload = buildPayload(coverKey);
      const isEdit = Boolean(formState.id);

      const response = await fetch("/api/admin/blog", {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...(isEdit ? { id: formState.id } : {}), ...payload }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[admin.blog.save] Response error:", errorText);
        throw new Error(`Failed to save blog post (${response.status})`);
      }

      await fetchItems();
      closeModal();
    } catch (err: unknown) {
      console.error("[admin.blog.save]", err);
      const message = err instanceof Error ? err.message : "Failed to save blog post";
      setError(message);
    } finally {
      setIsSaving(false);
      setIsUploading(false);
    }
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
  };

  const cancelDelete = () => setDeleteId(null);

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      const response = await fetch(`/api/admin/blog?id=${deleteId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error("[admin.blog.delete] Response error:", errorText);
        throw new Error(`Failed to delete blog post (${response.status})`);
      }
      await fetchItems();
      setDeleteId(null);
    } catch (err: unknown) {
      console.error("[admin.blog.delete]", err);
      const message = err instanceof Error ? err.message : "Failed to delete blog post";
      setError(message);
    }
  };

  const tableRows = useMemo(() => items.map(mapToRow), [items]);

  return (
    <AdminLayout>
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-navy">Blogs</h1>
          <p className="text-slate-600">Manage blog posts that appear on the public blog page.</p>
        </div>
        <button 
          className="btn-primary" 
          onClick={openCreateModal}
        >
          New Post
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
          <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl modal-pop">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-navy">
                  {formState.id ? "Edit blog post" : "New blog post"}
                </h2>
                <p className="text-sm text-slate-500">
                  Write your blog post content and manage publication settings.
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
                  Author
                  <input
                    type="text"
                    value={formState.author}
                    onChange={(event) => handleInputChange("author", event.target.value)}
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                    placeholder="e.g. John Doe"
                  />
                </label>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-navy">
                Excerpt
                <input
                  type="text"
                  value={formState.excerpt}
                  onChange={(event) => handleInputChange("excerpt", event.target.value)}
                  className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  placeholder="Brief summary of the post"
                />
              </label>

              <div className="grid gap-2 text-sm font-semibold text-navy">
                <span>Cover image</span>
                <div className="space-y-4">
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
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
                          {isUploading ? "Uploading…" : "Click or drag to upload cover image"}
                        </p>
                        <p className="text-xs text-slate-500">PNG, JPG, or WEBP recommended</p>
                      </div>
                    </div>
                  </div>

                  {(coverPreview || existingCoverPreview) && (
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                      <div className="relative aspect-video w-full">
                        <Image
                          src={coverPreview || existingCoverPreview || ""}
                          alt="Cover image preview"
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 600px, 100vw"
                          unoptimized
                        />
                      </div>
                      <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-500">
                        <span>{coverFile?.name ?? "Existing image"}</span>
                        <button
                          type="button"
                          onClick={handleRemoveCover}
                          className="text-xs font-semibold text-red-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <label className="grid gap-2 text-sm font-semibold text-navy">
                Content
                <textarea
                  value={formState.content}
                  onChange={(event) => handleInputChange("content", event.target.value)}
                  className="min-h-[300px] rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  placeholder="Write your blog post content here..."
                  required
                />
              </label>

              <label className="grid gap-2 text-sm font-semibold text-navy">
                Tags (comma separated)
                <input
                  type="text"
                  value={formState.tags}
                  onChange={(event) => handleInputChange("tags", event.target.value)}
                  className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  placeholder="Renovation, Kitchen, Tips"
                />
              </label>

              <div className="grid gap-6 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-navy">
                  Status
                  <select
                    value={formState.status}
                    onChange={(event) => handleInputChange("status", event.target.value as BlogItemStatus)}
                    className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
                  >
                    <option value={BlogItemStatus.DRAFT}>Draft (hidden)</option>
                    <option value={BlogItemStatus.PUBLISHED}>Published (visible)</option>
                  </select>
                </label>
              </div>

              <div className="mt-4 flex flex-wrap gap-3">
                <button type="submit" className="btn-primary" disabled={isSaving || isUploading}>
                  {isSaving || isUploading
                    ? isUploading
                      ? "Uploading image…"
                      : "Saving…"
                    : formState.id
                    ? "Save changes"
                    : "Create post"}
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
            <h3 className="text-lg font-semibold text-navy">Delete blog post?</h3>
            <p className="mt-2 text-sm text-slate-600">
              This will permanently remove the blog post.
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

BlogsAdmin.meta = {
  title: "Admin Blogs | Kealee",
  description: "Manage blog posts.",
};

export default BlogsAdmin;
