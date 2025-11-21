export type GalleryItem = {
  title: string;
  description: string;
  location: string;
  tags: string[];
  image?: string;
};

export const galleryFilters = [
  "All",
  "Kitchens",
  "Bathrooms",
  "Home Additions",
  "ADA Accessibility",
  "Tiny Homes",
  "Energy Upgrades",
];

export const galleryProjects: GalleryItem[] = [
  {
    title: "Modern Kitchen Renovation",
    description:
      "Complete kitchen transformation with custom cabinets, quartz countertops, and modern appliances.",
    location: "Washington DC",
    tags: ["Kitchen"],
  },
  {
    title: "Two-Story Home Addition",
    description:
      "800 sq ft addition including master suite and family room expansion.",
    location: "Prince George County, MD",
    tags: ["Home Addition"],
  },
  {
    title: "Luxury Master Bathroom",
    description:
      "Spa-inspired bathroom with walk-in shower, soaking tub, and double vanity.",
    location: "Montgomery County, MD",
    tags: ["Bathroom"],
  },
  {
    title: "ADA-Compliant Bathroom Remodel",
    description:
      "Wheelchair accessible bathroom with roll-in shower and grab bars.",
    location: "Northern Virginia",
    tags: ["ADA Accessibility"],
  },
  {
    title: "Backyard ADU",
    description:
      "500 sq ft accessory dwelling unit with full kitchen and bathroom.",
    location: "Baltimore, MD",
    tags: ["Tiny Homes"],
  },
  {
    title: "Kitchen & Dining Expansion",
    description:
      "Opened up kitchen to create modern open-concept living space.",
    location: "Southern Maryland",
    tags: ["Kitchen"],
  },
  {
    title: "Guest Suite Addition",
    description:
      "400 sq ft in-law suite with bedroom, bathroom, and kitchenette.",
    location: "Washington DC",
    tags: ["Home Addition"],
  },
  {
    title: "Contemporary Bathroom Renovation",
    description:
      "Powder room transformation with floating vanity and designer tile.",
    location: "Prince George County, MD",
    tags: ["Bathroom"],
  },
  {
    title: "Energy-Efficient Home Upgrade",
    description:
      "Solar panels, new windows, and complete insulation upgrade.",
    location: "Montgomery County, MD",
    tags: ["Energy Upgrades"],
  },
];
