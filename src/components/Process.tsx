"use client";

import { motion } from "framer-motion";
import { MessageSquare, Palette, Sparkles, ArrowRight } from "lucide-react";

interface ProcessProps {
  onOpenBooking: () => void;
}

export default function Process({ onOpenBooking }: ProcessProps) {
  const steps = [
    {
      num: "01",
      icon: <MessageSquare size={20} className="text-[#e58c38]" />,
      title: "CONSULTATION",
      subtitle: "Share Your Vision",
      desc: "Connect with our team online or in studio. We review reference images, body placement, size, and design preferences to map out your project.",
    },
    {
      num: "02",
      icon: <Palette size={20} className="text-[#e58c38]" />,
      title: "CUSTOM DESIGN",
      subtitle: "Bespoke Artwork Render",
      desc: "Your selected artist renders a custom digital artwork tailored to your body anatomy, ensuring flow, contrast, and longevity before session day.",
    },
    {
      num: "03",
      icon: <Sparkles size={20} className="text-[#e58c38]" />,
      title: "TATTOO SESSION",
      subtitle: "Inking & Precision",
      desc: "Relax in our sanctuary while your artist brings the artwork to life with sterile precision, followed by protective medical aftercare wrapping.",
    },
  ];

  return (
    <section id="process" className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2 block">
            THE CLIENT JOURNEY
          </span>
          <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase">
            HOW WE CREATE
          </h2>
          <div className="w-12 h-[3px] bg-[#e58c38] mt-3 rounded-full mx-auto" />
        </div>

        {/* 3-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
              className="group relative flex flex-col bg-[#121620] border border-white/10 p-8 md:p-10 rounded-2xl hover:border-[#e58c38]/40 hover:shadow-[0_0_30px_rgba(229,140,56,0.15)] transition-all duration-500"
            >
              {/* Step Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-sans text-4xl md:text-5xl font-extrabold text-[#e58c38] tracking-tight">
                  {step.num}
                </span>
                <div className="w-10 h-10 rounded-full border border-[#e58c38]/30 bg-[#0b0d12] flex items-center justify-center">
                  {step.icon}
                </div>
              </div>

              <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-[#e58c38] uppercase mb-2">
                STEP {step.num} • {step.subtitle}
              </span>

              <h3 className="font-sans text-2xl font-bold text-white uppercase mb-4">
                {step.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-8">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <button
            onClick={onOpenBooking}
            className="group px-8 py-4 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)] hover:shadow-[0_0_30px_rgba(229,140,56,0.6)]"
          >
            START YOUR PROCESS
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
