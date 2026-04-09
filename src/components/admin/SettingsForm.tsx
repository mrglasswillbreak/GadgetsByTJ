'use client';

import { useState } from 'react';

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'hero', label: 'Hero' },
  { id: 'contact', label: 'Contact' },
  { id: 'social', label: 'Social Media' },
  { id: 'appearance', label: 'Appearance' },
] as const;

type TabId = (typeof TABS)[number]['id'];

interface SettingsFormProps {
  initial: Record<string, string>;
}

export default function SettingsForm({ initial }: SettingsFormProps) {
  const [activeTab, setActiveTab] = useState<TabId>('general');
  const [values, setValues] = useState<Record<string, string>>(initial);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const [logoUploading, setLogoUploading] = useState(false);

  function set(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      set('logo_url', data.url);
    } catch {
      setError('Logo upload failed.');
    } finally {
      setLogoUploading(false);
    }
  }

  async function handleSave() {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: values }),
      });
      if (!res.ok) throw new Error('Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  const heroTitle = values['hero_title'] ?? 'Your Premier Mobile Electronics Destination';
  const heroSubtitle = values['hero_subtitle'] ?? 'Discover premium phones, tablets, and accessories.';
  const heroBtn = values['hero_cta_text'] ?? 'Shop Now';

  return (
    <div className="space-y-6">
      {error && <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}
      {saved && <div role="status" className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm flex items-center gap-2"><svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg> Settings saved successfully!</div>}

      {/* Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-gray-200">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            aria-label={`Switch to ${tab.label} tab`}
            className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-colors min-h-[44px] ${activeTab === tab.id ? 'bg-white border border-b-white border-gray-200 text-blue-600 -mb-px' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* General */}
      {activeTab === 'general' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">General Settings</h3>
          <Field label="Site Name" id="site_name" value={values['site_name'] ?? ''} onChange={(v) => set('site_name', v)} placeholder="GadgetsByTJ" />
          <Field label="Tagline" id="tagline" value={values['tagline'] ?? ''} onChange={(v) => set('tagline', v)} placeholder="Your Premier Mobile Electronics Destination" />
        </div>
      )}

      {/* Hero */}
      {activeTab === 'hero' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
            <h3 className="font-semibold text-gray-900">Hero Section</h3>
            <Field label="Hero Title" id="hero_title" value={values['hero_title'] ?? ''} onChange={(v) => set('hero_title', v)} placeholder="Your Premier Mobile Electronics Destination" />
            <Field label="Hero Subtitle" id="hero_subtitle" value={values['hero_subtitle'] ?? ''} onChange={(v) => set('hero_subtitle', v)} placeholder="Discover premium phones, tablets, and accessories." textarea />
            <Field label="CTA Button Text" id="hero_cta_text" value={values['hero_cta_text'] ?? ''} onChange={(v) => set('hero_cta_text', v)} placeholder="Shop Now" />
          </div>

          {/* Live Preview */}
          <div className="rounded-xl overflow-hidden border border-gray-200 shadow-sm">
            <p className="text-xs text-gray-500 bg-gray-50 px-4 py-2 border-b border-gray-200 font-medium">Live Preview</p>
            <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-800 px-6 py-12 text-center">
              <h2 className="text-2xl font-bold text-white mb-3">{heroTitle}</h2>
              <p className="text-blue-100 mb-6">{heroSubtitle}</p>
              <span className="inline-block px-6 py-2.5 bg-blue-500 text-white font-semibold rounded-lg text-sm">{heroBtn}</span>
            </div>
          </div>
        </div>
      )}

      {/* Contact */}
      {activeTab === 'contact' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Contact Info</h3>
          <Field label="Email" id="contact_email" type="email" value={values['contact_email'] ?? ''} onChange={(v) => set('contact_email', v)} placeholder="hello@gadgetsbytj.com" />
          <Field label="Phone" id="contact_phone" type="tel" value={values['contact_phone'] ?? ''} onChange={(v) => set('contact_phone', v)} placeholder="+1 (555) 000-0000" />
          <Field label="Address" id="contact_address" value={values['contact_address'] ?? ''} onChange={(v) => set('contact_address', v)} placeholder="123 Main St, City, State 00000" textarea />
        </div>
      )}

      {/* Social */}
      {activeTab === 'social' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Social Media</h3>
          <Field label="Facebook URL" id="social_facebook" type="url" value={values['social_facebook'] ?? ''} onChange={(v) => set('social_facebook', v)} placeholder="https://facebook.com/gadgetsbytj" />
          <Field label="Instagram URL" id="social_instagram" type="url" value={values['social_instagram'] ?? ''} onChange={(v) => set('social_instagram', v)} placeholder="https://instagram.com/gadgetsbytj" />
          <Field label="Twitter / X URL" id="social_twitter" type="url" value={values['social_twitter'] ?? ''} onChange={(v) => set('social_twitter', v)} placeholder="https://twitter.com/gadgetsbytj" />
        </div>
      )}

      {/* Appearance */}
      {activeTab === 'appearance' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
          <h3 className="font-semibold text-gray-900">Appearance</h3>
          {values['logo_url'] && (
            <img src={values['logo_url']} alt="Site logo" className="h-16 object-contain border border-gray-200 rounded-lg p-2" />
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo Upload</label>
            <label className="inline-flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm cursor-pointer hover:bg-gray-100 min-h-[44px]">
              {logoUploading ? 'Uploading…' : 'Choose logo file'}
              <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" id="logo-file-input" />
            </label>
          </div>
          <Field label="Or enter Logo URL" id="logo_url" type="url" value={values['logo_url'] ?? ''} onChange={(v) => set('logo_url', v)} placeholder="https://…" />
        </div>
      )}

      {/* Save Button */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={saving}
          aria-label="Save all settings"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-colors min-h-[44px]"
        >
          {saving ? 'Saving…' : 'Save All Changes'}
        </button>
      </div>
    </div>
  );
}

function Field({
  label, id, value, onChange, placeholder, type = 'text', textarea = false,
}: {
  label: string; id: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; textarea?: boolean;
}) {
  const cls = 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm';
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      {textarea ? (
        <textarea id={id} rows={3} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      ) : (
        <input id={id} type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}
