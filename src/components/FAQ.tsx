"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, HelpCircle, ArrowRight, ShieldCheck, CheckCircle2, ChevronDown } from "lucide-react";

interface FAQItem {
  id: string;
  category: "BOOKING & COST" | "CUSTOM DESIGNS" | "HEALING & AFTERCARE";
  question: string;
  answer: string;
  badge: string;
  image: string;
  highlights: string[];
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>("ALL");
  const [selectedId, setSelectedId] = useState<string>("01");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const faqItems: FAQItem[] = [
    {
      id: "01",
      category: "BOOKING & COST",
      question: "HOW DO I BOOK AN APPOINTMENT AT ZEUS TATTOO STUDIO?",
      answer: "Click on any 'Book Consultation' button on our website. Complete our short consultation form with your contact info, artist choice, design placement, size, and date preferences. Our studio team will review your project and respond within 24 hours.",
      badge: "24-HOUR RESPONSE GUARANTEE",
      image: "/images/portfolio_lion_realism.jpg",
      highlights: ["No walk-ins required for consultations", "Direct contact with your chosen master artist", "Flexible scheduling window"],
    },
    {
      id: "02",
      category: "BOOKING & COST",
      question: "HOW MUCH WILL MY TATTOO COST?",
      answer: "Our studio minimum is ₹3,500 ($150), which covers full sterile setups for small minimalist pieces. For larger custom tattoos and sleeve work, we charge an hourly rate of ₹5,000/hr ($200/hr). We provide complimentary consultations to give you an accurate price estimate prior to booking.",
      badge: "TRANSPARENT HOURLY PRICING",
      image: "/images/IMG_20260829_212716_292.jpg",
      highlights: ["Zero hidden studio setup fees", "Free pre-booking cost calculation", "Non-refundable ₹2,000 deposit credited to final bill"],
    },
    {
      id: "03",
      category: "HEALING & AFTERCARE",
      question: "DOES GETTING A TATTOO HURT? HOW SHOULD I PREPARE?",
      answer: "Tattooing involves manageable discomfort depending on placement (ribs and ankles tend to be more sensitive than forearms or thighs). To prepare, get a solid night's sleep, eat a nutritious meal beforehand, stay hydrated, and refrain from alcohol for 24 hours prior to your session.",
      badge: "PAIN MANAGEMENT & PREPARATION",
      image: "/images/IMG_20260829_212734_480.jpg",
      highlights: ["Topical cooling sprays available", "Hydration & nutrition prep protocol", "Relaxed private studio environment"],
    },
    {
      id: "04",
      category: "CUSTOM DESIGNS",
      question: "CAN I BRING MY OWN DESIGN OR REFERENCE IDEAS?",
      answer: "Yes! We encourage you to bring or upload reference photos. However, our resident artists specialize in 100% custom artwork. We use your references as creative inspiration to draw a unique piece tailored to your body flow rather than directly copying existing tattoos.",
      badge: "100% CUSTOM ARTWORK GUARANTEE",
      image: "/images/IMG_20260829_212719_574.jpg",
      highlights: ["Anatomical body mapping", "Unique one-of-one stencil design", "Digital stencil preview prior to session"],
    },
    {
      id: "05",
      category: "HEALING & AFTERCARE",
      question: "HOW LONG DOES A TATTOO TAKE TO HEAL COMPLETELY?",
      answer: "The outer skin surface typically heals in 2 to 3 weeks, while deeper skin layers settle over 2 months. We provide medical-grade protective dermal films and comprehensive written aftercare guidelines to optimize healing and color retention.",
      badge: "DERMAL FILM PROTECTIVE PROTOCOL",
      image: "/images/IMG_20260829_212754_172.jpg",
      highlights: ["Waterproof breathable film application", "30-day WhatsApp follow-up support", "Free touch-up within 90 days"],
    },
    {
      id: "06",
      category: "BOOKING & COST",
      question: "WHAT IS YOUR DEPOSIT AND CANCELLATION POLICY?",
      answer: "We require a ₹2,000 ($100) deposit to secure your appointment booking date. Deposits are non-refundable but are fully credited toward the final cost of your tattoo session. We require 48 hours notice to reschedule your date while preserving your deposit.",
      badge: "48-HOUR RESCHEDULING FLEXIBILITY",
      image: "/images/IMG_20260829_212809_269.jpg",
      highlights: ["Deposit preserves your locked pricing", "Reschedule up to 2 times without fee", "Valid for 12 months"],
    },
  ];

  const categories = ["ALL", "BOOKING & COST", "CUSTOM DESIGNS", "HEALING & AFTERCARE"];

  const filteredItems = activeCategory === "ALL"
    ? faqItems
    : faqItems.filter(item => item.category === activeCategory);

  const selectedItem = faqItems.find(item => item.id === selectedId) || faqItems[0];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      id="faq"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white relative"
    >
      {/* Background Decorative Rings */}
      <div className="absolute top-1/4 right-0 w-96 h-96 border border-[#e58c38]/10 rounded-full translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 border border-[#e58c38]/10 rounded-full -translate-x-1/2 pointer-events-none" />

