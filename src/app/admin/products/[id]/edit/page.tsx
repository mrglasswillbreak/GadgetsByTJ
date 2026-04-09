import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProductForm from '@/components/admin/ProductForm';
import { db } from '@/lib/db';
import { products } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import type { Category } from '@/types';

export const metadata: Metadata = {
  title: 'Edit Product — GadgetsByTJ Admin',
};

async function getCategories(): Promise<Category[]> {
  try {
    return await db.query.categories.findMany({ orderBy: (c, { asc }) => [asc(c.name)] });
  } catch {
    return [];
  }
}

async function getProduct(id: number) {
  try {
    return await db.query.products.findFirst({ where: eq(products.id, id) });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const all = await db.query.products.findMany({ columns: { id: true } });
    return all.map((p) => ({ id: String(p.id) }));
  } catch {
    return [];
  }
}

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  const [product, categories] = await Promise.all([getProduct(id), getCategories()]);
  if (!product) notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Edit Product</h2>
      <ProductForm initialData={product} categories={categories} productId={id} />
    </div>
  );
}
