import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import CategoryForm from '@/components/admin/CategoryForm';
import { db } from '@/lib/db';
import { categories } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const metadata: Metadata = {
  title: 'Edit Category — GadgetsByTJ Admin',
};

async function getCategory(id: number) {
  try {
    return await db.query.categories.findFirst({ where: eq(categories.id, id) });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const all = await db.query.categories.findMany({ columns: { id: true } });
    return all.map((c) => ({ id: String(c.id) }));
  } catch {
    return [];
  }
}

export default async function EditCategoryPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();
  const category = await getCategory(id);
  if (!category) notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Edit Category</h2>
      <CategoryForm initialData={category} categoryId={id} />
    </div>
  );
}
