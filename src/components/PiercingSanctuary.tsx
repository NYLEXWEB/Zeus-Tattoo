"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

interface PiercingSanctuaryProps {
    onOpenBooking?: () => void;
}

export default function PiercingSanctuary({ onOpenBooking }: PiercingSanctuaryProps) {
    const [selectedPlacement, setSelectedPlacement] = useState("EAR");

    const placements = [
        {
            id: "EAR",
            name: "Ear Curation (Helix, Tragus, Conch)",
            healing: "6 - 12 Weeks",
            hardware: "Implant-Grade ASTM F-136 Titanium / 18k Gold",
            desc: "Anatomical mapping designed specifically for your ear curvature. Customized stud clusters, delicate hoops, and precision alignment.",
            image: "/images/service_piercing.jpg",
            points: ["No piercing guns used—surgical needle only", "Autoclave sterile sealed pouches", "Personalized placement mapping"],
        },
        {
            id: "FACIAL",
            name: "Facial & Nostril Precision",
            healing: "4 - 8 Weeks",
            hardware: "Bezel-set Swarovski / Opal / Gold Studs",
            desc: "Subtle micro-piercings placed with golden ratio facial symmetry. Ultra-gentle procedure with topical soothing cooling.",
            image: "/images/service_lip.jpg",
            points: ["Micro-gauge surgical needles", "Hypoallergenic titanium hardware", "Detailed post-procedure healing care"],
        },
        {
            id: "NAVET",
            name: "Body & Septum Articulation",
            healing: "8 - 14 Weeks",
            hardware: "Internal Threaded Titanium Barbells & Clickers",
            desc: "High-precision body placement aligned with torso posture and natural skin movement for minimal friction during healing.",
            image: "/images/portfolio_butterfly_fineline.jpg",
            points: ["Internal thread technology to protect tissue", "Zero nickel content", "Free follow-up sizing check"],
        },
    ];

    const currentPlacement = placements.find((p) => p.id === selectedPlacement) || placements[0];

    return (
        <section id="piercing" className="bg-[#0b0d12] py-24 md:py-36 border-b border-white/5 text-white relative overflow-hidden">
            {/* Background Decorative Rings */}
            <div className="absolute top-0 right-0 w-96 h-96 border border-[#e58c38]/10 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 border border-[#e58c38]/10 rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* Section Header */}
                <div className="flex flex-col items-start mb-16">
                    <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-3 flex items-center gap-2">
                        <Sparkles size={13} />
                        CLINICAL BODY ARTICULATION
                    </span>
                    <h2 className="font-sans text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider text-white uppercase">
                        PIERCING SANCTUARY
                    </h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-[#e58c38] to-[#d97706] mt-3 rounded-full shadow-[0_0_10px_#e58c38]" />
                </div>

                {/* Piercing Placement Selector Pills */}
                <div className="flex flex-wrap gap-3 mb-12">
                    {placements.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setSelectedPlacement(p.id)}
                            className={`px-6 py-3 rounded-full text-xs font-sans font-extrabold tracking-[0.2em] uppercase transition-all duration-300 cursor-pointer border ${selectedPlacement === p.id
                                    ? "bg-gradient-to-r from-[#e58c38] to-[#d97706] text-black border-[#e58c38] shadow-[0_0_20px_rgba(229,140,56,0.3)]"
                                    : "bg-[#121620] text-gray-300 border-white/10 hover:border-[#e58c38]/50 hover:text-white"
                                }`}
                        >
                            {p.name.split(" ")[0]} {p.name.split(" ")[1]}
                        </button>
                    ))}
                </div>

                {/* Display Card */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-[#121620] border border-white/10 rounded-2xl overflow-hidden shadow-2xl p-8 lg:p-12">

                    {/* Left Feature Image with Gold Frame */}
                    <div className="lg:col-span-6 relative aspect-[4/3] rounded-xl overflow-hidden border border-[#e58c38]/30 group">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentPlacement.id}
                                src={currentPlacement.image}
                                alt={currentPlacement.name}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.5 }}
                                className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 transition-all duration-700"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0d12]/90 via-transparent to-transparent" />

                        <div className="absolute bottom-6 left-6 z-10 bg-[#0b0d12]/80 backdrop-blur-md border border-[#e58c38]/40 px-4 py-2 rounded-lg flex items-center gap-2">
                            <ShieldCheck size={16} className="text-[#e58c38]" />
                            <span className="text-[10px] tracking-[0.2em] font-sans text-white uppercase font-extrabold">
                                100% NEEDLE PRECISION
                            </span>
                        </div>
                    </div>

                    {/* Right Details Panel */}
                    <div className="lg:col-span-6 flex flex-col justify-between h-full">
                        <div>
                            <span className="text-[10px] tracking-[0.3em] font-sans font-extrabold text-[#e58c38] uppercase block mb-2">
                                HEALING TIME: {currentPlacement.healing}
                            </span>
                            <h3 className="font-sans text-3xl font-extrabold text-white uppercase tracking-tight mb-4">
                                {currentPlacement.name}
                            </h3>
                            <p className="text-xs md:text-sm text-gray-300 font-sans leading-relaxed tracking-wide mb-6">
                                {currentPlacement.desc}
                            </p>

                            <div className="bg-[#0b0d12] p-4 rounded-xl border border-white/5 mb-6">
                                <span className="text-[10px] tracking-widest text-[#e58c38] font-sans font-bold uppercase block mb-1">
                                    IMPLANT HARDWARE:
                                </span>
                                <span className="text-xs text-white font-sans font-medium">
                                    {currentPlacement.hardware}
                                </span>
                            </div>

                            <ul className="flex flex-col gap-3 mb-8">
                                {currentPlacement.points.map((pt, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-xs text-gray-300 font-sans">
                                        <CheckCircle2 size={15} className="text-[#e58c38] flex-shrink-0" />
                                        <span>{pt}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <button
                                onClick={onOpenBooking}
                                className="group px-7 py-3.5 bg-gradient-to-r from-[#e58c38] to-[#d97706] hover:from-[#f39c12] hover:to-[#e67e22] text-black font-sans text-xs font-extrabold tracking-widest uppercase rounded-full transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(229,140,56,0.35)]"
                            >
                                BOOK PIERCING SESSION
                                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
}
