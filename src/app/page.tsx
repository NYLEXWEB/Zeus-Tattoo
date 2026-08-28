"use client";

import { useState } from "react";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Artists from "@/components/Artists";
import StudioHygiene from "@/components/StudioHygiene";
import Process from "@/components/Process";
import PricingAftercare from "@/components/PricingAftercare";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactLocation from "@/components/ContactLocation";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <div className="bg-brand-black text-brand-off-white font-sans selection:bg-brand-warm-cream selection:text-brand-black relative">
      {/* Luxury Follower Cursor */}
      <CustomCursor />

      {/* Sticky Navigation Header with Glassmorphism */}
      <Navbar onOpenBooking={openBooking} />

      {/* Main Storytelling Sections */}
      <main>
        {/* Hero Section with 000%-100% Loading Screen & 300 WebP Canvas Scrubbing */}
        <Hero onOpenBooking={openBooking} />

        {/* Studio Intro & Statistics (THE STUDIO) */}
        <About onOpenBooking={openBooking} />

        {/* Studio Services Expandable Accordion */}
        <Services onOpenBooking={openBooking} />

        {/* Selected Works Gallery & Full-Screen Lightbox */}
        <Portfolio />

        {/* Resident Artists Profiles */}
        <Artists />

        {/* Studio Hygiene & Atmosphere (PRECISION. HYGIENE. CRAFT.) */}
        <StudioHygiene />

        {/* 3-Step Client Process */}
        <Process onOpenBooking={openBooking} />

        {/* Investment & Tattoo Aftercare Guide */}
        <PricingAftercare onOpenBooking={openBooking} />

        {/* Client Reviews Carousel */}
        <Testimonials />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Bangalore Location & Map Section */}
        <ContactLocation onOpenBooking={openBooking} />

        {/* Final Conversion CTA */}
        <FinalCTA onOpenBooking={openBooking} />
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Booking Form Modal Overlay */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
