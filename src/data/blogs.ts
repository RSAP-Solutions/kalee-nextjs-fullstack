export type BlogContentSection = {
  heading: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  icon: string;
  category: string;
  date: string;
  readTime: string;
  title: string;
  excerpt: string;
  description: string;
  sections: BlogContentSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "signs-your-home-needs-an-addition",
    icon: "🏠",
    category: "Home Additions",
    date: "March 15, 2025",
    readTime: "6 min read",
    title: "10 Signs Your Home Needs an Addition",
    excerpt:
      "Is your family growing? Running out of space? Learn the top 10 indicators that it's time to consider a home addition and how it can increase your property value.",
    description:
      "Discover the most common signals that your home needs more space and how a strategic addition can elevate comfort, function, and resale value.",
    sections: [
      {
        heading: "Why Additions Matter in 2025",
        paragraphs: [
          "Open concept living and multi-generational households continue to drive demand for added square footage. Rather than relocating, many DMV homeowners are choosing additions that retain neighborhood roots while unlocking new functionality.",
        ],
      },
      {
        heading: "Key Indicators You Need More Space",
        paragraphs: [
          "From cramped kitchens to minimal storage, there are a number of clues that your current layout is no longer working.",
        ],
        list: [
          "Your household has outgrown bedrooms or living areas.",
          "Home offices and flex rooms are competing for the same footprint.",
          "Storage solutions feel temporary or overcrowded.",
          "You’re planning for aging parents or long-term guests.",
          "Outdoor spaces could connect better with indoor living.",
        ],
      },
      {
        heading: "Popular Addition Concepts",
        paragraphs: [
          "Sunrooms, bump-outs, and second-story suites remain top requests. Each adds value differently, so pairing your wishlist with zoning allowances is essential.",
        ],
      },
      {
        heading: "Budgeting & Timeline Expectations",
        paragraphs: [
          "Expect 3–6 months from design to final inspection for a typical addition. Transparent estimates, contingency planning, and a realistic schedule help keep the project on-track.",
        ],
      },
      {
        heading: "Next Steps",
        paragraphs: [
          "A Tier 2 or Tier 3 consultation provides detailed feasibility insight, from structural requirements to finish selections. We guide homeowners through permits, budgeting, and phasing so the expansion feels seamless.",
        ],
      },
    ],
  },
  {
    slug: "kitchen-renovation-cost-guide-2025",
    icon: "💰",
    category: "Cost Guides",
    date: "March 12, 2025",
    readTime: "7 min read",
    title: "Kitchen Renovation Cost Guide 2025",
    excerpt:
      "Planning a kitchen remodel? Get a detailed breakdown of costs, from cabinets to countertops, and learn how to maximize your budget for the best results.",
    description:
      "A 2025 cost breakdown for kitchen renovations in the DMV region, covering cabinetry, surfaces, appliances, and smart upgrades.",
    sections: [
      {
        heading: "Budget Ranges Explained",
        paragraphs: [
          "Cabinetry and surfaces dominate most kitchen budgets. Understanding where money is best allocated helps align design goals with realistic pricing.",
        ],
        list: [
          "Refresh: $12,000 – $18,000",
          "Full Remodel: $18,000 – $35,000",
          "Luxury Chef’s Kitchen: $35,000+",
        ],
      },
      {
        heading: "Cost Drivers to Watch",
        paragraphs: [
          "Structural changes, utility relocations, and premium appliances can quickly increase scope. Early planning keeps surprises at bay.",
        ],
      },
      {
        heading: "Value Engineering Tips",
        paragraphs: [
          "Mixing stock and custom cabinetry, choosing durable quartz over natural stone, and leveraging manufacturer promotions can balance savings with quality.",
        ],
      },
    ],
  },
  {
    slug: "ada-compliance-for-home-renovations",
    icon: "♿",
    category: "ADA Compliance",
    date: "March 8, 2025",
    readTime: "5 min read",
    title: "ADA Compliance for Home Renovations: What You Need to Know",
    excerpt:
      "Making your home accessible? Understand the essential ADA requirements, from doorway widths to bathroom modifications, ensuring safety and compliance.",
    description:
      "Explore the core elements of ADA-compliant renovations, including clearances, fixtures, and universal design considerations.",
    sections: [
      {
        heading: "Understanding ADA Standards at Home",
        paragraphs: [
          "While single-family homes aren’t legally bound to ADA, incorporating universal design keeps spaces inclusive and future-proofs your property.",
        ],
      },
      {
        heading: "Bathroom Essentials",
        paragraphs: [
          "Zero-threshold showers, grab bars, and comfort-height fixtures are baseline upgrades for accessibility.",
        ],
      },
      {
        heading: "Whole-Home Considerations",
        paragraphs: [
          "Doorways at 36 inches, lever-style hardware, and open floor plans support mobility equipment without sacrificing aesthetics.",
        ],
      },
    ],
  },
  {
    slug: "adu-construction-guide-maryland",
    icon: "🏡",
    category: "Tiny Homes",
    date: "March 1, 2025",
    readTime: "6 min read",
    title: "ADU Construction Guide: Building a Rental Unit in Maryland",
    excerpt:
      "Accessory Dwelling Units are a smart investment. Learn about zoning regulations, construction costs, and rental income potential in the Maryland area.",
    description:
      "A starter roadmap for building an ADU in the DMV region, covering feasibility, zoning, utilities, and rental strategy.",
    sections: [
      {
        heading: "Why Build an ADU?",
        paragraphs: [
          "ADUs provide multigenerational living, rental income, or flexible workspace. Local municipalities now offer clearer pathways to approval.",
        ],
      },
      {
        heading: "Steps to Get Started",
        list: [
          "Verify zoning setbacks and lot coverage allowances.",
          "Determine utility connections and capacity upgrades.",
          "Finalize design with accessibility and privacy in mind.",
          "Plan for parking, landscape integration, and tenant access.",
        ],
        paragraphs: [
          "A feasibility consultation outlines permitting steps, realistic budgets, and financing options tailored to ADU projects.",
        ],
      },
    ],
  },
  {
    slug: "energy-efficient-upgrades-that-pay-off",
    icon: "⚡",
    category: "Energy Efficiency",
    date: "February 26, 2025",
    readTime: "4 min read",
    title: "Top 7 Energy-Efficient Upgrades That Pay for Themselves",
    excerpt:
      "Reduce energy bills while increasing home value. Explore the most cost-effective energy upgrades, from insulation to solar panels, with ROI timelines.",
    description:
      "Seven high-impact energy improvements with estimated ROI timelines for homeowners across DC, Maryland, and Virginia.",
    sections: [
      {
        heading: "Priority Upgrades",
        list: [
          "Air sealing and attic insulation",
          "High-performance windows and doors",
          "Heat pump HVAC systems",
          "Smart thermostats and zoned controls",
          "LED lighting conversions",
          "Solar-ready electrical infrastructure",
          "Tankless water heaters",
        ],
        paragraphs: [
          "Bundling energy upgrades with renovation projects can reduce overall labor costs and qualify for regional incentives.",
        ],
      },
      {
        heading: "Leveraging Incentives",
        paragraphs: [
          "State and federal credits, including the Inflation Reduction Act, offer rebates for qualifying projects. Documenting improvements with your contractor ensures compliance.",
        ],
      },
    ],
  },
];

export const blogSlugs = blogPosts.map((post) => post.slug);

export const findBlogPost = (slug: string) =>
  blogPosts.find((post) => post.slug === slug);
