"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, ExternalLink } from "lucide-react";
import SectionFlourish from "./SectionFlourish";
import TornPaperDivider from "./TornPaperDivider";

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "GOOGLE REVIEWER",
      role: "Verified Google Review • 5.0 ★",
      stars: 5,
      quote:
        "Very frndly service very clean and too comfy atmosphere budget frndly too♥️",
    },
    {
      id: 2,
      name: "EAR PIERCING CLIENT",
      role: "Verified Google Review • 5.0 ★",
      stars: 5,
      quote:
        "Got my ear piercing done here — super clean, professional, and friendly staff.",
    },
    {
      id: 3,
      name: "HAPPY CLIENT",
      role: "Verified Google Review • 5.0 ★",
      stars: 5,
      quote:
        "Good work good quality great ambience and mainly GOOD people's",
    },
    {
      id: 4,
      name: "TATTOO COLLECTOR",
      role: "Verified Google Review • 5.0 ★",
      stars: 5,
      quote:
        "Zeus Tattoo Studio Kottayam is on an entirely different level. The attention to detail, fine-line precision, and clean atmosphere make it the best studio in Kottayam.",
    },
  ];

  const current = testimonials[currentTestimonial];

  const handleNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const googleReviewsUrl = "https://www.google.com/search?q=Zeus+Tattoo+Kottayam";

  return (
    <section id="testimonials" className="relative bg-[#FFA028] text-[#0C0D12] pt-12 pb-24 md:pb-36 overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-wider text-[#0C0D12] uppercase"
          >
            OUR CUSTOMER SAYS
          </motion.h2>
          <SectionFlourish color="#0C0D12" />
        </div>

        {/* Google Reviews Trust Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10 text-center"
        >
          <a
            href={googleReviewsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 bg-[#0C0D12] text-white px-5 py-2 rounded-full hover:bg-black transition-all shadow-md group"
          >
            <div className="flex items-center gap-1 text-[#FFA028]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} className="fill-[#FFA028] text-[#FFA028]" />
              ))}
            </div>
            <span className="font-display text-xs font-bold tracking-wider uppercase">
              5.0 RATING • 210 GOOGLE REVIEWS
            </span>
            <ExternalLink size={12} className="text-[#FFA028] group-hover:translate-x-0.5 transition-transform" />
          </a>
        </motion.div>

        {/* Testimonial Quote Box with Big Decorative Quotation Marks */}
        <div className="relative py-6 px-4 sm:px-12 flex flex-col items-center text-center">
          {/* Top Left Quote Mark */}
          <span className="absolute -top-4 left-0 sm:left-4 font-serif text-6xl sm:text-8xl text-[#0C0D12]/20 select-none leading-none">
            “
          </span>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center"
            >
              {/* Star Rating for individual review */}
              <div className="flex items-center gap-1 mb-4 text-[#0C0D12]">
                {[...Array(current.stars)].map((_, i) => (
                  <Star key={i} size={16} className="fill-[#0C0D12] text-[#0C0D12]" />
                ))}
              </div>

              <p className="text-[#0C0D12] font-sans text-base sm:text-lg md:text-xl leading-relaxed font-semibold max-w-2xl mb-8 italic">
                {current.quote}
              </p>

              <h4 className="font-display text-lg sm:text-xl font-bold tracking-wider text-[#0C0D12] uppercase">
                {current.name}
              </h4>
              <span className="text-xs text-[#0C0D12]/75 font-sans uppercase font-bold tracking-widest mt-1">
                {current.role}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Bottom Right Quote Mark */}
          <span className="absolute -bottom-6 right-0 sm:right-4 font-serif text-6xl sm:text-8xl text-[#0C0D12]/20 select-none leading-none">
            ”
          </span>
        </div>

        {/* Testimonial Carousel Controls & External Google Link */}
        <div className="flex flex-col items-center gap-6 mt-8">
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={handlePrev}
              aria-label="Previous Review"
              className="w-9 h-9 bg-[#0C0D12] hover:bg-white text-white hover:text-[#0C0D12] rounded-full flex items-center justify-center transition-colors cursor-pointer shadow"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    currentTestimonial === idx ? "w-8 bg-[#0C0D12]" : "w-2 bg-[#0C0D12]/30"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={handleNext}
              aria-label="Next Review"
              className="w-9 h-9 bg-[#0C0D12] hover:bg-white text-white hover:text-[#0C0D12] rounded-full flex items-center justify-center transition-colors cursor-pointer shadow"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 bg-[#0C0D12] text-white hover:bg-black font-display text-xs font-bold tracking-widest uppercase rounded shadow transition-all flex items-center gap-2"
            >
              VIEW ALL 210+ GOOGLE REVIEWS
              <ExternalLink size={13} />
            </a>
            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 border-2 border-[#0C0D12] text-[#0C0D12] hover:bg-[#0C0D12] hover:text-white font-display text-xs font-bold tracking-widest uppercase rounded transition-all"
            >
              WRITE A REVIEW
            </a>
          </div>
        </div>
      </div>

      {/* Torn Paper Edge at the Bottom transitioning to Dark ContactLocation section */}
      <div className="absolute bottom-0 left-0 right-0 w-full z-20">
        <TornPaperDivider fill="#0b0d12" position="bottom" variant={3} />
      </div>
    </section>
  );
}
