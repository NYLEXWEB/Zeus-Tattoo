"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  rating: number;
  image: string;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      text: "Absolutely loved the experience. The artist understood exactly what I wanted and delivered something beyond my expectations.",
      name: "Anjali S.",
      role: "Client (Fine Line Tattoo)",
      rating: 5,
      image: "/images/testimonial_anjali.jpg",
    },
    {
      id: 2,
      text: "Clean studio, friendly staff and incredible work. The attention to detail on my sleeve tattoo is just mind-blowing. Highly recommend!",
      name: "Rohit K.",
      role: "Client (Black & Grey Sleeve)",
      rating: 5,
      image: "/images/testimonial_rohit.jpg",
    },
    {
      id: 3,
      text: "One of the best tattoo studios in town. Extremely professional, creative, and they take safety/hygiene very seriously. Flawless healing process.",
      name: "Neha P.",
      role: "Client (Sacred Geometry)",
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

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const setSlide = (newIndex: number) => {
    setDirection(newIndex > currentIndex ? 1 : -1);
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    setDirection(1);
    handleNext();
  };

  const prevSlide = () => {
    setDirection(-1);
    handlePrev();
  };

  return (
    <section id="testimonials" className="bg-brand-off-white py-24 md:py-32 overflow-hidden border-b border-brand-charcoal/5">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs font-semibold tracking-[0.4em] text-brand-charcoal/60 uppercase mb-4 block">
            Testimonials
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-brand-black uppercase">
            What Our
            <br />
            <span className="italic font-light text-brand-black">Clients Say</span>
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[300px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              className="w-full text-center flex flex-col items-center max-w-3xl"
            >
              {/* Gold Stars */}
              <div className="flex gap-1 justify-center mb-6">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-brand-charcoal stroke-none" />
                ))}
              </div>

              {/* Review Text */}
              <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-brand-black leading-relaxed italic mb-8 max-w-2xl">
                "{testimonials[currentIndex].text}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-brand-charcoal/10 bg-brand-charcoal/5">
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-full h-full object-cover grayscale"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-sm font-semibold tracking-wider text-brand-black uppercase">
                    {testimonials[currentIndex].name}
                  </span>
                  <span className="text-[10px] tracking-widest text-brand-charcoal/50 font-sans uppercase mt-0.5">
                    {testimonials[currentIndex].role}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Dots & Buttons */}
        <div className="flex items-center justify-between mt-12 border-t border-brand-charcoal/10 pt-6 max-w-xs mx-auto">
          <button
            onClick={prevSlide}
            className="w-10 h-10 border border-brand-charcoal/10 hover:border-brand-black rounded-full flex items-center justify-center text-brand-charcoal hover:text-brand-black transition-all cursor-pointer"
            aria-label="Previous Testimonial"
          >
            <ChevronLeft size={16} />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setSlide(idx)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  currentIndex === idx ? "bg-brand-black w-6" : "bg-brand-charcoal/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="w-10 h-10 border border-brand-charcoal/10 hover:border-brand-black rounded-full flex items-center justify-center text-brand-charcoal hover:text-brand-black transition-all cursor-pointer"
            aria-label="Next Testimonial"
          >
            <ChevronRight size={16} />
          </button>
        </div>

      </div>
    </section>
  );
}
