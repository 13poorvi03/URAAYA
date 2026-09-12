import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const DEFAULT_USER = {
  name: 'Elena Vance-Montmirail',
  email: 'elena.montmirail@haute-uraaya.com',
  phone: '+1 (212) 840-2918',
  tier: 'URAAYA Black Card Atelier VIP',
  points: 4850,
  memberSince: '2024',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
};

const DEFAULT_ADDRESSES = [
  {
    id: 'addr-1',
    isDefault: true,
    label: 'Manhattan Residence',
    fullName: 'Elena Vance-Montmirail',
    street: '720 Park Avenue, Apt 14B',
    city: 'New York',
    state: 'NY',
    postalCode: '10021',
    country: 'United States',
    phone: '+1 (212) 840-2918'
  },
  {
    id: 'addr-2',
    isDefault: false,
    label: 'Paris Pied-à-terre',
    fullName: 'Elena Vance-Montmirail',
    street: '26 Avenue Montaigne',
    city: 'Paris',
    state: 'Île-de-France',
    postalCode: '75008',
    country: 'France',
    phone: '+33 1 42 68 80 00'
  }
];

const INITIAL_ORDERS = [
  {
    id: 'URA-94821',
    date: '2026-08-28',
    total: 1610,
    status: 'Delivered',
    trackingNumber: 'DHL-EXPRESS-928194',
    items: [
      {
        name: 'Atelier Double-Breasted Cashmere Coat',
        size: 'S',
        color: 'Camel Warm Sand',
        price: 890,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1539533018447-63fcce667823?auto=format&fit=crop&w=300&q=80'
      },
      {
        name: 'Sculptural Bias-Cut Silk Evening Gown',
        size: 'XS',
        color: 'Champagne Gold',
        price: 720,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=300&q=80'
      }
    ]
  },
  {
    id: 'URA-96204',
    date: '2026-09-08',
    total: 920,
    status: 'Dispatched',
    trackingNumber: 'FEDEX-PRIORITY-449102',
    items: [
      {
        name: 'The Monolith Sculptural Leather Tote',
        size: 'One Size',
        color: 'Cognac Leather',
        price: 920,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=300&q=80'
      }
    ]
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('uraaya_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('uraaya_is_auth') === 'true' || true;
  });

  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem('uraaya_addresses');
      return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
    } catch {
      return DEFAULT_ADDRESSES;
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('uraaya_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('uraaya_user', JSON.stringify(user));
    localStorage.setItem('uraaya_is_auth', String(isAuthenticated));
    localStorage.setItem('uraaya_addresses', JSON.stringify(addresses));
    localStorage.setItem('uraaya_orders', JSON.stringify(orders));
  }, [user, isAuthenticated, addresses, orders]);

  const login = (email, password) => {
    setIsAuthenticated(true);
    setUser((prev) => ({
      ...prev,
      email: email || prev.email,
      name: email.split('@')[0] ? email.split('@')[0].replace('.', ' ') : prev.name
    }));
    setIsAuthModalOpen(false);
  };

  const register = (name, email, password) => {
    const newUser = {
      name: name || 'Valued Atelier Patron',
      email: email,
      phone: '+1 (555) 019-2831',
      tier: 'URAAYA Silver Atelier Member',
      points: 500,
      memberSince: '2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
    };
    setUser(newUser);
    setIsAuthenticated(true);
    setIsAuthModalOpen(false);
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    // Award 5 loyalty points per dollar spent
    setUser((prev) => ({
      ...prev,
      points: prev.points + Math.round(newOrder.total * 5)
    }));
  };

  const addAddress = (newAddr) => {
    const addressWithId = { ...newAddr, id: `addr-${Date.now()}` };
    setAddresses((prev) => [...prev, addressWithId]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        addresses,
        orders,
        isAuthModalOpen,
        openAuthModal: () => setIsAuthModalOpen(true),
        closeAuthModal: () => setIsAuthModalOpen(false),
        login,
        register,
        logout,
        addOrder,
        addAddress
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

