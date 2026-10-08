"use client";

import React from "react";
import ImmersiveScrollGallery, { ArtistItemData } from "./ImmersiveScrollGallery";

interface ArtistsProps {
  onOpenBooking?: () => void;
}

export const residentArtists: ArtistItemData[] = [
  {
    id: "artist-1",
    image: "/images/artist_arjun.jpg",
    name: "ETHAN BLAKE",
    role: "FOUNDER & MASTER ARTIST",
    styles: "Realism • High-Contrast Portraiture • Mythology",
    experience: "12+ Years Experience • 15 Design Awards",
    description:
      "Internationally acclaimed realism specialist dedicated to rendering high-contrast portraiture, mythical iconography, and anatomically precise wildlife imagery chiseled with clinical precision.",
  },
  {
    id: "artist-2",
    image: "/images/artist_meera.jpg",
    name: "MEERA NAIR",
    role: "FINE LINE SPECIALIST",
    styles: "Single-Needle Micro • Botanical • Minimalist Geometry",
    experience: "8+ Years Experience • Single-Needle Pioneer",
    description:
      "Master of delicate single-needle micro-realism, fine botanical illustrations, and geometric minimalism. Meera crafts whisper-thin linework engineered for zero pigment bleed and lifelong healed clarity.",
  },
  {
    id: "artist-3",
    image: "/images/artist_rahul.jpg",
    name: "ARJUN VERMA",
    role: "BLACK & GREY SPECIALIST",
    styles: "Full Sleeves • Obsidian Wash • Dark Surrealism",
    experience: "10+ Years Experience • Master of Shading",
    description:
      "Specializing in large-scale multi-session sleeve compositions. Arjun combines dark surrealism, architectural flow, and obsidian gradient wash transitions that dynamically follow joint movement.",
  },
  {
    id: "artist-4",
    image: "/images/artist_sahana.jpg",
    name: "SAHANA RAO",
    role: "GEOMETRY & COVER-UPS",
    styles: "Sacred Mandalas • Stipple Dotwork • Restorations",
    experience: "9+ Years Experience • Stipple Dotwork Master",
    description:
      "Renowned for complex sacred geometry mandalas and transformative cover-ups. Sahana utilizes multi-layered stippling and dotwork to turn old tattoos into symmetrical masterpieces.",
  },
];

export default function Artists({ onOpenBooking }: ArtistsProps) {
  return (
    <ImmersiveScrollGallery
      id="artists"
      type="artists"
      title="MEET OUR ARTISTS"
      subtitle="MASTERS OF THE CRAFT"
      items={residentArtists}
      onOpenBooking={onOpenBooking}
      topDividerFill="#FFFFFF"
      bottomDividerFill="#181A22"
    />
  );
}
