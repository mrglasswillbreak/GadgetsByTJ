export interface Admin {
  id: number;
  email: string;
  passwordHash: string;
  createdAt: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  imageUrl: string | null;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  price: string | null;
  categoryId: number | null;
  imageUrl: string | null;
  images: string[];
  specs: Record<string, string>;
  inStock: boolean;
  featured: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Device {
  id: number;
  name: string;
  slug: string;
  brand: string | null;
  deviceType: string;
  description: string | null;
  specs: Record<string, string>;
  imageUrl: string | null;
  featured: boolean;
  displayOrder: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GalleryImage {
  id: number;
  url: string;
  alt: string | null;
  deviceId: number | null;
  productId: number | null;
  displayOrder: number;
  createdAt: Date;
}

export interface SiteSetting {
  id: number;
  key: string;
  value: string | null;
  updatedAt: Date;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  url: string;
}
