import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Categories — GadgetsByTJ Admin',
};

async function getCategories() {
  try {
    return await db.query.categories.findMany({ orderBy: (c, { asc }) => [asc(c.displayOrder), asc(c.name)] });
  } catch {
    return [];
  }
}

export default async function CategoriesPage() {
  const cats = await getCategories();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
          <p className="text-sm text-gray-500">{cats.length} categor{cats.length !== 1 ? 'ies' : 'y'}</p>
        </div>
        <Link
          href="/admin/categories/new"
          aria-label="Add new category"
          className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors min-h-[44px]"
        >
          <span>+</span> Add Category
        </Link>
      </div>

      {cats.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-gray-400 text-lg mb-2">🗂️</p>
          <p className="text-gray-600 font-medium">No categories yet</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden sm:table-cell">Slug</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600 hidden md:table-cell">Description</th>
                <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {cats.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-4 py-3 text-gray-500 font-mono text-xs hidden sm:table-cell">{cat.slug}</td>
                  <td className="px-4 py-3 text-gray-500 hidden md:table-cell">{cat.description ?? '—'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/categories/${cat.id}/edit`}
                        aria-label={`Edit ${cat.name}`}
                        className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium min-h-[44px] flex items-center"
                      >
                        Edit
                      </Link>
                      <DeleteCategoryButton id={cat.id} name={cat.name} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function DeleteCategoryButton({ id, name }: { id: number; name: string }) {
  return (
    <form
      action={async () => {
        'use server';
        const { auth } = await import('@/lib/auth/config');
        const session = await auth();
        if (!session?.user) return;
        try {
          const { db } = await import('@/lib/db');
          const { categories } = await import('@/lib/db/schema');
          const { eq } = await import('drizzle-orm');
          await db.delete(categories).where(eq(categories.id, id));
        } catch {}
      }}
    >
      <button
        type="submit"
        aria-label={`Delete ${name}`}
        onClick={(e) => { if (!confirm(`Delete category "${name}"?`)) e.preventDefault(); }}
        className="px-3 py-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg text-xs font-medium min-h-[44px] flex items-center"
      >
        Delete
      </button>
    </form>
  );
}
