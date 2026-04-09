import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Dashboard — GadgetsByTJ Admin',
};

async function getStats() {
  try {
    const [products, devices, categories] = await Promise.all([
      db.query.products.findMany({ columns: { id: true } }),
      db.query.devices.findMany({ columns: { id: true } }),
      db.query.categories.findMany({ columns: { id: true } }),
    ]);
    return {
      products: products.length,
      devices: devices.length,
      categories: categories.length,
      lastUpdated: new Date().toLocaleDateString(),
    };
  } catch {
    return { products: 0, devices: 0, categories: 0, lastUpdated: '—' };
  }
}

export default async function DashboardPage() {
  const stats = await getStats();

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: '📦', href: '/admin/products' },
    { label: 'Total Devices', value: stats.devices, icon: '📱', href: '/admin/devices' },
    { label: 'Total Categories', value: stats.categories, icon: '🗂️', href: '/admin/categories' },
    { label: 'Last Updated', value: stats.lastUpdated, icon: '🕐', href: null },
  ];

  const quickActions = [
    { label: 'Add Product', href: '/admin/products/new', icon: '➕' },
    { label: 'Add Device', href: '/admin/devices/new', icon: '📲' },
    { label: 'Edit Settings', href: '/admin/settings', icon: '⚙️' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Overview</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <div
              key={card.label}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-4"
            >
              <div className="text-3xl">{card.icon}</div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm text-gray-500">{card.label}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          {quickActions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              aria-label={action.label}
              className="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors min-h-[44px]"
            >
              <span>{action.icon}</span>
              <span>{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">Recent Activity</h2>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="space-y-3">
            {[
              { text: 'Admin panel initialized', time: 'Just now', icon: '✅' },
              { text: 'Database schema ready', time: 'Today', icon: '🗄️' },
              { text: 'Site settings available', time: 'Today', icon: '⚙️' },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-lg">{item.icon}</span>
                <span className="flex-1 text-gray-700">{item.text}</span>
                <span className="text-gray-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
