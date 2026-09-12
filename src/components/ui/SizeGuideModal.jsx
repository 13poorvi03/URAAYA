import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

export default function SizeGuideModal({ isOpen, onClose, initialTab = 'women' }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [unit, setUnit] = useState('cm'); // 'cm' or 'in'

  if (!isOpen) return null;

  const data = {
    women: {
      cm: [
        { size: 'XS (IT 38 / US 2)', bust: '80 - 84', waist: '60 - 64', hip: '86 - 90' },
        { size: 'S (IT 40 / US 4)', bust: '84 - 88', waist: '64 - 68', hip: '90 - 94' },
        { size: 'M (IT 42 / US 6)', bust: '88 - 92', waist: '68 - 72', hip: '94 - 98' },
        { size: 'L (IT 44 / US 8)', bust: '92 - 96', waist: '72 - 76', hip: '98 - 102' },
        { size: 'XL (IT 46 / US 10)', bust: '96 - 102', waist: '76 - 82', hip: '102 - 108' }
      ],
      in: [
        { size: 'XS (IT 38 / US 2)', bust: '31.5 - 33', waist: '23.5 - 25', hip: '34 - 35.5' },
        { size: 'S (IT 40 / US 4)', bust: '33 - 34.5', waist: '25 - 27', hip: '35.5 - 37' },
        { size: 'M (IT 42 / US 6)', bust: '34.5 - 36', waist: '27 - 28.5', hip: '37 - 38.5' },
        { size: 'L (IT 44 / US 8)', bust: '36 - 38', waist: '28.5 - 30', hip: '38.5 - 40' },
        { size: 'XL (IT 46 / US 10)', bust: '38 - 40', waist: '30 - 32.5', hip: '40 - 42.5' }
      ]
    },
    men: {
      cm: [
        { size: '38R / Small', chest: '94 - 98', waist: '78 - 82', neck: '38 - 39' },
        { size: '40R / Medium', chest: '98 - 102', waist: '82 - 86', neck: '40 - 41' },
        { size: '42R / Large', chest: '102 - 106', waist: '86 - 90', neck: '41 - 42' },
        { size: '44R / XL', chest: '106 - 110', waist: '90 - 94', neck: '43 - 44' },
        { size: '46R / XXL', chest: '110 - 116', waist: '94 - 100', neck: '44 - 45' }
      ],
      in: [
        { size: '38R / Small', chest: '37 - 38.5', waist: '30.5 - 32', neck: '15' },
        { size: '40R / Medium', chest: '38.5 - 40', waist: '32 - 34', neck: '15.75' },
        { size: '42R / Large', chest: '40 - 41.5', waist: '34 - 35.5', neck: '16.5' },
        { size: '44R / XL', chest: '41.5 - 43.5', waist: '35.5 - 37', neck: '17' },
        { size: '46R / XXL', chest: '43.5 - 45.5', waist: '37 - 39.5', neck: '17.5' }
      ]
    },
    kids: {
      cm: [
        { size: '2 - 3 Years', height: '92 - 98', chest: '53 - 55', waist: '50 - 52' },
        { size: '4 - 5 Years', height: '104 - 110', chest: '56 - 58', waist: '53 - 54' },
        { size: '6 - 7 Years', height: '116 - 122', chest: '60 - 63', waist: '55 - 57' },
        { size: '8 - 9 Years', height: '128 - 134', chest: '64 - 67', waist: '58 - 60' },
        { size: '10 - 12 Years', height: '140 - 152', chest: '70 - 76', waist: '62 - 65' }
      ],
      in: [
        { size: '2 - 3 Years', height: '36 - 38.5', chest: '21 - 21.5', waist: '19.5 - 20.5' },
        { size: '4 - 5 Years', height: '41 - 43.5', chest: '22 - 23', waist: '21 - 21.5' },
        { size: '6 - 7 Years', height: '45.5 - 48', chest: '23.5 - 25', waist: '21.5 - 22.5' },
        { size: '8 - 9 Years', height: '50 - 53', chest: '25 - 26.5', waist: '23 - 23.5' },
        { size: '10 - 12 Years', height: '55 - 60', chest: '27.5 - 30', waist: '24.5 - 25.5' }
      ]
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-noir/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-alabaster-pure w-full max-w-2xl border border-sand-dark p-6 md:p-8 shadow-2xl relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-noir/60 hover:text-noir transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-gold mb-2">
          <Ruler className="w-4 h-4" />
          <span className="text-xs uppercase tracking-luxury font-medium">Sartorial Precision</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif text-noir mb-6">Atelier Sizing Guide</h2>

        {/* Category switcher */}
        <div className="flex border-b border-sand pb-4 mb-6 justify-between items-center flex-wrap gap-4">
          <div className="flex gap-4">
            {['women', 'men', 'kids'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-xs uppercase tracking-luxury pb-1 transition-all ${
                  activeTab === cat
                    ? 'border-b-2 border-noir text-noir font-semibold'
                    : 'text-noir/50 hover:text-noir'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Unit Toggle */}
          <div className="inline-flex border border-sand-dark p-0.5">
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                unit === 'cm' ? 'bg-noir text-alabaster' : 'text-noir/70 hover:text-noir'
              }`}
            >
              CM
            </button>
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 text-xs uppercase tracking-wider transition-colors ${
                unit === 'in' ? 'bg-noir text-alabaster' : 'text-noir/70 hover:text-noir'
              }`}
            >
              INCHES
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-sand-dark text-noir/60 font-serif text-sm">
                <th className="py-3 px-2">Size</th>
                {activeTab === 'women' && (
                  <>
                    <th className="py-3 px-2">Bust ({unit})</th>
                    <th className="py-3 px-2">Waist ({unit})</th>
                    <th className="py-3 px-2">Hip ({unit})</th>
                  </>
                )}
                {activeTab === 'men' && (
                  <>
                    <th className="py-3 px-2">Chest ({unit})</th>
                    <th className="py-3 px-2">Waist ({unit})</th>
                    <th className="py-3 px-2">Neck ({unit})</th>
                  </>
                )}
                {activeTab === 'kids' && (
                  <>
                    <th className="py-3 px-2">Height ({unit})</th>
                    <th className="py-3 px-2">Chest ({unit})</th>
                    <th className="py-3 px-2">Waist ({unit})</th>
                  </>
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-sand/50">
              {data[activeTab][unit].map((row, idx) => (
                <tr key={idx} className="hover:bg-sand-light/50 transition-colors">
                  <td className="py-3 px-2 font-medium text-noir">{row.size}</td>
                  {activeTab === 'women' && (
                    <>
                      <td className="py-3 px-2 text-noir/70">{row.bust}</td>
                      <td className="py-3 px-2 text-noir/70">{row.waist}</td>
                      <td className="py-3 px-2 text-noir/70">{row.hip}</td>
                    </>
                  )}
                  {activeTab === 'men' && (
                    <>
                      <td className="py-3 px-2 text-noir/70">{row.chest}</td>
                      <td className="py-3 px-2 text-noir/70">{row.waist}</td>
                      <td className="py-3 px-2 text-noir/70">{row.neck}</td>
                    </>
                  )}
                  {activeTab === 'kids' && (
                    <>
                      <td className="py-3 px-2 text-noir/70">{row.height}</td>
                      <td className="py-3 px-2 text-noir/70">{row.chest}</td>
                      <td className="py-3 px-2 text-noir/70">{row.waist}</td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-sand text-noir/60 text-xs leading-relaxed">
          <p>
            <span className="font-semibold text-noir">Bespoke Fit Advice:</span> If between sizes, we recommend sizing up for structured outerwear and true-to-size for silk draping. Complimentary private tailoring is available at any URAAYA flagship boutique worldwide.
          </p>
        </div>
      </div>
    </div>
  );
}

