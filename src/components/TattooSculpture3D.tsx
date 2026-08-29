"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function TattooSculpture3D() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            45,
            container.clientWidth / container.clientHeight,
            0.1,
            1000
        );
        camera.position.z = 8;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Group for 3D objects
        const mainGroup = new THREE.Group();
        scene.add(mainGroup);

        // 1. Abstract Gold Obsidian Torus Knot (Sculpture)
        const geometry = new THREE.TorusKnotGeometry(1.4, 0.35, 128, 32, 2, 3);
        const material = new THREE.MeshStandardMaterial({
            color: 0xe58c38,
            metalness: 0.9,
            roughness: 0.2,
            wireframe: false,
        });
        const knotMesh = new THREE.Mesh(geometry, material);
        mainGroup.add(knotMesh);

        // Wireframe Outer Frame
        const wireMaterial = new THREE.MeshBasicMaterial({
            color: 0xe58c38,
            wireframe: true,
            transparent: true,
            opacity: 0.15,
        });
        const wireMesh = new THREE.Mesh(geometry, wireMaterial);
        wireMesh.scale.set(1.12, 1.12, 1.12);
        mainGroup.add(wireMesh);

        // 2. Swirling Particles Field (Tattoo Ink Orbs)
        const particleCount = 180;
        const particleGeo = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const scales = new Float32Array(particleCount);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
            scales[i] = Math.random();
        }

        particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const particleMat = new THREE.PointsMaterial({
            color: 0xe58c38,
            size: 0.08,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
        });
        const particles = new THREE.Points(particleGeo, particleMat);
        scene.add(particles);

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
        scene.add(ambientLight);

        const goldPointLight = new THREE.PointLight(0xe58c38, 3, 20);
        goldPointLight.position.set(5, 5, 5);
        scene.add(goldPointLight);

        const blueRimLight = new THREE.PointLight(0x3b82f6, 1.5, 20);
        blueRimLight.position.set(-5, -5, -2);
        scene.add(blueRimLight);

        // Interactive mouse tracking
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

        // Resize Handler
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

            // Rotation dynamics
            knotMesh.rotation.x = elapsedTime * 0.3;
            knotMesh.rotation.y = elapsedTime * 0.4;

            wireMesh.rotation.x = -elapsedTime * 0.2;
            wireMesh.rotation.y = -elapsedTime * 0.3;

            particles.rotation.y = elapsedTime * 0.08;

            // Mouse smooth interpolation
            targetX += (mouseX - targetX) * 0.05;
            targetY += (mouseY - targetY) * 0.05;

            mainGroup.rotation.y = targetX * 0.8;
            mainGroup.rotation.x = -targetY * 0.8;

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
            geometry.dispose();
            material.dispose();
            wireMaterial.dispose();
            particleGeo.dispose();
            particleMat.dispose();
        };
    }, []);

    return (
        <div className="relative w-full py-20 bg-[#0b0d12] border-b border-white/5 overflow-hidden flex items-center justify-center">
            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Interactive 3D Canvas Container */}
                <div className="lg:col-span-6 relative h-[380px] md:h-[480px] w-full flex items-center justify-center">
                    <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
                    {/* Subtle Ambient Circle Overlay */}
                    <div className="absolute inset-0 bg-radial from-[#e58c38]/10 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Right Editorial Copy */}
                <div className="lg:col-span-6 flex flex-col items-start text-white">
                    <span className="font-sans text-xs font-semibold tracking-[0.45em] text-[#e58c38] uppercase mb-3 block">
                        GENESIS & 3D ARTICULATION
                    </span>
                    <h2 className="font-sans text-4xl md:text-5xl font-extrabold tracking-wider uppercase text-white mb-4 leading-tight">
                        SACRED GEOMETRY <br />
                        <span className="italic font-serif font-light text-[#e58c38]">IN THREE DIMENSIONS</span>
                    </h2>
                    <div className="w-14 h-[3px] bg-[#e58c38] mb-6 rounded-full" />

                    <p className="text-gray-300 font-sans text-xs md:text-sm leading-relaxed tracking-wide mb-6">
                        Every tattoo composed at Zeus Studio is designed as a three-dimensional sculpture on living tissue. We map muscle curvature, skin elasticity, and skeletal motion to create artwork that moves organically with your body.
                    </p>

                    <div className="grid grid-cols-2 gap-6 w-full border-t border-white/10 pt-6">
                        <div>
                            <span className="font-serif text-3xl font-extrabold text-[#e58c38]">3D</span>
                            <span className="block text-[10px] tracking-[0.2em] font-sans text-gray-400 uppercase font-semibold mt-1">
                                ANATOMICAL MAPPING
                            </span>
                        </div>
                        <div>
                            <span className="font-serif text-3xl font-extrabold text-[#e58c38]">100%</span>
                            <span className="block text-[10px] tracking-[0.2em] font-sans text-gray-400 uppercase font-semibold mt-1">
                                CUSTOM COMPOSITION
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
