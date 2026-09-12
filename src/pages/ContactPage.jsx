import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  Clock,
  Sparkles,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { FLAGSHIP_STORES } from '../data/stores';
import { useCart } from '../context/CartContext';

export default function ContactPage() {
  const { showToast } = useCart();
  const [selectedBoutique, setSelectedBoutique] = useState(FLAGSHIP_STORES[0].city);

  // Appointment Form state
  const [apptData, setApptData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Paris',
    service: 'Private Wardrobe Curation',
    date: '2026-09-20',
    time: '14:00',
    notes: ''
  });
  const [appointmentBooked, setAppointmentBooked] = useState(false);

  // Inquiry message state
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleBookAppointment = (e) => {
    e.preventDefault();
    setAppointmentBooked(true);
    showToast(`Private salon appointment confirmed at Atelier ${apptData.city}`);
  };

  const handleSendInquiry = (e) => {
    e.preventDefault();
    setInquirySent(true);
    showToast('Your inquiry has been relayed to the private atelier concierge');
  };

  const currentStore = FLAGSHIP_STORES.find((s) => s.city === selectedBoutique) || FLAGSHIP_STORES[0];

  return (
    <div className="min-h-screen bg-alabaster pb-24 animate-fade-in">
      {/* Header */}
      <div className="bg-noir text-alabaster py-16 px-4 text-center border-b border-noir-border">
        <div className="max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 text-gold">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs uppercase tracking-luxury font-medium">
              Global Atelier Services
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl text-alabaster font-light">
            Concierge & Flagship Salons
          </h1>
          <p className="text-xs sm:text-sm text-alabaster/75 font-light leading-relaxed">
            From private styling suites in Paris and Milan to white-glove doorstep delivery, our concierge is dedicated to your personal wardrobe requirements.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Flagship Showrooms Directory */}
        <div className="mb-20">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-luxury text-gold font-medium">
              Worldwide Showrooms
            </span>
            <h2 className="font-serif text-3xl text-noir mt-1">Our Flagship Salons</h2>
          </div>

          {/* City selector pills */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 border-b border-sand">
            {FLAGSHIP_STORES.map((s) => (
              <button
                key={s.city}
                onClick={() => setSelectedBoutique(s.city)}
                className={`text-xs uppercase tracking-luxury px-6 py-2.5 transition-all ${
                  selectedBoutique === s.city
                    ? 'bg-noir text-alabaster font-semibold'
                    : 'bg-alabaster-pure border border-sand text-noir/70 hover:text-noir'
                }`}
              >
                {s.city}
              </button>
            ))}
          </div>

          {/* Selected Boutique Showcase */}
          <div className="mt-8 bg-alabaster-pure border border-sand grid grid-cols-1 lg:grid-cols-12 overflow-hidden shadow-sm">
            <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-luxury text-gold font-mono">
                  Flagship Boutique
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-noir mt-1 mb-4">
                  {currentStore.name}
                </h3>
                <div className="space-y-3 text-xs text-noir/75 leading-relaxed">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" />
                    <span>{currentStore.address}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-gold shrink-0" />
                    <span>{currentStore.phone}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-gold shrink-0" />
                    <span>{currentStore.concierge}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-gold shrink-0" />
                    <span>{currentStore.hours}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-[11px] uppercase tracking-luxury text-gold font-medium mb-2">
                  Showroom Exclusive Services:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentStore.services.map((srv) => (
                    <span
                      key={srv}
                      className="text-xs bg-sand-light/70 px-3 py-1 border border-sand text-noir/80 font-mono"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 aspect-[4/3] lg:aspect-auto overflow-hidden bg-sand">
              <img
                src={currentStore.image}
                alt={currentStore.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Two Forms Grid: Appointment Scheduler + Concierge Message */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Appointment Scheduler */}
          <div className="lg:col-span-6 bg-alabaster-pure border border-sand p-8 sm:p-10 shadow-sm">
            <div className="border-b border-sand pb-4 mb-6">
              <span className="text-[10px] uppercase tracking-luxury text-gold font-medium">
                Private Consultation
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-noir mt-0.5">
                Reserve A Private Salon Suite
              </h3>
              <p className="text-xs text-noir/60 mt-1">
                Enjoy champagne hospitality and one-on-one styling with an atelier master cutter.
              </p>
            </div>

            {appointmentBooked ? (
              <div className="p-8 text-center bg-sand-light/40 border border-gold/40 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-gold mx-auto" />
                <h4 className="font-serif text-2xl text-noir">Salon Suite Reserved</h4>
                <p className="text-xs text-noir/70 max-w-sm mx-auto leading-relaxed">
                  We look forward to welcoming you at Atelier {apptData.city}. Our head stylist will contact you 24 hours prior to curate your preferred sizing archive.
                </p>
                <button
                  onClick={() => setAppointmentBooked(false)}
                  className="mt-4 text-xs uppercase tracking-luxury text-gold underline"
                >
                  Book Another Session
                </button>
              </div>
            ) : (
              <form onSubmit={handleBookAppointment} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={apptData.name}
                      onChange={(e) => setApptData({ ...apptData, name: e.target.value })}
                      placeholder="e.g. Lady Vivienne Sterling"
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Telephone
                    </label>
                    <input
                      type="tel"
                      required
                      value={apptData.phone}
                      onChange={(e) => setApptData({ ...apptData, phone: e.target.value })}
                      placeholder="+1 (555) 019-2819"
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Boutique Location
                    </label>
                    <select
                      value={apptData.city}
                      onChange={(e) => setApptData({ ...apptData, city: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none cursor-pointer"
                    >
                      {FLAGSHIP_STORES.map((s) => (
                        <option key={s.city} value={s.city}>
                          Atelier {s.city}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Consultation Service
                    </label>
                    <select
                      value={apptData.service}
                      onChange={(e) => setApptData({ ...apptData, service: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none cursor-pointer"
                    >
                      <option>Private Wardrobe Curation</option>
                      <option>Made-To-Measure Tailoring</option>
                      <option>Haute Evening Gown Fitting</option>
                      <option>Fine Leather Monogramming</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      value={apptData.date}
                      onChange={(e) => setApptData({ ...apptData, date: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                      Preferred Time
                    </label>
                    <select
                      value={apptData.time}
                      onChange={(e) => setApptData({ ...apptData, time: e.target.value })}
                      className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none cursor-pointer"
                    >
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="16:30">4:30 PM</option>
                      <option value="18:30">6:30 PM (Evening Salon)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-noir text-alabaster py-3.5 text-xs uppercase tracking-luxury font-medium hover:bg-gold hover:text-noir transition-colors mt-2"
                >
                  Confirm Atelier Reservation
                </button>
              </form>
            )}
          </div>

          {/* Concierge Message Form */}
          <div className="lg:col-span-6 bg-alabaster-pure border border-sand p-8 sm:p-10 shadow-sm">
            <div className="border-b border-sand pb-4 mb-6">
              <span className="text-[10px] uppercase tracking-luxury text-gold font-medium">
                Direct Communication
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-noir mt-0.5">
                Speak With Our Concierge
              </h3>
              <p className="text-xs text-noir/60 mt-1">
                For order inquiries, bespoke sizing guidance, or archival sourcing requests.
              </p>
            </div>

            {inquirySent ? (
              <div className="p-8 text-center bg-sand-light/40 border border-gold/40 space-y-3">
                <CheckCircle2 className="w-10 h-10 text-gold mx-auto" />
                <h4 className="font-serif text-2xl text-noir">Inquiry Received</h4>
                <p className="text-xs text-noir/70 max-w-sm mx-auto leading-relaxed">
                  Our private client concierge will respond to your confidential inquiry within 3 hours.
                </p>
                <button
                  onClick={() => setInquirySent(false)}
                  className="mt-4 text-xs uppercase tracking-luxury text-gold underline"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSendInquiry} className="space-y-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    placeholder="Full name"
                    className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={inquiryData.email}
                    onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                    placeholder="contact@patron.com"
                    className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                    Nature of Inquiry
                  </label>
                  <input
                    type="text"
                    required
                    value={inquiryData.subject}
                    onChange={(e) => setInquiryData({ ...inquiryData, subject: e.target.value })}
                    placeholder="e.g. Bespoke Alteration or Runway Availability"
                    className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-luxury text-noir/70 mb-1">
                    Message
                  </label>
                  <textarea
                    rows="4"
                    required
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    placeholder="Please specify any particular garment reference or requirement..."
                    className="w-full bg-sand-light/50 border border-sand-dark px-3 py-2 text-xs text-noir focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-noir text-alabaster py-3.5 text-xs uppercase tracking-luxury font-medium hover:bg-gold hover:text-noir transition-colors mt-2"
                >
                  Transmit Message to Concierge
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

