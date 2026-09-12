import React from 'react';
import { useCart } from '../../context/CartContext';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-bounce-short">
      <div className="bg-noir text-alabaster border border-gold/40 shadow-2xl px-5 py-4 rounded-none flex items-center gap-3 backdrop-blur-md">
        <div className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center text-gold">
          <ShoppingBag className="w-4 h-4" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-luxury text-gold font-medium">Atelier Notification</p>
          <p className="text-sm font-sans text-alabaster mt-0.5">{toastMessage}</p>
        </div>
      </div>
    </div>
  );
}

