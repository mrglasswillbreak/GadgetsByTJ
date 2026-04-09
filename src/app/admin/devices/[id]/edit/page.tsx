import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import DeviceForm from '@/components/admin/DeviceForm';
import { db } from '@/lib/db';
import { devices } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export const metadata: Metadata = {
  title: 'Edit Device — GadgetsByTJ Admin',
};

async function getDevice(id: number) {
  try {
    return await db.query.devices.findFirst({ where: eq(devices.id, id) });
  } catch {
    return null;
  }
}

export async function generateStaticParams() {
  try {
    const all = await db.query.devices.findMany({ columns: { id: true } });
    return all.map((d) => ({ id: String(d.id) }));
  } catch {
    return [];
  }
}

export default async function EditDevicePage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) notFound();
  const device = await getDevice(id);
  if (!device) notFound();

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Edit Device</h2>
      <DeviceForm
        initialData={{
          ...device,
          specs: device.specs ?? {},
          featured: device.featured ?? false,
          displayOrder: device.displayOrder ?? 0,
        }}
        deviceId={id}
      />
    </div>
  );
}
