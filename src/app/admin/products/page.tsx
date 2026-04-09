import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Products — GadgetsByTJ Admin',
};

async function getProducts() {
  try {
    return await db.query.products.findMany({
      orderBy: (p, { desc }) => [desc(p.createdAt)],
      with: { category: true },
    });
  } catch {
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Products</h2>
          <p className="text-sm text-gray-500">{products.length} product{products.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/products/new"
          aria-label="Add new product"
          className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm min-h-[44px]"
        >
          <span>+</span> Add New Product
        </Link>
      </div>

      {/* Search (visual placeholder) */}
      <input
        type="search"
        placeholder="Search products…"
        aria-label="Search products"
        className="w-full sm:max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
      />

      {products.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-gray-400 text-lg mb-4">📦</p>
          <p className="text-gray-600 font-medium">No products yet</p>
          <p className="text-gray-400 text-sm mt-1">Create your first product to get started.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Image</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Category</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Price</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Stock</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Featured</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded-lg" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">📦</div>
                      )}
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900">{product.name}</td>
                    <td className="px-4 py-3 text-gray-500">{product.category?.name ?? '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{product.price ? `$${product.price}` : '—'}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.inStock ? 'In Stock' : 'Out'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {product.featured && <span className="text-yellow-500">⭐</span>}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          aria-label={`Edit ${product.name}`}
                          className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium transition-colors min-h-[44px] flex items-center"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-start gap-3">
                  {product.imageUrl ? (
                    <img src={product.imageUrl} alt={product.name} className="w-14 h-14 object-cover rounded-lg flex-shrink-0" />
                  ) : (
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">📦</div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{product.name}</p>
                    <p className="text-sm text-gray-500">{product.category?.name ?? 'Uncategorized'}</p>
                    <p className="text-sm font-medium text-gray-700">{product.price ? `$${product.price}` : 'No price'}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    aria-label={`Edit ${product.name}`}
                    className="flex-1 text-center py-2 text-blue-600 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-50 min-h-[44px] flex items-center justify-center"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton id={product.id} name={product.name} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DeleteProductButton({ id, name }: { id: number; name: string }) {
  return (
    <form
      action={async () => {
        'use server';
        const { auth } = await import('@/lib/auth/config');
        const session = await auth();
        if (!session?.user) return;
        try {
          const { db } = await import('@/lib/db');
          const { products } = await import('@/lib/db/schema');
          const { eq } = await import('drizzle-orm');
          await db.delete(products).where(eq(products.id, id));
        } catch {}
      }}
    >
      <button
        type="submit"
        aria-label={`Delete ${name}`}
        onClick={(e) => { if (!confirm(`Delete "${name}"?`)) e.preventDefault(); }}
        className="px-3 py-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg text-xs font-medium transition-colors min-h-[44px] flex items-center"
      >
        Delete
      </button>
    </form>
  );
}
