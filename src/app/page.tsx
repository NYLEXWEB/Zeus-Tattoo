"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Styles from "@/components/Styles";
import Artists from "@/components/Artists";
import Portfolio from "@/components/Portfolio";
import Safety from "@/components/Safety";
import PricingAftercare from "@/components/PricingAftercare";
import FAQ from "@/components/FAQ";
import Testimonials from "@/components/Testimonials";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="bg-brand-black text-brand-off-white font-sans selection:bg-brand-warm-cream selection:text-brand-black">
      {/* Sticky Premium Navigation Header */}
      <Navbar onOpenBooking={openBooking} />

      {/* Main Structural Body */}
      <main>
        {/* Cinematic Hero Block */}
        <Hero onOpenBooking={openBooking} />

        {/* Studio Story & Stats (Dark) */}
        <About />

        {/* Style Showcase Horizontal Slide (Off-White) */}
        <Styles />

        {/* Master Artists Grid (Dark) */}
        <Artists />

        {/* masonry portfolio gallery (Off-White) */}
        <Portfolio />

        {/* Safety commitments (Dark) */}
        <Safety onOpenBooking={openBooking} />

        {/* Pricing Guide & Aftercare details (Off-White) */}
        <PricingAftercare />

        {/* Common FAQ accordion dropdowns (Dark) */}
        <FAQ />

        {/* Customer reviews carousel (Off-White) */}
        <Testimonials />

        {/* Final CTA (Dark) */}
        <FinalCTA onOpenBooking={openBooking} />
      </main>

      {/* Branding Footer Details */}
      <Footer />

      {/* Booking Form Floating Modal Backdrop */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
