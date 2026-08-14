import { apiFetch } from '../../lib/api/client';
import React, { useState, useEffect } from 'react';
import { User } from '../../types';
import { Package, MapPin, Heart, Lock, User as UserIcon, LogOut, CheckCircle2, ChevronRight, AlertCircle, Search } from 'lucide-react';

interface AccountDashboardPageProps {
  currentUser: User | null;
  onUserChanged: (user: User | null) => void;
  onNavigate: (path: string) => void;
}

export const AccountDashboardPage: React.FC<AccountDashboardPageProps> = ({
  currentUser,
  onUserChanged,
  onNavigate,
}) => {
  const [profileData, setProfileData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Form states for profile editing
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState<string | null>(null);
  const [profileError, setProfileError] = useState<string | null>(null);

  // Form states for password change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Recent orders list
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser) {
      onNavigate('/');
      return;
    }
    fetchAccountData();
  }, [currentUser]);

  const fetchAccountData = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = {};

      const [profileRes, ordersRes] = await Promise.all([
        apiFetch('/api/v1/account', { headers }),
        apiFetch('/api/v1/account/orders?limit=5', { headers }),
      ]);

      if (!profileRes.ok) throw new Error('Failed to load profile data.');

      const profile = await profileRes.json();
      setProfileData(profile);
      setFirstName(profile.user.firstName || '');
      setLastName(profile.user.lastName || '');
      setPhone(profile.user.phone || '');
      setEmail(profile.user.email || '');

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setRecentOrders(ordersData.orders || []);
      }
    } catch (err: any) {
      setError(err.message || 'Error loading account dashboard.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileSaving(true);
    setProfileSuccess(null);
    setProfileError(null);

    try {
      const res = await apiFetch('/api/v1/account', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({ firstName, lastName, phone, email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update profile.');

      onUserChanged(data.user);
      setProfileSuccess('Profile updated successfully.');
      fetchAccountData();
    } catch (err: any) {
      setProfileError(err.message || 'Error saving profile.');
    } finally {
      setProfileSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSaving(true);
    setPasswordSuccess(null);
    setPasswordError(null);

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match.');
      setPasswordSaving(false);
      return;
    }

    try {
      const res = await apiFetch('/api/v1/account/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({ currentPassword, newPassword, confirmPassword }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to change password.');

      setPasswordSuccess('Password changed successfully. Please sign in again.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        onUserChanged(null);
        onNavigate('/');
      }, 2000);
    } catch (err: any) {
      setPasswordError(err.message || 'Error changing password.');
    } finally {
      setPasswordSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await apiFetch('/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          },
      });
    } catch (e) {
      // ignore
    } finally {
      onUserChanged(null);
      onNavigate('/');
    }
  };

  if (!currentUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header Breadcrumb & Logout */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
              <span className="hover:text-slate-800 cursor-pointer" onClick={() => onNavigate('/')}>Home</span>
              <span>/</span>
              <span className="text-slate-900 font-bold">My Account</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Customer Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 hover:border-red-300 text-slate-700 hover:text-red-600 rounded-xl text-xs font-bold transition-all shadow-2xs cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

        {loading ? (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-3">
            <div className="w-8 h-8 border-3 border-teal-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Loading account information...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-red-800 text-sm flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchAccountData} className="px-3 py-1.5 bg-red-600 text-white font-bold rounded-lg text-xs cursor-pointer">
              Retry
            </button>
          </div>
        ) : (
          <>
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div
                onClick={() => onNavigate('/account/orders')}
                className="bg-white border border-slate-200 hover:border-teal-500 rounded-2xl p-5 shadow-2xs transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Orders</span>
                  <p className="text-2xl font-black text-slate-900">{profileData?.orderCount || 0}</p>
                  <span className="text-xs text-teal-600 font-bold group-hover:underline inline-flex items-center gap-1">
                    View Orders <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 group-hover:scale-105 transition-transform">
                  <Package className="w-6 h-6" />
                </div>
              </div>

              <div
                onClick={() => onNavigate('/account/addresses')}
                className="bg-white border border-slate-200 hover:border-teal-500 rounded-2xl p-5 shadow-2xs transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Saved Addresses</span>
                  <p className="text-2xl font-black text-slate-900">{profileData?.addressCount || 0}</p>
                  <span className="text-xs text-teal-600 font-bold group-hover:underline inline-flex items-center gap-1">
                    Manage Addresses <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 group-hover:scale-105 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
              </div>

              <div
                onClick={() => onNavigate('/account/wishlist')}
                className="bg-white border border-slate-200 hover:border-teal-500 rounded-2xl p-5 shadow-2xs transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Wishlist Items</span>
                  <p className="text-2xl font-black text-slate-900">{profileData?.wishlistCount || 0}</p>
                  <span className="text-xs text-teal-600 font-bold group-hover:underline inline-flex items-center gap-1">
                    View Saved Items <ChevronRight className="w-3 h-3" />
                  </span>
                </div>
                <div className="w-12 h-12 bg-rose-50 rounded-xl flex items-center justify-center text-rose-500 group-hover:scale-105 transition-transform">
                  <Heart className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Account Navigation & Quick Guest Tracking */}
              <div className="space-y-6">
                <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-3">
                  <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900 pb-2 border-b border-slate-100">
                    Account Navigation
                  </h3>
                  <div className="space-y-1 text-xs font-bold">
                    <button
                      onClick={() => onNavigate('/account/orders')}
                      className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-teal-600" />
                        <span>Order History & Invoices</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => onNavigate('/account/addresses')}
                      className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-teal-600" />
                        <span>Saved Shipping Addresses</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => onNavigate('/account/wishlist')}
                      className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-rose-500" />
                        <span>Saved Wishlist</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>

                    <button
                      onClick={() => onNavigate('/track-order')}
                      className="w-full text-left p-3 rounded-xl hover:bg-slate-50 text-slate-700 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <Search className="w-4 h-4 text-teal-600" />
                        <span>Track Guest Order with Token</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    </button>
                  </div>
                </div>

                {/* Default Saved Address Card */}
                {profileData?.defaultAddress && (
                  <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                      <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-900">
                        Default Address
                      </h3>
                      <button
                        onClick={() => onNavigate('/account/addresses')}
                        className="text-[10px] font-bold text-teal-600 hover:underline uppercase"
                      >
                        Edit
                      </button>
                    </div>
                    <div className="text-xs text-slate-600 space-y-1 pt-1">
                      <p className="font-bold text-slate-900">{profileData.defaultAddress.recipient}</p>
                      <p>{profileData.defaultAddress.line1}</p>
                      {profileData.defaultAddress.line2 && <p>{profileData.defaultAddress.line2}</p>}
                      <p>{profileData.defaultAddress.city}, {profileData.defaultAddress.postcode}</p>
                      <p className="text-slate-400 font-medium">{profileData.defaultAddress.country}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Right 2 Columns: Profile Forms & Recent Orders */}
              <div className="lg:col-span-2 space-y-8">
                {/* Recent Orders Overview */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-black text-sm uppercase tracking-wider text-slate-900">
                      Recent Orders
                    </h3>
                    <button
                      onClick={() => onNavigate('/account/orders')}
                      className="text-xs font-bold text-teal-600 hover:underline cursor-pointer"
                    >
                      View All ({profileData?.orderCount || 0})
                    </button>
                  </div>

                  {recentOrders.length === 0 ? (
                    <div className="text-center py-8 border border-dashed border-slate-200 rounded-xl space-y-2">
                      <Package className="w-8 h-8 text-slate-300 mx-auto" />
                      <p className="text-xs font-bold text-slate-600">No recent orders found</p>
                      <button
                        onClick={() => onNavigate('/shop')}
                        className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div className="divide-y divide-slate-100">
                      {recentOrders.map((ord) => (
                        <div
                          key={ord.id}
                          className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-extrabold text-slate-900">{ord.orderNumber}</span>
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  ord.status === 'DELIVERED'
                                    ? 'bg-emerald-100 text-emerald-800'
                                    : ord.status === 'CANCELLED'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-amber-100 text-amber-800'
                                }`}
                              >
                                {ord.status}
                              </span>
                            </div>
                            <p className="text-slate-500 text-[11px]">
                              {new Date(ord.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} • {ord.itemCount} items
                            </p>
                          </div>
                          <div className="flex items-center justify-between sm:justify-end gap-4">
                            <span className="font-black text-slate-900">
                              £{(ord.totalPence / 100).toFixed(2)}
                            </span>
                            <button
                              onClick={() => onNavigate(`/account/orders/${ord.orderNumber}`)}
                              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-lg text-xs transition-colors cursor-pointer"
                            >
                              View Order
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Profile Information Form */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
                  <h3 className="font-black text-sm uppercase tracking-wider text-slate-900">
                    Profile Information
                  </h3>

                  {profileSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{profileSuccess}</span>
                    </div>
                  )}

                  {profileError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{profileError}</span>
                    </div>
                  )}

                  <form onSubmit={handleUpdateProfile} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">First Name *</label>
                        <input
                          type="text"
                          required
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Last Name *</label>
                        <input
                          type="text"
                          required
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Email Address *</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Phone Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900 font-mono"
                          placeholder="07123 456789"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={profileSaving}
                      className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      {profileSaving ? 'Saving Changes...' : 'Save Profile Changes'}
                    </button>
                  </form>
                </div>

                {/* Change Password Form */}
                <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4">
                  <h3 className="font-black text-sm uppercase tracking-wider text-slate-900">
                    Security & Password
                  </h3>

                  {passwordSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{passwordSuccess}</span>
                    </div>
                  )}

                  {passwordError && (
                    <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-xl flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{passwordError}</span>
                    </div>
                  )}

                  <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Current Password *</label>
                      <input
                        type="password"
                        required
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                        placeholder="••••••••"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">New Password (Min 8 Chars) *</label>
                        <input
                          type="password"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                          placeholder="••••••••"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Confirm New Password *</label>
                        <input
                          type="password"
                          required
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full border border-slate-200 rounded-xl p-3 focus:ring-2 focus:ring-teal-500 outline-none text-slate-900"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={passwordSaving}
                      className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors uppercase tracking-wider cursor-pointer"
                    >
                      {passwordSaving ? 'Updating Password...' : 'Update Security Password'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
