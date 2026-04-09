import type { Metadata } from 'next';
import ProductForm from '@/components/admin/ProductForm';
import { db } from '@/lib/db';
import type { Category } from '@/types';

export const metadata: Metadata = {
  title: 'New Product — GadgetsByTJ Admin',
};

async function getCategories(): Promise<Category[]> {
  try {
    const rows = await db.query.categories.findMany({ orderBy: (c, { asc }) => [asc(c.name)] });
    return rows.map((r) => ({ ...r, displayOrder: r.displayOrder ?? 0 }));
  } catch {
    return [];
  }
}

export default async function NewProductPage() {
  const categories = await getCategories();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">New Product</h2>
      <ProductForm categories={categories} />
    </div>
  );
}
