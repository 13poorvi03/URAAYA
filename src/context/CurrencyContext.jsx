import React, { createContext, useContext, useState, useEffect } from 'react';

const CurrencyContext = createContext();

export const CURRENCIES = {
  USD: { symbol: '$', code: 'USD', rate: 1, label: 'USD ($)' },
  EUR: { symbol: '€', code: 'EUR', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', code: 'GBP', rate: 0.79, label: 'GBP (£)' },
  JPY: { symbol: '¥', code: 'JPY', rate: 155, label: 'JPY (¥)' }
};

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState(() => {
    const saved = localStorage.getItem('uraaya_currency');
    return saved && CURRENCIES[saved] ? saved : 'USD';
  });

  useEffect(() => {
    localStorage.setItem('uraaya_currency', currency);
  }, [currency]);

  const formatPrice = (usdAmount) => {
    if (usdAmount === null || usdAmount === undefined) return '';
    const config = CURRENCIES[currency] || CURRENCIES.USD;
    const converted = usdAmount * config.rate;

    if (currency === 'JPY') {
      return `${config.symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${config.symbol}${Math.round(converted).toLocaleString()}`;
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, currencies: CURRENCIES, formatPrice }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within CurrencyProvider');
  return context;
};

