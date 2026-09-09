import React, { useState, useEffect, useMemo } from 'react';
import { CountrySelectOptions } from '../forms/CountrySelectOptions';
import {
  SHIP_COUNTRY_STORAGE_KEY,
  SHIP_RATE_STORAGE_KEY,
  ShippingService,
} from '../../lib/services/shipping.service';
import { cryptoDiscountPence, isCryptoPaymentMethod } from '../../lib/commerce/crypto-discount';
import { apiFetch } from '../../lib/api/client';
import { CartItem, User as UserType } from '../../types';
import { Container } from '../layout/Container';
import {
  ShieldCheck,
  Truck,
  Lock,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Bitcoin,
  Building2,
  AlertCircle,
  Copy,
  Check,
  Info,
  ChevronRight,
  ShoppingBag,
  CreditCard,
  User,
  MapPin,
  FileText,
} from 'lucide-react';
import { useToast } from '../feedback/ToastProvider';
import { trackBeginCheckout, penceToGbp } from '../../lib/analytics/gtag';

interface ShippingMethod {
  id: string;
  displayName: string;
  description: string;
  pricePence: number;
  estimatedMinDays: number;
  estimatedMaxDays: number;
  isFree: boolean;
  carrier: string;
}

interface CheckoutCalculationResult {
  items: Array<{
    productId: string;
    variantId?: string;
    productName: string;
    productSku: string;
    variantName?: string;
    imageUrl?: string;
    quantity: number;
    unitPricePence: number;
    lineTotalPence: number;
  }>;
  subtotalPence: number;
  discountCode?: string;
  discountPence: number;
  cryptoDiscountPence: number;
  shippingMethodId: string;
  shippingName: string;
  shippingPence: number;
  isFreeShipping: boolean;
  freeShippingThresholdPence: number;
  taxPence: number;
  totalPence: number;
  currency: string;
  reconciliationAlerts: string[];
}

