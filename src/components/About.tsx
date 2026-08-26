"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";

export default function About() {
  const stats = [
    { value: "5+", label: "Years of Experience" },
    { value: "1000+", label: "Happy Clients" },
    { value: "2000+", label: "Tattoos Created" },
  ];

  const features = [
    { title: "Sterile & Hygienic Environment", desc: "Your safety is our absolute priority. We adhere to medical-grade sterilization protocols." },
    { title: "Professional Artists", desc: "Award-winning, skilled, and passionate artists tailored to your preferred style." },
    { title: "Custom Designs", desc: "Unique, bespoke artwork tailored to your anatomy and story. No replicas." },
    { title: "Premium Equipment", desc: "World-class machines, organic pigments, and premium aftercare supplies." },
  ];

  return (
    <section id="about" className="relative bg-brand-charcoal py-24 md:py-32 overflow-hidden border-b border-brand-off-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Left Column: Image with frame treatment */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="relative group"
          >
            <div className="absolute inset-0 border border-brand-warm-cream/20 translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500 z-0" />
            <div className="relative z-10 overflow-hidden aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/5] bg-brand-black">
              <img
                src="/images/about_workspace.jpg"
                alt="Zeus Tattoo Studio Workspace"
                className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/60 via-transparent to-transparent" />
            </div>
          </motion.div>

          {/* Right Column: Copy, Stats & Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            className="flex flex-col"
          >
            {/* Small uppercase label */}
            <span className="font-sans text-xs font-semibold tracking-[0.4em] text-brand-warm-cream uppercase mb-4 block">
              About Us
            </span>

            {/* Serif Heading */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-brand-off-white mb-6 uppercase">
              A Place Where
              <br />
              <span className="italic font-light text-brand-warm-cream">Art Meets Skin</span>
            </h2>

            {/* Description */}
            <p className="text-brand-off-white/70 font-sans text-sm md:text-base leading-relaxed tracking-wide mb-10 max-w-xl">
              Zeus Tattoo Studio is a team of passionate artists who believe in the power of self-expression. We create custom tattoos that tell your story — with precision, creativity and care.
            </p>

            {/* Stats Block */}
            <div className="grid grid-cols-3 gap-6 border-b border-brand-off-white/10 pb-10 mb-10">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="font-serif text-3xl md:text-4xl lg:text-5xl text-brand-warm-cream font-semibold tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs tracking-wider text-brand-off-white/50 font-sans uppercase mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Features Vertical List */}
            <div className="flex flex-col gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start border-b border-brand-off-white/5 pb-4 last:border-b-0 last:pb-0">
                  <div className="w-5 h-5 rounded-full border border-brand-warm-cream/30 flex items-center justify-center mt-0.5 text-brand-warm-cream">
                    <Check size={10} />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="font-sans text-xs tracking-widest text-brand-off-white font-semibold uppercase">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-brand-off-white/50 mt-1 leading-relaxed">
                      {feature.desc}
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
