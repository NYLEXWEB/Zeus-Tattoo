"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import TattooSculpture3D from "@/components/TattooSculpture3D";
import PiercingSanctuary from "@/components/PiercingSanctuary";
import Artists from "@/components/Artists";
import StudioHygiene from "@/components/StudioHygiene";
import Process from "@/components/Process";
import Aftercare from "@/components/Aftercare";
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
    <SmoothScroll>
      <div className="bg-[#0b0d12] text-[#F2EEE6] font-sans selection:bg-[#e58c38] selection:text-black relative min-h-screen">
        {/* State-aware Custom Cursor */}
        <CustomCursor />

        {/* Sticky Dynamic Glassmorphic Navbar */}
        <Navbar onOpenBooking={openBooking} />

        {/* Main Storytelling Experience */}
        <main>
          {/* Approved Hero Section (Preserved canvas-scrubbing) */}
          <Hero onOpenBooking={openBooking} />

          {/* Neoclassical Studio Sanctuary Narrative */}
          <About onOpenBooking={openBooking} />

          {/* Interactive Expandable Services Grid */}
          <Services onOpenBooking={openBooking} />

          {/* Editorial Asymmetric Tattoo Gallery */}
          <Portfolio />

          {/* 3D WebGL Torus Knot & Particle Field */}
          <TattooSculpture3D />

          {/* Dedicated Piercing Sanctuary */}
          <PiercingSanctuary onOpenBooking={openBooking} />

          {/* Master Resident Artists Profiles */}
          <Artists />

          {/* Clinical Hygiene & Hospital Protocol */}
          <StudioHygiene />

          {/* 3-Step Client Journey */}
          <Process onOpenBooking={openBooking} />

          {/* Standalone Healing Aftercare Protocol (Price Guide Removed) */}
          <Aftercare />

          {/* Collector Testimonials */}
          <Testimonials />

          {/* Frequently Asked Questions */}
          <FAQ />

          {/* Studio Location & Map */}
          <ContactLocation onOpenBooking={openBooking} />

          {/* Cinematic Conversion CTA */}
          <FinalCTA onOpenBooking={openBooking} />
        </main>

        {/* Interactive Masterpiece Footer */}
        <Footer />

        {/* Booking Form Modal Overlay */}
        <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
      </div>
    </SmoothScroll>
  );
}
