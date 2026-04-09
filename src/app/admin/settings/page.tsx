import type { Metadata } from 'next';
import SettingsForm from '@/components/admin/SettingsForm';
import { db } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Site Settings — GadgetsByTJ Admin',
};

async function getSettings(): Promise<Record<string, string>> {
  try {
    const rows = await db.query.siteSettings.findMany();
    return rows.reduce<Record<string, string>>((acc, row) => {
      if (row.value !== null) acc[row.key] = row.value;
      return acc;
    }, {});
  } catch {
    return {};
  }
}

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Site Settings</h2>
      <SettingsForm initial={settings} />
    </div>
  );
}
