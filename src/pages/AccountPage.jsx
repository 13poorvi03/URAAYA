import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Crown,
  Package,
  Heart,
  MapPin,
  User,
  LogOut,
  Sparkles,
  Plus,
  Trash2,
  ShoppingBag,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { useCurrency } from '../context/CurrencyContext';
import { PRODUCTS } from '../data/products';

export default function AccountPage() {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get('tab') || 'orders';
  const [activeTab, setActiveTab] = useState(initialTab);

  const { user, addresses, orders, logout, addAddress } = useAuth();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  // New address state
  const [showAddAddr, setShowAddAddr] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: 'Country Villa',
    fullName: user.name,
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
    phone: user.phone
  });

  const wishlistProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  const handleSaveAddress = (e) => {
    e.preventDefault();
    if (newAddr.street && newAddr.city) {
      addAddress(newAddr);
      setShowAddAddr(false);
      setNewAddr({
        label: '',
        fullName: user.name,
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'United States',
        phone: user.phone
      });
    }
  };

  return (
    <div className="min-h-screen bg-alabaster pb-24 animate-fade-in">
      {/* Top Banner / VIP Tier Card */}
      <div className="bg-noir text-alabaster py-12 px-4 sm:px-6 lg:px-8 border-b border-noir-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* User Info */}
          <div className="flex items-center gap-5 text-center md:text-left">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-gold p-0.5 shadow-xl"
            />
            <div>
              <div className="inline-flex items-center gap-1.5 text-gold text-xs uppercase tracking-luxury font-medium">
                <Crown className="w-4 h-4" />
                <span>{user.tier}</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl text-alabaster mt-0.5">
                {user.name}
              </h1>
              <p className="text-xs text-alabaster/60 mt-1 font-mono">
                {user.email} • Atelier Member Since {user.memberSince}
              </p>
            </div>
          </div>

          {/* Points & Privileges Card */}
          <div className="bg-noir-card border border-gold/40 p-6 flex items-center gap-8 shadow-2xl backdrop-blur-md">
            <div>
              <span className="text-[9px] uppercase tracking-luxury text-gold block">
                Privilège Points Balance
              </span>
              <span className="font-serif text-3xl text-alabaster font-light">
                {user.points.toLocaleString()}
              </span>
              <p className="text-[10px] text-alabaster/50 mt-0.5">
                Eligible for private runway salon invitations
              </p>
            </div>
            <button
              onClick={logout}
              className="p-2 text-alabaster/50 hover:text-gold transition-colors border-l border-noir-border pl-6"
              title="Sign Out"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Account Portal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-6 border-b border-sand pb-4 overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: 'Order History & Commissions', icon: Package, count: orders.length },
            { id: 'wishlist', label: 'Curated Wishlist', icon: Heart, count: wishlist.length },
            { id: 'addresses', label: 'Saved Residences', icon: MapPin, count: addresses.length },
            { id: 'profile', label: 'Client Profile & Concierge', icon: User }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 text-xs uppercase tracking-luxury py-2 transition-all shrink-0 ${
                  isActive
                    ? 'border-b-2 border-noir text-noir font-semibold'
                    : 'text-noir/50 hover:text-noir border-b-2 border-transparent'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-gold' : ''}`} />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className="text-[10px] font-mono bg-sand px-1.5 py-0.5 rounded-full text-noir">
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="pt-8">
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-16 bg-alabaster-pure border border-sand">
                  <Package className="w-10 h-10 text-sand-dark mx-auto mb-3" />
                  <p className="font-serif text-2xl text-noir">No commissions placed yet</p>
                  <Link
                    to="/shop"
                    className="mt-4 inline-block bg-noir text-alabaster text-xs uppercase tracking-luxury px-6 py-2.5"
                  >
                    Explore Atelier Catalog
                  </Link>
                </div>
              ) : (
                orders.map((ord) => (
                  <div key={ord.id} className="bg-alabaster-pure border border-sand p-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-4 border-b border-sand gap-3">
                      <div>
                        <span className="text-xs font-mono font-medium text-noir">
                          Reference: {ord.id}
                        </span>
                        <p className="text-xs text-noir/50 mt-0.5">Date: {ord.date}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/15 text-gold border border-gold/30 text-[10px] uppercase tracking-luxury font-semibold">
                          <Sparkles className="w-3 h-3" /> {ord.status}
                        </span>
                        <span className="text-sm font-sans font-semibold text-noir">
                          {formatPrice(ord.total)}
                        </span>
                      </div>
                    </div>

                    {/* Order items */}
                    <div className="divide-y divide-sand/50 py-4">
                      {ord.items.map((it, idx) => (
                        <div key={idx} className="py-3 flex gap-4 items-center">
                          <img
                            src={it.image}
                            alt={it.name}
                            className="w-14 h-18 object-cover bg-sand-light shrink-0"
                          />
                          <div className="flex-1 text-xs">
                            <h4 className="font-serif text-base text-noir font-medium">{it.name}</h4>
                            <p className="text-noir/60">
                              Size: {it.size} • Color: {it.color} • Qty: {it.quantity}
                            </p>
                          </div>
                          <span className="text-xs font-mono font-medium">
                            {formatPrice(it.price * it.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-sand flex justify-between items-center text-xs">
                      <span className="text-noir/50 font-mono">
                        Tracking: {ord.trackingNumber || 'DHL-VIP-001928'}
                      </span>
                      <Link
                        to={`/order-success/${ord.id}`}
                        className="inline-flex items-center gap-1 text-gold hover:text-gold-dark uppercase tracking-luxury text-[11px] font-medium"
                      >
                        <span>Inspect Live Status</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 2: WISHLIST */}
          {activeTab === 'wishlist' && (
            <div>
              {wishlistProducts.length === 0 ? (
                <div className="text-center py-16 bg-alabaster-pure border border-sand">
                  <Heart className="w-10 h-10 text-sand-dark mx-auto mb-3" />
                  <p className="font-serif text-2xl text-noir">Your Wishlist is Empty</p>
                  <p className="text-xs text-noir/60 mt-1 mb-6">
                    Save desired coats, gowns, and leather goods as you explore.
                  </p>
                  <Link
                    to="/shop"
                    className="bg-noir text-alabaster text-xs uppercase tracking-luxury px-6 py-2.5"
                  >
                    Browse Collections
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {wishlistProducts.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-alabaster-pure border border-sand p-4 flex flex-col justify-between"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden bg-sand-light mb-4">
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => toggleWishlist(prod.id)}
                          className="absolute top-3 right-3 p-2 bg-alabaster-pure/90 text-noir rounded-full hover:bg-noir hover:text-gold transition-colors"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div>
                        <span className="text-[10px] uppercase tracking-luxury text-gold">
                          {prod.subcategory}
                        </span>
                        <h4 className="font-serif text-base text-noir mt-0.5 line-clamp-1">
                          {prod.name}
                        </h4>
                        <p className="text-sm font-sans font-medium text-noir mt-1 mb-4">
                          {formatPrice(prod.price)}
                        </p>

                        <button
                          onClick={() => addToCart(prod)}
                          className="w-full bg-noir hover:bg-gold hover:text-noir text-alabaster py-2.5 text-xs uppercase tracking-luxury font-medium transition-colors flex items-center justify-center gap-2"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES */}
          {activeTab === 'addresses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="font-serif text-2xl text-noir">Your Residences</h3>
                <button
                  onClick={() => setShowAddAddr(!showAddAddr)}
                  className="inline-flex items-center gap-2 bg-noir text-alabaster px-4 py-2 text-xs uppercase tracking-luxury font-medium hover:bg-gold hover:text-noir transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Residence</span>
                </button>
              </div>

              {/* Add form */}
              {showAddAddr && (
                <form
                  onSubmit={handleSaveAddress}
                  className="p-6 bg-alabaster-pure border border-sand-dark space-y-4 max-w-xl"
                >
                  <h4 className="font-serif text-lg text-noir">New Delivery Residence</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Label (e.g. Geneva Chalet)"
                      value={newAddr.label}
                      onChange={(e) => setNewAddr({ ...newAddr, label: e.target.value })}
                      className="bg-sand-light/50 border border-sand px-3 py-2 text-xs text-noir focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Full Recipient Name"
                      value={newAddr.fullName}
                      onChange={(e) => setNewAddr({ ...newAddr, fullName: e.target.value })}
                      className="bg-sand-light/50 border border-sand px-3 py-2 text-xs text-noir focus:outline-none"
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Street Address"
                    value={newAddr.street}
                    onChange={(e) => setNewAddr({ ...newAddr, street: e.target.value })}
                    className="w-full bg-sand-light/50 border border-sand px-3 py-2 text-xs text-noir focus:outline-none"
                  />
                  <div className="grid grid-cols-3 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={newAddr.city}
                      onChange={(e) => setNewAddr({ ...newAddr, city: e.target.value })}
                      className="bg-sand-light/50 border border-sand px-3 py-2 text-xs text-noir focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Postal Code"
                      value={newAddr.postalCode}
                      onChange={(e) => setNewAddr({ ...newAddr, postalCode: e.target.value })}
                      className="bg-sand-light/50 border border-sand px-3 py-2 text-xs text-noir focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Country"
                      value={newAddr.country}
                      onChange={(e) => setNewAddr({ ...newAddr, country: e.target.value })}
                      className="bg-sand-light/50 border border-sand px-3 py-2 text-xs text-noir focus:outline-none"
                    />
                  </div>
                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      className="bg-noir text-alabaster px-5 py-2 text-xs uppercase tracking-luxury font-medium"
                    >
                      Save Residence
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowAddAddr(false)}
                      className="border border-sand text-noir/60 px-4 py-2 text-xs uppercase tracking-luxury"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-6 bg-alabaster-pure border border-sand relative space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-serif text-lg font-semibold text-noir">
                        {addr.label || 'Residence'}
                      </span>
                      {addr.isDefault && (
                        <span className="text-[10px] uppercase tracking-luxury bg-gold/20 text-gold px-2 py-0.5 border border-gold/30">
                          Primary Residence
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-noir/80 font-medium">{addr.fullName}</p>
                    <p className="text-xs text-noir/60 leading-relaxed">
                      {addr.street}
                      <br />
                      {addr.city}, {addr.state} {addr.postalCode}
                      <br />
                      {addr.country}
                    </p>
                    <p className="text-xs text-noir/50 pt-2 font-mono">{addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROFILE & CONCIERGE */}
          {activeTab === 'profile' && (
            <div className="max-w-2xl bg-alabaster-pure border border-sand p-8 space-y-6">
              <h3 className="font-serif text-2xl text-noir">Patron Profile & Concierge</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                    Full Legal Name & Title
                  </label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full bg-sand-light/50 border border-sand px-3 py-2 text-xs text-noir focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                    Confidential Email
                  </label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full bg-sand-light/50 border border-sand px-3 py-2 text-xs text-noir focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                    Direct Stylist Concierge Phone
                  </label>
                  <input
                    type="tel"
                    defaultValue={user.phone}
                    className="w-full bg-sand-light/50 border border-sand px-3 py-2 text-xs text-noir focus:outline-none"
                  />
                </div>

                <div className="pt-4 border-t border-sand">
                  <h4 className="text-xs uppercase tracking-luxury font-semibold text-noir mb-2">
                    Private Styling Preferences
                  </h4>
                  <div className="space-y-2 text-xs text-noir/70">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-noir" />
                      <span>Receive physical silk-bound seasonal lookbook previews by post</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" defaultChecked className="accent-noir" />
                      <span>Notify personal stylist when visiting Paris or Milan flagship boutiques</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    className="bg-noir text-alabaster px-6 py-3 text-xs uppercase tracking-luxury font-medium hover:bg-gold hover:text-noir transition-colors"
                  >
                    Save Atelier Preferences
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

