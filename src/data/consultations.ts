export type ConsultationTier = {
  id: "tier-1" | "tier-2" | "tier-3";
  tier: string;
  name: string;
  priceLabel: string;
  description: string;
  features: string[];
  badge?: string;
  credit?: string;
  hrefOverride?: string;
  amountCents?: number;
};

export const consultationTiers: ConsultationTier[] = [
  {
    id: "tier-1",
    tier: "1",
    name: "Quick Virtual Consult",
    priceLabel: "Free",
    description:
      "Fast, automated prequalification to understand scope, timing, and budget. Ideal for exploring possibilities.",
    features: [
      "3-5 minute guided intake",
      "Project scope conversation",
      "Budget range outline",
      "Timeline expectations",
      "Personalized next-step plan",
    ],
    badge: "Start Here",
    hrefOverride: "/quote?source=quick-virtual-consult",
  },
  {
    id: "tier-2",
    tier: "2",
    name: "Professional Site Visit & Estimate",
    priceLabel: "$199 - $299",
    description:
      "Comprehensive on-site evaluation with detailed scope definition, pricing insights, and recommendations.",
    credit: "100% credit toward construction contract",
    features: [
      "Licensed contractor walkthrough",
      "Measurements & site photography",
      "Detailed written estimate",
      "Material guidance",
      "Timeline & phasing roadmap",
    ],
    badge: "Most Popular",
    amountCents: 19900,
  },
  {
    id: "tier-3",
    tier: "3",
    name: "Design & Scope Concept Package",
    priceLabel: "$499 - $999",
    description:
      "Collaborative design session with concepts, finishes, and phasing for homeowners seeking full clarity.",
    features: [
      "Concept sketches & layouts",
      "Interior & exterior mood boards",
      "Finish & fixture selections",
      "Permit & code review insights",
      "Detailed project roadmap",
    ],
    amountCents: 49900,
  },
];

export const getConsultationTier = (id: string): ConsultationTier | undefined =>
  consultationTiers.find((tier) => tier.id === id);
