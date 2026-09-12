import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useCurrency } from '../../context/CurrencyContext';

export default function QuickCartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    promoCode,
    applyPromoCode,
    removePromoCode,
    freeShippingProgress,
    remainingForFreeShipping,
    isFreeShipping
  } = useCart();

  const { formatPrice } = useCurrency();
  const navigate = useNavigate();
  const [inputCode, setInputCode] = useState('');
  const [codeFeedback, setCodeFeedback] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyCode = (e) => {
    e.preventDefault();
    const res = applyPromoCode(inputCode);
    setCodeFeedback(res);
    if (res.success) {
      setInputCode('');
    }
  };

  const handleGoToCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-noir/70 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-0" onClick={closeCart} />

      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-alabaster-pure shadow-2xl flex flex-col z-10 border-l border-sand">
        {/* Header */}
        <div className="p-6 border-b border-sand flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-gold" />
            <h2 className="font-serif text-2xl text-noir tracking-wide">Your Atelier Bag</h2>
            <span className="text-xs font-sans text-noir/50">({items.length})</span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 text-noir/50 hover:text-noir transition-colors"
            aria-label="Close bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-sand-light/60 px-6 py-3 border-b border-sand">
          <div className="flex items-center justify-between text-xs mb-1.5">
            {isFreeShipping ? (
              <span className="text-noir font-medium flex items-center gap-1.5 text-gold">
                <Sparkles className="w-3.5 h-3.5" /> Complimentary White-Glove Shipping Unlocked
              </span>
            ) : (
              <span className="text-noir/80">
                Add <span className="font-semibold text-noir">{formatPrice(remainingForFreeShipping)}</span> for Complimentary Delivery
              </span>
            )}
            <span className="text-[10px] text-noir/50 font-mono">{freeShippingProgress}%</span>
          </div>
          <div className="w-full h-1.5 bg-sand rounded-full overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="text-center py-16 text-noir/60">
              <ShoppingBag className="w-12 h-12 text-sand-dark mx-auto mb-4 stroke-1" />
              <p className="font-serif text-2xl text-noir mb-2">Your Bag is Empty</p>
              <p className="text-xs uppercase tracking-luxury text-gold mb-6">
                Curate your wardrobe from our autumn collection
              </p>
              <Link
                to="/shop"
                onClick={closeCart}
                className="inline-block bg-noir text-alabaster text-xs uppercase tracking-luxury px-6 py-3 hover:bg-gold hover:text-noir transition-colors"
              >
                Discover Collection
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 pb-6 border-b border-sand/60 last:border-0">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-20 h-24 object-cover object-center bg-sand-light shrink-0"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <Link
                        to={`/product/${item.product.id}`}
                        onClick={closeCart}
                        className="font-serif text-base text-noir hover:text-gold transition-colors line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-noir/40 hover:text-red-700 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-xs text-noir/60 mt-0.5 space-x-2">
                      <span>Size: {item.size}</span>
                      <span>•</span>
                      <span>Color: {item.color}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    {/* Quantity Selector */}
                    <div className="flex items-center border border-sand-dark">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-noir/70 hover:text-noir hover:bg-sand-light transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 text-xs font-mono font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-noir/70 hover:text-noir hover:bg-sand-light transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-sans font-medium text-noir">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer with totals and checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-sand bg-alabaster/80 space-y-4">
            {/* Promo Code */}
            <div>
              {promoCode ? (
                <div className="flex items-center justify-between text-xs bg-gold/10 border border-gold/40 p-2 text-gold">
                  <span>Privilege Code ({promoCode}) applied</span>
                  <button onClick={removePromoCode} className="text-noir/60 hover:text-noir underline text-[11px]">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCode} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Invitation Code (e.g. URAAYA10)"
                    value={inputCode}
                    onChange={(e) => setInputCode(e.target.value)}
                    className="flex-1 bg-alabaster-pure border border-sand-dark px-3 py-1.5 text-xs text-noir placeholder-noir/30 focus:outline-none focus:border-noir"
                  />
                  <button
                    type="submit"
                    className="bg-sand hover:bg-sand-dark text-noir text-xs uppercase tracking-luxury px-3 py-1.5 transition-colors font-medium"
                  >
                    Apply
                  </button>
                </form>
              )}
              {codeFeedback && !promoCode && (
                <p className={`text-[11px] mt-1 ${codeFeedback.success ? 'text-green-700' : 'text-red-600'}`}>
                  {codeFeedback.message}
                </p>
              )}
            </div>

            {/* Subtotals */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-noir/70">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-gold font-medium">
                  <span>Privilege Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-noir/70">
                <span>Estimated Delivery</span>
                <span>{isFreeShipping ? 'Complimentary' : formatPrice(25)}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-medium text-noir pt-2 border-t border-sand">
                <span>Total Due</span>
                <span>{formatPrice(subtotal - discountAmount + (isFreeShipping ? 0 : 25))}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-2 pt-2">
              <button
                onClick={handleGoToCheckout}
                className="w-full bg-noir hover:bg-gold hover:text-noir text-alabaster py-3.5 text-xs uppercase tracking-luxury font-medium transition-all flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                to="/cart"
                onClick={closeCart}
                className="block text-center text-xs uppercase tracking-luxury text-noir/60 hover:text-noir py-1 underline"
              >
                Review Full Bag & Packaging Options
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-luxury text-noir/40 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-gold" />
              <span>Complimentary Returns & Authenticity Guaranteed</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

