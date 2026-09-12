import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Gift, Sparkles, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    discountPercent,
    promoCode,
    applyPromoCode,
    removePromoCode,
    freeShippingProgress,
    remainingForFreeShipping,
    isFreeShipping,
    shippingAmount,
    taxAmount,
    totalAmount
  } = useCart();

  const { formatPrice } = useCurrency();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState('');
  const [codeFeedback, setCodeFeedback] = useState(null);
  const [giftWrap, setGiftWrap] = useState(true);
  const [giftNote, setGiftNote] = useState('');

  const handleApply = (e) => {
    e.preventDefault();
    const res = applyPromoCode(inputCode);
    setCodeFeedback(res);
    if (res.success) setInputCode('');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center bg-alabaster">
        <div className="w-16 h-16 bg-sand-light rounded-full flex items-center justify-center text-sand-dark mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl text-noir mb-2">Your Atelier Bag is Empty</h1>
        <p className="text-xs uppercase tracking-luxury text-gold mb-8 max-w-sm">
          Discover our new autumn outerwear, silk evening gowns, and artisanal leather goods.
        </p>
        <Link
          to="/shop"
          className="bg-noir text-alabaster px-8 py-3.5 text-xs uppercase tracking-luxury font-medium hover:bg-gold hover:text-noir transition-colors"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-alabaster pb-24 animate-fade-in">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 border-b border-sand">
        <h1 className="font-serif text-3xl sm:text-5xl text-noir font-light">
          Your Atelier Wardrobe Bag
        </h1>
        <p className="text-xs uppercase tracking-luxury text-gold mt-1">
          Review pieces, complimentary packaging & concierge delivery
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Cart Items & Gift Options */}
          <div className="lg:col-span-8 space-y-8">
            {/* Free Shipping Meter */}
            <div className="bg-sand-light/60 p-4 border border-sand">
              <div className="flex justify-between items-center text-xs mb-2">
                {isFreeShipping ? (
                  <span className="text-noir font-medium flex items-center gap-1 text-gold">
                    <Sparkles className="w-4 h-4" /> Complimentary White-Glove Global Delivery Applied
                  </span>
                ) : (
                  <span className="text-noir/80">
                    Add <span className="font-semibold text-noir">{formatPrice(remainingForFreeShipping)}</span> more for complimentary courier delivery
                  </span>
                )}
                <span className="font-mono text-xs text-noir/60">{freeShippingProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-sand rounded-full overflow-hidden">
                <div
                  className="h-full bg-gold transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="divide-y divide-sand border-y border-sand">
              {items.map((item) => (
                <div key={item.id} className="py-6 flex flex-col sm:flex-row gap-6 items-start">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-32 object-cover object-center bg-sand-light shrink-0"
                  />
                  <div className="flex-1 w-full flex flex-col justify-between h-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase tracking-luxury text-gold">
                          {item.product.subcategory}
                        </span>
                        <h3 className="font-serif text-lg text-noir mt-0.5">
                          <Link
                            to={`/product/${item.product.id}`}
                            className="hover:text-gold transition-colors"
                          >
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-noir/60 mt-1">
                          Size: <span className="font-medium text-noir">{item.size}</span> | Color:{' '}
                          <span className="font-medium text-noir">{item.color}</span>
                        </p>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-noir/40 hover:text-red-700 p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-sand/40">
                      {/* Quantity buttons */}
                      <div className="flex items-center border border-sand-dark bg-alabaster-pure">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs text-noir/70 hover:text-noir"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 text-xs font-mono font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs text-noir/70 hover:text-noir"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-base font-sans font-medium text-noir">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bespoke Gift Packaging Option */}
            <div className="p-6 bg-alabaster-pure border border-sand space-y-4">
              <div className="flex items-start gap-3">
                <Gift className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                <div className="flex-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={giftWrap}
                      onChange={(e) => setGiftWrap(e.target.checked)}
                      className="accent-noir w-4 h-4"
                    />
                    <span className="text-xs uppercase tracking-luxury font-semibold text-noir">
                      Signature Atelier Gift Packaging (Complimentary)
                    </span>
                  </label>
                  <p className="text-xs text-noir/60 mt-1 leading-relaxed">
                    Individually placed in custom rigid magnetic gift boxes, sealed with double-faced grosgrain ribbon and scented with cedarwood.
                  </p>
                </div>
              </div>

              {giftWrap && (
                <div className="pl-8 pt-2">
                  <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                    Complimentary Handwritten Calligraphy Note
                  </label>
                  <textarea
                    rows="2"
                    value={giftNote}
                    onChange={(e) => setGiftNote(e.target.value)}
                    placeholder="Enter your personal gift message for the recipient..."
                    className="w-full bg-sand-light/60 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none focus:border-noir"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout */}
          <div className="lg:col-span-4">
            <div className="bg-alabaster-pure border border-sand p-6 sm:p-8 space-y-6 sticky top-28">
              <h2 className="font-serif text-2xl text-noir border-b border-sand pb-4">
                Summary of Atelier Order
              </h2>

              {/* Promo Code field */}
              <div>
                {promoCode ? (
                  <div className="flex items-center justify-between text-xs bg-gold/10 border border-gold/40 p-2.5 text-gold">
                    <span>Privilege Code ({promoCode}) Applied</span>
                    <button
                      onClick={removePromoCode}
                      className="text-noir/60 hover:text-noir underline text-[11px]"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApply} className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Invitation Code (e.g. URAAYA10)"
                        value={inputCode}
                        onChange={(e) => setInputCode(e.target.value)}
                        className="flex-1 bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none focus:border-noir uppercase"
                      />
                      <button
                        type="submit"
                        className="bg-noir text-alabaster text-xs uppercase tracking-luxury px-4 py-2 hover:bg-gold hover:text-noir transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {codeFeedback && (
                      <p
                        className={`text-[11px] ${
                          codeFeedback.success ? 'text-green-700' : 'text-red-600'
                        }`}
                      >
                        {codeFeedback.message}
                      </p>
                    )}
                  </form>
                )}
              </div>

              {/* Cost Rows */}
              <div className="space-y-3 text-xs text-noir/70 border-b border-sand pb-4">
                <div className="flex justify-between">
                  <span>Subtotal ({items.length} items)</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-gold font-medium">
                    <span>Privilege Discount ({discountPercent}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Worldwide Courier Delivery</span>
                  <span>{isFreeShipping ? 'Complimentary' : formatPrice(25)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Duty & VAT</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>
              </div>

              {/* Total Due */}
              <div className="flex justify-between items-baseline text-lg font-serif text-noir">
                <span>Total Due</span>
                <span className="font-sans font-semibold text-2xl">
                  {formatPrice(totalAmount)}
                </span>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-noir hover:bg-gold hover:text-noir text-alabaster py-4 text-xs uppercase tracking-luxury font-medium transition-all flex items-center justify-center gap-2 shadow-xl"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-[11px] text-noir/50 uppercase tracking-luxury space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-gold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>256-Bit Encrypted Atelier Gateway</span>
                </div>
                <p>Complimentary 30-Day Bespoke Returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

