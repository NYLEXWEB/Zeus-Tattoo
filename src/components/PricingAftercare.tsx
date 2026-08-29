"use client";

import { motion } from "framer-motion";
import { DollarSign, Clock, HelpCircle, FileText, ArrowRight, MessageCircle } from "lucide-react";

interface PricingAftercareProps {
  onOpenBooking: () => void;
}

export default function PricingAftercare({ onOpenBooking }: PricingAftercareProps) {
  const pricingOptions = [
    {
      icon: <DollarSign size={16} className="text-[#e58c38]" />,
      title: "Studio Minimum",
      price: "₹3,500 / $150",
      desc: "For minimalist, fine-line, or micro tattoos taking under 45 minutes. Includes full sterile setup.",
    },
    {
      icon: <Clock size={16} className="text-[#e58c38]" />,
      title: "Hourly Session Rate",
      price: "₹5,000 / hr",
      desc: "Applied to medium/large custom tattoos, multi-session sleeves, and detailed photorealism projects.",
    },
    {
      icon: <HelpCircle size={16} className="text-[#e58c38]" />,
      title: "Design Consultation",
      price: "Complimentary",
      desc: "One-on-one session with your selected artist to review references, placement, and custom stencil size.",
    },
    {
      icon: <FileText size={16} className="text-[#e58c38]" />,
      title: "Booking Deposit",
      price: "₹2,000 / $100",
      desc: "Required to hold your appointment date. Fully deductible from the final session price of your tattoo.",
    },
  ];

  const aftercareSteps = [
    {
      step: "01",
      title: "Leave Protective Film On",
      desc: "Keep medical dermal wrap on for 24-48 hours. If standard cling wrap was applied, remove gently after 3-4 hours.",
    },
    {
      step: "02",
      title: "Wash Gently with Antibacterial Soap",
      desc: "Clean with lukewarm water using bare palms only. Do not use washcloths or towels. Pat dry gently with clean paper towel.",
    },
    {
      step: "03",
      title: "Moisturize Thinly",
      desc: "Apply a very thin coat of unscented aftercare cream 2-3 times daily. Avoid over-saturating the skin.",
    },
    {
      step: "04",
      title: "Avoid Direct Sun & Swimming",
      desc: "No swimming pools, ocean, hot tubs, or direct sunlight for 2-3 weeks. Do not pick or scratch peeling skin flakes.",
    },
  ];

  return (
    <section className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Pricing Guide */}
          <motion.div
            id="pricing"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2">
              PRICING GUIDE
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white mb-3 uppercase">
              TRANSPARENT INVESTMENT
            </h2>
            <div className="w-12 h-[3px] bg-[#e58c38] mb-6 rounded-full" />

            <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-10 max-w-md">
              Every tattoo is unique, and pricing depends on complexity, sizing, and placement. Here is our baseline standard:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {pricingOptions.map((item, index) => (
                <div key={index} className="p-6 border border-white/10 bg-[#121620] rounded-2xl flex flex-col justify-between hover:border-[#e58c38]/30 transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full border border-[#e58c38]/30 bg-[#0b0d12] flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-sans text-lg font-extrabold text-[#e58c38]">
                      {item.price}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-sans text-xs tracking-wider font-extrabold text-white uppercase">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <button
                onClick={onOpenBooking}
                className="group w-full py-4 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)]"
              >
                REQUEST PRICING ESTIMATE
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Aftercare Guide */}
          <motion.div
            id="aftercare"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2">
              HEALING GUIDELINES
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white mb-3 uppercase">
              TATTOO AFTERCARE
            </h2>
            <div className="w-12 h-[3px] bg-[#e58c38] mb-6 rounded-full" />

            <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-10 max-w-md">
              A tattoo is 50% finished when you leave the studio. The remaining 50% depends on your care during healing:
            </p>

            <div className="flex flex-col gap-6">
              {aftercareSteps.map((step, index) => (
                <div key={index} className="flex gap-6 items-start border-b border-white/10 pb-6 last:border-0 last:pb-0">
                  <span className="font-sans text-2xl font-extrabold text-[#e58c38] tracking-tight">
                    {step.step}
                  </span>
                  <div className="flex flex-col">
                    <h3 className="font-sans text-xs tracking-wider font-extrabold text-white uppercase">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-400 mt-1.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Need Aftercare Help Card */}
            <div className="mt-8 p-6 bg-[#121620] border border-[#e58c38]/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-[#e58c38] bg-[#0b0d12] flex items-center justify-center text-[#e58c38] flex-shrink-0">
                  <MessageCircle size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-xs font-extrabold tracking-wider text-white uppercase">
                    NEED AFTERCARE HELP?
                  </span>
                  <span className="text-[10px] text-gray-400 font-sans">
                    Reach our artists directly via WhatsApp
                  </span>
                </div>
              </div>
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#e58c38] text-black font-sans text-[10px] font-extrabold tracking-widest uppercase hover:bg-white rounded-full transition-colors cursor-pointer flex-shrink-0"
              >
                WHATSAPP US
              </a>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
