"use client";

import { useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";

export default function FAQPage() {
    const [isBookingOpen, setIsBookingOpen] = useState(false);

    const openBooking = () => setIsBookingOpen(true);
    const closeBooking = () => setIsBookingOpen(false);

    return (
        <SmoothScroll>
            <div className="bg-[#0b0d12] text-[#F2EEE6] font-sans selection:bg-[#e58c38] selection:text-black relative min-h-screen pt-16">
                {/* Custom Luxury Cursor */}
                <CustomCursor />

                {/* Sticky Navbar */}
                <Navbar onOpenBooking={openBooking} />

                {/* Dedicated FAQ Section */}
                <main className="min-h-[80vh]">
                    <FAQ />
                    <FinalCTA onOpenBooking={openBooking} />
                </main>

                {/* Masterpiece Footer */}
                <Footer />

                {/* Booking Consultation Modal */}
                <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
            </div>
        </SmoothScroll>
    );
}