interface CheckoutPageProps {
  cartItems: CartItem[];
  currentUser?: UserType | null;
  onClearCart: () => void;
  onNavigate: (path: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartItems,
  currentUser,
  onClearCart,
  onNavigate,
}) => {
  const { showToast } = useToast();

  // Multi-step index: 1: Contact, 2: Address, 3: Shipping, 4: Payment, 5: Review
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form state
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [recipient, setRecipient] = useState(
    currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : ''
  );
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState(() => {
    if (typeof window === 'undefined') return 'GB';
    return sessionStorage.getItem(SHIP_COUNTRY_STORAGE_KEY) || 'GB';
  });

  const [selectedShippingId, setSelectedShippingId] = useState<string>('standard-delivery');
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscountCode, setAppliedDiscountCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'BANK_TRANSFER' | 'CRYPTO'>('CRYPTO');

  // Authoritative server calculation state
  const [calculation, setCalculation] = useState<CheckoutCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const [idempotencyKey] = useState(() => 'idemp_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36));

  useEffect(() => {
    if (!cartItems.length) return;
    const items = cartItems.map((i) => {
      const unit =
        i.unitPricePence != null
          ? penceToGbp(i.unitPricePence)
          : i.selectedVariant?.priceGbp || i.product?.salePriceGbp || i.product?.priceGbp || 0;
      return {
        item_id: i.selectedVariant?.sku || i.product?.sku || i.productId || i.id,
        item_name: i.product?.name || i.productName || 'Item',
        item_brand: i.product?.brandName,
        item_category: i.product?.categoryName,
        item_variant: i.variantName || i.selectedVariant?.name,
        price: unit,
        quantity: i.quantity,
      };
    });
    const value = items.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);
    trackBeginCheckout(items, value);
    // Fire once when checkout mounts with the current basket.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cartSubtotalPence = cartItems.reduce((sum, item) => {
    const p = item.selectedVariant?.priceGbp || item.product.salePriceGbp || item.product.priceGbp;
    return sum + Math.round(p * 100) * item.quantity;
  }, 0);

  const shippingMethods = useMemo(
    () => ShippingService.getShippingMethods(country, cartSubtotalPence),
    [country, cartSubtotalPence]
  );

  // Redirect to cart if empty
  useEffect(() => {
    if (cartItems.length === 0) {
      onNavigate('/cart');
    }
  }, [cartItems, onNavigate]);

  useEffect(() => {
    const valid = shippingMethods.find((m) => m.id === selectedShippingId) || shippingMethods[0];
    if (valid && valid.id !== selectedShippingId) {
      setSelectedShippingId(valid.id);
      sessionStorage.setItem(SHIP_RATE_STORAGE_KEY, valid.id);
    }
  }, [shippingMethods, selectedShippingId]);

  // Recalculate totals whenever items, shipping method, or discount changes
  useEffect(() => {
    if (cartItems.length === 0) return;

    const calculateTotals = async () => {
      setIsCalculating(true);
      try {
        const itemsPayload = cartItems.map((i) => ({
          productId: i.product.id,
          variantId: i.selectedVariant?.id,
          quantity: i.quantity,
        }));

        const res = await apiFetch('/api/v1/checkout/calculate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: itemsPayload,
            shippingMethodId: ShippingService.resolveRate(country, selectedShippingId, cartSubtotalPence).id,
            discountCode: appliedDiscountCode || undefined,
            country,
            paymentMethod,
          }),
        });

        if (res.ok) {
          const data: CheckoutCalculationResult = await res.json();
          setCalculation(data);
        }
      } catch (err) {
        console.error('Calculation error:', err);
      } finally {
        setIsCalculating(false);
      }
    };

    calculateTotals();
  }, [cartItems, selectedShippingId, appliedDiscountCode, country, paymentMethod]);

  const formatGbp = (pence: number) => `£${(pence / 100).toFixed(2)}`;
  const localShipping = ShippingService.resolveRate(country, selectedShippingId, cartSubtotalPence);
  const displayShippingPence = localShipping.pricePence;
  const displayShippingName = localShipping.displayName;
  const displayIsFreeShipping = localShipping.isFree;
  const displaySubtotalPence = calculation?.subtotalPence || cartSubtotalPence;
  const apiCryptoOff = calculation?.cryptoDiscountPence ?? 0;
  const promoDiscountPence = Math.max(0, (calculation?.discountPence ?? 0) - apiCryptoOff);
  const cryptoOffPence = isCryptoPaymentMethod(paymentMethod)
    ? cryptoDiscountPence(Math.max(0, displaySubtotalPence - promoDiscountPence))
    : 0;
  const orderTotalPence = Math.max(
    0,
    displaySubtotalPence - promoDiscountPence - cryptoOffPence + displayShippingPence + (calculation?.taxPence ?? 0)
  );
  const bankTransferAllowed =
    displaySubtotalPence - promoDiscountPence + displayShippingPence + (calculation?.taxPence ?? 0) >= 10000;

  useEffect(() => {
    if (!bankTransferAllowed && paymentMethod === 'BANK_TRANSFER') {
      setPaymentMethod('CRYPTO');
    }
  }, [bankTransferAllowed, paymentMethod]);

  // Step 1 Validation: Contact Info
  const validateStep1 = () => {
    const errors: string[] = [];
    if (!email.trim() || !email.includes('@')) {
      errors.push('A valid contact email address is required.');
    }
    if (!phone.trim() || phone.trim().replace(/\s/g, '').length < 7) {
      errors.push('A phone number is required for delivery.');
    }
    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Step 2 Validation: Address
  const validateStep2 = () => {
    const errors: string[] = [];
    if (!recipient.trim() || recipient.trim().length < 2) {
      errors.push('Full recipient name is required.');
    }
    if (!line1.trim() || line1.trim().length < 3) {
      errors.push('Address line 1 is required.');
    }
    if (!city.trim() || city.trim().length < 2) {
      errors.push('Town or city is required.');
    }
    if (!postcode.trim()) {
      errors.push('Postcode is required.');
    } else if (country === 'GB' && !/^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i.test(postcode.trim())) {
      errors.push('Please enter a valid UK postcode format (e.g. SW1A 1AA).');
    }

    setValidationErrors(errors);
    return errors.length === 0;
  };

  // Step handlers
  const handleNextStep = () => {
    setValidationErrors([]);
    if (currentStep === 1) {
      if (!validateStep1()) return;
      setCurrentStep(2);
    } else if (currentStep === 2) {
      if (!validateStep2()) return;
      setCurrentStep(3);
    } else if (currentStep === 3) {
      setCurrentStep(4);
    } else if (currentStep === 4) {
      setCurrentStep(5);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevStep = () => {
    setValidationErrors([]);
    if (currentStep > 1) {
      setCurrentStep((prev) => (prev - 1) as any);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Apply discount code
  const handleApplyDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!discountCode.trim()) return;

    try {
      const subtotalPence = calculation?.subtotalPence || 0;
      const res = await apiFetch('/api/v1/discounts/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: discountCode.trim(),
          subtotalPence,
        }),
      });

      const data = await res.json();
      if (data.isValid) {
        setAppliedDiscountCode(data.code);
        showToast('Promo Code Applied', `Discount of £${(data.discountPence / 100).toFixed(2)} applied!`, 'success');
      } else {
        showToast('Invalid Code', data.message || 'Promotional code is not valid.', 'error');
      }
    } catch (err) {
      showToast('Error', 'Unable to validate code at this time.', 'error');
    }
  };

  // Final Order Submission
  const handleSubmitOrder = async () => {
    if (!validateStep1() || !validateStep2()) {
      showToast('Validation Error', 'Please complete required contact and address details.', 'error');
      return;
    }

    setIsSubmitting(true);
    setValidationErrors([]);

    try {
      // Find active cart ID if available
      const storedCartId = localStorage.getItem('ukp_cart_id') || undefined;

      const payload = {
        cartId: storedCartId,
        email: email.trim(),
        phone: phone.trim(),
        shippingAddress: {
          recipient: recipient.trim(),
          line1: line1.trim(),
          line2: line2.trim() || undefined,
          city: city.trim(),
          county: county.trim() || undefined,
          postcode: postcode.trim().toUpperCase(),
          country: country || 'GB',
          phone: phone.trim(),
          email: email.trim(),
        },
        shippingMethodId: localShipping.id,
        paymentMethod,
        discountCode: appliedDiscountCode || undefined,
        idempotencyKey,
        items: cartItems.map((i) => {
          const unitPricePence =
            i.unitPricePence ??
            Math.round(
              ((i.selectedVariant?.priceGbp || i.product?.salePriceGbp || i.product?.priceGbp || 0) as number) * 100
            );
          return {
            productId: i.product?.id || i.productId || '',
            variantId: i.selectedVariant?.id,
            quantity: i.quantity,
            productName: i.product?.name || i.productName,
            productSku: i.selectedVariant?.sku || i.product?.sku,
            unitPricePence,
            imageUrl: i.productImageUrl || i.product?.images?.[0],
          };
        }),
      };

      const res = await apiFetch('/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': idempotencyKey,
        },
        body: JSON.stringify(payload),
      });

      const rawBody = await res.text();
      let data: any = {};
      try {
        data = rawBody ? JSON.parse(rawBody) : {};
      } catch {
        const looksLikePlatformCrash =
          /FUNCTION_INVOCATION_FAILED|A server error has occurred|Internal Server Error/i.test(rawBody);
        const errorMessage = looksLikePlatformCrash
          ? 'Checkout is temporarily unavailable (server error). Please try again in a moment.'
          : `Unexpected server response (${res.status}). Please try again.`;
        setValidationErrors([errorMessage]);
        showToast('Order Submission Failed', errorMessage, 'error');
        return;
      }

      if (res.ok && data.success && data.orderNumber) {
        showToast('Order Placed Successfully', `Order #${data.orderNumber} created.`, 'success');
        onClearCart();
        
        // Navigate to confirmation route
        const tokenQuery = data.trackingToken ? `?token=${encodeURIComponent(data.trackingToken)}` : '';
        onNavigate(`/checkout/success/${data.orderNumber}${tokenQuery}`);
      } else {
        const errorMessage =
          (typeof data.error === 'object' && data.error?.message) ||
          data.error ||
          'Failed to place order. Please check stock and try again.';
        setValidationErrors([errorMessage]);
        showToast('Order Submission Failed', String(errorMessage), 'error');
      }
    } catch (err: any) {
      console.error('Order submission exception:', err);
      const errMsg =
        (err && typeof err.message === 'string' && err.message) ||
        'A network error occurred while submitting your order. Please try again.';
      setValidationErrors([errMsg]);
      showToast('Submission Error', errMsg, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const stepLabels = [
    { num: 1, label: 'Contact', icon: User },
    { num: 2, label: 'Address', icon: MapPin },
    { num: 3, label: 'Delivery', icon: Truck },
    { num: 4, label: 'Payment', icon: CreditCard },
    { num: 5, label: 'Review', icon: FileText },
  ];

  return (
    <div className="bg-slate-50 min-h-screen pb-20 pt-6">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-6">
          <button
            onClick={() => onNavigate('/')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <button
            onClick={() => onNavigate('/cart')}
            className="hover:text-slate-900 transition-colors cursor-pointer"
          >
            Shopping Basket
          </button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="font-bold text-slate-900">Secure Checkout</span>
        </div>

        {/* Step Progress Bar Header */}
        <div className="bg-white rounded-3xl border border-slate-200 p-4 sm:p-6 mb-8 shadow-2xs">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {stepLabels.map((s, idx) => {
              const Icon = s.icon;
              const isPassed = currentStep > s.num;
              const isCurrent = currentStep === s.num;

              return (
                <React.Fragment key={s.num}>
                  <div
                    onClick={() => {
                      if (s.num < currentStep) setCurrentStep(s.num as any);
                    }}
                    className={`flex flex-col items-center gap-1.5 cursor-pointer ${
                      s.num <= currentStep ? 'opacity-100' : 'opacity-40'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm transition-all ${
                        isPassed
                          ? 'bg-teal-600 text-white'
                          : isCurrent
                          ? 'bg-teal-50 text-teal-700 border-2 border-teal-600'
                          : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {isPassed ? <Check className="w-4 h-4 stroke-[3]" /> : <Icon className="w-4 h-4 sm:w-5 sm:h-5" />}
                    </div>
                    <span
                      className={`text-[10px] sm:text-xs font-bold ${
                        isCurrent ? 'text-teal-700 font-black' : 'text-slate-600'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>

                  {idx < stepLabels.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 rounded-full transition-all ${
                        currentStep > s.num ? 'bg-teal-600' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Validation Errors Alert Box */}
        {validationErrors.length > 0 && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-red-800">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-extrabold block">Please correct the following issues to proceed:</span>
              <ul className="list-disc list-inside space-y-0.5 text-red-700">
                {validationErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Reconciliation Alerts */}
        {calculation?.reconciliationAlerts && calculation.reconciliationAlerts.length > 0 && (
          <div className="mb-6 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-xs text-amber-900">
            <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-extrabold block">Cart Notice:</span>
              <ul className="list-disc list-inside space-y-0.5 text-amber-800">
                {calculation.reconciliationAlerts.map((alert, i) => (
                  <li key={i}>{alert}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Main Grid: Form Steps (Left) vs Order Summary (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Form Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xs space-y-6">
              {/* STEP 1: CONTACT INFORMATION */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Step 1: Contact Information</h2>
                      <p className="text-xs text-slate-500 mt-0.5">
                        We will send order receipt and tracking updates to this address.
                      </p>
                    </div>
                    {currentUser ? (
                      <span className="text-xs font-bold text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                        Logged in as {currentUser.firstName}
                      </span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => onNavigate('/login?next=/checkout')}
                        className="text-xs font-bold text-teal-600 hover:text-teal-800 transition-colors cursor-pointer"
                      >
                        Sign in or create account
                      </button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="07123 456789"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: SHIPPING ADDRESS */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-slate-900">Step 2: Shipping Address</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enter the UK delivery address where your package will be dispatched.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Full Name / Recipient <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={recipient}
                        onChange={(e) => setRecipient(e.target.value)}
                        placeholder="e.g. John Smith"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Address Line 1 <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={line1}
                        onChange={(e) => setLine1(e.target.value)}
                        placeholder="House / Building name or number & Street"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Address Line 2 <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={line2}
                        onChange={(e) => setLine2(e.target.value)}
                        placeholder="Apartment, suite, unit, etc."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Town / City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="London / Manchester / etc."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        County / Region <span className="text-slate-400 font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
                        placeholder="Greater London / Yorkshire / etc."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Postcode <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={postcode}
                        onChange={(e) => setPostcode(e.target.value.toUpperCase())}
                        placeholder="SW1A 1AA"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white uppercase tracking-wider transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Country <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={country}
                        onChange={(e) => {
                          const next = e.target.value;
                          setCountry(next);
                          sessionStorage.setItem(SHIP_COUNTRY_STORAGE_KEY, next);
                          const methods = ShippingService.getShippingMethods(next, cartSubtotalPence);
                          if (methods[0]) {
                            setSelectedShippingId(methods[0].id);
                            sessionStorage.setItem(SHIP_RATE_STORAGE_KEY, methods[0].id);
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white transition-all cursor-pointer"
                      >
                        <CountrySelectOptions />
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: DELIVERY METHOD */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-slate-900">Step 3: Delivery Method</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      UK Tracked 48 is £10.00, Special Delivery £15.00, Discrete Delivery £20.00. Free Tracked 48 on UK orders of £300 or more. Europe £25.00 · Rest of world £35.00.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {shippingMethods.map((m) => {
                      const isSelected = selectedShippingId === m.id;
                      return (
                        <label
                          key={m.id}
                          className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-teal-50/60 border-teal-600 shadow-xs'
                              : 'bg-white border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shippingMethod"
                              checked={isSelected}
                              onChange={() => {
                                setSelectedShippingId(m.id);
                                sessionStorage.setItem(SHIP_RATE_STORAGE_KEY, m.id);
                              }}
                              className="text-teal-600 focus:ring-teal-500 h-4 w-4"
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-extrabold text-xs text-slate-900">{m.displayName}</span>
                                {m.isFree && (
                                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                                    Free Shipping
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-slate-500 block mt-0.5">{m.description}</span>
                            </div>
                          </div>
                          <span className="font-mono font-black text-xs text-slate-900">
                            {m.isFree ? 'Free' : formatGbp(m.pricePence)}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 4: PAYMENT METHOD */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-slate-900">Step 4: Payment Method</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Choose your payment option to proceed to order review.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {bankTransferAllowed ? (
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('BANK_TRANSFER')}
                        className={`w-full text-left p-5 rounded-2xl border-2 space-y-4 cursor-pointer ${
                          paymentMethod === 'BANK_TRANSFER'
                            ? 'border-teal-600 bg-teal-50/40'
                            : 'border-slate-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="paymentMethod"
                              checked={paymentMethod === 'BANK_TRANSFER'}
                              onChange={() => setPaymentMethod('BANK_TRANSFER')}
                              className="text-teal-600 focus:ring-teal-500 h-4 w-4"
                            />
                            <div className="flex items-center gap-2">
                              <Building2 className="w-4 h-4 text-teal-700" />
                              <span className="font-extrabold text-xs text-slate-900">UK Bank Faster Payments Transfer</span>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                            Orders £100+
                          </span>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-teal-200 text-xs text-slate-600 leading-relaxed space-y-2">
                          <p className="font-semibold text-slate-800">How Bank Transfer Payment Works:</p>
                          <ul className="list-disc list-inside space-y-1 text-[11px]">
                            <li>Place your order, then contact our admin team for payment instructions and payment details.</li>
                            <li>Quote your order number when you get in touch — do not send funds until you receive those details from us.</li>
                            <li>Your order dispatches after our team confirms payment.</li>
                          </ul>
                        </div>
                      </button>
                    ) : (
                      <p className="text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-xl p-3">
                        Bank transfer is available on orders of £100 or more. This order is {formatGbp(orderTotalPence)}, so crypto is the payment option.
                      </p>
                    )}

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('CRYPTO')}
                      className={`w-full text-left p-5 rounded-2xl border-2 space-y-3 cursor-pointer ${
                        paymentMethod === 'CRYPTO'
                          ? 'border-teal-600 bg-teal-50/40'
                          : 'border-slate-200 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="paymentMethod"
                            checked={paymentMethod === 'CRYPTO'}
                            onChange={() => setPaymentMethod('CRYPTO')}
                            className="text-teal-600 focus:ring-teal-500 h-4 w-4"
                          />
                          <div className="flex items-center gap-2">
                            <Bitcoin className="w-4 h-4 text-teal-700" />
                            <span className="font-extrabold text-xs text-slate-900">Crypto (BTC / USDT)</span>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-md">
                          5% off
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        5% is taken off automatically when you pay by crypto. After you place the order, contact admin for payment instructions and payment details.
                      </p>
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 5: ORDER REVIEW */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="border-b border-slate-100 pb-4">
                    <h2 className="text-lg font-black text-slate-900">Step 5: Order Review & Confirmation</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Please verify your order details before placing your order.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    {/* Contact Summary Box */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Contact</span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(1)}
                          className="text-teal-600 font-bold hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="font-bold text-slate-900">{email}</p>
                      {phone && <p className="text-slate-600">{phone}</p>}
                    </div>

                    {/* Address Summary Box */}
                    <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Delivery Address</span>
                        <button
                          type="button"
                          onClick={() => setCurrentStep(2)}
                          className="text-teal-600 font-bold hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                      </div>
                      <p className="font-bold text-slate-900">{recipient}</p>
                      <p className="text-slate-600">
                        {line1}
                        {line2 ? `, ${line2}` : ''}, {city}, {postcode}
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-500 uppercase tracking-wider text-[10px]">Payment</span>
                      <button
                        type="button"
                        onClick={() => setCurrentStep(4)}
                        className="text-teal-600 font-bold hover:underline cursor-pointer"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="font-bold text-slate-900 mt-2">
                      {paymentMethod === 'CRYPTO' ? 'Crypto (BTC / USDT)' : 'UK Bank Faster Payments'}
                    </p>
                  </div>

                  {/* Items List Preview */}
                  <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-100">
                    <div className="bg-slate-50 px-4 py-2.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                      Order Items ({calculation?.items.length || cartItems.length})
                    </div>
                    {(calculation?.items || []).map((item, idx) => (
                      <div key={idx} className="p-4 flex items-center justify-between gap-4 text-xs">
                        <div className="flex items-center gap-3">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.productName}
                              className="w-10 h-10 object-cover rounded-lg border border-slate-200 shrink-0"
                            />
                          )}
                          <div>
                            <span className="font-extrabold text-slate-900 block">{item.productName}</span>
                            <span className="text-[11px] text-slate-500 block">
                              {item.variantName ? `${item.variantName} • ` : ''}Qty: {item.quantity}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono font-black text-slate-900">
                          {formatGbp(item.lineTotalPence)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-5 py-3 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => onNavigate('/cart')}
                    className="px-5 py-3 rounded-xl border border-slate-200 font-bold text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Basket</span>
                  </button>
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-extrabold text-xs flex items-center gap-2 transition-all shadow-md shadow-teal-600/20 cursor-pointer"
                  >
                    <span>Continue to {stepLabels[currentStep]?.label}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmitOrder}
                    className="px-8 py-3.5 rounded-2xl bg-teal-600 hover:bg-teal-700 active:scale-98 text-white font-black text-sm flex items-center gap-2 transition-all shadow-lg shadow-teal-600/25 cursor-pointer disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Place Order</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Order Summary Panel */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-2xs space-y-6">
              <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-4 flex items-center justify-between">
                <span>Order Summary</span>
                <span className="text-xs font-normal text-slate-500">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </h3>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto pr-1 divide-y divide-slate-100 space-y-3">
                {cartItems.map((item) => {
                  const unitPrice = item.selectedVariant?.priceGbp || item.product.salePriceGbp || item.product.priceGbp;
                  return (
                    <div key={item.id} className="pt-3 first:pt-0 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-xl border border-slate-200 shrink-0"
                        />
                        <div>
                          <span className="font-extrabold text-slate-900 block line-clamp-1">
                            {item.product.name}
                          </span>
                          <span className="text-[11px] text-slate-500 block">
                            {item.selectedVariant?.name ? `${item.selectedVariant.name} • ` : ''}Qty: {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono font-bold text-slate-900 shrink-0">
                        {formatGbp(Math.round(unitPrice * 100) * item.quantity)}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyDiscount} className="pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                    placeholder="PROMO CODE"
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-mono font-bold uppercase text-slate-900 focus:outline-hidden focus:border-teal-600 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              </form>

              {/* Authoritative Order Totals */}
              <div className="space-y-2.5 text-xs pt-4 border-t border-slate-100">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-mono font-bold text-slate-900">
                    {formatGbp(displaySubtotalPence)}
                  </span>
                </div>

                {promoDiscountPence > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Discount ({calculation?.discountCode})</span>
                    <span className="font-mono">-{formatGbp(promoDiscountPence)}</span>
                  </div>
                )}

                {cryptoOffPence > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Crypto payment (5% off)</span>
                    <span className="font-mono">-{formatGbp(cryptoOffPence)}</span>
                  </div>
                )}

                <div className="flex justify-between text-slate-600">
                  <span>Delivery ({displayShippingName})</span>
                  <span className="font-mono font-bold text-slate-900">
                    {displayIsFreeShipping ? 'Free' : formatGbp(displayShippingPence)}
                  </span>
                </div>

                {calculation && calculation.taxPence > 0 && (
                  <div className="flex justify-between text-slate-500">
                    <span>Estimated Tax / VAT</span>
                    <span className="font-mono">{formatGbp(calculation.taxPence)}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-3 border-t border-slate-200 text-sm font-black text-slate-900">
                  <span>Total Due</span>
                  <span className="text-lg text-teal-700 font-black">
                    {formatGbp(orderTotalPence)}
                  </span>
                </div>
              </div>

              {/* Trust & Guarantee Badges */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-2 text-[11px] text-slate-600">
                <div className="flex items-center gap-2 font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Secure SSL Order Processing</span>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  <Truck className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Discreet Unbranded Dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};
