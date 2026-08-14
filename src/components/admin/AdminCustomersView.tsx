import { apiFetch } from '../../lib/api/client';
import React, { useState, useEffect } from 'react';
import { Search, Users, ShieldCheck, ArrowLeft, RefreshCw, AlertCircle, X } from 'lucide-react';
import { User as UserType } from '../../types';

interface AdminCustomersViewProps {
  currentUser: UserType | null;
  onNavigate: (route: string) => void;
  selectedCustomerId?: string;
}

export const AdminCustomersView: React.FC<AdminCustomersViewProps> = ({
  currentUser,
  onNavigate,
  selectedCustomerId,
}) => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [roleInput, setRoleInput] = useState<string>('CUSTOMER');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const headers = { 'Content-Type': 'application/json' };

  const loadCustomers = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/v1/admin/customers?search=${encodeURIComponent(search)}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setCustomers(data.customers || []);
      }
    } catch (err) {
      console.error('Error loading customers:', err);
    } finally {
      setLoading(false);
    }
  };

  const loadSingleCustomer = async (id: string) => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/v1/admin/customers/${id}`, { headers });
      if (res.ok) {
        const data = await res.json();
        setSelectedCustomer(data.customer);
        setRoleInput(data.customer.role);
      }
    } catch (err) {
      console.error('Error loading customer:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCustomerId) {
      loadSingleCustomer(selectedCustomerId);
    } else {
      setSelectedCustomer(null);
      loadCustomers();
    }
  }, [selectedCustomerId, search]);

  const handleUpdateRole = async () => {
    if (!selectedCustomer) return;
    setError(null);
    setSuccess(null);

    if (currentUser?.role !== 'SUPER_ADMIN') {
      setError('Forbidden: Only a SUPER_ADMIN can modify user roles.');
      return;
    }

    try {
      const res = await apiFetch(`/api/v1/admin/customers/${selectedCustomer.id}/role`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify({ role: roleInput }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Role update failed.');
      }

      setSuccess(`User role updated to ${roleInput} successfully.`);
      loadSingleCustomer(selectedCustomer.id);
    } catch (err: any) {
      setError(err?.message || 'Failed to update role.');
    }
  };

  if (selectedCustomerId && selectedCustomer) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/admin/customers')}
              className="p-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
            </button>
            <div>
              <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">
                {selectedCustomer.firstName} {selectedCustomer.lastName}
              </h1>
              <p className="text-xs text-slate-500 font-mono">{selectedCustomer.email}</p>
            </div>
          </div>

          <span className={`text-xs font-black uppercase px-3 py-1 rounded-xl border ${
            selectedCustomer.role === 'SUPER_ADMIN'
              ? 'bg-purple-100 text-purple-800 border-purple-200'
              : selectedCustomer.role === 'ADMIN'
              ? 'bg-teal-100 text-teal-800 border-teal-200'
              : 'bg-slate-100 text-slate-800 border-slate-200'
          }`}>
            Role: {selectedCustomer.role}
          </span>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs font-bold text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-xs font-bold text-emerald-800">
            {success}
          </div>
        )}

        {/* Role Change Control (SUPER_ADMIN ONLY) */}
        {currentUser?.role === 'SUPER_ADMIN' && (
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <h3 className="font-black text-xs uppercase text-slate-900 tracking-wider">Administrative Role Assignment</h3>
            <div className="flex items-center gap-3 max-w-md">
              <select
                value={roleInput}
                onChange={(e) => setRoleInput(e.target.value)}
                className="flex-1 border border-slate-200 rounded-xl bg-slate-50 p-2.5 text-xs font-bold outline-none"
              >
                <option value="CUSTOMER">CUSTOMER - Standard buyer account</option>
                <option value="STAFF">STAFF - Catalogue & Order fulfillment staff</option>
                <option value="ADMIN">ADMIN - Store & Catalogue Manager</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN - Full system administrator</option>
              </select>
              <button
                onClick={handleUpdateRole}
                className="px-4 py-2.5 bg-purple-700 hover:bg-purple-600 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                Update Role
              </button>
            </div>
          </div>
        )}

        {/* Profile & History */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3 text-xs">
            <h3 className="font-black uppercase text-slate-900 tracking-wider">Account Snapshot</h3>
            <p className="text-slate-500">Registered: <span className="font-bold text-slate-900">{new Date(selectedCustomer.createdAt).toLocaleDateString('en-GB')}</span></p>
            <p className="text-slate-500">Phone: <span className="font-bold text-slate-900">{selectedCustomer.phone || 'N/A'}</span></p>
            <p className="text-slate-500">Total Orders: <span className="font-black text-teal-600">{selectedCustomer.orderCount}</span></p>
            <p className="text-slate-500">Lifetime Spend: <span className="font-black text-slate-900">£{(selectedCustomer.lifetimeValuePence / 100).toFixed(2)}</span></p>
          </div>

          <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
            <h3 className="font-black text-xs uppercase text-slate-900 tracking-wider">Order History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
                  <tr>
                    <th className="p-3">Order Ref</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Total (£)</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {selectedCustomer.orders?.map((o: any) => (
                    <tr key={o.id}>
                      <td className="p-3 font-mono font-bold text-teal-600">{o.orderNumber}</td>
                      <td className="p-3 font-mono text-[10px] text-slate-400">{new Date(o.createdAt).toLocaleDateString('en-GB')}</td>
                      <td className="p-3 font-black text-slate-900">£{(o.totalPence / 100).toFixed(2)}</td>
                      <td className="p-3 font-bold uppercase text-[10px]">{o.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-black uppercase text-slate-900 tracking-tight">Customer Directory</h1>
          <p className="text-xs text-slate-500 font-medium">Customer accounts, lifetime values, and role administration.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 space-y-4">
        <div className="relative max-w-md w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search name or email address..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none font-medium"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[10px] border-y border-slate-200">
              <tr>
                <th className="p-3">Customer Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Role</th>
                <th className="p-3">Registered Date</th>
                <th className="p-3">Orders</th>
                <th className="p-3">Lifetime Value (£)</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="p-3 font-bold text-slate-900">{c.firstName} {c.lastName}</td>
                  <td className="p-3 font-mono text-[10px] text-slate-500">{c.email}</td>
                  <td className="p-3">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-800">
                      {c.role}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[10px] text-slate-400">{new Date(c.createdAt).toLocaleDateString('en-GB')}</td>
                  <td className="p-3 font-bold text-slate-800">{c.orderCount}</td>
                  <td className="p-3 font-black text-slate-900">£{(c.lifetimeValuePence / 100).toFixed(2)}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => onNavigate(`/admin/customers/${c.id}`)}
                      className="px-3 py-1 bg-slate-900 text-white text-[10px] font-bold rounded-lg hover:bg-slate-800 cursor-pointer"
                    >
                      View Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
