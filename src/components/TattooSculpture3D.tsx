"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, Compass, ShieldCheck, Zap } from "lucide-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function TattooSculpture3D() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // 1. Scene, Camera, Renderer Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 7.5);

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // 2. Tattoo Machine Main Group
        const machineGroup = new THREE.Group();
        // Tilt angle for cinematic stance
        machineGroup.rotation.z = -Math.PI / 6;
        machineGroup.rotation.y = Math.PI / 4;
        scene.add(machineGroup);

        // --- TATTOO MACHINE COMPONENTS ---

        // A. Main Rotary Motor Housing (Obsidian Metal Cylinder)
        const motorGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.4, 32);
        const obsidianMat = new THREE.MeshStandardMaterial({
            color: 0x121620,
            metalness: 0.9,
            roughness: 0.2,
        });
        const motorMesh = new THREE.Mesh(motorGeo, obsidianMat);
        motorMesh.position.y = 1.6;
        machineGroup.add(motorMesh);

        // Motor Gold End Cap & Ring
        const capGeo = new THREE.CylinderGeometry(0.58, 0.58, 0.2, 32);
        const goldMat = new THREE.MeshStandardMaterial({
            color: 0xe58c38,
            metalness: 0.95,
            roughness: 0.15,
        });
        const capMesh = new THREE.Mesh(capGeo, goldMat);
        capMesh.position.y = 2.3;
        machineGroup.add(capMesh);

        // B. Knurled Ergonomic Gold Grip
        const gripGeo = new THREE.CylinderGeometry(0.42, 0.38, 1.8, 32);
        const gripMesh = new THREE.Mesh(gripGeo, goldMat);
        gripMesh.position.y = 0.2;
        machineGroup.add(gripMesh);

        // Grip Decorative Gold Rings
        for (let i = 0; i < 4; i++) {
            const ringGeo = new THREE.TorusGeometry(0.43, 0.02, 16, 32);
            const ringMesh = new THREE.Mesh(ringGeo, goldMat);
            ringMesh.rotation.x = Math.PI / 2;
            ringMesh.position.y = 0.6 - i * 0.35;
            machineGroup.add(ringMesh);
        }

        // C. Sterile Transparent Cartridge Tube
        const tubeGeo = new THREE.CylinderGeometry(0.22, 0.14, 1.2, 32);
        const glassMat = new THREE.MeshPhysicalMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.45,
            roughness: 0.1,
            transmission: 0.9,
            ior: 1.5,
        });
        const tubeMesh = new THREE.Mesh(tubeGeo, glassMat);
        tubeMesh.position.y = -1.1;
        machineGroup.add(tubeMesh);

        // D. Precision Oscillating Needle Shaft
        const needleGeo = new THREE.ConeGeometry(0.04, 1.8, 16);
        const steelMat = new THREE.MeshStandardMaterial({
            color: 0xe2e8f0,
            metalness: 0.98,
            roughness: 0.1,
        });
        const needleMesh = new THREE.Mesh(needleGeo, steelMat);
        needleMesh.rotation.x = Math.PI; // Point tip down
        needleMesh.position.y = -1.4;
        machineGroup.add(needleMesh);

        // E. Gold Liquid Ink Droplet at Needle Tip
        const dropGeo = new THREE.SphereGeometry(0.12, 32, 32);
        const inkMat = new THREE.MeshPhysicalMaterial({
            color: 0xe58c38,
            metalness: 0.3,
            roughness: 0.1,
            clearcoat: 1.0,
            emissive: 0xe58c38,
            emissiveIntensity: 0.3,
        });
        const dropMesh = new THREE.Mesh(dropGeo, inkMat);
        dropMesh.position.y = -2.25;
        machineGroup.add(dropMesh);

        // 3. Swirling Liquid Gold Ink Particles
        const particleCount = 240;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
            // Concentrate particles around the needle tip (-2.25 y)
            const radius = 0.3 + Math.random() * 2.5;
            const angle = Math.random() * Math.PI * 2;
            positions[i * 3] = Math.cos(angle) * radius;
            positions[i * 3 + 1] = -2.2 + (Math.random() - 0.5) * 2.5;
            positions[i * 3 + 2] = Math.sin(angle) * radius;
        }

        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xe58c38,
            size: 0.065,
            transparent: true,
            opacity: 0.7,
            blending: THREE.AdditiveBlending,
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        machineGroup.add(particles);

        // 4. Lighting System
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const goldPointLight = new THREE.PointLight(0xe58c38, 4, 18);
        goldPointLight.position.set(3, 3, 5);
        scene.add(goldPointLight);

        const rimLight = new THREE.PointLight(0x38bdf8, 2, 15);
        rimLight.position.set(-4, -2, -3);
        scene.add(rimLight);

        // 5. Interactive Dynamics & Needle Vibration Loop
        let mouseX = 0;
        let mouseY = 0;
        let targetX = 0;
        let targetY = 0;

        const handleMouseMove = (e: MouseEvent) => {
            const rect = container.getBoundingClientRect();
            mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };

        window.addEventListener("mousemove", handleMouseMove);

        const handleResize = () => {
            if (!container) return;
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        };

        window.addEventListener("resize", handleResize);

        // Animation Loop
        let animId: number;
        const clock = new THREE.Clock();

        const animate = () => {
            const elapsedTime = clock.getElapsedTime();

            // Rapid micro-needle vibration oscillation (Simulating 120Hz motor pulse)
            needleMesh.position.y = -1.4 + Math.sin(elapsedTime * 45) * 0.05;
            dropMesh.position.y = -2.25 + Math.sin(elapsedTime * 45) * 0.03;

            // Machine subtle breathing spin
            machineGroup.rotation.y = Math.PI / 4 + Math.sin(elapsedTime * 0.5) * 0.2;
            particles.rotation.y = elapsedTime * 0.15;

            // Mouse lerp tracking
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            machineGroup.rotation.z = -Math.PI / 6 + targetX * 0.4;
            machineGroup.rotation.x = targetY * 0.4;

            renderer.render(scene, camera);
            animId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animId);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            motorGeo.dispose();
            obsidianMat.dispose();
            capGeo.dispose();
            goldMat.dispose();
            gripGeo.dispose();
            tubeGeo.dispose();
            glassMat.dispose();
            needleGeo.dispose();
            steelMat.dispose();
            dropGeo.dispose();
            inkMat.dispose();
            particleGeo.dispose();
            particleMat.dispose();
        };
    }, []);

    return (
        <section className="relative w-full py-28 bg-[#0b0d12] border-b border-white/5 overflow-hidden flex items-center justify-center">
            {/* Background Radial Glow */}
            <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] bg-[#e58c38]/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

                {/* Left Interactive 3D Tattoo Machine Canvas */}
                <div className="lg:col-span-7 relative h-[420px] sm:h-[520px] w-full flex items-center justify-center bg-[#121620]/40 rounded-3xl border border-[#e58c38]/30 shadow-[0_0_45px_rgba(229,140,56,0.2)] overflow-hidden">
                    <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

                    {/* Top Live Badge */}
                    <div className="absolute top-6 left-6 bg-[#0b0d12]/90 backdrop-blur-md border border-[#e58c38]/50 px-4 py-1.5 rounded-full flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#e58c38] animate-ping" />
                        <span className="text-[10px] tracking-[0.25em] font-sans text-white uppercase font-extrabold flex items-center gap-1.5">
                            <Zap size={11} className="text-[#e58c38]" />
                            3D ROTARY MACHINE & NEEDLE ENGINE
                        </span>
                    </div>

                    {/* Bottom Hint */}
                    <div className="absolute bottom-6 right-6 bg-[#0b0d12]/90 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full flex items-center gap-2 text-gray-300 text-[10px] font-sans tracking-widest uppercase font-semibold">
                        <Compass size={13} className="text-[#e58c38]" />
                        DRAG TO INSPECT 3D MOTOR & NEEDLE
                    </div>
                </div>

                {/* Right Editorial Copy - 100% Tattoo Machine Focused */}
                <div className="lg:col-span-5 flex flex-col items-start text-white">
                    <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-3 flex items-center gap-2">
                        <Sparkles size={13} />
                        CLINICAL HARDWARE ENGINEERING
                    </span>

                    <h2 className="font-sans text-4xl md:text-5xl font-extrabold tracking-wider uppercase text-white mb-4 leading-tight">
                        CUSTOM ROTARY <br />
                        <span className="italic font-serif font-light text-[#e58c38]">NEEDLE PRECISION</span>
                    </h2>
                    <div className="w-16 h-[3px] bg-gradient-to-r from-[#e58c38] to-[#d97706] mb-6 rounded-full shadow-[0_0_10px_#e58c38]" />

                    <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-6">
                        At Zeus Studio, we utilize custom-engineered rotary tattoo machines calibrated for zero needle wobble and ultra-smooth ink deposit. Operating at 120 micro-vibrations per second, our needles deposit pigment at exact dermal depth without skin trauma.
                    </p>

                    <div className="flex flex-col gap-3 w-full mb-8">
                        <div className="flex items-center gap-3 bg-[#121620] border border-white/10 p-3.5 rounded-xl">
                            <ShieldCheck size={18} className="text-[#e58c38] flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs font-extrabold text-white font-sans uppercase">SINGLE-USE STERILE CARTRIDGES</span>
                                <span className="text-[10px] text-gray-400 font-sans">Sealed EO gas sterilized needle pouches opened per client</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 bg-[#121620] border border-white/10 p-3.5 rounded-xl">
                            <Zap size={18} className="text-[#e58c38] flex-shrink-0" />
                            <div className="flex flex-col">
                                <span className="text-xs font-extrabold text-white font-sans uppercase">120 Hz PRECISION FREQUENCY</span>
                                <span className="text-[10px] text-gray-400 font-sans">Constant voltage motor for razor-sharp linework</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 w-full border-t border-white/10 pt-6">
                        <div>
                            <span className="font-serif text-3xl font-extrabold text-[#e58c38]">0.25mm</span>
                            <span className="block text-[10px] tracking-[0.2em] font-sans text-gray-400 uppercase font-bold mt-1">
                                MICRO NEEDLE GAUGE
                            </span>
                        </div>
                        <div>
                            <span className="font-serif text-3xl font-extrabold text-[#e58c38]">100%</span>
                            <span className="block text-[10px] tracking-[0.2em] font-sans text-gray-400 uppercase font-bold mt-1">
                                ORGANIC VEGAN INK
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
