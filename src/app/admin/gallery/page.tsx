'use client';

import { useState, useEffect, useRef } from 'react';
import type { Metadata } from 'next';

interface GalleryImage {
  id: number;
  url: string;
  alt: string | null;
  productId: number | null;
  deviceId: number | null;
}

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [filter, setFilter] = useState<'all' | 'products' | 'devices'>('all');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((data) => setImages(Array.isArray(data) ? data : []))
      .catch(() => setImages([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const uploadRes = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!uploadRes.ok) throw new Error('Upload failed');
      const { url } = await uploadRes.json();

      const saveRes = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, alt: file.name }),
      });
      if (!saveRes.ok) throw new Error('Save failed');
      const newImg = await saveRes.json();
      setImages((prev) => [newImg, ...prev]);
    } catch (err) {
      alert('Upload failed: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this image?')) return;
    try {
      await fetch(`/api/gallery/${id}`, { method: 'DELETE' });
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch {
      alert('Delete failed');
    }
  }

  const filtered = images.filter((img) => {
    if (filter === 'products') return img.productId !== null;
    if (filter === 'devices') return img.deviceId !== null;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Gallery</h2>
          <p className="text-sm text-gray-500">{images.length} image{images.length !== 1 ? 's' : ''}</p>
        </div>
        <label
          aria-label="Upload new image"
          className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm cursor-pointer transition-colors min-h-[44px]"
        >
          {uploading ? 'Uploading…' : '+ Upload Image'}
          <input ref={fileRef} type="file" accept="image/*" onChange={handleUpload} className="hidden" />
        </label>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'products', 'devices'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            aria-label={`Filter by ${f}`}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors min-h-[44px] capitalize ${filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-400">Loading…</div>
      ) : filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-12 text-center">
          <p className="text-gray-400 text-lg mb-2">🖼️</p>
          <p className="text-gray-600 font-medium">No images yet</p>
          <p className="text-gray-400 text-sm mt-1">Upload images using the button above.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filtered.map((img) => (
            <div key={img.id} className="group relative bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden aspect-square">
              <img src={img.url} alt={img.alt ?? ''} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => handleDelete(img.id)}
                  aria-label={`Delete image ${img.alt ?? img.id}`}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg min-h-[44px]"
                >
                  Delete
                </button>
              </div>
              {img.productId && (
                <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded">P</span>
              )}
              {img.deviceId && (
                <span className="absolute top-1 left-1 px-1.5 py-0.5 bg-purple-600 text-white text-xs rounded">D</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
