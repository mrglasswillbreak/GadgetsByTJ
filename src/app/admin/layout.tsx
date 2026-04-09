import { auth } from '@/lib/auth/config';
import AdminShell from '@/components/admin/AdminShell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin — GadgetsByTJ',
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return <AdminShell userEmail={session?.user?.email}>{children}</AdminShell>;
}