      {/* Dynamic Cursor Hover Thumbnail (Desktop Only) */}
      <AnimatePresence>
        {hoveredId !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: cursorPos.x + 20,
              y: cursorPos.y - 70,
            }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="pointer-events-none absolute top-0 left-0 z-40 hidden lg:flex items-center gap-3 bg-[#121620]/95 backdrop-blur-md border border-[#e58c38] p-2 rounded-xl shadow-[0_0_25px_rgba(229,140,56,0.3)] w-48 aspect-video overflow-hidden"
          >
            <img
              src={faqItems.find(i => i.id === hoveredId)?.image}
              alt="FAQ Preview"
              className="w-full h-full object-cover rounded-lg grayscale"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="flex flex-col items-start">
            <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-2 flex items-center gap-2">
              <Sparkles size={13} />
              QUESTIONS BEFORE THE INK
            </span>
            <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <div className="w-16 h-[3px] bg-gradient-to-r from-[#e58c38] to-[#d97706] mt-3 rounded-full shadow-[0_0_10px_#e58c38]" />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-300 font-sans font-extrabold cursor-pointer border ${activeCategory === cat
                  ? "bg-gradient-to-r from-[#e58c38] to-[#d97706] text-black border-[#e58c38] shadow-[0_0_20px_rgba(229,140,56,0.35)]"
                  : "bg-[#121620] text-gray-300 border-white/10 hover:text-white hover:border-[#e58c38]/40"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Canvas Grid: Left Question Selector Wall / Right Connected Visual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left Column: Interactive Question List */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            {filteredItems.map((item) => {
              const isSelected = selectedId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className={`w-full p-5 md:p-6 rounded-2xl text-left transition-all duration-300 border cursor-pointer flex items-center justify-between gap-4 ${isSelected
                    ? "bg-[#121620] border-[#e58c38] shadow-[0_0_30px_rgba(229,140,56,0.25)] translate-x-2"
                    : "bg-[#0b0d12] border-white/10 hover:border-white/20 hover:bg-[#121620]/50"
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`text-xs font-sans font-extrabold tracking-widest ${isSelected ? "text-[#e58c38]" : "text-gray-400"}`}>
                      {item.id}
                    </span>
                    <h3 className={`font-sans text-xs md:text-sm font-extrabold uppercase tracking-wide transition-colors ${isSelected ? "text-white" : "text-gray-300"}`}>
                      {item.question}
                    </h3>
                  </div>

                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isSelected ? "border-[#e58c38] text-[#e58c38] bg-[#e58c38]/10 rotate-90" : "border-white/10 text-gray-400"}`}>
                    <ArrowRight size={14} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Connected Visual Answer Stage */}
          <div className="lg:col-span-6 bg-[#121620] border border-[#e58c38]/30 rounded-2xl p-8 lg:p-12 shadow-2xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">

            <AnimatePresence mode="wait">
              <motion.div
                key={selectedItem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                className="flex flex-col justify-between h-full z-10"
              >
                <div>
                  {/* Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-[#e58c38] uppercase bg-[#0b0d12] px-3.5 py-1.5 rounded-full border border-[#e58c38]/40 flex items-center gap-2">
                      <ShieldCheck size={13} />
                      {selectedItem.badge}
                    </span>
                    <span className="text-xs font-sans font-extrabold text-gray-400">
                      {selectedItem.id} / 06
                    </span>
                  </div>

                  {/* Question Title */}
                  <h3 className="font-sans text-xl md:text-2xl font-extrabold text-white uppercase tracking-tight mb-4">
                    {selectedItem.question}
                  </h3>

                  {/* Staggered Answer Paragraph */}
                  <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                    {selectedItem.answer}
                  </p>

                  {/* Key Protocol Highlights */}
                  <ul className="flex flex-col gap-2.5 mb-8 border-t border-white/10 pt-6">
                    {selectedItem.highlights.map((hl, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-xs text-gray-300 font-sans">
                        <CheckCircle2 size={15} className="text-[#e58c38] flex-shrink-0" />
                        <span>{hl}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action Bar & Connected Artwork Thumbnail */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10 pt-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedItem.image}
                      alt={selectedItem.question}
                      className="w-12 h-12 rounded-xl object-cover border border-[#e58c38]/50 grayscale"
                    />
                    <div className="flex flex-col">
                      <span className="text-[10px] font-sans font-bold tracking-widest text-[#e58c38] uppercase">
                        STUDIO SANCTUARY ARTWORK
                      </span>
                      <span className="text-xs font-sans font-extrabold text-white uppercase">
                        {selectedItem.category}
                      </span>
                    </div>
                  </div>

                  <a
                    href="#contact"
                    className="group px-6 py-3 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)]"
                  >
                    ASK OUR ARTISTS
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
