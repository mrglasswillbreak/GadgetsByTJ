import Link from 'next/link';
import type { Metadata } from 'next';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Devices — GadgetsByTJ Admin',
};

async function getDevices() {
  try {
    return await db.query.devices.findMany({ orderBy: (d, { asc }) => [asc(d.deviceType), asc(d.name)] });
  } catch {
    return [];
  }
}

export default async function DevicesPage() {
  const devs = await getDevices();
  const deviceTypes = Array.from(new Set(devs.map((d) => d.deviceType)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Devices</h2>
          <p className="text-sm text-gray-500">{devs.length} device{devs.length !== 1 ? 's' : ''}</p>
        </div>
        <Link
          href="/admin/devices/new"
          aria-label="Add new device"
          className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm transition-colors min-h-[44px]"
        >
          <span>+</span> Add Device
        </Link>
      </div>

      {/* Type filter pills */}
      {deviceTypes.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {deviceTypes.map((type) => (
            <span key={type} className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
              {type}
            </span>
          ))}
        </div>
      )}

      {devs.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-gray-400 text-lg mb-2">📱</p>
          <p className="text-gray-600 font-medium">No devices yet</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Name</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Brand</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Type</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Featured</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {devs.map((dev) => (
                  <tr key={dev.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{dev.name}</td>
                    <td className="px-4 py-3 text-gray-500">{dev.brand ?? '—'}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">{dev.deviceType}</span>
                    </td>
                    <td className="px-4 py-3">{dev.featured && <span className="text-yellow-500">⭐</span>}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/devices/${dev.id}/edit`} aria-label={`Edit ${dev.name}`} className="px-3 py-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-lg text-xs font-medium min-h-[44px] flex items-center">Edit</Link>
                        <DeleteDeviceButton id={dev.id} name={dev.name} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {devs.map((dev) => (
              <div key={dev.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
                <div className="flex items-start gap-3">
                  {dev.imageUrl ? (
                    <img src={dev.imageUrl} alt={dev.name} className="w-12 h-12 object-cover rounded-lg flex-shrink-0" />
                  ) : (
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">📱</div>
                  )}
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{dev.name}</p>
                    <p className="text-sm text-gray-500">{dev.brand ?? ''} · {dev.deviceType}</p>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Link href={`/admin/devices/${dev.id}/edit`} aria-label={`Edit ${dev.name}`} className="flex-1 text-center py-2 text-blue-600 border border-blue-200 rounded-lg text-sm font-medium hover:bg-blue-50 min-h-[44px] flex items-center justify-center">Edit</Link>
                  <DeleteDeviceButton id={dev.id} name={dev.name} />
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function DeleteDeviceButton({ id, name }: { id: number; name: string }) {
  return (
    <form
      action={async () => {
        'use server';
        const { auth } = await import('@/lib/auth/config');
        const session = await auth();
        if (!session?.user) return;
        try {
          const { db } = await import('@/lib/db');
          const { devices } = await import('@/lib/db/schema');
          const { eq } = await import('drizzle-orm');
          await db.delete(devices).where(eq(devices.id, id));
        } catch {}
      }}
    >
      <button
        type="submit"
        aria-label={`Delete ${name}`}
        onClick={(e) => { if (!confirm(`Delete device "${name}"?`)) e.preventDefault(); }}
        className="px-3 py-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-lg text-xs font-medium min-h-[44px] flex items-center"
      >
        Delete
      </button>
    </form>
  );
}
