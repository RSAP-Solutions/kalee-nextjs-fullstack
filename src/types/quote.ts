export type QuoteRequestSource = "quote_form" | "contact_form";

export type QuoteRequestStatus = "new" | "in_review" | "scheduled" | "closed";

export interface QuoteRequestPayload {
  source?: QuoteRequestSource;
  firstName?: string | null;
  lastName?: string | null;
  fullName?: string | null;
  email?: string | null;
  phone?: string | null;
  addressLine?: string | null;
  city?: string | null;
  projectType?: string | null;
  service?: string | null;
  timeline?: string | null;
  budget?: string | null;
  referral?: string | null;
  contactPreference?: string | null;
  details?: string | null;
  meta?: Record<string, unknown> | null;
}

export interface QuoteRequestResponse {
  id: string;
  source: QuoteRequestSource;
  status: QuoteRequestStatus;
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
  createdAt: string;
  updatedAt: string;
}
