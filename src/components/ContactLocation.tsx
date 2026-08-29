"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Navigation, MessageCircle } from "lucide-react";

interface ContactLocationProps {
  onOpenBooking: () => void;
}

export default function ContactLocation({ onOpenBooking }: ContactLocationProps) {
  return (
    <section id="contact" className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-xl"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2 block">
              VISIT OUR SANCTUARY
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase">
              STUDIO LOCATION
            </h2>
            <div className="w-12 h-[3px] bg-[#e58c38] mt-3 rounded-full" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1 }}
            className="flex flex-wrap gap-4"
          >
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)]"
            >
              BOOK CONSULTATION
            </button>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 border border-white/20 hover:border-[#e58c38] text-white hover:text-[#e58c38] font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-colors cursor-pointer flex items-center gap-2"
            >
              <MessageCircle size={14} />
              WHATSAPP INQUIRY
            </a>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Details Info */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Address Card */}
            <div className="bg-[#121620] border border-white/10 p-6 md:p-8 rounded-2xl flex items-start gap-5 hover:border-[#e58c38]/30 transition-all">
              <div className="w-10 h-10 rounded-full border border-[#e58c38]/40 bg-[#0b0d12] flex items-center justify-center text-[#e58c38] flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-[#e58c38] uppercase mb-1">
                  KOTTAYAM SANCTUARY
                </span>
                <h3 className="font-sans text-xl font-bold text-white uppercase mb-2">
                  Zeus Tattoo Studio
                </h3>
                <p className="text-xs text-gray-300 font-sans leading-relaxed tracking-wide">
                  Main Temple Road, Near Central Square,<br />
                  Kottayam, Kerala 686001
                </p>
                <a
                  href="https://maps.google.com/?q=Kottayam+Kerala"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex items-center gap-1.5 text-xs text-[#e58c38] hover:underline font-sans font-extrabold tracking-wider uppercase"
                >
                  <Navigation size={12} />
                  Get Driving Directions
                </a>
              </div>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-[#121620] border border-white/10 p-6 md:p-8 rounded-2xl flex items-start gap-5 hover:border-[#e58c38]/30 transition-all">
              <div className="w-10 h-10 rounded-full border border-[#e58c38]/40 bg-[#0b0d12] flex items-center justify-center text-[#e58c38] flex-shrink-0">
                <Clock size={20} />
              </div>
              <div className="flex flex-col w-full">
                <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-[#e58c38] uppercase mb-1">
                  OPENING HOURS
                </span>
                <h3 className="font-sans text-xl font-bold text-white uppercase mb-3">
                  Studio Schedule
                </h3>
                <div className="flex flex-col gap-2 text-xs font-sans text-gray-300">
                  <div className="flex justify-between border-b border-white/5 pb-2">
                    <span>Tuesday – Sunday</span>
                    <strong className="text-white">11:00 AM – 8:30 PM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Monday</span>
                    <span className="text-[#e58c38] font-bold">Closed for Sterilization</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone & Online Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#121620] border border-white/10 p-5 rounded-2xl flex flex-col">
                <div className="flex items-center gap-2 text-[#e58c38] text-xs font-sans font-extrabold uppercase mb-2">
                  <Phone size={14} />
                  Phone / WhatsApp
                </div>
                <a href="tel:+919876543210" className="text-xs text-white hover:text-[#e58c38] transition-colors font-medium">
                  +91 98765 43210
                </a>
              </div>

              <div className="bg-[#121620] border border-white/10 p-5 rounded-2xl flex flex-col">
                <div className="flex items-center gap-2 text-[#e58c38] text-xs font-sans font-extrabold uppercase mb-2">
                  <Mail size={14} />
                  Email Support
                </div>
                <a href="mailto:contact@zeustattoo.com" className="text-xs text-white hover:text-[#e58c38] transition-colors font-medium">
                  contact@zeustattoo.com
                </a>
              </div>
            </div>

          </div>

          {/* Right Map Viewport */}
          <div className="lg:col-span-7 h-full min-h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative bg-[#0b0d12]">
            <iframe
              title="Zeus Tattoo Studio Kottayam Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62916.14081699708!2d76.5057038!3d9.5915668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b062ba16c6b435f%3A0xbe2b02e68f8f483b!2sKottayam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "450px", filter: "invert(90%) hue-rotate(180%) contrast(1.2) brightness(0.9)" }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            
            {/* Custom Location Overlay Badge */}
            <div className="absolute bottom-6 left-6 z-10 bg-[#0b0d12]/90 backdrop-blur-md border border-[#e58c38]/40 p-4 rounded-xl flex items-center gap-3 shadow-xl">
              <div className="w-3 h-3 rounded-full bg-[#e58c38] animate-ping" />
              <div className="flex flex-col">
                <span className="font-sans font-bold text-sm text-white uppercase">
                  ZEUS TATTOO STUDIO • KOTTAYAM
                </span>
                <span className="text-[9px] text-[#e58c38] font-sans tracking-widest uppercase font-semibold">
                  Body Art Sanctuary • Walk-ins & Bookings
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
