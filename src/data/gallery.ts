export type GalleryItem = {
  title: string;
  description: string;
  location: string;
  tags: string[];
  image?: string;
  images?: string[];
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
    image:
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Two-Story Home Addition",
    description:
      "800 sq ft addition including master suite and family room expansion.",
    location: "Prince George County, MD",
    tags: ["Home Addition"],
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1502672023488-70e25813eb80?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505692794400-38a5b996e8c6?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Luxury Master Bathroom",
    description:
      "Spa-inspired bathroom with walk-in shower, soaking tub, and double vanity.",
    location: "Montgomery County, MD",
    tags: ["Bathroom"],
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "ADA-Compliant Bathroom Remodel",
    description:
      "Wheelchair accessible bathroom with roll-in shower and grab bars.",
    location: "Northern Virginia",
    tags: ["ADA Accessibility"],
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Backyard ADU",
    description:
      "500 sq ft accessory dwelling unit with full kitchen and bathroom.",
    location: "Baltimore, MD",
    tags: ["Tiny Homes"],
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Kitchen & Dining Expansion",
    description:
      "Opened up kitchen to create modern open-concept living space.",
    location: "Southern Maryland",
    tags: ["Kitchen"],
    image:
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Guest Suite Addition",
    description:
      "400 sq ft in-law suite with bedroom, bathroom, and kitchenette.",
    location: "Washington DC",
    tags: ["Home Addition"],
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1493666438817-866a91353ca9?auto=format&fit=crop&w=1400&q=80",
    ],
  },
  {
    title: "Contemporary Bathroom Renovation",
    description:
      "Powder room transformation with floating vanity and designer tile.",
    location: "Prince George County, MD",
    tags: ["Bathroom"],
    image:
      "https://images.unsplash.com/photo-1557682260-96773eb01377?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1557682260-96773eb01377?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=80",
    ],
  },
  {
    title: "Energy-Efficient Home Upgrade",
    description:
      "Solar panels, new windows, and complete insulation upgrade.",
    location: "Montgomery County, MD",
    tags: ["Energy Upgrades"],
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=80",
    images: [
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=80",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1400&q=80",
    ],
  },
];
