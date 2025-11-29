import { useCallback, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import AdminLayout from "@/components/admin/AdminLayout";
import { AdminTable, type Column } from "@/components/admin/Table";
import type { NextPageWithMeta } from "@/pages/_app";
import type { QuoteRequestResponse, QuoteRequestStatus } from "@/types/quote";
import { useNotifications } from "@/providers/NotificationProvider";

const STATUS_OPTIONS: QuoteRequestStatus[] = ["new", "in_review", "scheduled", "closed"];

const STATUS_LABELS: Record<QuoteRequestStatus, string> = {
  new: "New",
  in_review: "In Review",
  scheduled: "Scheduled",
  closed: "Closed",
};

const statusBadgeClass = (status: QuoteRequestStatus) => {
  switch (status) {
    case "new":
      return "bg-emerald-100 text-emerald-700 ring-emerald-200";
    case "in_review":
      return "bg-amber/20 text-amber-600 ring-amber/30";
    case "scheduled":
      return "bg-ocean/15 text-ocean ring-ocean/30";
    case "closed":
      return "bg-slate-100 text-slate-600 ring-slate-200";
    default:
      return "bg-slate-100 text-slate-600";
  }
};

type TableRow = {
  id: string;
  name: string;
  contact: string;
  service: string;
  timeline: string;
  createdAt: string;
  status: QuoteRequestStatus;
};

const QuotesAdminPage: NextPageWithMeta = () => {
  const [items, setItems] = useState<QuoteRequestResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<QuoteRequestStatus | "all">("all");
  const [selected, setSelected] = useState<QuoteRequestResponse | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const { notify } = useNotifications();

  const fetchQuotes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filterStatus !== "all") {
        params.set("status", filterStatus);
      }
      const response = await fetch(`/api/admin/quotes${params.toString() ? `?${params.toString()}` : ""}`);
      if (!response.ok) {
        const text = await response.text();
        console.error("[admin.quotes.fetch]", text);
        throw new Error(`Failed to load quote requests (${response.status})`);
      }
      const data = (await response.json()) as QuoteRequestResponse[];
      setItems(data);
    } catch (err: unknown) {
      console.error("[admin.quotes.fetch]", err);
      const message = err instanceof Error ? err.message : "Failed to load quote requests";
      setError(message);
      notify({
        title: "Could not load quotes",
        message,
        intent: "error",
      });
    } finally {
      setIsLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    void fetchQuotes();
  }, [fetchQuotes]);

  const tableRows = useMemo<TableRow[]>(() =>
    items.map((item) => ({
      id: item.id,
      name: item.fullName || `${item.firstName ?? ""} ${item.lastName ?? ""}`.trim() || "–",
      contact: [item.phone, item.email].filter(Boolean).join(" · ") || "–",
      service: item.service ?? item.projectType ?? "–",
      timeline: item.timeline ?? "–",
      createdAt: format(new Date(item.createdAt), "MMM d, yyyy"),
      status: item.status,
    })),
  [items]);

  const handleStatusUpdate = async (id: string, status: QuoteRequestStatus) => {
    setUpdatingId(id);
    try {
      const response = await fetch("/api/admin/quotes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (!response.ok) {
        const text = await response.text();
        console.error("[admin.quotes.update]", text);
        throw new Error(`Failed to update quote status (${response.status})`);
      }
      const updated = (await response.json()) as QuoteRequestResponse;
      setItems((prev) => prev.map((item) => (item.id === updated.id ? updated : item)));
      setSelected((prev) => (prev?.id === updated.id ? updated : prev));
      notify({
        title: "Status updated",
        message: `Quote marked as ${STATUS_LABELS[updated.status]}.`,
        intent: "success",
      });
    } catch (err: unknown) {
      console.error("[admin.quotes.update]", err);
      const message = err instanceof Error ? err.message : "Failed to update status";
      setError(message);
      notify({
        title: "Update failed",
        message,
        intent: "error",
      });
    } finally {
      setUpdatingId(null);
    }
  };

  const columns: Column<TableRow>[] = [
    { header: "Name", accessor: "name" },
    { header: "Contact", accessor: "contact" },
    { header: "Service", accessor: "service" },
    { header: "Timeline", accessor: "timeline" },
    { header: "Received", accessor: "createdAt" },
    {
      header: "Status",
      accessor: (row) => (
        <span
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${statusBadgeClass(row.status)}`}
        >
          {STATUS_LABELS[row.status]}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: (row) => (
        <div className="flex items-center gap-3">
          <select
            value={row.status}
            onChange={(event) => handleStatusUpdate(row.id, event.target.value as QuoteRequestStatus)}
            disabled={updatingId === row.id}
            className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 focus:border-ocean focus:outline-none focus:ring-1 focus:ring-ocean"
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {STATUS_LABELS[status]}
              </option>
            ))}
          </select>
          <button
            type="button"
            className="text-xs font-semibold text-ocean hover:text-ocean/80"
            onClick={() => setSelected(items.find((item) => item.id === row.id) ?? null)}
          >
            View
          </button>
        </div>
      ),
    },
  ];

  return (
    <AdminLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-navy">Quote Requests</h1>
            <p className="text-sm text-slate-600">Track incoming inquiries from the quote and contact forms.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setFilterStatus("all")}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                filterStatus === "all"
                  ? "bg-ocean text-white shadow"
                  : "border border-slate-200 text-slate-600 hover:border-ocean hover:text-ocean"
              }`}
            >
              All
            </button>
            {STATUS_OPTIONS.map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilterStatus(status)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  filterStatus === status
                    ? "bg-ocean text-white shadow"
                    : "border border-slate-200 text-slate-600 hover:border-ocean hover:text-ocean"
                }`}
              >
                {STATUS_LABELS[status]}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>
        )}

        <AdminTable<TableRow>
          columns={columns}
          data={tableRows}
          loading={isLoading}
          emptyMessage="No quote requests found."
        />

        {selected && (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Quote Details</p>
                <h2 className="mt-1 text-xl font-semibold text-navy">{selected.fullName || selected.firstName || "Unnamed"}</h2>
                <p className="text-sm text-slate-500">Submitted on {format(new Date(selected.createdAt), "MMM d, yyyy h:mm a")}</p>
              </div>
              <button
                type="button"
                className="text-sm font-semibold text-slate-500 hover:text-navy"
                onClick={() => setSelected(null)}
              >
                Close
              </button>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <DetailItem label="Email" value={selected.email} />
              <DetailItem label="Phone" value={selected.phone} />
              <DetailItem label="Service" value={selected.service || selected.projectType} />
              <DetailItem label="Timeline" value={selected.timeline} />
              <DetailItem label="Budget" value={selected.budget} />
              <DetailItem label="Referral" value={selected.referral} />
              <DetailItem label="Contact Preference" value={selected.contactPreference} />
              <DetailItem label="City" value={selected.city} />
              <DetailItem label="Address" value={selected.addressLine} className="md:col-span-2" />
            </div>

            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Project Details</p>
              <p className="mt-2 whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                {selected.details || "No additional details provided."}
              </p>
            </div>

            {selected.meta && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Meta</p>
                <pre className="mt-2 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs text-slate-600">
                  {JSON.stringify(selected.meta, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

const DetailItem = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string | null | undefined;
  className?: string;
}) => (
  <div className={className}>
    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
    <p className="mt-1 text-sm text-slate-700">{value && value.length > 0 ? value : "–"}</p>
  </div>
);

QuotesAdminPage.meta = {
  title: "Quote Requests | Admin",
  description: "Manage incoming quote inquiries.",
};

export default QuotesAdminPage;
