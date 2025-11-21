import { Product, ProductCategory } from "@/types/product";

export const categories: ProductCategory[] = [
  { id: "all", name: "All Products", slug: "all" },
  { id: "energy", name: "Energy Upgrades", slug: "energy" },
  { id: "hvac", name: "HVAC Services", slug: "hvac" },
  { id: "plumbing", name: "Plumbing Services", slug: "plumbing" },
  { id: "carpentry", name: "Carpentry and Repairs", slug: "carpentry" },
  { id: "painting", name: "Painting and Drywall", slug: "painting" },
  { id: "exterior", name: "Exterior Upgrades", slug: "exterior" },
  { id: "electrical", name: "Electrical and Technology Services", slug: "electrical" },
  { id: "accessibility", name: "Accessibility Upgrades", slug: "accessibility" },
];

export const products: Product[] = [
  {
    id: "1",
    title: "Energy Starter Pack",
    description:
      "Optimize your home's energy efficiency with this starter pack. Reduce electricity consumption and improve climate control with professionally installed LED lighting, a programmable thermostat, and energy-efficient HVAC filters.",
    price: 1500.0,
    image: "/products/energy-starter-pack.jpg",
    category: "energy",
    slug: "energy-starter-pack",
    inStock: true,
  },
  {
    id: "2",
    title: "Green Home Combo",
    description:
      "Complete home energy upgrade package including insulation improvements, smart home integration, and renewable energy preparation. Transform your home into an eco-efficient living space.",
    price: 7200.0,
    image: "/products/green-home-combo.jpg",
    category: "energy",
    slug: "green-home-combo",
    inStock: true,
  },
  {
    id: "3",
    title: "Eco Efficiency Supreme",
    description:
      "Premium energy upgrade package featuring solar-ready infrastructure, whole-home automation, high-efficiency windows, and comprehensive insulation. Maximum energy savings and comfort.",
    price: 18500.0,
    image: "/products/eco-efficiency-supreme.jpg",
    category: "energy",
    slug: "eco-efficiency-supreme",
    inStock: true,
  },
  {
    id: "4",
    title: "HVAC Complete System",
    description:
      "Professional HVAC installation and service package including central air conditioning, heating system, ductwork, and smart thermostat integration. Keep your home comfortable year-round.",
    price: 8500.0,
    image: "/products/hvac-system.jpg",
    category: "hvac",
    slug: "hvac-complete-system",
    inStock: true,
  },
  {
    id: "5",
    title: "Smart Plumbing Upgrade",
    description:
      "Modern plumbing solutions including water-efficient fixtures, tankless water heater installation, leak detection systems, and pipe replacement services.",
    price: 4200.0,
    image: "/products/plumbing-upgrade.jpg",
    category: "plumbing",
    slug: "smart-plumbing-upgrade",
    inStock: true,
  },
  {
    id: "6",
    title: "Custom Carpentry Package",
    description:
      "Expert carpentry services including custom built-ins, cabinetry, trim work, and structural repairs. Quality craftsmanship for your renovation needs.",
    price: 5500.0,
    image: "/products/carpentry-package.jpg",
    category: "carpentry",
    slug: "custom-carpentry-package",
    inStock: true,
  },
  {
    id: "7",
    title: "Interior Paint & Drywall",
    description:
      "Complete interior painting and drywall services including texture work, priming, premium paint application, and trim painting. Professional finish guaranteed.",
    price: 2800.0,
    image: "/products/paint-drywall.jpg",
    category: "painting",
    slug: "interior-paint-drywall",
    inStock: true,
  },
  {
    id: "8",
    title: "Exterior Renovation Suite",
    description:
      "Comprehensive exterior upgrade package including siding, roofing, windows, doors, and outdoor living spaces. Enhance your home's curb appeal and value.",
    price: 12500.0,
    image: "/products/exterior-renovation.jpg",
    category: "exterior",
    slug: "exterior-renovation-suite",
    inStock: true,
  },
  {
    id: "9",
    title: "Smart Home Technology",
    description:
      "Complete smart home integration including lighting automation, security systems, voice control, and energy monitoring. Transform your home into a connected living space.",
    price: 6800.0,
    image: "/products/smart-home.jpg",
    category: "electrical",
    slug: "smart-home-technology",
    inStock: true,
  },
  {
    id: "10",
    title: "Accessibility Essentials",
    description:
      "Universal design solutions including wheelchair ramps, accessible bathrooms, stair lifts, and wider doorways. Make your home safe and accessible for everyone.",
    price: 9200.0,
    image: "/products/accessibility.jpg",
    category: "accessibility",
    slug: "accessibility-essentials",
    inStock: true,
  },
];

export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

export const getProductsByCategory = (categorySlug: string): Product[] => {
  if (categorySlug === "all") {
    return products;
  }
  return products.filter((product) => product.category === categorySlug);
};

