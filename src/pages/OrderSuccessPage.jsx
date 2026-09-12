import React from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCurrency } from '../context/CurrencyContext';

export default function OrderSuccessPage() {
  const { orderId } = useParams();
  const { orders } = useAuth();
  const { formatPrice } = useCurrency();

  const currentOrder = orders.find((o) => o.id === orderId) || orders[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-alabaster pb-24 animate-fade-in">
      {/* Confirmation Header */}
      <div className="bg-noir text-alabaster py-16 px-4 text-center border-b border-noir-border">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto mb-2 border border-gold/40">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <span className="text-[10px] uppercase tracking-luxury text-gold font-mono block">
            Atelier Transaction Confirmed
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl font-light text-alabaster">
            Thank You For Your Patronage
          </h1>
          <p className="text-xs sm:text-sm text-alabaster/75 max-w-lg mx-auto font-light leading-relaxed">
            Your commission has been accepted. Our master artisans are now preparing your pieces in our climate-controlled atelier with bespoke gift packaging.
          </p>
          <div className="pt-2">
            <span className="inline-block font-mono text-xs text-gold border border-gold/30 px-4 py-1.5 bg-noir-card">
              Order Reference: {currentOrder.id}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-12">
        {/* Simulated Live Order Tracker */}
        <div className="bg-alabaster-pure border border-sand p-6 sm:p-8 shadow-sm mb-8">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-sand">
            <div>
              <span className="text-[10px] uppercase tracking-luxury text-gold font-medium">
                Live Atelier Tracking
              </span>
              <h3 className="font-serif text-xl text-noir mt-0.5">Dispatched via DHL Express VIP</h3>
            </div>
            <span className="text-xs font-mono text-noir/60">
              {currentOrder.trackingNumber || 'DHL-VIP-928410'}
            </span>
          </div>

          {/* Timeline Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-2 relative">
            <div className="flex sm:flex-col items-center sm:text-center gap-3">
              <div className="w-8 h-8 rounded-full bg-noir text-gold flex items-center justify-center text-xs font-bold shrink-0">
                ✓
              </div>
              <div>
                <p className="text-xs uppercase tracking-luxury font-semibold text-noir">
                  Order Received
                </p>
                <p className="text-[10px] text-noir/50 font-mono">Today, Verified</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:text-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gold text-noir flex items-center justify-center text-xs font-bold shrink-0 animate-pulse">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-luxury font-semibold text-noir">
                  Atelier Packaging
                </p>
                <p className="text-[10px] text-gold font-mono">In Progress</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:text-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full border border-sand-dark bg-sand-light text-noir flex items-center justify-center text-xs shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-luxury font-semibold text-noir">
                  Courier Transit
                </p>
                <p className="text-[10px] text-noir/50 font-mono">Estimated Tomorrow</p>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:text-center gap-3 opacity-50">
              <div className="w-8 h-8 rounded-full border border-sand-dark bg-sand-light text-noir flex items-center justify-center text-xs shrink-0">
                <Package className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-luxury font-semibold text-noir">
                  Signature Delivery
                </p>
                <p className="text-[10px] text-noir/50 font-mono">Within 48 Hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details & Summary Box */}
        <div className="bg-alabaster-pure border border-sand p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex justify-between items-center border-b border-sand pb-4">
            <h3 className="font-serif text-2xl text-noir">Commission Summary</h3>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-luxury text-noir/70 hover:text-noir border border-sand px-3 py-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Invoice</span>
            </button>
          </div>

          {/* Items */}
          <div className="divide-y divide-sand/60">
            {currentOrder.items.map((item, idx) => (
              <div key={idx} className="py-4 flex gap-4 items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-20 object-cover bg-sand-light shrink-0"
                />
                <div className="flex-1 text-xs">
                  <h4 className="font-serif text-base text-noir font-medium">{item.name}</h4>
                  <p className="text-noir/60 mt-0.5">
                    Size: {item.size} • Color: {item.color} • Quantity: {item.quantity}
                  </p>
                </div>
                <span className="font-sans text-sm font-semibold text-noir">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="pt-4 border-t border-sand flex justify-between items-baseline">
            <span className="font-serif text-xl text-noir">Total Commission Amount:</span>
            <span className="font-sans text-2xl font-bold text-noir">
              {formatPrice(currentOrder.total)}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link
            to="/account"
            className="text-xs uppercase tracking-luxury text-noir hover:text-gold border-b border-noir pb-1 transition-colors"
          >
            View All Order Histories in Atelier Account
          </Link>
          <Link
            to="/shop"
            className="bg-noir hover:bg-gold hover:text-noir text-alabaster px-8 py-3.5 text-xs uppercase tracking-luxury font-medium transition-colors inline-flex items-center gap-2"
          >
            <span>Continue Exploring Collection</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

