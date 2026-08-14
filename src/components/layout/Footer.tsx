import React from 'react';
import { ShieldCheck, Truck, Lock, CheckCircle2, Award } from 'lucide-react';
import { Container } from './Container';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 mt-20">
      {/* Value Proposition Bar */}
      <div className="bg-slate-900 text-slate-300 py-10 border-b border-slate-800">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-600/20 text-teal-400 rounded-2xl flex items-center justify-center shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white text-xs font-extrabold uppercase tracking-wider">UK Shipping</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Multiple delivery options available at checkout.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-600/20 text-teal-400 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white text-xs font-extrabold uppercase tracking-wider">Direct Dispatch</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Formulated and dispatched directly from our UK warehouse.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-600/20 text-teal-400 rounded-2xl flex items-center justify-center shrink-0">
                <Lock className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white text-xs font-extrabold uppercase tracking-wider">Discreet Packaging</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Plain, durable unbranded box or padded postal envelope.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-600/20 text-teal-400 rounded-2xl flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white text-xs font-extrabold uppercase tracking-wider">UK Faster Payments</h4>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Direct UK bank transfer with instant payment verification.</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Footer Links */}
      <Container className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-xs">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-teal-600 rounded-xl flex items-center justify-center text-white font-black italic text-xs shadow-xs">
                UKP
              </div>
              <span className="font-black text-base text-slate-900 tracking-tight">UK PERFORMANCE</span>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed">
              Leading UK supplier of premium sports performance supplements, hydration formulas, and endurance nutrition.
            </p>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <p className="text-[10px] text-slate-400 font-extrabold uppercase">Customer Support</p>
              <p className="font-black text-slate-800 mt-0.5">support@uk-performance.co.uk</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Mon–Fri 09:00 - 17:00 GMT</p>
            </div>
          </div>

          {/* Catalog Categories */}
          <div>
            <h5 className="font-black text-slate-900 text-[11px] uppercase tracking-wider mb-4">Categories</h5>
            <ul className="space-y-2.5 text-[11px] font-semibold text-slate-600">
              <li><a href="#" className="hover:text-teal-600 transition-colors">Endurance & Stamina</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Protein Isolates & Recovery</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Hydration & Electrolytes</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Vitamins & Micronutrients</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Wellness & Joint Support</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h5 className="font-black text-slate-900 text-[11px] uppercase tracking-wider mb-4">Customer Service</h5>
            <ul className="space-y-2.5 text-[11px] font-semibold text-slate-600">
              <li><a href="#" className="hover:text-teal-600 transition-colors">Track Royal Mail Order</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Bank Transfer Instructions</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">UK Delivery & Returns</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Batch Lab Certificates</a></li>
              <li><a href="#" className="hover:text-teal-600 transition-colors">Privacy & Cookie Policy</a></li>
            </ul>
          </div>

          {/* Trust Badges */}
          <div>
            <h5 className="font-black text-slate-900 text-[11px] uppercase tracking-wider mb-4">Quality Assurance</h5>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <p className="text-xs font-black text-slate-900">Verified UK Merchant (4.9 / 5)</p>
              <p className="text-[10px] text-slate-500">Based on 1,480+ verified UK customer reviews.</p>
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-200 bg-slate-50 py-5 text-[11px] text-slate-500">
        <Container className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© 2026 UK Performance Ltd. Registered in England & Wales. All rights reserved.</p>

          <div className="flex items-center gap-3">
            <span className="font-extrabold uppercase tracking-widest text-[9px] text-slate-400">
              Supported Payment Methods:
            </span>
            <div className="flex items-center gap-2 font-bold text-[10px]">
              <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-800 shadow-2xs">
                UK Bank Transfer
              </span>
              <span className="bg-white border border-slate-200 px-2.5 py-1 rounded-md text-slate-800 shadow-2xs">
                Faster Payments
              </span>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};
