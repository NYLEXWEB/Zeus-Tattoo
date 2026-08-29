"use client";

import { motion } from "framer-motion";
import { Sparkles, MessageCircle, ShieldCheck, Heart, Droplets, Sun } from "lucide-react";

export default function Aftercare() {
    const aftercareSteps = [
        {
            step: "01",
            icon: <ShieldCheck size={20} className="text-[#e58c38]" />,
            title: "Protective Dermal Wrap",
            desc: "Leave your clinical dermal barrier film on for 24-48 hours. It protects raw skin while locking in natural healing fluids.",
        },
        {
            step: "02",
            icon: <Droplets size={20} className="text-[#e58c38]" />,
            title: "Sterile Cleansing",
            desc: "Wash gently with lukewarm water and fragrance-free antibacterial wash. Pat dry with clean paper towels—never scrub.",
        },
        {
            step: "03",
            icon: <Heart size={20} className="text-[#e58c38]" />,
            title: "Micro-Hydration",
            desc: "Apply a whisper-thin layer of specialized organic tattoo salve 2-3 times daily to preserve crisp linework and pigment saturation.",
        },
        {
            step: "04",
            icon: <Sun size={20} className="text-[#e58c38]" />,
            title: "Sun & Submersion Shield",
            desc: "Avoid direct sunlight, swimming pools, saunas, and hot tubs for 3 weeks. Allow peeling skin to shed naturally without picking.",
        },
    ];

    return (
        <section id="aftercare" className="bg-[#0b0d12] py-24 md:py-36 overflow-hidden border-b border-white/5 text-white relative">
            {/* Glow Ambient Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#e58c38]/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16 md:mb-20">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-3 flex items-center gap-2"
                    >
                        <Sparkles size={13} />
                        PERFECT HEALING GUARANTEE
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase"
                    >
                        TATTOO AFTERCARE & HEALING
                    </motion.h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-[#e58c38] to-[#d97706] mt-4 rounded-full shadow-[0_0_10px_#e58c38]" />
                    <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide mt-6 max-w-xl">
                        A masterpiece is created in the studio, but perfected during healing. Follow our clinical protocol to preserve line sharpness and color longevity.
                    </p>
                </div>

                {/* 4-Step Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-16">
                    {aftercareSteps.map((step, index) => (
                        <motion.div
                            key={step.step}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
                            className="bg-[#121620] border border-white/10 hover:border-[#e58c38]/40 rounded-2xl p-8 flex flex-col justify-between transition-all duration-500 shadow-xl group hover:shadow-[0_0_30px_rgba(229,140,56,0.15)]"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <span className="font-sans text-3xl font-extrabold text-[#e58c38] tracking-tight group-hover:scale-110 transition-transform duration-300">
                                        {step.step}
                                    </span>
                                    <div className="w-10 h-10 rounded-full border border-[#e58c38]/30 bg-[#0b0d12] flex items-center justify-center group-hover:border-[#e58c38] transition-colors">
                                        {step.icon}
                                    </div>
                                </div>

                                <h3 className="font-sans text-base font-extrabold text-white uppercase tracking-wide mb-3">
                                    {step.title}
                                </h3>
                                <p className="text-xs text-gray-300 font-sans leading-relaxed tracking-wide">
                                    {step.desc}
                                </p>
                            </div>

                            <div className="mt-8 border-t border-white/10 pt-4 flex items-center justify-between text-[10px] tracking-widest text-[#e58c38] font-sans uppercase font-bold">
                                <span>PROTOCOL STEP</span>
                                <span className="w-1.5 h-1.5 rounded-full bg-[#e58c38] animate-pulse" />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Direct WhatsApp Consultation Banner */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="p-8 md:p-10 bg-[#121620] border border-[#e58c38]/30 rounded-2xl flex flex-col lg:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(229,140,56,0.15)]"
                >
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full border-2 border-[#e58c38] bg-[#0b0d12] flex items-center justify-center text-[#e58c38] flex-shrink-0 shadow-[0_0_15px_#e58c38]">
                            <MessageCircle size={26} />
                        </div>
                        <div className="flex flex-col text-center lg:text-left">
                            <h3 className="font-sans text-lg md:text-xl font-extrabold text-white uppercase tracking-wide">
                                HAVE AFTERCARE QUESTIONS DURING HEALING?
                            </h3>
                            <p className="text-xs text-gray-300 font-sans tracking-wide mt-1">
                                Our skin specialists are on call for 30 days post-session. Send photos directly for custom guidance.
                            </p>
                        </div>
                    </div>

                    <a
                        href="https://wa.me/919876543210"
                        target="_blank"
                        rel="noreferrer"
                        className="px-8 py-4 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex-shrink-0 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)]"
                    >
                        WHATSAPP AFTERCARE TEAM
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
