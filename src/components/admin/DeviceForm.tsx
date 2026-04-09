'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { Device } from '@/types';

interface DeviceFormProps {
  initialData?: Partial<Device>;
  deviceId?: number;
}

interface SpecEntry { key: string; value: string; }

function slugify(text: string) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

const DEVICE_TYPES = ['Smartphone', 'Tablet', 'Laptop', 'Smartwatch', 'Earbuds', 'Speaker', 'Other'];

export default function DeviceForm({ initialData, deviceId }: DeviceFormProps) {
  const router = useRouter();
  const isEdit = !!deviceId;

  const [name, setName] = useState(initialData?.name ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [slugManual, setSlugManual] = useState(!!initialData?.slug);
  const [brand, setBrand] = useState(initialData?.brand ?? '');
  const [deviceType, setDeviceType] = useState(initialData?.deviceType ?? 'Smartphone');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [imageUrl, setImageUrl] = useState(initialData?.imageUrl ?? '');
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [specs, setSpecs] = useState<SpecEntry[]>(
    Object.entries(initialData?.specs ?? {}).map(([key, value]) => ({ key, value }))
  );
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
    } catch { setError('Image upload failed.'); }
    finally { setUploading(false); }
  }

  function addSpec() { setSpecs((p) => [...p, { key: '', value: '' }]); }
  function updateSpec(i: number, f: 'key' | 'value', v: string) { setSpecs((p) => p.map((s, idx) => idx === i ? { ...s, [f]: v } : s)); }
  function removeSpec(i: number) { setSpecs((p) => p.filter((_, idx) => idx !== i)); }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !slug.trim()) { setError('Name and slug are required.'); return; }
    setSaving(true);
    setError('');

    const specsObj = specs.reduce<Record<string, string>>((acc, s) => { if (s.key.trim()) acc[s.key.trim()] = s.value; return acc; }, {});
    const body = { name, slug, brand: brand || null, deviceType, description: description || null, imageUrl: imageUrl || null, featured, specs: specsObj };

    try {
      const url = isEdit ? `/api/devices/${deviceId}` : '/api/devices';
      const res = await fetch(url, { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      if (!res.ok) { const d = await res.json().catch(() => ({})); throw new Error(d.error ?? 'Save failed'); }
      router.push('/admin/devices');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally { setSaving(false); }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Device Info</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input id="name" type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
            <input id="brand" type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Apple, Samsung…" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
            <input id="slug" type="text" required value={slug} onChange={(e) => { setSlugManual(true); setSlug(e.target.value); }} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm" />
          </div>
          <div>
            <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 mb-1">Device Type *</label>
            <select id="deviceType" value={deviceType} onChange={(e) => setDeviceType(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
              {DEVICE_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea id="description" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} className="w-4 h-4 accent-blue-600" aria-label="Featured" />
          <span className="text-sm text-gray-700">Featured</span>
        </label>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <h3 className="font-semibold text-gray-900">Image</h3>
        {imageUrl && <img src={imageUrl} alt="Device" className="w-24 h-24 object-cover rounded-lg border border-gray-200" />}
        <input type="file" accept="image/*" onChange={handleImageUpload} aria-label="Upload device image" className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
        {uploading && <p className="text-sm text-blue-600">Uploading…</p>}
        <input type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Or enter URL" aria-label="Image URL" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-900">Specifications</h3>
          <button type="button" onClick={addSpec} aria-label="Add spec row" className="text-sm text-blue-600 hover:text-blue-700 font-medium">+ Add Row</button>
        </div>
        {specs.length === 0 && <p className="text-sm text-gray-400">No specifications added.</p>}
        {specs.map((spec, i) => (
          <div key={i} className="flex gap-2">
            <input type="text" value={spec.key} onChange={(e) => updateSpec(i, 'key', e.target.value)} placeholder="Key" aria-label={`Spec key ${i + 1}`} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            <input type="text" value={spec.value} onChange={(e) => updateSpec(i, 'value', e.target.value)} placeholder="Value" aria-label={`Spec value ${i + 1}`} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm" />
            <button type="button" onClick={() => removeSpec(i)} aria-label={`Remove spec ${i + 1}`} className="px-3 py-2 text-red-500 hover:text-red-700 min-h-[44px]">✕</button>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} aria-label={isEdit ? 'Save changes' : 'Create device'} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg min-h-[44px]">
          {saving ? 'Saving…' : isEdit ? 'Save Changes' : 'Create Device'}
        </button>
        <button type="button" onClick={() => router.push('/admin/devices')} aria-label="Cancel" className="px-6 py-3 bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-lg min-h-[44px]">Cancel</button>
      </div>
    </form>
  );
}
