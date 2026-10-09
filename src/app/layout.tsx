import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZEUS TATTOO • Premium Tattoos, Piercings & Microblading | Kottayam, Kerala",
  description:
    "Experience world-class body art, custom tattoos, clinical-grade body piercings, and semi-permanent eyebrow microblading at Zeus Tattoo in Eerayil Kadavu, Kottayam. Safe, sterile, and bespoke skin illustrations.",
  keywords: [
    "Zeus Tattoo Kottayam",
    "Best Tattoo Studio Kottayam",
    "Microblading Kottayam",
    "Piercing Studio Kottayam",
    "Custom Tattoo Kerala",
    "Eerayil Kadavu",
    "Tattoo Shop Kottayam",
  ],
  robots: "index, follow",
  openGraph: {
    title: "ZEUS TATTOO • Custom Tattoo & Body Artistry Studio",
    description:
      "Premium custom tattoos, clinical piercings, and microblading near Manorama Junction, Eerayil Kadavu, Kottayam.",
    url: "https://www.instagram.com/zeustattooin/",
    siteName: "Zeus Tattoo Kottayam",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "ZEUS TATTOO • Custom Tattoo & Body Artistry Studio",
    description:
      "Premium custom tattoos, clinical piercings, and microblading near Manorama Junction, Eerayil Kadavu, Kottayam.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  "name": "Zeus Tattoo Kottayam",
  "image": "https://zeus-tattoo.vercel.app/assets/about-us.jpg",
  "@id": "https://zeus-tattoo.vercel.app/",
  "url": "https://zeus-tattoo.vercel.app/",
  "telephone": "+91 94951 86001",
  "priceRange": "₹₹",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1",
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress":
      "2nd Floor, Roji's Arch, Manorama Junction, Eerayil Kadavu Road",
    "addressLocality": "Kottayam",
    "addressRegion": "Kerala",
    "postalCode": "686001",
    "addressCountry": "IN",
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 9.5878,
    "longitude": 76.5244,
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      "opens": "10:30",
      "closes": "20:00",
    },
  ],
  "sameAs": ["https://www.instagram.com/zeustattooin/"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Offside&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
