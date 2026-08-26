"use client";

import { motion } from "framer-motion";
import { DollarSign, Clock, HelpCircle, FileText } from "lucide-react";

export default function PricingAftercare() {
  const pricingOptions = [
    {
      icon: <DollarSign size={16} />,
      title: "Studio Minimum",
      price: "$150",
      desc: "For small, minimalist, or fine-line tattoos taking under 30 minutes. Covers sterile setup.",
    },
    {
      icon: <Clock size={16} />,
      title: "Hourly Session Rate",
      price: "$200 / hr",
      desc: "Applied to medium/large custom tattoos, multi-session sleeves, and detailed realism projects.",
    },
    {
      icon: <HelpCircle size={16} />,
      title: "Design Consultation",
      price: "Complimentary",
      desc: "One-on-one session with your selected artist to review references, placement, and size.",
    },
    {
      icon: <FileText size={16} />,
      title: "Booking Deposit",
      price: "$100",
      desc: "Required to secure your date. Deductible from the final session price of your tattoo.",
    },
  ];

  const aftercareSteps = [
    {
      step: "01",
      title: "Leave Protective Film On",
      desc: "Keep the medical-grade protective film on for 24 hours. If we applied a standard wrap, remove it after 3-4 hours.",
    },
    {
      step: "02",
      title: "Wash Gently with Mild Soap",
      desc: "Use lukewarm water and unscented, antibacterial soap. Wash using your bare hands; do not scrub with towels.",
    },
    {
      step: "03",
      title: "Moisturize Thinly",
      desc: "Pat dry with a clean paper towel. Apply a very thin layer of recommended aftercare ointment or unscented lotion.",
    },
    {
      step: "04",
      title: "Avoid Sun & Submersion",
      desc: "No swimming, baths, saunas, or direct sun exposure for 2-3 weeks. Do not pick or scratch peeling skin.",
    },
  ];

  return (
    <section className="bg-brand-off-white py-24 md:py-32 overflow-hidden border-b border-brand-charcoal/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Pricing Guide */}
          <motion.div
            id="pricing"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.4em] text-brand-charcoal/60 uppercase mb-4">
              Pricing Guide
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-brand-black mb-6 uppercase">
              Transparent
              <br />
              <span className="italic font-light text-brand-black">Investment</span>
            </h2>
            <p className="text-brand-charcoal/80 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-12 max-w-md">
              Every tattoo is unique, and pricing depends on complexity, sizing, and placement. Here is our baseline standard:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {pricingOptions.map((item, index) => (
                <div key={index} className="p-6 border border-brand-black/5 bg-brand-charcoal/[0.02] flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-full border border-brand-black/10 flex items-center justify-center text-brand-charcoal/60">
                      {item.icon}
                    </div>
                    <span className="font-serif text-lg font-bold text-brand-black">
                      {item.price}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-sans text-xs tracking-wider font-semibold text-brand-black uppercase">
                      {item.title}
                    </h4>
                    <p className="text-xs text-brand-charcoal/70 mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Aftercare Guide */}
          <motion.div
            id="aftercare"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col"
          >
            <span className="font-sans text-xs font-semibold tracking-[0.4em] text-brand-charcoal/60 uppercase mb-4">
              Healing Guidelines
            </span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-brand-black mb-6 uppercase">
              Tattoo
              <br />
              <span className="italic font-light text-brand-black">Aftercare</span>
            </h2>
            <p className="text-brand-charcoal/80 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-12 max-w-md">
              A tattoo is only 50% finished when you leave the studio. The remaining 50% depends on your care during healing:
            </p>

            <div className="flex flex-col gap-6">
              {aftercareSteps.map((step, index) => (
                <div key={index} className="flex gap-6 items-start border-b border-brand-black/5 pb-6 last:border-0 last:pb-0">
                  <span className="font-serif text-xl text-brand-charcoal/30 font-bold tracking-tight">
                    {step.step}
                  </span>
                  <div className="flex flex-col">
                    <h4 className="font-sans text-xs tracking-wider font-semibold text-brand-black uppercase">
                      {step.title}
                    </h4>
                    <p className="text-xs text-brand-charcoal/70 mt-1.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
