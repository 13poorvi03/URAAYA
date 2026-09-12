import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  CreditCard,
  Lock,
  Truck,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutPage() {
  const { items, subtotal, discountAmount, totalAmount, clearCart, isFreeShipping } = useCart();
  const { formatPrice } = useCurrency();
  const { user, addresses, addOrder } = useAuth();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1); // 1: Shipping, 2: Delivery, 3: Payment

  // Form State
  const defaultAddr = addresses[0] || {};
  const [formData, setFormData] = useState({
    firstName: user?.name ? user.name.split(' ')[0] : 'Elena',
    lastName: user?.name ? user.name.split(' ').slice(1).join(' ') : 'de Montmirail',
    email: user?.email || 'elena@haute-uraaya.com',
    phone: defaultAddr.phone || '+1 (212) 840-2918',
    street: defaultAddr.street || '720 Park Avenue, Apt 14B',
    city: defaultAddr.city || 'New York',
    state: defaultAddr.state || 'NY',
    postalCode: defaultAddr.postalCode || '10021',
    country: defaultAddr.country || 'United States'
  });

  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [shippingFee, setShippingFee] = useState(0);

  // Simulated Card State
  const [cardData, setCardData] = useState({
    number: '•••• •••• •••• 8829',
    name: 'ELENA DE MONTMIRAIL',
    expiry: '09/29',
    cvv: '•••'
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryOptions = [
    {
      id: 'standard',
      name: 'Standard Atelier Global Delivery',
      time: '3-4 Business Days',
      price: 0,
      description: 'Climate-neutral transit in signature URAAYA presentation packaging.'
    },
    {
      id: 'express',
      name: 'DHL Express VIP Priority Courier',
      time: '1-2 Business Days',
      price: 35,
      description: 'Guaranteed morning delivery with dedicated SMS tracking concierge.'
    },
    {
      id: 'concierge',
      name: 'Same-Day White-Glove Concierge (NY, Paris, Milan, London)',
      time: 'Evening by 7:00 PM',
      price: 80,
      description: 'Hand-delivered by an atelier associate with hanging garment bags.'
    }
  ];

  const handleDeliverySelect = (opt) => {
    setDeliveryMethod(opt.id);
    setShippingFee(opt.price);
  };

  const finalTotal = subtotal - discountAmount + (isFreeShipping ? 0 : 25) + shippingFee;

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const orderId = `URA-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        total: finalTotal,
        status: 'Confirmed',
        trackingNumber: `DHL-VIP-${Math.floor(100000 + Math.random() * 900000)}`,
        shippingAddress: formData,
        deliveryMethod,
        items: items.map((item) => ({
          name: item.product.name,
          size: item.size,
          color: item.color,
          price: item.price,
          quantity: item.quantity,
          image: item.product.images[0]
        }))
      };

      addOrder(newOrder);
      clearCart();
      setIsProcessing(false);
      navigate(`/order-success/${orderId}`);
    }, 1800);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="font-serif text-3xl text-noir mb-2">No Active Cart To Checkout</h2>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 bg-noir text-alabaster text-xs uppercase tracking-luxury px-6 py-3"
        >
          Return to Atelier Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alabaster pb-24 animate-fade-in">
      {/* Top Banner */}
      <div className="bg-noir text-alabaster py-6 px-4 border-b border-noir-border">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-luxury text-alabaster/70 hover:text-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </button>
          <div className="text-center">
            <span className="font-serif text-2xl tracking-[0.25em] text-alabaster block">
              URAAYA
            </span>
            <span className="text-[8px] uppercase tracking-[0.4em] text-gold block mt-0.5">
              Secure Atelier Gateway
            </span>
          </div>
          <div className="flex items-center gap-1 text-gold text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline uppercase tracking-wider text-[10px]">
              Encrypted Checkout
            </span>
          </div>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2 sm:gap-6 text-xs uppercase tracking-luxury">
          <div
            className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
              currentStep === 1 ? 'border-gold text-noir font-semibold' : 'border-transparent text-noir/40'
            }`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
              1
            </span>
            <span>Client & Address</span>
          </div>
          <ChevronRight className="w-4 h-4 text-sand-dark" />
          <div
            className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
              currentStep === 2 ? 'border-gold text-noir font-semibold' : 'border-transparent text-noir/40'
            }`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
              2
            </span>
            <span>Delivery Method</span>
          </div>
          <ChevronRight className="w-4 h-4 text-sand-dark" />
          <div
            className={`flex items-center gap-2 pb-1 border-b-2 transition-all ${
              currentStep === 3 ? 'border-gold text-noir font-semibold' : 'border-transparent text-noir/40'
            }`}
          >
            <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-[10px]">
              3
            </span>
            <span>Atelier Payment</span>
          </div>
        </div>
      </div>

      {/* Main Form Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Step Content */}
          <div className="lg:col-span-7 bg-alabaster-pure border border-sand p-6 sm:p-10 shadow-sm">
            {/* STEP 1: Address */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-sand pb-4">
                  <h2 className="font-serif text-2xl text-noir">Delivery Address & Contact</h2>
                  <p className="text-xs text-noir/60 mt-1">
                    Your garments will be delivered in bespoke packaging to this destination.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs text-noir focus:border-noir focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs text-noir focus:border-noir focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Email Address (For Tracking)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs text-noir focus:border-noir focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Telephone (For Courier Dispatch)
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs text-noir focus:border-noir focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                    Street Address & Suite / Floor
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                    className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs text-noir focus:border-noir focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs text-noir focus:border-noir focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs text-noir focus:border-noir focus:outline-none"
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs text-noir focus:border-noir focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-full bg-noir text-alabaster py-3.5 text-xs uppercase tracking-luxury font-medium hover:bg-gold hover:text-noir transition-colors"
                  >
                    Continue to Delivery Options
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Delivery Method */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-sand pb-4">
                  <h2 className="font-serif text-2xl text-noir">Select Delivery Service</h2>
                  <p className="text-xs text-noir/60 mt-1">
                    Choose your preferred level of courier transit.
                  </p>
                </div>

                <div className="space-y-4">
                  {deliveryOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => handleDeliverySelect(opt)}
                      className={`p-5 border cursor-pointer transition-all ${
                        deliveryMethod === opt.id
                          ? 'border-noir bg-sand-light/40 shadow-sm'
                          : 'border-sand hover:border-sand-dark'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="deliveryMethod"
                            checked={deliveryMethod === opt.id}
                            onChange={() => handleDeliverySelect(opt)}
                            className="accent-noir"
                          />
                          <div>
                            <h4 className="text-xs uppercase tracking-luxury font-semibold text-noir">
                              {opt.name}
                            </h4>
                            <p className="text-xs text-gold font-medium mt-0.5">{opt.time}</p>
                          </div>
                        </div>
                        <span className="text-xs font-mono font-medium text-noir">
                          {opt.price === 0 ? 'Complimentary' : formatPrice(opt.price)}
                        </span>
                      </div>
                      <p className="text-xs text-noir/60 mt-2 pl-7 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="w-1/3 border border-sand-dark text-noir py-3.5 text-xs uppercase tracking-luxury hover:border-noir transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setCurrentStep(3)}
                    className="w-2/3 bg-noir text-alabaster py-3.5 text-xs uppercase tracking-luxury font-medium hover:bg-gold hover:text-noir transition-colors"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="border-b border-sand pb-4">
                  <h2 className="font-serif text-2xl text-noir">Atelier Payment Method</h2>
                  <p className="text-xs text-noir/60 mt-1">
                    Simulated secure payment gateway. No real charge will occur.
                  </p>
                </div>

                {/* 3D Realistic Luxury Black Card Preview */}
                <div className="w-full max-w-sm mx-auto aspect-[1.58/1] rounded-xl bg-gradient-to-tr from-noir to-noir-card p-6 text-alabaster border border-gold/40 shadow-2xl flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gold/10 blur-2xl pointer-events-none" />
                  <div className="flex justify-between items-start">
                    <span className="font-serif text-xl tracking-[0.25em] text-gold">URAAYA</span>
                    <span className="text-[9px] uppercase tracking-luxury text-gold/80 font-mono">
                      BLACK CARD
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="w-10 h-7 rounded bg-gradient-to-r from-amber-300 to-amber-500 opacity-80 mb-3" />
                    <p className="font-mono text-base tracking-[0.25em] text-alabaster">
                      {cardData.number}
                    </p>
                  </div>

                  <div className="flex justify-between items-end text-[10px] font-mono text-alabaster/75">
                    <div>
                      <span className="block text-[8px] uppercase tracking-wider text-gold/80">
                        Cardholder
                      </span>
                      <span className="tracking-wider">{cardData.name}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] uppercase tracking-wider text-gold/80">
                        Expires
                      </span>
                      <span>{cardData.expiry}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Card Inputs */}
                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardData.number}
                      onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                      placeholder="4000 1234 5678 9010"
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs font-mono text-noir focus:border-noir focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={cardData.name}
                        onChange={(e) => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
                        placeholder="NAME ON CARD"
                        className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs text-noir focus:border-noir focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                        Expiry Date & CVV
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          placeholder="MM/YY"
                          className="w-1/2 bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs font-mono text-noir focus:border-noir focus:outline-none"
                        />
                        <input
                          type="password"
                          maxLength="4"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          placeholder="CVV"
                          className="w-1/2 bg-sand-light/50 border border-sand-dark px-3 py-2.5 text-xs font-mono text-noir focus:border-noir focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dummy Express Payment alternative */}
                <div className="border-t border-sand pt-4">
                  <p className="text-[10px] uppercase tracking-luxury text-noir/50 text-center mb-3">
                    Or Express Checkout With:
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      className="bg-noir text-alabaster py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-noir-light transition-colors"
                    >
                      Apple Pay
                    </button>
                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      className="bg-sand hover:bg-sand-dark text-noir py-2.5 text-xs uppercase tracking-wider font-semibold transition-colors"
                    >
                      Google Pay
                    </button>
                  </div>
                </div>

                {/* Submit Order Button */}
                <div className="pt-4 flex gap-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="w-1/3 border border-sand-dark text-noir py-3.5 text-xs uppercase tracking-luxury hover:border-noir transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="w-2/3 bg-noir hover:bg-gold hover:text-noir text-alabaster py-3.5 text-xs uppercase tracking-luxury font-medium transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    {isProcessing ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin text-gold" />
                        Authorizing Atelier Transaction...
                      </span>
                    ) : (
                      <span>Complete Order ({formatPrice(finalTotal)})</span>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Preview */}
          <div className="lg:col-span-5">
            <div className="bg-alabaster-pure border border-sand p-6 sm:p-8 space-y-6">
              <h3 className="font-serif text-xl text-noir border-b border-sand pb-4">
                Atelier Order Summary ({items.length} pieces)
              </h3>

              <div className="max-h-64 overflow-y-auto divide-y divide-sand/60 pr-2">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex gap-3 items-center">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-14 h-18 object-cover bg-sand-light shrink-0"
                    />
                    <div className="flex-1 text-xs">
                      <h4 className="font-serif text-sm text-noir">{item.product.name}</h4>
                      <p className="text-noir/60">
                        {item.size} • {item.color} • Qty: {item.quantity}
                      </p>
                      <p className="font-sans font-medium text-noir mt-0.5">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-sand pt-4 space-y-2 text-xs text-noir/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-gold font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span>
                    {shippingFee === 0 && isFreeShipping
                      ? 'Complimentary'
                      : formatPrice(shippingFee + (isFreeShipping ? 0 : 25))}
                  </span>
                </div>
                <div className="flex justify-between text-base font-serif font-medium text-noir pt-2 border-t border-sand">
                  <span>Total</span>
                  <span className="font-sans font-semibold text-xl">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-sand-light/50 text-[11px] text-noir/70 space-y-2 border border-sand">
                <div className="flex items-center gap-1.5 text-gold font-medium">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Complimentary Private Atelier Returns</span>
                </div>
                <p>
                  You may exchange or request complimentary courier retrieval within 30 days of arrival.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

