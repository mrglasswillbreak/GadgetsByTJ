'use client';

import { useState } from 'react';
import { signOut } from 'next-auth/react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { usePathname } from 'next/navigation';

const pageTitles: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/products/new': 'New Product',
  '/admin/categories': 'Categories',
  '/admin/categories/new': 'New Category',
  '/admin/devices': 'Devices',
  '/admin/devices/new': 'New Device',
  '/admin/gallery': 'Gallery',
  '/admin/settings': 'Site Settings',
};

function getPageTitle(pathname: string): string {
  if (pageTitles[pathname]) return pageTitles[pathname];
  if (pathname.includes('/edit')) return 'Edit';
  if (pathname.startsWith('/admin/products')) return 'Products';
  if (pathname.startsWith('/admin/categories')) return 'Categories';
  if (pathname.startsWith('/admin/devices')) return 'Devices';
  return 'Admin';
}

export default function AdminShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail?: string | null;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation menu"
            className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <h1 className="text-lg font-semibold text-gray-900 flex-1">{title}</h1>

          <div className="flex items-center gap-3">
            {userEmail && (
              <span className="hidden sm:block text-sm text-gray-500 truncate max-w-[200px]">
                {userEmail}
              </span>
            )}
            <button
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
              aria-label="Sign out"
              className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 border border-gray-200 hover:border-red-200 rounded-lg transition-colors min-h-[44px]"
            >
              Sign Out
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
