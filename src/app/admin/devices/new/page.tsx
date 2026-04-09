import type { Metadata } from 'next';
import DeviceForm from '@/components/admin/DeviceForm';

export const metadata: Metadata = {
  title: 'New Device — GadgetsByTJ Admin',
};

export default function NewDevicePage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">New Device</h2>
      <DeviceForm />
    </div>
  );
}
