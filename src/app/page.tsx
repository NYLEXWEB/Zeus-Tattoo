"use client";

import { useEffect } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Loader from "@/components/Loader";
import Header from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Artists from "@/components/Artists";
import Gallery from "@/components/Gallery";
import Studio from "@/components/Studio";
import Moments from "@/components/Moments";
import Aftercare from "@/components/Aftercare";
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";

export default function Home() {
  useEffect(() => {
    const timer = setTimeout(() => {
      const sections = document.querySelectorAll("section");
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("reveal-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 0.08,
        }
      );

      sections.forEach((sec) => {
        if (sec.id !== "home") {
          sec.classList.add("reveal-section");
          observer.observe(sec);
        }
      });
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SmoothScroll>
      {/* 1. Real Asset Preloader tracking all critical images */}
      <Loader />

      {/* 2. Top Navigation Bar - transparent, hides past Hero */}
      <Header />

      {/* 3. Main Page Flow */}
      <main style={{ minHeight: "100vh", paddingTop: "0px" }}>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* Services Section */}
        <Services />

        {/* Artists Section (Framed & Optimized) */}
        <Artists />

        {/* Portfolio / Gallery Section */}
        <Gallery />

        {/* Studio Space & Fan Deck Carousel Section */}
        <Studio />

        {/* Studio Moments Section */}
        <Moments />

        {/* Aftercare Guidelines Section */}
        <Aftercare />

        {/* Booking & Studio Location Map Section */}
        <Booking />
      </main>

      {/* 4. Site Footer */}
      <Footer />
    </SmoothScroll>
  );
}
