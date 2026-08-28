"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  location: string;
  role: string;
  rating: number;
  image: string;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Zeus Tattoo Studio in Koramangala is on a whole different level. Rahul created a realism sleeve that literally leaves people speechless. Clinical cleanliness, extreme comfort, and legendary artwork.",
      name: "Anjali Sharma",
      location: "Bengaluru",
      role: "Client (Hyper-Realism Sleeve)",
      rating: 5,
      image: "/images/testimonial_anjali.jpg",
    },
    {
      id: 2,
      text: "Meera's fine line work is micro-precision perfection. She took my rough ideas and transformed them into a breathtaking single-needle floral composition. Cleanest studio experience I have ever had.",
      name: "Rohit Kapoor",
      location: "Bengaluru",
      role: "Client (Fine Line Floral)",
      rating: 5,
      image: "/images/testimonial_rohit.jpg",
    },
    {
      id: 3,
      text: "The cover-up work done by Sahana was magic. My old faded shoulder tattoo is completely gone, replaced by a geometric mandala with mind-blowing stipple detail. Truly world-class tattoo studio.",
      name: "Neha Patel",
      location: "Bengaluru",
      role: "Client (Geometric Cover-Up)",
      rating: 5,
      image: "/images/testimonial_neha.jpg",
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="bg-brand-black py-28 md:py-36 overflow-hidden border-b border-brand-off-white/5 text-brand-off-white">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs font-semibold tracking-[0.45em] text-brand-warm-cream uppercase mb-4 block">
            CLIENT TESTIMONIALS
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-brand-off-white uppercase">
            WHAT OUR<br />
            <span className="italic font-light text-brand-warm-cream">CLIENTS SAY</span>
          </h2>
        </div>

        {/* Carousel Viewport */}
        <div className="relative min-h-[320px] flex items-center justify-center bg-brand-charcoal/50 border border-brand-off-white/10 p-8 md:p-14 rounded-[3px] shadow-2xl">
          <Quote size={40} className="absolute top-6 left-6 text-brand-warm-cream/15 pointer-events-none" />
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
              className="w-full text-center flex flex-col items-center max-w-3xl z-10"
            >
              {/* 5 Stars */}
              <div className="flex gap-1.5 justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={18} className="fill-brand-warm-cream stroke-none" />
                ))}
              </div>

              {/* Review Quote */}
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-brand-off-white leading-relaxed italic mb-8 max-w-2xl">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-warm-cream/40 bg-brand-black">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-semibold tracking-wider text-brand-off-white uppercase">
                    {testimonials[currentIndex].name}
                  </span>
                  <span className="text-[10px] tracking-widest text-brand-warm-cream/70 font-sans uppercase mt-0.5">
                    {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Bar */}
        <div className="flex items-center justify-between mt-10 max-w-xs mx-auto">
          <button
            onClick={handlePrev}
            className="w-10 h-10 border border-brand-off-white/20 hover:border-brand-warm-cream rounded-full flex items-center justify-center text-brand-off-white hover:text-brand-warm-cream transition-all cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={18} />
          </button>
          
          {/* Pagination Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? "bg-brand-warm-cream w-6" : "bg-brand-off-white/20 w-1.5"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="w-10 h-10 border border-brand-off-white/20 hover:border-brand-warm-cream rounded-full flex items-center justify-center text-brand-off-white hover:text-brand-warm-cream transition-all cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={18} />
          </button>
        </div>

      </div>
    </section>
  );
}
