export type ConsultationTier = {
  title: string;
  price: string;
  description: string;
  features?: string[];
  highlight?: string;
  badge?: string;
  ctaLabel?: string;
  ctaHref?: string;
};

export type FeatureGroup = {
  title: string;
  items?: string[];
  icon?: string;
  description?: string;
  price?: string;
  subtitle?: string;
  highlight?: string;
};

export type PricingCard = {
  title: string;
  price: string;
  subtitle?: string;
  description?: string;
  features?: string[];
};

export type ProcessStep = {
  title: string;
  description: string;
  duration?: string;
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ServiceContent = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    badge?: string;
    title: string;
    subtitle: string;
    description: string;
    stats?: Array<{ label: string; value: string }>;
    ctaPrimary?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
  };
  intro: {
    title: string;
    paragraphs: string[];
    highlight?: { title: string; description: string };
  };
  consultation?: {
    title: string;
    description: string;
    recommendation?: string;
    tiers: ConsultationTier[];
    footer?: string;
    ctaLabel?: string;
    ctaHref?: string;
  };
  featureGroups: FeatureGroup[];
  pricing?: {
    title: string;
    description?: string;
    cards: PricingCard[];
  };
  process?: {
    title: string;
    description?: string;
    steps: ProcessStep[];
  };
  benefits?: FeatureGroup[];
  additionalSections?: Array<{
    title: string;
    description?: string;
    cards: FeatureGroup[];
  }>;
  faqs?: {
    title: string;
    items: FAQItem[];
  };
  booking?: {
    title: string;
    description?: string;
    tiers: ConsultationTier[];
  };
  cta: {
    title: string;
    description: string;
    primary: { label: string; href: string };
    secondary?: { label: string; href: string };
  };
};

export type ServiceSlug =
  | "home-additions"
  | "kitchen-bathroom-renovation"
  | "whole-house-renovation"
  | "ada-accessibility"
  | "tiny-homes-adu"
  | "energy-smart-home"
  | "exterior-outdoor-living"
  | "emergency-repair";

