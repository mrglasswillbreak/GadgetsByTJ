import type { Metadata } from 'next';
import CategoryForm from '@/components/admin/CategoryForm';

export const metadata: Metadata = {
  title: 'New Category — GadgetsByTJ Admin',
};

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">New Category</h2>
      <CategoryForm />
    </div>
  );
}
