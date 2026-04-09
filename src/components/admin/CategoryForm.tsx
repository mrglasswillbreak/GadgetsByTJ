'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Category } from '@/types';

interface CategoryFormProps {
  initialData?: Partial<Category>;
  categoryId?: number;
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

export default function CategoryForm({ initialData, categoryId }: CategoryFormProps) {
  const router = useRouter();
  const isEdit = !!categoryId;

  const [name, setName] = useState(initialData?.name ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [slugManual, setSlugManual] = useState(!!initialData?.slug);
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? '');
  const [displayOrder, setDisplayOrder] = useState(String(initialData?.displayOrder ?? '0'));
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!slugManual && name) setSlug(slugify(name));
  }, [name, slugManual]);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setImageUrl(data.url);
    } catch {
      setError('Image upload failed.');
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) { setError('Name and slug are required.'); return; }
    setSaving(true);
    setError('');

    const body = { name, slug, description: description || null, imageUrl: imageUrl || null, displayOrder: Number(displayOrder) };

    try {
      const url = isEdit ? `/api/categories/${categoryId}` : '/api/categories';
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error ?? 'Save failed'); }
      router.push('/admin/categories');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Category Info</h3>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
          <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
          <input id="slug" type="text" required value={slug} onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label htmlFor="displayOrder" className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
          <input id="displayOrder" type="number" value={displayOrder} onChange={(e) => setDisplayOrder(e.target.value)} className="w-32 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Image</h3>
        {imageUrl && <img src={imageUrl} alt="Category" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />}
        <input type="file" accept="image/*" onChange={handleImageUpload} aria-label="Upload category image" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        {uploading && <p className="text-sm text-blue-600">Uploading…</p>}
        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Or enter URL" aria-label="Image URL" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} aria-label={isEdit ? 'Save changes' : 'Create category'} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg min-h-[44px]">
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Category'}
        </button>
        <button type="button" onClick={() => router.push('/admin/categories')} aria-label="Cancel" className="px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-lg min-h-[44px]">Cancel</button>
      </div>
    </form>
  );
}
