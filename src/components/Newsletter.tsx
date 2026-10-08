"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import SectionFlourish from "./SectionFlourish";
import TornPaperDivider from "./TornPaperDivider";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <section id="newsletter" className="relative bg-white text-[#0C0D12] pt-12 pb-24 md:pb-36 overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center relative z-10">
        {/* Section Header */}
        <div className="mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#0C0D12] uppercase"
          >
            SUBSCRIBE TO NEWSLETTER
          </motion.h2>
          <SectionFlourish color="#FFA028" />
        </div>

        <p className="text-gray-600 font-sans text-xs sm:text-sm md:text-base leading-relaxed mb-8 max-w-xl mx-auto">
          Join our exclusive collector network. Receive priority notifications for resident artist flash drops, guest artist residencies, and custom tattoo consultations.
        </p>

        {/* Subscribe Form */}
        {isSubscribed ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-lg flex items-center justify-center gap-2 max-w-md mx-auto"
          >
            <CheckCircle2 size={18} className="text-green-600" />
            <span className="font-sans text-xs sm:text-sm font-semibold">
              Thank you for subscribing to Zeus Tattoo Studio updates!
            </span>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="w-full px-5 py-3.5 bg-gray-50 border border-gray-300 focus:border-[#FFA028] focus:bg-white text-[#0C0D12] text-xs sm:text-sm rounded outline-none transition-all shadow-inner"
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 bg-[#0C0D12] hover:bg-[#FFA028] text-white hover:text-[#0C0D12] font-display text-xs sm:text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded shadow-md cursor-pointer flex-shrink-0"
            >
              SUBSCRIBE
            </button>
          </form>
        )}
      </div>

      {/* Torn Paper Edge at the Bottom transitioning into the Dark Footer */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20">
        <TornPaperDivider fill="#0C0D12" position="bottom" variant={1} />
      </div>
    </section>
  );
}
