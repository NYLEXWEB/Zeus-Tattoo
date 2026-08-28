"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqItems: FAQItem[] = [
    {
      question: "How do I book an appointment at Zeus Tattoo Studio?",
      answer: "Click on any 'Book Appointment' or 'Book a Consultation' button on our website. Complete our short consultation inquiry form with your contact info, artist choice, design placement, size, and date preferences. Our studio team will review your project and respond within 24 hours.",
    },
    {
      question: "How much will my tattoo cost?",
      answer: "Our studio minimum is ₹3,500 ($150), which covers full sterile setups for small minimalist pieces. For larger custom tattoos and sleeve work, we charge an hourly rate of ₹5,000/hr ($200/hr). We provide complimentary consultations to give you an accurate price estimate prior to booking.",
    },
    {
      question: "Does getting a tattoo hurt? How should I prepare?",
      answer: "Tattooing involves manageable discomfort depending on placement (ribs and ankles tend to be more sensitive than forearms or thighs). To prepare, get a solid night's sleep, eat a nutritious meal beforehand, stay hydrated, and refrain from alcohol for 24 hours prior to your session.",
    },
    {
      question: "Can I bring my own design or reference ideas?",
      answer: "Yes! We encourage you to bring or upload reference photos. However, our resident artists specialize in 100% custom artwork. We use your references as creative inspiration to draw a unique piece tailored to your body flow rather than directly copying existing tattoos.",
    },
    {
      question: "How long does a tattoo take to heal completely?",
      answer: "The outer skin surface typically heals in 2 to 3 weeks, while deeper skin layers settle over 2 months. We provide medical-grade protective dermal films and comprehensive written aftercare guidelines to optimize healing and color retention.",
    },
    {
      question: "What is your deposit and cancellation policy?",
      answer: "We require a ₹2,000 ($100) deposit to secure your appointment booking date. Deposits are non-refundable but are fully credited toward the final cost of your tattoo session. We require 48 hours notice to reschedule your date while preserving your deposit.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-brand-black py-28 md:py-36 overflow-hidden border-b border-brand-off-white/5 text-brand-off-white">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-sans text-xs font-semibold tracking-[0.45em] text-brand-warm-cream uppercase mb-4 block">
            COMMON QUESTIONS
          </span>
          <h2 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.1] text-brand-off-white uppercase">
            FREQUENTLY<br />
            <span className="italic font-light text-brand-warm-cream">ASKED QUESTIONS</span>
          </h2>
        </div>

        {/* Accordions List */}
        <div className="flex flex-col border-t border-brand-off-white/10">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border-b border-brand-off-white/10"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full py-6 md:py-8 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                >
                  <span className="font-serif text-lg md:text-2xl text-brand-off-white group-hover:text-brand-warm-cream transition-colors duration-300 pr-6">
                    {item.question}
                  </span>
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    isOpen
                      ? "border-brand-warm-cream text-brand-warm-cream bg-brand-warm-cream/10 rotate-180"
                      : "border-brand-off-white/20 text-brand-off-white/60 group-hover:text-brand-warm-cream group-hover:border-brand-warm-cream"
                  }`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-12 text-xs md:text-sm text-brand-off-white/70 font-sans leading-relaxed tracking-wide">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