export const servicesContent: Record<ServiceSlug, ServiceContent> = {
  "home-additions": {
    slug: "home-additions",
    metaTitle:
      "Home Addition Contractor | Room Additions & Expansions | Kealee Construction",
    metaDescription:
      "Professional home addition services for room expansions, second stories, in-law suites, and more. Licensed contractors serving DC, Maryland, and Northern Virginia.",
    hero: {
      badge: "Home Additions",
      title: "Home Addition Services",
      subtitle: "Expand Your Living Space with Expert Room Additions",
      description:
        "Running out of space? Kealee Construction delivers seamless home additions that fit your lifestyle, match your existing architecture, and add lasting value.",
      ctaPrimary: {
        label: "Book Consultation",
        href: "/consultation-services",
      },
      ctaSecondary: {
        label: "Call (443) 852-9890",
        href: "tel:4438529890",
      },
    },
    intro: {
      title: "Is Your Home Too Small? We Can Help",
      paragraphs: [
        "A professional home addition is often more cost-effective than moving. Our licensed team blends new square footage seamlessly with your existing structure while maximizing functionality.",
        "From extra bedrooms and expanded living rooms to full in-law suites, we handle design, permits, and construction with precision and care.",
      ],
    },
    consultation: {
      title: "Start Your Home Addition the Right Way",
      description:
        "Home additions are complex projects that require accurate planning and professional insight. Investing in a consultation ensures your project begins with clarity and confidence.",
      recommendation:
        "For home additions, we recommend our Tier 2 or Tier 3 consultation packages.",
      tiers: [
        {
          title: "Tier 2: Professional Site Visit",
          price: "$199-$299",
          description: "Perfect for straightforward additions.",
          features: [
            "On-site measurements & assessment",
            "Detailed written estimate",
            "Structural evaluation",
            "Permit requirements review",
            "Material recommendations",
            "Timeline & phasing plan",
          ],
          highlight: "✓ 100% Credited to Your Project",
          ctaLabel: "Book Site Visit",
          ctaHref: "/consultation-services",
        },
        {
          title: "Tier 3: Design & Scope Package",
          price: "$499-$999",
          description: "Best for complex or large additions.",
          features: [
            "Everything in Tier 2",
            "3D renderings of your addition",
            "Detailed floor plans",
            "Complete material specifications",
            "Comprehensive budget breakdown",
            "Full project schedule",
            "Architectural coordination",
          ],
          highlight: "✓ 100% Credited to Your Project",
          badge: "Most Popular",
          ctaLabel: "Book Design Package",
          ctaHref: "/consultation-services",
        },
      ],
      footer:
        "Additions averaging $40,000-$100,000 deserve accurate planning. A $299-$999 consultation investment prevents costly mistakes—and it’s fully credited when you proceed.",
      ctaLabel: "View All Consultation Options →",
      ctaHref: "/consultation-services",
    },
    featureGroups: [
      {
        title: "Types of Additions",
        items: [
          "Single Room Additions",
          "Second Story Additions",
          "Garage Conversions",
          "Sunroom & Patio Enclosures",
          "In-Law Suites",
          "Master Suite Additions",
          "Kitchen Expansions",
          "Family Room Extensions",
        ],
      },
      {
        title: "What’s Included",
        items: [
          "Design Consultation",
          "Architectural Planning",
          "Permit Assistance",
          "Foundation Work",
          "Framing & Roofing",
          "Electrical & Plumbing",
          "HVAC Integration",
          "Interior Finishing",
        ],
      },
      {
        title: "Why Choose Kealee",
        items: [
          "15+ Years Experience",
          "Licensed & Insured",
          "On-Time Completion",
          "Quality Materials",
          "Transparent Pricing",
          "Minimal Disruption",
          "Clean Job Sites",
          "Warranty Backed",
        ],
      },
    ],
    pricing: {
      title: "Home Addition Cost Guide",
      description:
        "Pricing varies based on size, complexity, and materials. Book a consultation for a precise estimate.",
      cards: [
        {
          title: "Small Addition",
          price: "$16,000-$80,000",
          subtitle: "200-400 sq ft",
          description: "Perfect for a home office, bedroom, or bathroom expansion.",
        },
        {
          title: "Medium Addition",
          price: "$32,000-$120,000",
          subtitle: "400-600 sq ft",
          description: "Ideal for a family room, master suite, or in-law suite.",
        },
        {
          title: "Large Addition",
          price: "$48,000-$200,000+",
          subtitle: "600+ sq ft",
          description: "Multi-room additions or full second-story expansions.",
        },
        {
          title: "Second Story",
          price: "$100-$300/sq ft",
          subtitle: "Per square foot",
          description: "Complete second floor expansion tailored to your home.",
        },
      ],
    },
    process: {
      title: "Our Home Addition Process",
      steps: [
        {
          title: "Consultation",
          description:
            "Free virtual consultation to understand your needs and budget.",
        },
        {
          title: "Design & Planning",
          description:
            "Detailed plans, structural evaluation, and permit preparation (2-4 weeks).",
        },
        {
          title: "Permits",
          description:
            "We handle all applications, inspections, and approvals (2-6 weeks).",
        },
        {
          title: "Construction",
          description:
            "On-site work with minimal disruption and clean job sites (8-16 weeks).",
        },
        {
          title: "Inspection",
          description:
            "Final inspection, punch list completion, and quality assurance (1 week).",
        },
        {
          title: "Completion",
          description: "Final walkthrough and handover of your new space.",
        },
      ],
    },
    faqs: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How long does a home addition take?",
          answer:
            "Most additions take 3-6 months from design to completion. Smaller additions (200-400 sq ft) average 3-4 months, while larger additions or second stories can take 5-6 months or longer depending on complexity and weather.",
        },
        {
          question: "Do I need permits for a home addition?",
          answer:
            "Yes. We handle the entire permit process—including applications, inspections, and approvals—to ensure your addition meets all local building codes.",
        },
        {
          question: "Can I live in my home during construction?",
          answer:
            "In most cases, yes. We isolate the work area, maintain clean job sites, and coordinate schedules to minimize disruption so you can stay comfortable at home.",
        },
        {
          question: "Will my addition match my existing home?",
          answer:
            "Absolutely. We carefully match materials, rooflines, siding, and architectural details so your addition looks like it’s always been part of your home.",
        },
        {
          question: "How much does a home addition cost?",
          answer:
            "Additions typically range from $80-$200 per square foot based on size and finishes. We provide a detailed written estimate after the consultation.",
        },
        {
          question: "Do home additions increase property value?",
          answer:
            "Yes. Most additions recoup 50-75% of their cost in home value, and you gain functional living space without moving expenses.",
        },
      ],
    },
    cta: {
      title: "Ready to Expand Your Home?",
      description:
        "Get your free consultation and estimate today. Serving Washington DC, Prince George County, Montgomery County, Southern Maryland, Northern Virginia, and Baltimore.",
      primary: { label: "Request Free Estimate", href: "/quote" },
      secondary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
    },
  },
  "kitchen-bathroom-renovation": {
    slug: "kitchen-bathroom-renovation",
    metaTitle:
      "Kitchen & Bathroom Renovation Contractor | Kealee Construction",
    metaDescription:
      "Complete kitchen and bathroom remodeling services. Custom cabinetry, tile, plumbing, lighting, and luxury finishes. Serving DC, Maryland, and Northern Virginia.",
    hero: {
      badge: "Kitchen & Bath",
      title: "Kitchen & Bathroom Renovation",
      subtitle: "Transform Your Most Used Spaces with Expert Craftsmanship",
      description:
        "From chef-inspired kitchens to spa-worthy bathrooms, we deliver functional, beautiful spaces tailored to your lifestyle and budget.",
      ctaPrimary: {
        label: "Book Consultation",
        href: "/consultation-services",
      },
      ctaSecondary: {
        label: "View Our Gallery",
        href: "/gallery",
      },
    },
    intro: {
      title: "Complete Kitchen & Bathroom Solutions",
      paragraphs: [
        "Your kitchen is the heart of the home and your bathroom should be a sanctuary. We provide end-to-end remodeling services that maximize space, improve functionality, and elevate design.",
        "Our licensed experts manage every detail—from demolition and structural adjustments to premium finish installation—so you enjoy a smooth renovation and a space you love.",
      ],
    },
    featureGroups: [
      {
        title: "Kitchen Renovation Services",
        items: [
          "Custom cabinet design & installation",
          "Granite, quartz, or marble countertops",
          "Tile backsplash installation",
          "Durable flooring solutions",
          "Plumbing & electrical updates",
          "Professional appliance installation",
          "Lighting design & installation",
          "Island or peninsula construction",
        ],
      },
      {
        title: "Kitchen Investment Snapshot",
        items: [
          "Budget Kitchen: $12,000 - $18,000",
          "Mid-Range Kitchen: $18,000 - $25,000",
          "High-End Kitchen: $25,000 - $35,000+",
          "Typical Timeline: 4-8 weeks",
        ],
      },
      {
        title: "Bathroom Remodeling Services",
        items: [
          "Vanity & cabinet installation",
          "Tile work for floors, showers, tubs",
          "Luxury shower & bathtub installation",
          "Plumbing fixture upgrades",
          "Moisture-resistant flooring",
          "Lighting & ventilation improvements",
          "Mirror & hardware installation",
          "Waterproofing and moisture control",
        ],
      },
      {
        title: "Bathroom Investment Snapshot",
        items: [
          "Powder Room: $8,000 - $12,000",
          "Full Bathroom: $12,000 - $18,000",
          "Master Suite: $18,000 - $25,000+",
          "Typical Timeline: 2-5 weeks",
        ],
      },
    ],
    pricing: {
      title: "Kitchen & Bathroom Pricing Breakdown",
      cards: [
        {
          title: "Basic Kitchen Refresh",
          price: "$12,000-$18,000",
          features: [
            "Cabinet refacing or painting",
            "New countertops",
            "Updated hardware",
            "New backsplash",
            "Basic lighting updates",
          ],
        },
        {
          title: "Full Kitchen Remodel",
          price: "$18,000-$25,000",
          features: [
            "New custom cabinets",
            "Premium countertops",
            "Tile backsplash",
            "New flooring",
            "Updated plumbing & electrical",
            "New appliances",
          ],
        },
        {
          title: "Luxury Kitchen",
          price: "$25,000-$35,000+",
          features: [
            "High-end custom cabinets",
            "Premium stone countertops",
            "Designer tile & backsplash",
            "Luxury appliances",
            "Custom island design",
            "Advanced lighting plan",
          ],
        },
        {
          title: "Powder Room",
          price: "$8,000-$12,000",
          features: [
            "New vanity & sink",
            "Toilet replacement",
            "Tile flooring",
            "Updated lighting",
            "Fresh paint & finishes",
          ],
        },
        {
          title: "Full Bathroom",
          price: "$12,000-$18,000",
          features: [
            "Tub/shower replacement",
            "New vanity & countertop",
            "Complete tile work",
            "Updated fixtures",
            "Ventilation & lighting",
          ],
        },
        {
          title: "Master Bathroom",
          price: "$18,000-$25,000+",
          features: [
            "Walk-in shower",
            "Soaking tub",
            "Double vanity",
            "Premium tile throughout",
            "Heated flooring",
            "Luxury fixtures",
          ],
        },
      ],
    },
    additionalSections: [
      {
        title: "Popular Upgrades & Features",
        cards: [
          {
            title: "Kitchen Trends 2025",
            items: [
              "Two-tone cabinetry",
              "Quartz countertops",
              "Smart appliances",
              "Farmhouse sinks",
              "LED under-cabinet lighting",
              "Large multifunction islands",
            ],
          },
          {
            title: "Bathroom Enhancements",
            items: [
              "Curbless walk-in showers",
              "Freestanding soaking tubs",
              "Heated flooring systems",
              "Integrated LED mirrors",
              "Rainfall showerheads",
              "Custom storage solutions",
            ],
          },
          {
            title: "Design Services",
            items: [
              "3D renderings & layouts",
              "Material & finish selection",
              "Space planning & flow",
              "Color palette development",
              "Fixture coordination",
              "Lighting design plans",
            ],
          },
        ],
      },
    ],
    faqs: {
      title: "Kitchen & Bathroom FAQs",
      items: [
        {
          question: "How long will my kitchen or bathroom renovation take?",
          answer:
            "Kitchen projects typically take 4-8 weeks and bathroom remodels average 2-5 weeks depending on scope, material availability, and complexity. You’ll receive a detailed schedule before work begins.",
        },
        {
          question: "Can we use our kitchen or bathroom during renovation?",
          answer:
            "We coordinate temporary solutions whenever possible. However, there will be phases where spaces are offline for safety and efficiency. We communicate timing in advance so you can plan.",
        },
        {
          question: "Do you help with material selections?",
          answer:
            "Absolutely. Our design team guides you through cabinetry, countertops, fixtures, tile, flooring, and lighting selections to ensure a cohesive look that fits your budget.",
        },
        {
          question: "Will you handle permits and inspections?",
          answer:
            "Yes. We manage all permitting, coordinate inspections, and ensure the project meets local building codes and regulations.",
        },
        {
          question: "Can you work with my existing layout?",
          answer:
            "We can renovate within the current footprint or reconfigure layouts to improve flow, storage, and functionality. We’ll review options during consultation.",
        },
        {
          question: "Do you offer financing recommendations?",
          answer:
            "While we don’t finance directly, we can refer trusted lenders who specialize in home improvement loans, HELOCs, and renovation financing.",
        },
      ],
    },
    cta: {
      title: "Plan Your Kitchen or Bathroom Remodel",
      description:
        "Book a consultation to review your vision, budget, and timeline. Serving Washington DC, Prince George County, Montgomery County, Southern Maryland, Northern Virginia, and Baltimore.",
      primary: { label: "Book Consultation", href: "/consultation-services" },
      secondary: { label: "Request Free Estimate", href: "/quote" },
    },
  },
  // Placeholder entries for remaining services; full content will be added below.
  "whole-house-renovation": {
    slug: "whole-house-renovation",
    metaTitle:
      "Whole House Renovation Contractor | Complete Home Transformation",
    metaDescription:
      "Comprehensive whole house renovation services covering design, structural upgrades, systems, and luxury finishes. Serving DC, Maryland, and Northern Virginia.",
    hero: {
      badge: "Whole House Renovation",
      title: "Whole House Renovation",
      subtitle: "Transform Every Inch of Your Home with Confidence",
      description:
        "We coordinate complete home transformations—from structural changes and system upgrades to design-forward finishes—so you can love where you live.",
      ctaPrimary: { label: "Book Consultation", href: "/consultation-services" },
      ctaSecondary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
    },
    intro: {
      title: "Complete Home Transformation",
      paragraphs: [
        "A whole house renovation is more than a remodel—it’s a complete reinvention of your living space. When your home no longer fits your lifestyle but you love your location, our team delivers a seamless transformation.",
        "We address structural updates, modernize mechanical systems, reimagine interiors, and refresh exteriors. With full-service project management, your renovation stays organized, on budget, and aligned with your vision.",
      ],
      highlight: {
        title: "Why Choose Whole House Renovation?",
        description:
          "It’s often more cost-effective than moving, lets you customize every detail, and increases property value while keeping you in the neighborhood you love.",
      },
    },
    featureGroups: [
      {
        title: "Structural Work",
        icon: "🏗️",
        description:
          "Foundation repairs, load-bearing wall removal, floor leveling, and reinforcement for major layout changes.",
      },
      {
        title: "Systems Upgrade",
        icon: "🔌",
        description:
          "Complete electrical panel upgrades, modern plumbing, HVAC installation, and smart home wiring.",
      },
      {
        title: "Interior Renovation",
        icon: "🏠",
        description:
          "Kitchen and bathroom remodeling, new flooring, interior walls, trim work, and custom finishes.",
      },
      {
        title: "Exterior Updates",
        icon: "🪟",
        description:
          "New siding, roofing, windows, doors, and exterior paint to transform curb appeal.",
      },
      {
        title: "Lighting & Fixtures",
        icon: "💡",
        description:
          "Modern lighting design, fixture installation, and energy-efficient LED systems.",
      },
      {
        title: "Design Services",
        icon: "🎨",
        description:
          "Space planning, 3D renderings, material selection, color consultation, and design coordination.",
      },
      {
        title: "Energy Efficiency",
        icon: "🌿",
        description:
          "Insulation upgrades, high-performance windows, and sustainable building practices.",
      },
      {
        title: "Permits & Compliance",
        icon: "📋",
        description:
          "Complete permit management, code compliance, and inspection coordination.",
      },
    ],
    benefits: [
      {
        title: "🏡 Stay in Your Location",
        items: [
          "Keep your neighborhood and community",
          "Maintain school districts and routines",
          "Avoid moving costs and disruption",
          "Preserve established relationships",
        ],
      },
      {
        title: "💰 Invest in Value",
        items: [
          "Increase property value dramatically",
          "Modernize outdated systems",
          "Customize for your lifestyle",
          "Potential tax and energy savings",
        ],
      },
      {
        title: "✨ Modern Living",
        items: [
          "Open concept layouts",
          "Smart home technology",
          "Energy-efficient systems",
          "Improved natural light",
        ],
      },
      {
        title: "🛡️ Quality & Safety",
        items: [
          "Bring systems up to code",
          "Address hidden structural issues",
          "Improve indoor air quality",
          "Enhance security and safety",
        ],
      },
    ],
    process: {
      title: "Whole House Renovation Process",
      description: "A proven nine-step approach keeps your renovation on track.",
      steps: [
        {
          title: "Initial Consultation & Assessment",
          description:
            "Discuss goals, assess existing conditions, review budget, and identify structural or system priorities.",
          duration: "Week 1",
        },
        {
          title: "Design & Planning",
          description:
            "Create detailed plans, produce 3D renderings, and finalize material selections, scope, and budget.",
          duration: "Weeks 2-4",
        },
        {
          title: "Permits & Preparation",
          description:
            "Submit permit applications, schedule inspections, order materials, and coordinate trades.",
          duration: "Weeks 4-6",
        },
        {
          title: "Demolition & Structural Work",
          description:
            "Careful demolition, structural repairs, and foundation work while protecting non-renovated areas.",
          duration: "Weeks 6-8",
        },
        {
          title: "Rough-In & Systems",
          description:
            "Install new electrical, plumbing, HVAC, and framing upgrades to modern code standards.",
          duration: "Weeks 8-12",
        },
        {
          title: "Insulation & Drywall",
          description:
            "Energy-efficient insulation, drywall installation, finishing, and preparation for final phases.",
          duration: "Weeks 12-14",
        },
        {
          title: "Interior Finishes",
          description:
            "Flooring, cabinetry, countertops, tile, trim, doors, and paint bring your design to life.",
          duration: "Weeks 14-20",
        },
        {
          title: "Exterior Completion",
          description:
            "Siding, roofing, windows, doors, and exterior finishes transform curb appeal.",
          duration: "Weeks 18-22",
        },
        {
          title: "Final Touches & Walkthrough",
          description:
            "Final inspections, punch list completion, deep cleaning, and a detailed client walkthrough.",
          duration: "Weeks 22-24",
        },
      ],
    },
    pricing: {
      title: "Investment & Pricing",
      description:
        "Understanding the investment helps you plan your renovation with confidence.",
      cards: [
        {
          title: "Basic Renovation",
          price: "$100-$150/sq ft",
          description:
            "Cosmetic updates, essential system upgrades, and standard materials.",
        },
        {
          title: "Mid-Range Renovation",
          price: "$150-$250/sq ft",
          description:
            "Quality materials, custom features, and comprehensive upgrades.",
        },
        {
          title: "High-End Renovation",
          price: "$250-$400+/sq ft",
          description:
            "Luxury finishes, premium materials, and extensive customization.",
        },
        {
          title: "Typical 2,000 sq ft Home",
          price: "$200K-$500K",
          description:
            "Complete renovation including structure, systems, interiors, and exteriors.",
        },
      ],
    },
    additionalSections: [
      {
        title: "Factors Affecting Project Cost",
        description:
          "We review these considerations during consultation to align scope with budget.",
        cards: [
          {
            title: "Scope & Size",
            items: [
              "Overall square footage",
              "Extent of structural work",
              "Number of rooms impacted",
            ],
          },
          {
            title: "Systems & Materials",
            items: [
              "HVAC, electrical, plumbing upgrades",
              "Material quality and finishes",
              "Level of customization",
            ],
          },
          {
            title: "Logistics",
            items: [
              "Permit and inspection fees",
              "Labor and material availability",
              "Timeline and scheduling needs",
            ],
          },
        ],
      },
    ],
    faqs: {
      title: "Frequently Asked Questions",
      items: [
        {
          question: "How long does a whole house renovation take?",
          answer:
            "Most projects take 3-6 months depending on size and scope. Cosmetic updates may take 2-3 months, while extensive structural changes can extend to 6-9 months. A detailed schedule is provided during planning.",
        },
        {
          question: "Can we live in our home during the renovation?",
          answer:
            "For comprehensive renovations we typically recommend temporary relocation for safety and efficiency. In phased projects you may stay in certain areas. We’ll discuss the best plan during consultation.",
        },
        {
          question: "Do you handle permits and inspections?",
          answer:
            "Yes. We manage all permits, coordinate with local building departments, and schedule inspections to ensure full compliance.",
        },
        {
          question: "What happens if you discover unexpected issues?",
          answer:
            "If hidden issues such as water damage or outdated systems are uncovered, we communicate immediately, outline options, and provide transparent pricing before proceeding.",
        },
        {
          question: "How do we select materials and finishes?",
          answer:
            "Our design team guides you through showrooms, provides samples, and recommends materials that fit your aesthetic, durability needs, and budget.",
        },
        {
          question: "Do you offer financing options?",
          answer:
            "We partner with trusted lenders who specialize in renovation loans, home equity options, and construction financing. We coordinate timeline requirements with your lender.",
        },
        {
          question: "What warranty do you provide?",
          answer:
            "We offer comprehensive warranties on labor (typically 1-2 years) and pass through manufacturer warranties on materials and equipment.",
        },
      ],
    },
    booking: {
      title: "Start Your Whole House Renovation",
      description: "Choose the consultation package that fits your project.",
      tiers: [
        {
          title: "Quick Virtual Consult",
          price: "FREE",
          description:
            "Ideal for exploring scope, budget, and timeline at a high level.",
          ctaLabel: "Call (443) 852-9890",
          ctaHref: "tel:4438529890",
        },
        {
          title: "Professional Site Visit & Estimate",
          price: "$199-$299",
          description:
            "Comprehensive on-site evaluation with detailed written estimate.",
          highlight: "💰 100% Credit toward your construction contract",
          badge: "Recommended",
          ctaLabel: "Book Site Visit",
          ctaHref: "/consultation-services",
        },
        {
          title: "Design & Scope Concept Package",
          price: "$499-$999",
          description:
            "Complete design consultation with concept sketches and planning.",
          highlight: "💰 100% Credit toward your construction contract",
          ctaLabel: "Book Design Package",
          ctaHref: "/consultation-services",
        },
      ],
    },
    cta: {
      title: "Ready to Transform Your Home?",
      description:
        "Contact Kealee Construction for a comprehensive consultation. Serving Washington DC, Prince George County, Montgomery County, Southern Maryland, Northern Virginia, and Baltimore.",
      primary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
      secondary: { label: "Email Us", href: "mailto:contact@kealeeservices.com" },
    },
  },
  "ada-accessibility": {
    slug: "ada-accessibility",
    metaTitle:
      "ADA Accessibility Renovations | Universal Design Contractor | Kealee Construction",
    metaDescription:
      "Make your home accessible and safe with ADA-compliant renovations, universal design features, ramps, and mobility upgrades.",
    hero: {
      badge: "ADA Accessibility",
      title: "ADA Accessibility Renovations",
      subtitle: "Accessible Living Solutions for Every Stage of Life",
      description:
        "Create a barrier-free home that supports independence, safety, and comfort. We specialize in ADA-compliant renovations and universal design.",
      ctaPrimary: { label: "Schedule Consultation", href: "/consultation-services" },
      ctaSecondary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
    },
    intro: {
      title: "Accessible Living Solutions",
      paragraphs: [
        "Whether you’re planning to age in place or accommodating a loved one with mobility challenges, we design accessible spaces tailored to your needs.",
        "Our experienced team blends ADA standards with thoughtful design so your home remains beautiful, functional, and safe.",
      ],
    },
    featureGroups: [
      {
        title: "Wheelchair Accessible Bathrooms",
        items: [
          "Roll-in showers with zero threshold",
          "Grab bar installation for showers, toilets, and tubs",
          "Accessible vanities and sinks",
          "Comfort-height toilets",
          "Non-slip flooring solutions",
          "Handheld showerheads",
          "60\" turning radius for scooters and chairs",
          "Lever-style faucets",
        ],
      },
      {
        title: "Access & Mobility Modifications",
        items: [
          "Wheelchair ramp installation",
          "Doorway widening to 36\" minimum",
          "Lowered switches and outlets",
          "Automatic door openers",
          "Stair lift installation support",
          "Residential elevator coordination",
          "Lever-style door handles",
          "Threshold removal",
        ],
      },
      {
        title: "Universal Design Features",
        items: [
          "Open floor plan modifications",
          "Accessible kitchen layouts",
          "Lowered countertop sections",
          "Pull-out shelving and storage",
          "Enhanced lighting throughout",
          "Non-slip flooring materials",
          "First-floor bedroom conversions",
          "Walk-in showers with seating",
        ],
      },
      {
        title: "Safety Enhancements",
        items: [
          "Grab bars throughout the home",
          "Improved lighting and visibility",
          "Slip-resistant flooring",
          "Handrails for stairs and hallways",
          "Emergency call systems",
          "Rounded countertop edges",
          "Smart home safety integration",
          "Clear navigation pathways",
        ],
      },
    ],
    benefits: [
      {
        title: "🏡 Age in Place",
        items: [
          "Stay in the home you love comfortably",
          "Reduce fall risks and accidents",
          "Ensure spaces support mobility aids",
        ],
      },
      {
        title: "💰 Increase Home Value",
        items: [
          "Appeal to a wider range of buyers",
          "Improve marketability with modern accessibility",
        ],
      },
      {
        title: "✨ Enhanced Safety",
        items: [
          "Reduce slips with carefully selected materials",
          "Install grab bars and railings where needed",
        ],
      },
      {
        title: "👨‍👩‍👧‍👦 Multi-Generational Living",
        items: [
          "Accommodate family members of all abilities",
          "Create flexible spaces for long-term comfort",
        ],
      },
      {
        title: "💪 Independence",
        items: [
          "Support daily routines without assistance",
          "Provide accessible storage and controls",
        ],
      },
      {
        title: "📋 ADA Compliance",
        items: [
          "Meet federal, state, and local guidelines",
          "Ensure professional installation and inspections",
        ],
      },
    ],
    additionalSections: [
      {
        title: "Common ADA Renovation Projects",
        cards: [
          {
            title: "Bathroom Accessibility Upgrade",
            description:
              "Roll-in showers, grab bars, non-slip flooring, and ADA-compliant fixtures.",
            items: ["Typical Investment: $8,000 - $20,000"],
          },
          {
            title: "Wheelchair Ramp Installation",
            description:
              "Custom ramps designed to proper slope ratios with handrails and non-slip surfaces.",
            items: ["Typical Investment: $1,500 - $5,000"],
          },
          {
            title: "Doorway Widening",
            description:
              "Expand doorways to 36\" openings for wheelchair and walker accessibility.",
            items: ["Typical Investment: $500 - $2,000 per doorway"],
          },
          {
            title: "First-Floor Master Suite Conversion",
            description:
              "Create a main-level bedroom and accessible bathroom for long-term comfort.",
            items: ["Typical Investment: $15,000 - $40,000"],
          },
        ],
      },
    ],
    cta: {
      title: "Make Your Home More Accessible",
      description:
        "Schedule an accessibility consultation and receive a customized plan. Serving Washington DC, Prince George County, Montgomery County, Southern Maryland, Northern Virginia, and Baltimore.",
      primary: { label: "Book Accessibility Consultation", href: "/consultation-services" },
      secondary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
    },
  },
  "tiny-homes-adu": {
    slug: "tiny-homes-adu",
    metaTitle:
      "Tiny Homes & ADU Construction | Backyard Studios | Kealee Construction",
    metaDescription:
      "Design and build accessory dwelling units (ADUs), tiny homes, and backyard studios with Kealee Construction.",
    hero: {
      badge: "Tiny Homes & ADUs",
      title: "Tiny Homes & ADU Construction",
      subtitle: "Maximize Your Property with Smart, Flexible Spaces",
      description:
        "Whether you want rental income, multigenerational living, or a dedicated workspace, we build accessory units that elevate your property.",
      ctaPrimary: { label: "Plan Your ADU", href: "/consultation-services" },
      ctaSecondary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
    },
    intro: {
      title: "High-Impact Small Structures",
      paragraphs: [
        "Accessory dwelling units (ADUs) and tiny homes offer tremendous flexibility—from guest accommodations to income-generating rentals.",
        "Our team handles zoning research, design, permitting, and construction to ensure a compliant, beautiful structure on your property.",
      ],
    },
    featureGroups: [
      {
        title: "🏡 Accessory Dwelling Units (ADUs)",
        price: "$80,000 - $150,000",
        description:
          "Fully independent living spaces with private entrances, kitchens, and bathrooms.",
        items: [
          "Complete kitchen & bathroom",
          "Bedroom & living area",
          "Separate utilities & entrance",
          "400-800 sq ft typical",
          "Ideal for rental income",
          "Perfect for in-law suites",
        ],
      },
      {
        title: "🏠 Tiny Homes",
        price: "$50,000 - $100,000",
        description:
          "Compact, efficient living with modern amenities for minimalist lifestyles or guest stays.",
        items: [
          "200-400 sq ft footprints",
          "Kitchenette & full bathroom",
          "Sleeping loft or bedroom",
          "Energy-efficient design",
          "Stationary or mobile options",
          "Custom finishes available",
        ],
      },
      {
        title: "💼 Backyard Office/Studio",
        price: "$30,000 - $60,000",
        description:
          "Dedicated workspaces separated from the main home for productivity and focus.",
        items: [
          "150-300 sq ft size",
          "Insulated & climate controlled",
          "Electrical & internet ready",
          "Custom storage solutions",
          "No plumbing required",
          "Potential tax deductions",
        ],
      },
      {
        title: "🛏️ Guest House",
        price: "$60,000 - $120,000",
        description:
          "Comfortable guest accommodations that provide privacy for you and your visitors.",
        items: [
          "300-600 sq ft layouts",
          "Bedroom & sitting area",
          "Full bathroom",
          "Kitchenette or full kitchen",
          "Independent HVAC",
          "Patio or porch options",
        ],
      },
    ],
    benefits: [
      {
        title: "💰 Rental Income",
        description:
          "Generate passive income with ADUs that often rent for $1,000-$2,500 per month.",
      },
      {
        title: "👴 Multi-Generational Living",
        description:
          "Keep family close while maintaining independence and privacy for everyone.",
      },
      {
        title: "📈 Increase Property Value",
        description:
          "ADUs can boost property value by 20-30% and make homes more desirable.",
      },
      {
        title: "🏠 Guest Accommodations",
        description:
          "Create comfortable spaces for guests without sacrificing privacy in the main home.",
      },
      {
        title: "💼 Home Office",
        description:
          "Dedicated work environments improve productivity and may offer tax advantages.",
      },
      {
        title: "🌱 Sustainable Living",
        description:
          "Smaller footprints mean lower energy consumption and environmental impact.",
      },
    ],
    process: {
      title: "Our ADU & Tiny Home Process",
      steps: [
        {
          title: "Step 1: Consultation & Design",
          description:
            "We assess your property, discuss goals, and create custom plans that maximize space and budget.",
        },
        {
          title: "Step 2: Permits & Approvals",
          description:
            "We manage zoning requirements, building permits, and HOA approvals on your behalf.",
        },
        {
          title: "Step 3: Construction",
          description:
            "Quality construction with minimal disruption. Most projects complete in 3-6 months.",
        },
        {
          title: "Step 4: Final Inspection",
          description:
            "All work is inspected and approved to meet local codes and regulations.",
        },
      ],
    },
    cta: {
      title: "Ready to Maximize Your Property?",
      description:
        "Schedule a free consultation to explore ADU or tiny home options. Serving Washington DC, Prince George County, Montgomery County, Southern Maryland, Northern Virginia, and Baltimore.",
      primary: { label: "Get Free Consultation", href: "/quote" },
      secondary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
    },
  },
  "energy-smart-home": {
    slug: "energy-smart-home",
    metaTitle:
      "Energy & Smart Home Upgrades | Efficiency & Automation | Kealee Construction",
    metaDescription:
      "Upgrade your home with smart technology, energy-efficient systems, and sustainable improvements.",
    hero: {
      badge: "Energy & Smart Home",
      title: "Energy & Smart Home Upgrades",
      subtitle: "Improve Efficiency, Comfort, and Control",
      description:
        "Lower utility costs, boost sustainability, and automate your home with expertly installed energy and smart home upgrades.",
      ctaPrimary: { label: "Plan Your Upgrade", href: "/consultation-services" },
      ctaSecondary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
    },
    intro: {
      title: "Modernize Your Home Systems",
      paragraphs: [
        "We help homeowners reduce energy consumption and add smart technology that simplifies daily life.",
        "From insulation upgrades to whole-home automation, our team designs improvements that deliver immediate returns.",
      ],
    },
    featureGroups: [
      {
        title: "⚡ Energy-Efficient Windows & Doors",
        price: "$5,000 - $15,000",
        items: [
          "Double or triple-pane windows",
          "Low-E glass coatings",
          "Insulated entry doors",
          "Weather stripping & sealing",
          "Reduce heating/cooling costs 15-30%",
          "Potential tax credits available",
        ],
      },
      {
        title: "☀️ Solar Panel Installation Support",
        price: "$10,000 - $30,000 (with partners)",
        items: [
          "Roof assessment & preparation",
          "Structural support installation",
          "Electrical panel upgrades",
          "Licensed solar installer partnerships",
          "Federal tax credits up to 30%",
          "ROI typically 6-10 years",
        ],
      },
      {
        title: "💡 LED Lighting Systems",
        price: "$2,000 - $8,000",
        items: [
          "Complete LED conversion",
          "Smart dimmer installation",
          "Automated lighting controls",
          "Under-cabinet & accent lighting",
          "Reduce lighting costs by 75%",
          "25,000+ hour fixture lifespan",
        ],
      },
      {
        title: "🏠 Smart Home Integration",
        price: "$3,000 - $12,000",
        items: [
          "Smart thermostats (Nest, Ecobee)",
          "Voice control integration",
          "Smart locks & security",
          "Automated blinds & shades",
          "Smart appliance installation",
          "Whole-home automation systems",
        ],
      },
      {
        title: "🌡️ HVAC Upgrades",
        price: "$5,000 - $15,000",
        items: [
          "High-efficiency HVAC systems",
          "Ductwork sealing & insulation",
          "Zoned climate control",
          "Smart thermostat setup",
          "Reduce energy use 20-40%",
          "Improved indoor air quality",
        ],
      },
      {
        title: "🏗️ Insulation Upgrades",
        price: "$2,000 - $7,000",
        items: [
          "Attic insulation to R-30/R-60",
          "Wall cavity insulation",
          "Basement & crawlspace coverage",
          "Air sealing & draft prevention",
          "Reduce heating/cooling up to 30%",
          "Fast ROI in 2-5 years",
        ],
      },
    ],
    cta: {
      title: "Upgrade to Energy-Efficient Living",
      description:
        "Schedule a free energy assessment and receive customized recommendations for your home.",
      primary: { label: "Get Free Assessment", href: "/quote" },
      secondary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
    },
  },
  "exterior-outdoor-living": {
    slug: "exterior-outdoor-living",
    metaTitle:
      "Exterior Renovation & Outdoor Living | Decks, Patios, Siding | Kealee Construction",
    metaDescription:
      "Enhance curb appeal and outdoor living with professional exterior renovations, decks, patios, and outdoor kitchens.",
    hero: {
      badge: "Exterior & Outdoor Living",
      title: "Exterior Renovation & Outdoor Living",
      subtitle: "Craft Outdoor Spaces That Impress and Endure",
      description:
        "From new siding and roofing to custom decks and hardscapes, we transform exteriors for beauty, durability, and functionality.",
      ctaPrimary: { label: "Plan Your Exterior Project", href: "/consultation-services" },
      ctaSecondary: { label: "Request Free Estimate", href: "/quote" },
    },
    intro: {
      title: "Transform Curb Appeal & Outdoor Lifestyle",
      paragraphs: [
        "Your exterior sets the tone for your entire property. We specialize in renovations that protect your investment while maximizing outdoor living potential.",
        "Whether you’re upgrading siding, replacing a roof, or building an outdoor kitchen, our team delivers quality workmanship that lasts.",
      ],
    },
    featureGroups: [
      {
        title: "🏠 Exterior Facade Renovation",
        price: "$15,000 - $50,000+",
        description:
          "Modernize your home’s exterior with durable materials and refined architectural details.",
        items: [
          "Siding replacement (vinyl, fiber cement, wood)",
          "Stone & brick veneer installation",
          "Stucco application & repair",
          "Exterior paint & trim work",
          "Window & door replacement",
          "Architectural accents & columns",
          "Soffit & fascia updates",
          "Entryway & porch renovations",
        ],
      },
      {
        title: "🍔 Outdoor Kitchen Construction",
        price: "$10,000 - $40,000+",
        description:
          "Create the ultimate outdoor cooking and entertaining destination tailored to your lifestyle.",
        items: [
          "Built-in grills & BBQ islands",
          "Custom countertops (granite, concrete, tile)",
          "Outdoor refrigerators & ice makers",
          "Pizza ovens & smokers",
          "Sink & plumbing integration",
          "Storage cabinets & drawers",
          "Pergolas & shade structures",
          "Lighting & electrical systems",
        ],
      },
      {
        title: "🌳 Outdoor Living Spaces",
        price: "$8,000 - $35,000+",
        description:
          "Extend living outdoors with custom decks, patios, and entertainment areas.",
        items: [
          "Custom deck construction (wood or composite)",
          "Paver patios & walkways",
          "Screened porches & three-season rooms",
          "Pergolas & pavilions",
          "Fire pits & outdoor fireplaces",
          "Built-in seating & planters",
          "Outdoor lighting systems",
          "Privacy screens & fencing",
        ],
      },
      {
        title: "🌿 Porch & Patio Enclosures",
        price: "$12,000 - $30,000+",
        description:
          "Convert outdoor areas into comfortable year-round living spaces.",
        items: [
          "Screened porch enclosures",
          "Sunroom construction",
          "Three-season room conversions",
          "Glass patio enclosures",
          "Insulated & climate-controlled options",
          "Custom windows & doors",
          "Electrical & HVAC integration",
          "Flooring & finishing upgrades",
        ],
      },
      {
        title: "🔨 Roofing & Gutters",
        price: "$8,000 - $25,000+",
        description:
          "Protect your home with quality roofing systems and efficient drainage.",
        items: [
          "Asphalt shingle roofing",
          "Metal roofing installation",
          "Roof replacement & repairs",
          "Seamless gutter installation",
          "Gutter guards & protection",
          "Roof ventilation solutions",
          "Skylight installation",
          "Emergency roof repairs",
        ],
      },
      {
        title: "🪟 Windows & Doors",
        price: "$5,000 - $20,000+",
        description:
          "Upgrade to energy-efficient windows and striking entry doors.",
        items: [
          "Energy-efficient window replacement",
          "Custom entry door installation",
          "Sliding glass & French doors",
          "Storm doors & windows",
          "Bay & bow windows",
          "Professional installation",
          "Weather sealing & insulation",
          "Warranty-backed materials",
        ],
      },
    ],
    benefits: [
      {
        title: "💰 Increase Property Value",
        description:
          "Exterior upgrades can recoup 70-90% of costs and attract more buyers.",
      },
      {
        title: "🏡 Enhanced Curb Appeal",
        description:
          "Transform your home’s appearance and make a lasting impression.",
      },
      {
        title: "🌤️ Year-Round Enjoyment",
        description:
          "Create outdoor spaces designed for all seasons and occasions.",
      },
      {
        title: "🛡️ Weather Protection",
        description:
          "Quality materials defend against the elements and reduce maintenance.",
      },
      {
        title: "⚡ Energy Efficiency",
        description:
          "Modern siding, windows, and doors lower heating and cooling costs.",
      },
      {
        title: "👨‍👩‍👧‍👦 Entertainment Value",
        description:
          "Outdoor kitchens and living areas perfect for hosting family and friends.",
      },
    ],
    pricing: {
      title: "Exterior Upgrade Pricing",
      cards: [
        {
          title: "Siding Replacement",
          price: "$15,000-$30,000",
          subtitle: "Typical 2,000 sq ft home",
          features: [
            "Vinyl: $3-8/sq ft",
            "Fiber Cement: $6-12/sq ft",
            "Wood: $8-15/sq ft",
            "Stone Veneer: $15-30/sq ft",
          ],
        },
        {
          title: "Basic Outdoor Kitchen",
          price: "$10,000-$20,000",
          features: [
            "Built-In Grill",
            "Basic Countertop",
            "Compact Refrigerator",
            "Storage Cabinets",
            "Simple pergola or cover",
          ],
        },
        {
          title: "Luxury Outdoor Kitchen",
          price: "$25,000-$40,000+",
          features: [
            "Premium grill & appliances",
            "Granite or stone countertops",
            "Pizza oven or smoker",
            "Bar seating areas",
            "Custom lighting & audio",
          ],
        },
        {
          title: "Deck Construction",
          price: "$8,000-$20,000",
          subtitle: "300-500 sq ft deck",
          features: [
            "Pressure-treated: $15-25/sq ft",
            "Cedar/Redwood: $25-35/sq ft",
            "Composite: $30-45/sq ft",
            "Includes railings & stairs",
          ],
        },
        {
          title: "Patio Installation",
          price: "$5,000-$15,000",
          subtitle: "300-500 sq ft patio",
          features: [
            "Concrete: $8-12/sq ft",
            "Pavers: $15-25/sq ft",
            "Natural stone: $20-40/sq ft",
            "Includes excavation & base prep",
          ],
        },
        {
          title: "Screened Porch",
          price: "$12,000-$25,000",
          subtitle: "200-400 sq ft enclosure",
          features: [
            "Screen installation",
            "Roof structure",
            "Flooring options",
            "Electrical & ceiling fan",
          ],
        },
      ],
    },
    additionalSections: [
      {
        title: "Popular Materials & Options",
        cards: [
          {
            title: "Siding Materials",
            items: [
              "Vinyl: Low maintenance, affordable",
              "Fiber Cement: Durable, fire-resistant",
              "Wood: Classic, natural beauty",
              "Stone/Brick: Premium, long-lasting",
              "Stucco: Mediterranean appeal",
            ],
          },
          {
            title: "Decking Options",
            items: [
              "Composite: Low maintenance, no splinters",
              "Pressure-Treated: Budget-friendly",
              "Cedar: Natural rot resistance",
              "Ipe/Tropical: Extremely durable",
              "PVC: Waterproof longevity",
            ],
          },
          {
            title: "Patio Materials",
            items: [
              "Pavers: Versatile, easy repair",
              "Natural Stone: Unique, elegant",
              "Stamped Concrete: Custom patterns",
              "Bluestone: Classic and durable",
              "Travertine: Luxury appearance",
            ],
          },
          {
            title: "Outdoor Kitchen Finishes",
            items: [
              "Granite: Heat-resistant, durable",
              "Concrete: Custom, modern",
              "Tile: Colorful, versatile",
              "Stainless Steel: Weather-resistant",
              "Stone: Natural, rustic",
            ],
          },
        ],
      },
    ],
    cta: {
      title: "Ready to Transform Your Outdoor Space?",
      description:
        "Schedule your free consultation and receive a detailed estimate for your exterior project.",
      primary: { label: "Get Free Estimate", href: "/quote" },
      secondary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
    },
  },
  "emergency-repair": {
    slug: "emergency-repair",
    metaTitle:
      "Emergency Construction Repair | 24/7 Response | Kealee Construction",
    metaDescription:
      "24/7 emergency construction repairs for storm damage, structural issues, leaks, and urgent restoration.",
    hero: {
      badge: "Emergency Repair",
      title: "Emergency Construction Repair",
      subtitle: "24/7 Response When Your Home Needs Immediate Attention",
      description:
        "Storm damage, leaks, or structural emergencies can’t wait. Our rapid response team secures your property and restores safety fast.",
      ctaPrimary: { label: "Call (443) 852-9890", href: "tel:4438529890" },
      ctaSecondary: { label: "Request Emergency Help", href: "/contact" },
    },
    intro: {
      title: "Rapid Response. Reliable Repairs.",
      paragraphs: [
        "When unexpected disasters strike, Kealee Construction mobilizes quickly. We secure the site, prevent further damage, and restore critical systems.",
        "Our licensed professionals coordinate with insurance adjusters, provide transparent documentation, and guide you from initial response to final repair.",
      ],
    },
    featureGroups: [
      {
        title: "⛈️ Storm Damage Repair",
        items: [
          "Emergency roof tarping",
          "Tree removal coordination",
          "Window & door boarding",
          "Structural assessment",
          "Insurance documentation",
          "Permanent repair services",
        ],
      },
      {
        title: "💧 Water Damage Mitigation",
        items: [
          "Emergency water extraction",
          "Leak detection & repair",
          "Drying & dehumidification",
          "Mold prevention treatments",
          "Structural drying services",
          "Full restoration solutions",
        ],
      },
      {
        title: "🏗️ Structural Emergency Repairs",
        items: [
          "Foundation stabilization",
          "Wall & ceiling collapse response",
          "Beam & support replacement",
          "Emergency shoring",
          "Safety inspections",
          "Temporary stabilization",
        ],
      },
      {
        title: "🔥 Fire & Smoke Damage",
        items: [
          "Structural assessments",
          "Board-up services",
          "Smoke & soot removal",
          "Odor elimination",
          "Complete rebuilding",
          "Insurance assistance",
        ],
      },
      {
        title: "🔨 Emergency Roof Repairs",
        items: [
          "Leak repair services",
          "Missing shingle replacement",
          "Emergency tarping",
          "Gutter repairs",
          "Ice dam removal",
          "24-hour response teams",
        ],
      },
      {
        title: "⚡ Electrical & Plumbing Emergencies",
        items: [
          "Licensed trade coordination",
          "Structural access for repairs",
          "Wall & ceiling opening/repair",
          "Emergency shutoffs",
          "Damage mitigation support",
          "Complete restoration",
        ],
      },
    ],
    pricing: {
      title: "Emergency Service Expectations",
      description:
        "Every emergency is unique. After stabilizing the situation, we provide transparent estimates for restoration.",
      cards: [
        {
          title: "Immediate Response Fee",
          price: "$350-$750",
          description:
            "Covers mobilization, emergency repairs, tarping, or board-up services.",
        },
        {
          title: "Water Mitigation",
          price: "$1,500-$6,000",
          description:
            "Includes water extraction, drying equipment, and moisture mitigation.",
        },
        {
          title: "Roof & Structural Repair",
          price: "Varies by scope",
          description:
            "Structural stabilization, framing, and roof reconstruction tailored to damage.",
        },
        {
          title: "Insurance Coordination",
          price: "Included",
          description:
            "We provide documentation, estimates, and communication support for claims.",
        },
      ],
    },
    cta: {
      title: "Emergency? Call Us Now!",
      description:
        "24/7 emergency response team standing by to secure your home and begin restoration.",
      primary: { label: "Call (443) 852-9890 Now", href: "tel:4438529890" },
      secondary: { label: "Request Emergency Service", href: "/contact" },
    },
  },
};

export const serviceSlugs = Object.keys(servicesContent) as ServiceSlug[];
