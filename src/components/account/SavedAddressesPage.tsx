import { apiFetch } from '../../lib/api/client';
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { CountrySelectOptions } from '../forms/CountrySelectOptions';

interface SavedAddressesPageProps {
  currentUser: User | null;
  onNavigate: (path: string) => void;
}

export const SavedAddressesPage: React.FC<SavedAddressesPageProps> = ({
  currentUser,
  onNavigate,
}) => {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  // Form State
  const [recipient, setRecipient] = useState('');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('GB');
  const [isDefault, setIsDefault] = useState(false);
  const [formSaving, setFormSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (!currentUser) {
      onNavigate('/');
      return;
    }
    fetchAddresses();
  }, [currentUser]);

  const fetchAddresses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch('/api/v1/account/addresses', {
        headers: {},
});

      if (!res.ok) throw new Error('Failed to load saved addresses.');
      const data = await res.json();
      setAddresses(data.addresses || []);
    } catch (err: any) {
      setError(err.message || 'Error loading saved addresses.');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingAddressId(null);
    setRecipient(`${currentUser?.firstName || ''} ${currentUser?.lastName || ''}`.trim());
    setLine1('');
    setLine2('');
    setCity('');
    setCounty('');
    setPostcode('');
    setCountry('GB');
    setIsDefault(addresses.length === 0);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (addr: any) => {
    setEditingAddressId(addr.id);
    setRecipient(addr.recipient || '');
    setLine1(addr.line1 || '');
    setLine2(addr.line2 || '');
    setCity(addr.city || '');
    setCounty(addr.county || '');
    setPostcode(addr.postcode || '');
    setCountry(addr.country || 'GB');
    setIsDefault(addr.isDefault || false);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSaveAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSaving(true);
    setFormError(null);

    const payload = {
      recipient,
      line1,
      line2,
      city,
      county,
      postcode,
      country,
      isDefault,
    };

    try {
      const endpoint = editingAddressId
        ? `/api/v1/account/addresses/${editingAddressId}`
        : '/api/v1/account/addresses';
      const method = editingAddressId ? 'PATCH' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save address.');

      setIsModalOpen(false);
      fetchAddresses();
    } catch (err: any) {
      setFormError(err.message || 'Error saving address.');
    } finally {
      setFormSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;

    try {
      const res = await apiFetch(`/api/v1/account/addresses/${id}`, {
        method: 'DELETE',
        headers: {},
});

      if (!res.ok) throw new Error('Failed to delete address.');
      fetchAddresses();
    } catch (err: any) {
      alert(err.message || 'Error deleting address.');
    }
  };

  const handleSetDefault = async (id: string) => {
    try {
      const res = await apiFetch(`/api/v1/account/addresses/${id}/default`, {
        method: 'POST',
        headers: {},
});

      if (!res.ok) throw new Error('Failed to set default address.');
      fetchAddresses();
    } catch (err: any) {
      alert(err.message || 'Error setting default address.');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Breadcrumbs & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="hover:text-slate-800 cursor-pointer" onClick={() => onNavigate('/')}>Home</span>
              <span>/</span>
              <span className="hover:text-slate-800 cursor-pointer" onClick={() => onNavigate('/account')}>My Account</span>
              <span>/</span>
              <span className="text-slate-900 font-bold">Saved Addresses</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Manage Shipping Addresses
            </h1>
          </div>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-extrabold shadow-xs transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Address</span>
          </button>
        </div>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading saved addresses...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-800 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchAddresses} className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg text-xs cursor-pointer">
              Retry
            </button>
          </div>
        ) : addresses.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4">
            <MapPin className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="font-bold text-slate-900 text-base">No Saved Addresses Found</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Save your delivery addresses for faster checkout during future purchases.
              </p>
            </div>
            <button
              onClick={openAddModal}
              className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors cursor-pointer inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Your First Address</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`bg-white border ${
                  addr.isDefault ? 'border-teal-500 ring-2 ring-teal-500/10' : 'border-slate-200'
                } rounded-2xl p-6 shadow-2xs space-y-4 relative flex flex-col justify-between`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-extrabold text-slate-900 text-sm">{addr.recipient}</span>
                    {addr.isDefault ? (
                      <span className="bg-teal-100 text-teal-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-teal-600" /> Default Address
                      </span>
                    ) : (
                      <button
                        onClick={() => handleSetDefault(addr.id)}
                        className="text-[10px] font-bold text-slate-500 hover:text-teal-600 uppercase tracking-wider cursor-pointer"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 pt-1">
                    <p>{addr.line1}</p>
                    {addr.line2 && <p>{addr.line2}</p>}
                    <p>{addr.city}{addr.county ? `, ${addr.county}` : ''}</p>
                    <p className="font-mono font-bold text-slate-900">{addr.postcode}</p>
                    <p className="text-slate-400 font-medium">{addr.country}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3 text-xs">
                  <button
                    onClick={() => openEditModal(addr)}
                    className="px-3 py-1.5 border border-slate-200 hover:border-slate-300 text-slate-700 font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() => handleDeleteAddress(addr.id)}
                    className="px-3 py-1.5 border border-slate-200 hover:border-red-300 text-slate-600 hover:text-red-600 font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full shadow-2xl relative my-auto overflow-hidden">
              <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-teal-400" />
                  <h3 className="font-extrabold text-xs uppercase tracking-wider">
                    {editingAddressId ? 'Edit Address' : 'Add New Shipping Address'}
                  </h3>
                </div>
                <button onClick={() => setIsModalOpen(false)} className="p-1 text-slate-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="p-6 space-y-4 text-xs">
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Recipient Name *</label>
                  <input
                    type="text"
                    required
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    placeholder="Full Name"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Address Line 1 *</label>
                  <input
                    type="text"
                    required
                    value={line1}
                    onChange={(e) => setLine1(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    placeholder="Building name, house number and street"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    value={line2}
                    onChange={(e) => setLine2(e.target.value)}
                    className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                    placeholder="Apartment, suite, unit, etc."
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">City / Town *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                      placeholder="London"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">County (Optional)</label>
                    <input
                      type="text"
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                      placeholder="Greater London"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">UK Postcode *</label>
                    <input
                      type="text"
                      required
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                      className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 font-mono"
                      placeholder="SW1A 1AA"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Country</label>
                    <select
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 font-medium bg-white"
                    >
                      <CountrySelectOptions />
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="w-4 h-4 text-teal-600 rounded border-slate-300 focus:ring-teal-500"
                  />
                  <label htmlFor="isDefault" className="text-xs font-bold text-slate-700 cursor-pointer">
                    Set as my default shipping address
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2.5 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSaving}
                    className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold rounded-xl shadow-xs transition-colors cursor-pointer"
                  >
                    {formSaving ? 'Saving...' : editingAddressId ? 'Update Address' : 'Save Address'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
