import React, { useState, useEffect } from 'react';
import { CartItem, Order, Address, PaymentMethod } from '../../types';
import { X, CheckCircle2, ShieldCheck, Truck, Building2, Copy, Check, ArrowLeft, ArrowRight, Lock } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { cryptoDiscountPence, isCryptoPaymentMethod } from '../../lib/commerce/crypto-discount';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderCompleted: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderCompleted,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form Fields
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [postcode, setPostcode] = useState('');

  // Shipping & Payment
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bank_transfer');

  // Confirmation Order State
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  const subtotal = cart.reduce((sum, item) => {
    const p = item.selectedVariant?.priceGbp || item.product.salePriceGbp || item.product.priceGbp;
    return sum + p * item.quantity;
  }, 0);

  // Configurable Bank Transfer Credentials (using environment variables with clearly fictional demo fallbacks)
  const bankConfig = {
    beneficiary: import.meta.env.VITE_BANK_BENEFICIARY_NAME || 'DEMO MERCHANTS LTD',
    bankName: import.meta.env.VITE_BANK_NAME || 'UK Commercial Bank PLC',
    sortCode: import.meta.env.VITE_BANK_SORT_CODE || '00-00-00',
    accountNumber: import.meta.env.VITE_BANK_ACCOUNT_NUMBER || '00000000',
  };

  const isFreeShipping = subtotal >= 300;
  const shippingCost = shippingMethod === 'express' ? 6.99 : isFreeShipping ? 0 : 3.99;
  const cryptoOffGbp = isCryptoPaymentMethod(paymentMethod) ? cryptoDiscountPence(Math.round(subtotal * 100)) / 100 : 0;
  const totalAmount = Math.max(0, subtotal - cryptoOffGbp + shippingCost);
  const bankTransferAllowed = subtotal + shippingCost >= 100;

  useEffect(() => {
    if (!bankTransferAllowed && paymentMethod === 'bank_transfer') {
      setPaymentMethod('crypto_btc');
    }
  }, [bankTransferAllowed, paymentMethod]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();

    const address: Address = {
      firstName,
      lastName,
      addressLine1,
      addressLine2,
      city,
      county,
      postcode: postcode.toUpperCase(),
      country: 'GB',
      phone,
    };

    const orderItems = cart.map(item => {
      const unitPrice = item.selectedVariant?.priceGbp || item.product.salePriceGbp || item.product.priceGbp;
      return {
        id: 'oi-' + Math.random().toString(36).substr(2, 9),
        productId: item.product.id,
        productName: item.product.name,
        productSku: item.selectedVariant?.sku || item.product.sku,
        variantName: item.selectedVariant?.name,
        unitPriceGbp: unitPrice,
        quantity: item.quantity,
        totalGbp: unitPrice * item.quantity,
        imageUrl: item.product.images[0],
      };
    });

    const newOrder = StorageService.createOrder({
      customerName: `${firstName} ${lastName}`,
      customerEmail: email,
      customerPhone: phone,
      shippingAddress: address,
      items: orderItems,
      subtotalGbp: subtotal,
      shippingCostGbp: shippingCost,
      discountGbp: cryptoOffGbp,
      totalGbp: totalAmount,
      status: 'pending',
      paymentStatus: 'awaiting_transfer',
      paymentMethod: paymentMethod,
      paymentReference: `UKP-${Date.now().toString().slice(-6)}-${firstName.substring(0, 2).toUpperCase()}`,
      shippingMethodName: shippingMethod === 'express' ? 'Royal Mail Special Delivery 24 (£6.99)' : isFreeShipping ? 'Royal Mail Tracked 48 (FREE)' : 'Royal Mail Tracked 48 (£3.99)',
    });

    setCreatedOrder(newOrder);
    onOrderCompleted(newOrder);
    setStep(4);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative my-auto">
        {/* Header */}
        <div className="sticky top-0 bg-slate-900 text-white px-6 py-4 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-teal-600 rounded flex items-center justify-center font-bold text-xs italic">UKP</div>
            <span className="font-extrabold text-sm tracking-tight">UK PERFORMANCE CHECKOUT</span>
          </div>

          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Stepper Progress */}
        {step < 4 && (
          <div className="bg-slate-50 border-b border-slate-200 px-6 py-3 flex items-center justify-between text-xs font-bold text-slate-500">
            <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-teal-600' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 1 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>1</span>
              <span>Details & Address</span>
            </div>
            <span className="text-slate-300">/</span>
            <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-teal-600' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>2</span>
              <span>Shipping Speed</span>
            </div>
            <span className="text-slate-300">/</span>
            <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-teal-600' : ''}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-teal-600 text-white' : 'bg-slate-200'}`}>3</span>
              <span>Payment & Review</span>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* STEP 1: Customer Details & Address */}
          {step === 1 && (
            <form onSubmit={(e) => { e.preventDefault(); setStep(2); }} className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">1. Contact & UK Delivery Address</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Email Address (for Order Dispatch Notice)</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.co.uk"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Mobile Phone Number (SMS Tracking)</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 07700 900123"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">First Name</label>
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Last Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Address Line 1 (House No. & Street)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 14 Kensington High Street"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Address Line 2 (Apartment / Suite - Optional)</label>
                <input
                  type="text"
                  placeholder="Flat 3B"
                  value={addressLine2}
                  onChange={(e) => setAddressLine2(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Town / City</label>
                  <input
                    type="text"
                    required
                    placeholder="London"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">County</label>
                  <input
                    type="text"
                    required
                    placeholder="Greater London"
                    value={county}
                    onChange={(e) => setCounty(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">UK Postcode</label>
                  <input
                    type="text"
                    required
                    placeholder="W8 4PT"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs uppercase font-bold focus:ring-2 focus:ring-teal-500 focus:bg-white outline-none"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Continue to Shipping</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Shipping Method Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">2. Select Shipping Method</h3>
              <p className="text-[11px] text-slate-500 mb-3">UK prices below. Europe is £15.00 and rest of world is £25.00 at checkout.</p>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    shippingMethod === 'standard' ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input type="radio" name="shipping" checked={shippingMethod === 'standard'} readOnly className="mt-0.5 text-teal-600" />
                  <div className="flex-1">
                    <div className="flex justify-between font-bold text-xs text-slate-900">
                      <span>Royal Mail Tracked 48</span>
                      <span>{isFreeShipping ? 'FREE' : '£3.99'}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">2–3 working days. Free on UK orders of £300 or more.</p>
                  </div>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    shippingMethod === 'express' ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input type="radio" name="shipping" checked={shippingMethod === 'express'} readOnly className="mt-0.5 text-teal-600" />
                  <div className="flex-1">
                    <div className="flex justify-between font-bold text-xs text-slate-900">
                      <span>Royal Mail Special Delivery 24</span>
                      <span>£6.99</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">1–2 working days, tracked from the UK.</p>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-slate-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-6 py-3 rounded-xl flex items-center gap-2 cursor-pointer transition-colors"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method & Order Review */}
          {step === 3 && (
            <form onSubmit={handleCompleteOrder} className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider mb-2">3. Payment Method & Review</h3>

              <div className="space-y-3">
                {bankTransferAllowed && (
                <label
                  onClick={() => setPaymentMethod('bank_transfer')}
                  className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'bank_transfer' ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input type="radio" name="payment" checked={paymentMethod === 'bank_transfer'} readOnly className="mt-0.5 text-teal-600" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                      <Building2 className="w-4 h-4 text-teal-600" />
                      <span>Direct UK Bank Transfer (Faster Payments)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Transfer instantly via UK online banking or mobile app. Sort Code & Account Number supplied upon placing order.</p>
                  </div>
                </label>
                )}

                <label
                  onClick={() => setPaymentMethod('crypto_btc')}
                  className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                    paymentMethod === 'crypto_btc' ? 'border-teal-600 bg-teal-50/50 ring-1 ring-teal-600' : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <input type="radio" name="payment" checked={paymentMethod === 'crypto_btc'} readOnly className="mt-0.5 text-teal-600" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                      <span>Bitcoin / Crypto (USDT)</span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">Automated wallet address generated with 5% crypto discount.</p>
                  </div>
                </label>
              </div>

              {/* Order Summary Box */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-900 uppercase text-[11px]">Order Summary</div>
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cart.length} items)</span>
                  <span className="font-bold text-slate-900">£{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping ({shippingMethod === 'express' ? 'Special Delivery 24' : 'Tracked 48'})</span>
                  <span className="font-bold text-slate-900">£{shippingCost.toFixed(2)}</span>
                </div>
                {cryptoOffGbp > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Crypto payment (5% off)</span>
                    <span>-£{cryptoOffGbp.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount Due (GBP)</span>
                  <span className="text-teal-600">£{totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 hover:bg-slate-50"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <button
                  type="submit"
                  className="bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-xs px-6 py-3.5 rounded-xl flex items-center gap-2 cursor-pointer shadow-lg uppercase tracking-wider transition-all"
                >
                  <Lock className="w-4 h-4" />
                  <span>Place Order • £{totalAmount.toFixed(2)}</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Order Confirmation & Bank Transfer Instructions */}
          {step === 4 && createdOrder && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h2 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h2>
                <p className="text-xs text-slate-500 mt-1">Order Reference: <span className="font-bold text-teal-600">{createdOrder.orderNumber}</span></p>
                <p className="text-[11px] text-slate-400">A confirmation receipt has been sent to {createdOrder.customerEmail}.</p>
              </div>

              {/* Bank Transfer Details Box */}
              {createdOrder.paymentMethod === 'bank_transfer' && (
                <div className="bg-slate-900 text-white p-5 rounded-2xl text-left space-y-4 shadow-xl border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-teal-400" />
                      <h4 className="font-bold text-xs uppercase text-teal-400">UK Bank Transfer Payment Details</h4>
                    </div>
                    <span className="text-[10px] bg-teal-900 text-teal-300 font-bold px-2 py-0.5 rounded">Faster Payments</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Beneficiary Name</span>
                      <span className="font-extrabold text-white">{bankConfig.beneficiary}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Bank</span>
                      <span className="font-extrabold text-white">{bankConfig.bankName}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Sort Code</span>
                      <span className="font-mono font-black text-teal-400 text-sm">{bankConfig.sortCode}</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Account Number</span>
                      <span className="font-mono font-black text-teal-400 text-sm">{bankConfig.accountNumber}</span>
                    </div>
                  </div>

                  {/* Payment Reference Highlight Box */}
                  <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Required Payment Reference</span>
                      <span className="font-mono font-black text-white text-sm">{createdOrder.paymentReference}</span>
                    </div>
                    <button
                      onClick={() => handleCopy(createdOrder.paymentReference)}
                      className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedRef ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedRef ? 'Copied!' : 'Copy Ref'}</span>
                    </button>
                  </div>

                  <p className="text-[10px] text-slate-400 leading-relaxed italic">
                    * Please use <strong className="text-teal-300">{createdOrder.paymentReference}</strong> as the transfer reference in your mobile banking app so our system can auto-match your payment and dispatch your package immediately.
                  </p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={onClose}
                  className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-6 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
