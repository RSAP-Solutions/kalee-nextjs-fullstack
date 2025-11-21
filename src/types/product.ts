export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  slug: string;
  inStock: boolean;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};

