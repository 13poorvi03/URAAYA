import React, { useState } from 'react';
import { X, ShieldCheck, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthModal() {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister) {
      register(name, email, password);
    } else {
      login(email, password);
    }
  };

  const handleDemoSignIn = () => {
    login('elena.montmirail@haute-uraaya.com', 'password');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/75 backdrop-blur-md animate-fade-in">
      <div className="bg-alabaster-pure w-full max-w-md border border-sand-dark p-8 shadow-2xl relative">
        <button
          onClick={closeAuthModal}
          className="absolute top-6 right-6 text-noir/50 hover:text-noir transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex p-2 bg-gold/15 text-gold mb-2">
            <Crown className="w-5 h-5" />
          </div>
          <p className="text-xs uppercase tracking-luxury text-gold font-medium">URAAYA Privilège</p>
          <h2 className="text-2xl font-serif text-noir mt-1">
            {isRegister ? 'Create Your Atelier Account' : 'Sign In To Your Sanctuary'}
          </h2>
          <p className="text-xs text-noir/60 mt-1">
            Access private salons, runway previews, and bespoke wardrobe styling.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div>
              <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Countess Camille Dubois"
                className="w-full bg-sand-light/60 border border-sand-dark px-3.5 py-2.5 text-sm text-noir placeholder-noir/35 focus:outline-none focus:border-noir transition-colors"
              />
            </div>
          )}

          <div>
            <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="elena@haute-uraaya.com"
              className="w-full bg-sand-light/60 border border-sand-dark px-3.5 py-2.5 text-sm text-noir placeholder-noir/35 focus:outline-none focus:border-noir transition-colors"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-[11px] uppercase tracking-luxury text-noir/70">
                Password
              </label>
              {!isRegister && (
                <a href="#forgot" className="text-[11px] text-noir/50 hover:text-noir underline">
                  Forgot?
                </a>
              )}
            </div>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full bg-sand-light/60 border border-sand-dark px-3.5 py-2.5 text-sm text-noir placeholder-noir/35 focus:outline-none focus:border-noir transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-noir text-alabaster py-3 text-xs uppercase tracking-luxury hover:bg-noir-light transition-all border border-noir font-medium mt-2"
          >
            {isRegister ? 'Join URAAYA Atelier' : 'Access Account'}
          </button>

          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full bg-sand-light border border-gold/40 text-noir py-2.5 text-xs uppercase tracking-luxury hover:bg-sand transition-all text-center flex items-center justify-center gap-2"
          >
            <ShieldCheck className="w-4 h-4 text-gold" />
            <span>Instant VIP Demo Login</span>
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-sand text-center text-xs text-noir/60">
          {isRegister ? (
            <p>
              Already an esteemed member?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(false)}
                className="text-noir font-medium underline"
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              New to URAAYA?{' '}
              <button
                type="button"
                onClick={() => setIsRegister(true)}
                className="text-noir font-medium underline"
              >
                Create an Atelier Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

