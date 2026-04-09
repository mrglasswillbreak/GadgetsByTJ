import { z } from 'zod';

export const ProductSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().nullable().optional(),
  price: z.string().nullable().optional(),
  categoryId: z.number().int().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  images: z.array(z.string().url()).optional(),
  specs: z.record(z.string()).optional(),
  inStock: z.boolean().optional(),
  featured: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export const CategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  description: z.string().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  displayOrder: z.number().int().optional(),
});

export const DeviceSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  slug: z.string().min(1, 'Slug is required'),
  brand: z.string().nullable().optional(),
  deviceType: z.string().min(1, 'Device type is required'),
  description: z.string().nullable().optional(),
  imageUrl: z.string().url().nullable().optional(),
  specs: z.record(z.string()).optional(),
  featured: z.boolean().optional(),
  displayOrder: z.number().int().optional(),
});

export const GalleryImageSchema = z.object({
  url: z.string().url('URL is required'),
  alt: z.string().nullable().optional(),
  deviceId: z.number().int().nullable().optional(),
  productId: z.number().int().nullable().optional(),
  displayOrder: z.number().int().optional(),
});

export const SettingsBatchSchema = z.object({
  settings: z.record(z.string()),
});
