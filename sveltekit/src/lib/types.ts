export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: 'Unitree' | 'Accessori' | string;
  category: string;
  solutionSlug: string;
  priceEur: number;
  currency: 'EUR' | string;
  shortDescription: string;
  description: string;
  features: string[];
  images: string[]; // public URLs
  createdAt: string; // ISO
};

export type CartItem = {
  productId: string;
  qty: number;
};

export type Order = {
  id: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    notes?: string;
  };
  items: Array<{
    productId: string;
    qty: number;
    unitPriceEur: number;
    name: string;
  }>;
  totals: {
    subtotalEur: number;
    totalEur: number;
  };
};
