import React, { useState } from 'react';
import { User as UserType } from '../../types';
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Tag,
  Boxes,
  ShoppingCart,
  Users,
  Percent,
  MessageSquare,
  Truck,
  Settings,
  ShieldAlert,
  ArrowLeft,
  LogOut,
  Menu,
  X,
  FileText,
  ShieldCheck,
  Mail,
} from 'lucide-react';

interface AdminLayoutProps {
  currentUser: UserType | null;
  currentRoute: string;
  onNavigate: (route: string) => void;
  onExitToStorefront: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentUser,
  currentRoute,
  onNavigate,
  onExitToStorefront,
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if current user has admin access (SUPER_ADMIN, ADMIN, STAFF)
  const isAuthorized =
    currentUser &&
    (currentUser.role === 'SUPER_ADMIN' ||
      currentUser.role === 'ADMIN' ||
      currentUser.role === 'STAFF');

  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 rounded-2xl p-8 text-center space-y-4 shadow-2xl">
          <div className="w-16 h-16 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-black uppercase tracking-tight">Access Denied</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            You do not have administrative permissions to view the UK Performance operational portal. Please sign in with an authorized Staff or Admin account.
          </p>
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={onExitToStorefront}
              className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold text-xs py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return to Storefront</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const navItems = [
    { id: '/admin', label: 'Dashboard', icon: LayoutDashboard, roleRequired: 'STAFF' },
    { id: '/admin/products', label: 'Products', icon: Package, roleRequired: 'STAFF' },
    { id: '/admin/categories', label: 'Categories', icon: FolderTree, roleRequired: 'ADMIN' },
    { id: '/admin/brands', label: 'Brands', icon: Tag, roleRequired: 'ADMIN' },
    { id: '/admin/inventory', label: 'Inventory', icon: Boxes, roleRequired: 'STAFF' },
    { id: '/admin/orders', label: 'Orders & Dispatch', icon: ShoppingCart, roleRequired: 'STAFF' },
    { id: '/admin/customers', label: 'Customers', icon: Users, roleRequired: 'ADMIN' },
    { id: '/admin/discounts', label: 'Discounts', icon: Percent, roleRequired: 'ADMIN' },
    { id: '/admin/reviews', label: 'Reviews', icon: MessageSquare, roleRequired: 'ADMIN' },
    { id: '/admin/shipping', label: 'Shipping Config', icon: Truck, roleRequired: 'ADMIN' },
    { id: '/admin/settings', label: 'Store Settings', icon: Settings, roleRequired: 'ADMIN' },
    { id: '/admin/notifications', label: 'Notifications', icon: Mail, roleRequired: 'STAFF' },
    { id: '/admin/audit-log', label: 'Audit Log', icon: FileText, roleRequired: 'ADMIN' },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col md:flex-row">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 text-white min-h-screen sticky top-0 h-screen overflow-y-auto">
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-teal-600 rounded-xl flex items-center justify-center font-black text-xs italic tracking-tighter text-white shadow-md">
              UKP
            </div>
            <div>
              <span className="font-extrabold text-sm tracking-tight block leading-tight">UK PERFORMANCE</span>
              <span className="text-[10px] text-teal-400 font-bold uppercase tracking-wider">Operations & Admin</span>
            </div>
          </div>
        </div>

        {/* Current User Info */}
        <div className="p-4 border-b border-slate-800/60 bg-slate-950/40 flex items-center justify-between">
          <div className="truncate">
            <p className="text-xs font-bold truncate">{currentUser.firstName} {currentUser.lastName}</p>
            <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
          </div>
          <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full border ${
            currentUser.role === 'SUPER_ADMIN'
              ? 'bg-purple-950 text-purple-300 border-purple-800'
              : currentUser.role === 'ADMIN'
              ? 'bg-teal-950 text-teal-300 border-teal-800'
              : 'bg-blue-950 text-blue-300 border-blue-800'
          }`}>
            {currentUser.role}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => {
            const isActive = currentRoute === item.id || (item.id !== '/admin' && currentRoute.startsWith(item.id));
            const Icon = item.icon;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/70'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Exit Button */}
        <div className="p-4 border-t border-slate-800">
          <button
            onClick={onExitToStorefront}
            className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer border border-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Exit to Storefront</span>
          </button>
        </div>
      </aside>

      {/* Mobile Navigation Header */}
      <div className="md:hidden bg-slate-900 border-b border-slate-800 text-white p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center font-black text-xs text-white">UKP</div>
          <span className="font-extrabold text-sm uppercase tracking-tight">UK Performance Admin</span>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-800"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 text-white p-4 space-y-2 z-30">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentRoute === item.id || (item.id !== '/admin' && currentRoute.startsWith(item.id));
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg font-bold text-xs ${
                  isActive ? 'bg-teal-600 text-white' : 'text-slate-400 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800">
            <button
              onClick={onExitToStorefront}
              className="w-full bg-slate-800 text-white font-bold text-xs py-2 rounded-lg flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Exit to Storefront</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace Area */}
      <main className="flex-1 p-4 md:p-8 min-w-0 max-w-7xl mx-auto space-y-6">
        {children}
      </main>
    </div>
  );
};
