import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('uraaya_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('uraaya_cart', JSON.stringify(items));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [items]);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const addToCart = (product, selectedSize = null, selectedColor = null, quantity = 1) => {
    const size = selectedSize || (product.sizes && product.sizes[0]) || 'Standard';
    const color = selectedColor || (product.colors && product.colors[0]?.name) || 'Default';
    const cartItemId = `${product.id}-${size}-${color}`;

    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            productId: product.id,
            product,
            size,
            color,
            quantity,
            price: product.price
          }
        ];
      }
    });

    showToast(`Added "${product.name}" (${size}) to your Atelier Bag`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId) => {
    setItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const applyPromoCode = (code) => {
    const cleanCode = (code || '').trim().toUpperCase();
    if (cleanCode === 'URAAYA10') {
      setDiscountPercent(10);
      setPromoCode('URAAYA10');
      showToast('Atelier Code URAAYA10 applied: 10% privilege savings');
      return { success: true, message: '10% privilege discount applied' };
    } else if (cleanCode === 'ATELIER20') {
      setDiscountPercent(20);
      setPromoCode('ATELIER20');
      showToast('Exclusive Member Code ATELIER20 applied: 20% off');
      return { success: true, message: '20% member discount applied' };
    } else {
      return { success: false, message: 'Invalid or expired invitation code' };
    }
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
  };

  // Calculations
  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const freeShippingThreshold = 300;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingAmount = isFreeShipping ? 0 : 25;
  const taxAmount = (subtotal - discountAmount) * 0.08;
  const totalAmount = subtotal - discountAmount + shippingAmount + taxAmount;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        discountAmount,
        discountPercent,
        promoCode,
        shippingAmount,
        taxAmount,
        totalAmount,
        freeShippingThreshold,
        freeShippingProgress,
        remainingForFreeShipping,
        isFreeShipping,
        isCartOpen,
        toastMessage,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};

