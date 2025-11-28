import type { NextApiRequest, NextApiResponse } from "next";
import { requireAdminApi } from "@/server/auth/adminSession";
import { getQuoteRequestRepository } from "@/server/db/client";
import type { QuoteRequestResponse, QuoteRequestStatus } from "@/types/quote";
import type { QuoteRequest } from "@/server/db/entities/QuoteRequest";

const ALLOWED_STATUSES: QuoteRequestStatus[] = ["new", "in_review", "scheduled", "closed"];

const serializeQuote = (item: QuoteRequest): QuoteRequestResponse => ({
  id: item.id,
  source: item.source,
  status: item.status,
  firstName: item.firstName,
  lastName: item.lastName,
  fullName: item.fullName,
  email: item.email,
  phone: item.phone,
  addressLine: item.addressLine,
  city: item.city,
  projectType: item.projectType,
  service: item.service,
  timeline: item.timeline,
  budget: item.budget,
  referral: item.referral,
  contactPreference: item.contactPreference,
  details: item.details,
  meta: item.meta ?? null,
  createdAt: item.createdAt.toISOString(),
  updatedAt: item.updatedAt.toISOString(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = requireAdminApi(req, res);
  if (!session) return;

  const repo = await getQuoteRequestRepository();

  if (req.method === "GET") {
    const { status } = req.query;
    const statusFilter =
      typeof status === "string" && ALLOWED_STATUSES.includes(status as QuoteRequestStatus)
        ? (status as QuoteRequestStatus)
        : undefined;

    const items = await repo.find({
      where: statusFilter ? { status: statusFilter } : undefined,
      order: { createdAt: "DESC" },
      take: 200,
    });

    return res.status(200).json(items.map(serializeQuote));
  }

  if (req.method === "PUT") {
    const { id, status } = req.body as { id?: string; status?: QuoteRequestStatus };
    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const existing = await repo.findOne({ where: { id } });
    if (!existing) {
      return res.status(404).json({ error: "Quote request not found" });
    }

    if (status && ALLOWED_STATUSES.includes(status)) {
      existing.status = status;
    }

    const saved = await repo.save(existing);
    return res.status(200).json(serializeQuote(saved));
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Method not allowed" });
}
