import type { NextApiRequest, NextApiResponse } from "next";
import { getQuoteRequestRepository } from "@/server/db/client";
import type { QuoteRequestPayload, QuoteRequestResponse, QuoteRequestStatus, QuoteRequestSource } from "@/types/quote";

const ALLOWED_SOURCES: QuoteRequestSource[] = ["quote_form", "contact_form"];
const ALLOWED_STATUSES: QuoteRequestStatus[] = ["new", "in_review", "scheduled", "closed"];

const normalizeString = (value: unknown): string | null => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

const buildFullName = (firstName: string | null, lastName: string | null, fallback: string | null): string | null => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`.trim();
  }
  if (fallback) return fallback;
  return firstName ?? lastName ?? null;
};

const serializeQuote = (item: {
  id: string;
  source: QuoteRequestSource;
  status: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  email: string | null;
  phone: string | null;
  addressLine: string | null;
  city: string | null;
  projectType: string | null;
  service: string | null;
  timeline: string | null;
  budget: string | null;
  referral: string | null;
  contactPreference: string | null;
  details: string | null;
  meta: Record<string, unknown> | null;
  createdAt: Date;
  updatedAt: Date;
}): QuoteRequestResponse => ({
  id: item.id,
  source: item.source,
  status: (ALLOWED_STATUSES.includes(item.status as QuoteRequestStatus)
    ? (item.status as QuoteRequestStatus)
    : "new"),
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
  meta: item.meta,
  createdAt: item.createdAt.toISOString(),
  updatedAt: item.updatedAt.toISOString(),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const repo = await getQuoteRequestRepository();
    const payload = (req.body ?? {}) as QuoteRequestPayload & Record<string, unknown>;

    const source = ALLOWED_SOURCES.includes(payload.source ?? "quote_form")
      ? (payload.source as QuoteRequestSource)
      : "quote_form";

    const firstName = normalizeString(payload.firstName);
    const lastName = normalizeString(payload.lastName);
    const fullName = normalizeString(payload.fullName);
    const email = normalizeString(payload.email);
    const phone = normalizeString(payload.phone);
    const details = normalizeString(payload.details ?? payload.meta?.details ?? null);
    const contactPreference = normalizeString(payload.contactPreference);
    const projectType = normalizeString(payload.projectType);
    const service = normalizeString(payload.service);
    const timeline = normalizeString(payload.timeline);
    const budget = normalizeString(payload.budget);
    const referral = normalizeString(payload.referral);
    const addressLine = normalizeString(payload.addressLine);
    const city = normalizeString(payload.city);

    const derivedFullName = buildFullName(firstName, lastName, fullName);

    if (!details) {
      return res.status(400).json({ error: "Please provide project details." });
    }

    if (!email && !phone) {
      return res.status(400).json({ error: "Please provide at least an email or phone number." });
    }

    const quote = repo.create({
      source,
      status: "new",
      firstName,
      lastName,
      fullName: derivedFullName,
      email,
      phone,
      addressLine,
      city,
      projectType,
      service,
      timeline,
      budget,
      referral,
      contactPreference,
      details,
      meta: payload.meta && typeof payload.meta === "object" ? (payload.meta as Record<string, unknown>) : null,
    });

    const saved = await repo.save(quote);

    return res.status(201).json(serializeQuote(saved));
  } catch (error) {
    console.error("[quotes.create]", error);
    return res.status(500).json({ error: "Failed to submit quote request" });
  }
}
