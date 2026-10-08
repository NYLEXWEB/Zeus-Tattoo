"use client";

import React from "react";
import ImmersiveScrollGallery, { GalleryItemData } from "./ImmersiveScrollGallery";

export const galleryItems: GalleryItemData[] = [
  {
    id: "gallery-1",
    image: "/images/IMG_20260829_212716_292.jpg",
    title: "HYPER-REALISM PORTRAIT",
    category: "Realism & Portraiture",
    artist: "Ethan Blake",
    year: "2026",
    details: "High-contrast portraiture rendered with multi-needle micro-shading and clinical precision on forearm.",
  },
  {
    id: "gallery-2",
    image: "/images/IMG_20260829_212727_311.jpg",
    title: "BLACK & GREY SKULL & ROSES",
    category: "Dark Surrealism",
    artist: "Arjun Verma",
    year: "2026",
    details: "Rich obsidian ink wash with dynamic gradient contrast following anatomical muscular flow.",
  },
  {
    id: "gallery-3",
    image: "/images/IMG_20260829_212734_480.jpg",
    title: "SACRED MANDALA GEOMETRY",
    category: "Sacred Geometry",
    artist: "Sahana Rao",
    year: "2026",
    details: "Intricate stipple dotwork and mathematically aligned concentric geometries creating hypnotic balance.",
  },
  {
    id: "gallery-4",
    image: "/images/IMG_20260829_212754_172.jpg",
    title: "SINGLE NEEDLE FLORAL FLORA",
    category: "Micro Fine Line",
    artist: "Meera Nair",
    year: "2026",
    details: "Whisper-thin single-needle execution with zero pigment bleed and razor-sharp healed definition.",
  },
  {
    id: "gallery-5",
    image: "/images/IMG_20260829_212801_249.jpg",
    title: "NEO-TRADITIONAL DRAGON",
    category: "Neo-Traditional",
    artist: "Ethan Blake",
    year: "2026",
    details: "Bold contour linework combined with deep obsidian gradients and mythic Japanese influence.",
  },
  {
    id: "gallery-6",
    image: "/images/IMG_20260829_212809_269.jpg",
    title: "MOUNTAIN LINE SHADING",
    category: "Minimalist Landscapes",
    artist: "Arjun Verma",
    year: "2026",
    details: "Textured stippling and topographical contour lines celebrating natural alpine wilderness.",
  },
  {
    id: "gallery-7",
    image: "/images/about_story.jpg",
    title: "FULL SLEEVE OBSIDIAN WASH",
    category: "Blackwork Sleeves",
    artist: "Arjun Verma",
    year: "2026",
    details: "Seamless shoulder-to-wrist composition designed to flow seamlessly with bone and muscle articulation.",
  },
  {
    id: "gallery-8",
    image: "/images/IMG_20260829_212719_574.jpg",
    title: "FINE LINE SPINE BOTANICAL",
    category: "Fine Line Botanical",
    artist: "Meera Nair",
    year: "2026",
    details: "Delicate vertical spine illustration designed to harmonize with spinal posture and movement.",
  },
];

export default function Portfolio() {
  return (
    <ImmersiveScrollGallery
      id="gallery"
      type="gallery"
      title="TATTOO GALLERY"
      subtitle="PERMANENT COLLECTIBLES"
      items={galleryItems}
      topDividerFill="#181A22"
      bottomDividerFill="#FFA028"
    />
  );
}
