"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Artists from "@/components/Artists";
import Portfolio from "@/components/Portfolio";
import Testimonials from "@/components/Testimonials";
import ContactLocation from "@/components/ContactLocation";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import CustomCursor from "@/components/CustomCursor";

export default function Home() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  return (
    <SmoothScroll>
      <div className="bg-[#0C0D12] text-white font-sans selection:bg-[#FFA028] selection:text-black relative min-h-screen">
      {/* State-aware Custom Cursor */}
      <CustomCursor />

      {/* Header & Sticky Navigation */}
      <Navbar onOpenBooking={openBooking} />

      {/* Main Experience Flow matching the reference template 100% */}
      <main>
        {/* 1. Hero Section (Creating Great Tattoos For Over 25 Years) */}
        <Hero onOpenBooking={openBooking} />

        {/* 2. About Us Section (Perfection That Is Forever) */}
        <About onOpenBooking={openBooking} />

        {/* 3. Our Services Section (Warm Gold Background with 6 Service Pills + Center Slider) */}
        <Services onOpenBooking={openBooking} />

        {/* 4. Meet Our Artists Section (White Background with Torn-Edge Artist Card) */}
        <Artists onOpenBooking={openBooking} />

        {/* 5. Tattoo Gallery Section (Dark Charcoal Background with 10-Item Photo Grid & Lightbox) */}
        <Portfolio />

        {/* 6. Our Customer Says Section (Warm Gold Background with Big Quotes & 5.0 Google Reviews) */}
        <Testimonials />

        {/* 7. Studio & Location Section (Manorama Junction, Kottayam Map & Operating Hours) */}
        <ContactLocation onOpenBooking={openBooking} />

        {/* 8. Subscribe To Newsletter Section (White Background with Wings Watermark) */}
        <Newsletter />
      </main>

      {/* 8. Circular Golden Emblem Footer */}
      <Footer />

      {/* Booking Consultation Modal Overlay */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
    </SmoothScroll>
  );
}
