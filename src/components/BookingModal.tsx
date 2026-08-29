"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Upload, MessageCircle, Phone, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    artist: "Any Resident Master",
    style: "Custom Realism",
    placement: "",
    approxSize: "",
    budget: "",
    preferredDate: "",
    preferredTime: "Morning (11am - 2pm)",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 overflow-y-auto">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0b0d12]/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 w-full max-w-3xl bg-[#121620] border border-[#e58c38]/40 rounded-2xl shadow-[0_0_50px_rgba(229,140,56,0.2)] overflow-hidden my-8"
          >
            {/* Modal Header */}
            <div className="p-6 md:p-8 bg-[#0b0d12] border-b border-white/10 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-sans text-[10px] tracking-[0.4em] text-[#e58c38] font-extrabold uppercase flex items-center gap-1.5">
                  <Sparkles size={12} />
                  KOTTAYAM SANCTUARY
                </span>
                <h3 className="font-sans text-2xl md:text-3xl font-extrabold text-white uppercase tracking-tight mt-0.5">
                  BOOK CONSULTATION
                </h3>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-white/20 bg-[#121620] flex items-center justify-center text-white hover:text-[#e58c38] hover:border-[#e58c38] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-10 max-h-[80vh] overflow-y-auto custom-scrollbar">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 flex flex-col items-center text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#e58c38]/20 border border-[#e58c38] flex items-center justify-center text-[#e58c38] mb-6">
                    <CheckCircle2 size={36} />
                  </div>
                  <h4 className="font-sans text-3xl font-extrabold text-white uppercase mb-2">
                    REQUEST RECEIVED
                  </h4>
                  <p className="text-gray-300 font-sans text-xs md:text-sm max-w-md leading-relaxed mb-8">
                    Thank you, <strong className="text-[#e58c38]">{formData.name}</strong>. Our studio manager and selected artist will review your design details and contact you within 24 hours.
                  </p>

                  <button
                    onClick={handleReset}
                    className="px-8 py-3.5 bg-gradient-to-r from-[#e58c38] to-[#d97706] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full shadow-lg"
                  >
                    CLOSE WINDOW
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                  
                  {/* Contact Info Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-sans font-extrabold tracking-widest text-[#e58c38] uppercase">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Nair"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="bg-[#0b0d12] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-600 focus:border-[#e58c38] outline-none transition-colors font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-sans font-extrabold tracking-widest text-[#e58c38] uppercase">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="bg-[#0b0d12] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-600 focus:border-[#e58c38] outline-none transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* Artist & Style Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-sans font-extrabold tracking-widest text-[#e58c38] uppercase">
                        Preferred Resident Artist
                      </label>
                      <select
                        value={formData.artist}
                        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                        className="bg-[#0b0d12] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-[#e58c38] outline-none transition-colors font-sans"
                      >
                        <option>Any Resident Master</option>
                        <option>Rahul Sharma (Realism & Portraits)</option>
                        <option>Meera Nair (Fine Line & Micro)</option>
                        <option>Arjun Verma (Black & Grey Sleeves)</option>
                        <option>Sahana Rao (Geometry & Cover-Ups)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-sans font-extrabold tracking-widest text-[#e58c38] uppercase">
                        Tattoo Genre / Style
                      </label>
                      <select
                        value={formData.style}
                        onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                        className="bg-[#0b0d12] border border-white/10 rounded-xl px-4 py-3 text-xs text-white focus:border-[#e58c38] outline-none transition-colors font-sans"
                      >
                        <option>Bespoke Custom Tattoo</option>
                        <option>Hyper Realism & Portrait</option>
                        <option>Single-Needle Fine Line</option>
                        <option>Black & Grey Wash</option>
                        <option>Cover-Up Re-Imagining</option>
                        <option>Clinical Piercing</option>
                        <option>Microblading / Cosmetic</option>
                      </select>
                    </div>
                  </div>

                  {/* Placement & Size */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-sans font-extrabold tracking-widest text-[#e58c38] uppercase">
                        Body Placement Location
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Outer Forearm, Upper Rib, Shoulder"
                        value={formData.placement}
                        onChange={(e) => setFormData({ ...formData, placement: e.target.value })}
                        className="bg-[#0b0d12] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-600 focus:border-[#e58c38] outline-none transition-colors font-sans"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-sans font-extrabold tracking-widest text-[#e58c38] uppercase">
                        Approximate Size
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 4x4 inches, Full Half Sleeve"
                        value={formData.approxSize}
                        onChange={(e) => setFormData({ ...formData, approxSize: e.target.value })}
                        className="bg-[#0b0d12] border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-gray-600 focus:border-[#e58c38] outline-none transition-colors font-sans"
                      />
                    </div>
                  </div>

                  {/* Design Idea Notes */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-sans font-extrabold tracking-widest text-[#e58c38] uppercase">
                      Design Notes & Ideas *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Describe your tattoo vision, story elements, reference ideas, or cover-up details..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="bg-[#0b0d12] border border-white/10 rounded-xl p-4 text-xs text-white placeholder:text-gray-600 focus:border-[#e58c38] outline-none transition-colors font-sans leading-relaxed resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <span className="text-[10px] text-gray-400 font-sans tracking-widest uppercase">
                      🔒 Sterile Studio Guarantee • Instant Response
                    </span>
                    
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 cursor-pointer shadow-[0_0_25px_rgba(229,140,56,0.4)]"
                    >
                      REQUEST CONSULTATION
                    </button>
                  </div>

                </form>
              )}
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  );
}
