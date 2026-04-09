import { pgTable, text, integer, boolean, timestamp, serial, decimal, jsonb } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const admins = pgTable('admins', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const categories = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  imageUrl: text('image_url'),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }),
  categoryId: integer('category_id').references(() => categories.id),
  imageUrl: text('image_url'),
  images: jsonb('images').$type<string[]>().default([]),
  specs: jsonb('specs').$type<Record<string, string>>().default({}),
  inStock: boolean('in_stock').default(true),
  featured: boolean('featured').default(false),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const devices = pgTable('devices', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  slug: text('slug').notNull().unique(),
  brand: text('brand'),
  deviceType: text('device_type').notNull(),
  description: text('description'),
  specs: jsonb('specs').$type<Record<string, string>>().default({}),
  imageUrl: text('image_url'),
  featured: boolean('featured').default(false),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const galleryImages = pgTable('gallery_images', {
  id: serial('id').primaryKey(),
  url: text('url').notNull(),
  alt: text('alt'),
  deviceId: integer('device_id').references(() => devices.id, { onDelete: 'cascade' }),
  productId: integer('product_id').references(() => products.id, { onDelete: 'cascade' }),
  displayOrder: integer('display_order').default(0),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const siteSettings = pgTable('site_settings', {
  id: serial('id').primaryKey(),
  key: text('key').notNull().unique(),
  value: text('value'),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export type Admin = typeof admins.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Device = typeof devices.$inferSelect;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type SiteSetting = typeof siteSettings.$inferSelect;

// Relations
export const categoriesRelations = relations(categories, ({ many }) => ({
  products: many(products),
}));

export const productsRelations = relations(products, ({ one, many }) => ({
  category: one(categories, {
    fields: [products.categoryId],
    references: [categories.id],
  }),
  galleryImages: many(galleryImages),
}));

export const devicesRelations = relations(devices, ({ many }) => ({
  galleryImages: many(galleryImages),
}));

export const galleryImagesRelations = relations(galleryImages, ({ one }) => ({
  product: one(products, {
    fields: [galleryImages.productId],
    references: [products.id],
  }),
  device: one(devices, {
    fields: [galleryImages.deviceId],
    references: [devices.id],
  }),
}));
