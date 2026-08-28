"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle } from "lucide-react";

interface ContactLocationProps {
  onOpenBooking: () => void;
}

export default function ContactLocation({ onOpenBooking }: ContactLocationProps) {
  return (
    <section id="contact" className="bg-brand-charcoal py-28 md:py-36 overflow-hidden border-b border-brand-off-white/5 text-brand-off-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-xl"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-brand-warm-cream uppercase mb-4 block">
              VISIT OUR SANCTUARY
            </span>
            <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-brand-off-white uppercase">
              STUDIO<br />
              <span className="italic font-light text-brand-warm-cream">LOCATION</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1.2 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={onOpenBooking}
              className="px-7 py-4 bg-brand-off-white hover:bg-brand-warm-cream text-brand-black font-sans text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer shadow-lg"
            >
              BOOK APPOINTMENT
            </button>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 border border-brand-off-white/20 hover:border-brand-warm-cream text-brand-off-white hover:text-brand-warm-cream font-sans text-xs font-bold tracking-widest uppercase transition-colors cursor-pointer flex items-center gap-2"
            >
              <MessageCircle size={14} />
              WHATSAPP INQUIRY
            </a>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Details Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            
            {/* Address Card */}
            <div className="bg-brand-black/60 border border-brand-off-white/10 p-6 md:p-8 rounded-[3px] flex items-start gap-5">
              <div className="w-10 h-10 rounded-full border border-brand-warm-cream/40 bg-brand-black flex items-center justify-center text-brand-warm-cream flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.3em] font-sans font-semibold text-brand-warm-cream uppercase mb-1">
                  KORAMANGALA STUDIO
                </span>
                <h3 className="font-serif text-xl text-brand-off-white uppercase mb-2">
                  Zeus Tattoo Studio
                </h3>
                <p className="text-xs text-brand-off-white/70 font-sans leading-relaxed tracking-wide">
                  #42, 100 Feet Road, 5th Block,<br />
                  Koramangala, Bengaluru, Karnataka 560095
                </p>
                <a
                  href="https://maps.google.com/?q=Koramangala+Bengaluru"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center gap-1.5 text-xs text-brand-warm-cream hover:underline font-sans font-semibold tracking-wider uppercase"
                >
                  <Navigation size={12} />
                  Get Driving Directions
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-brand-black/60 border border-brand-off-white/10 p-6 md:p-8 rounded-[3px] flex items-start gap-5">
              <div className="w-10 h-10 rounded-full border border-brand-warm-cream/40 bg-brand-black flex items-center justify-center text-brand-warm-cream flex-shrink-0">
                <Clock size={20} />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-[10px] tracking-[0.3em] font-sans font-semibold text-brand-warm-cream uppercase mb-1">
                  OPENING HOURS
                </span>
                <h3 className="font-serif text-xl text-brand-off-white uppercase mb-3">
                  Studio Schedule
                </h3>
                <div className="flex flex-col gap-2 text-xs font-sans text-brand-off-white/70">
                  <div className="flex justify-between border-b border-brand-off-white/5 pb-2">
                    <span>Tuesday – Sunday</span>
                    <strong className="text-brand-off-white">11:00 AM – 8:30 PM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Monday</span>
                    <span className="text-brand-warm-cream font-semibold">Closed for Sterilization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone & Online Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-brand-black/60 border border-brand-off-white/10 p-5 rounded-[3px] flex flex-col">
                <div className="flex items-center gap-2 text-brand-warm-cream text-xs font-sans font-semibold uppercase mb-2">
                  <Phone size={14} />
                  Phone / WhatsApp
                </div>
                <a href="tel:+919876543210" className="text-xs text-brand-off-white hover:text-brand-warm-cream transition-colors">
                  +91 98765 43210
                </a>
              </div>

              <div className="bg-brand-black/60 border border-brand-off-white/10 p-5 rounded-[3px] flex flex-col">
                <div className="flex items-center gap-2 text-brand-warm-cream text-xs font-sans font-semibold uppercase mb-2">
                  <Mail size={14} />
                  Email Support
                </div>
                <a href="mailto:contact@zeustattoo.com" className="text-xs text-brand-off-white hover:text-brand-warm-cream transition-colors">
                  contact@zeustattoo.com
                </a>
              </div>
            </div>

          </div>

          {/* Right Map Component */}
          <div className="lg:col-span-7 h-full min-h-[420px] rounded-[3px] overflow-hidden border border-brand-off-white/10 shadow-2xl relative bg-brand-black">
            <iframe
              title="Zeus Tattoo Studio Koramangala Bangalore Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.7512836263595!2d77.6222858!3d12.9352424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae144ed8980331%3A0x6a26388902ffaa78!2s5th%20Block%2C%20Koramangala%2C%20Bengaluru%2C%20Karnataka%20560095!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "450px", filter: "invert(90%) hue-rotate(180%) contrast(1.2) brightness(0.9)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Custom Location Overlay Card */}
            <div className="absolute bottom-6 left-6 z-10 bg-brand-black/90 backdrop-blur-md border border-brand-warm-cream/30 p-4 rounded-[3px] flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-brand-warm-cream animate-ping" />
              <div className="flex flex-col">
                <span className="font-serif text-sm text-brand-off-white uppercase">
                  ZEUS TATTOO STUDIO • BENGALURU
                </span>
                <span className="text-[9px] text-brand-warm-cream/80 font-sans tracking-widest uppercase">
                  5th Block Koramangala • Walk-ins & Bookings
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
