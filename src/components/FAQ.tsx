"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "How do I book an appointment?",
      answer: "Click on any 'Book Now' or 'Book Appointment' button on our website. This will open our formal inquiry form. Fill in your contact info, artist choice, design placement, size, and date preferences. We will review your details and respond with availability and next steps within 24 hours.",
    },
    {
      question: "How much will my tattoo cost?",
      answer: "Our studio minimum is $150, which covers setups for small, simple tattoos. For larger, custom pieces, we charge an hourly rate of $200. We offer complimentary consultations to review your references and design size, which allows us to provide a reliable price estimate prior to booking.",
    },
    {
      question: "Does it hurt? What can I do to prepare?",
      answer: "Tattooing involves some discomfort, which varies depending on individual pain tolerance and placement (ribs and feet tend to be more sensitive than arms or legs). To prepare, we recommend getting a good night's sleep, eating a full meal beforehand, and staying hydrated. Please avoid alcohol for 24 hours prior to your session.",
    },
    {
      question: "Can I bring my own design or reference ideas?",
      answer: "Absolutely! We encourage you to upload reference images when booking. However, our artists specialize in custom, bespoke artwork. We will use your references as inspiration to draw a unique piece tailored to your anatomy. We do not copy exact tattoos from other artists to maintain creative authenticity.",
    },
    {
      question: "How long does a tattoo take to heal?",
      answer: "The surface layer of a tattoo typically heals in 2 to 3 weeks, while the deeper layers can take up to 2 months. We provide comprehensive written aftercare instructions and protective films to optimize this process. Proper care during this window is vital to ensuring crisp lines and vibrant color saturation.",
    },
    {
      question: "What is your deposit and cancellation policy?",
      answer: "We require a $100 deposit to secure your appointment booking date. Deposits are non-refundable but are fully credited toward the final cost of your tattoo. If you need to reschedule, we require at least 48 hours notice to carry your deposit over to a new date.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-brand-black py-24 md:py-32 overflow-hidden border-b border-brand-off-white/5">
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <span className="font-sans text-xs font-semibold tracking-[0.4em] text-brand-warm-cream uppercase mb-4 block">
            Common Questions
          </span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight text-brand-off-white uppercase">
            Frequently
            <br />
            <span className="italic font-light text-brand-warm-cream">Asked Questions</span>
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
                  className="w-full py-6 flex items-center justify-between text-left focus:outline-none group cursor-pointer"
                >
                  <span className="font-serif text-lg md:text-xl text-brand-off-white group-hover:text-brand-warm-cream transition-colors duration-300 pr-4">
                    {item.question}
                  </span>
                  <div className="w-8 h-8 rounded-full border border-brand-off-white/10 flex items-center justify-center flex-shrink-0 text-brand-off-white/60 group-hover:text-brand-warm-cream group-hover:border-brand-warm-cream transition-all duration-300">
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
                      <div className="pb-8 pr-12 text-xs md:text-sm text-brand-off-white/60 font-sans leading-relaxed tracking-wide">
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
