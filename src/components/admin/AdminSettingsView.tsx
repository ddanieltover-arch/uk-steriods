import { apiFetch } from '../../lib/api/client';
import React, { useEffect, useState } from 'react';
import { Settings, Save, AlertCircle, CheckCircle } from 'lucide-react';
import { User as UserType } from '../../types';

interface AdminSettingsViewProps {
  currentUser: UserType | null;
}

export const AdminSettingsView: React.FC<AdminSettingsViewProps> = ({ currentUser }) => {
  const [settings, setSettings] = useState<Record<string, string>>({
    storeName: 'UK Performance Supplements',
    supportEmail: 'support@ukperformance.co.uk',
    currency: 'GBP',
    freeShippingThresholdPence: '10000',
    maintenanceMode: 'false',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const headers = { 'Content-Type': 'application/json' };

  const loadSettings = async () => {
    setLoading(true);
    try {
      const res = await apiFetch('/api/v1/admin/settings', { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.settings) setSettings(data.settings);
      }
    } catch (err) {
      console.error('Error loading settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (currentUser?.role === 'STAFF') {
      setError('Forbidden: Staff members cannot modify system store settings.');
      return;
    }

    setSaving(true);
    try {
      const res = await apiFetch('/api/v1/admin/settings', {
        method: 'PATCH',
        headers,
        body: JSON.stringify(settings),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update settings.');
      }

      setSuccess('Store settings updated successfully.');
    } catch (err: any) {
      setError(err?.message || 'Save failed.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Global Store Configuration</h1>
          <p className="text-xs text-slate-500 font-medium">System settings, merchant details, and operational flags.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0" />
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 text-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Store Name</label>
            <input
              type="text"
              required
              disabled={currentUser?.role === 'STAFF'}
              value={settings.storeName}
              onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-bold disabled:bg-slate-100"
            />
          </div>

          <div>
            <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Support Email</label>
            <input
              type="email"
              required
              disabled={currentUser?.role === 'STAFF'}
              value={settings.supportEmail}
              onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
              className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-bold disabled:bg-slate-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Store Currency</label>
            <input
              type="text"
              disabled
              value={settings.currency || 'GBP'}
              className="w-full border border-slate-200 bg-slate-100 rounded-lg p-2.5 outline-none font-mono font-bold"
            />
          </div>

          <div>
            <label className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Free Shipping Threshold (£ GBP)</label>
            <input
              type="number"
              step="0.01"
              disabled={currentUser?.role === 'STAFF'}
              value={(parseInt(settings.freeShippingThresholdPence || '10000', 10) / 100).toFixed(2)}
              onChange={(e) =>
                setSettings({
                  ...settings,
                  freeShippingThresholdPence: Math.round(parseFloat(e.target.value || '0') * 100).toString(),
                })
              }
              className="w-full border border-slate-200 rounded-lg p-2.5 outline-none font-bold disabled:bg-slate-100"
            />
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-center gap-2 cursor-pointer font-bold">
            <input
              type="checkbox"
              disabled={currentUser?.role === 'STAFF'}
              checked={settings.maintenanceMode === 'true'}
              onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked ? 'true' : 'false' })}
              className="w-4 h-4 text-teal-600 rounded"
            />
            <span>Enable Maintenance Mode (Restricts public checkout)</span>
          </label>
        </div>

        {currentUser?.role !== 'STAFF' && (
          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white rounded-xl font-bold flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'Saving...' : 'Save Settings'}</span>
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
