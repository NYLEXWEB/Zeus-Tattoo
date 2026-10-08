import type { Metadata } from "next";
import { Oswald, Inter, Caveat, Playfair_Display, Cinzel } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const caveat = Caveat({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Zeus Tattoo Kottayam | Tattoo & Piercing Studio in Kottayam, Kerala",
  description: "Zeus Tattoo Studio Kottayam (5.0★ 210+ Google reviews). Welcoming tattoo & piercing shop featuring professional artists and a clean, comfortable studio. Specializing in custom tattoos, fine line work, minimalist designs, and nose, helix, bugadi & ear piercings at Manorama Junction, Kottayam.",
  keywords: [
    "Zeus Tattoo Kottayam",
    "tattoo studio in Kottayam",
    "piercing shop in Kottayam",
    "best tattoo studio Kottayam",
    "tattoo artist Kottayam Kerala",
    "ear piercing Kottayam",
    "nose piercing Kottayam",
    "bugadi piercing Kottayam",
    "helix piercing Kottayam",
    "custom tattoo Kottayam",
    "fine line tattoo Kottayam",
    "minimalist tattoo Kottayam",
    "Manorama Junction tattoo studio",
    "tattoo shop near me Kottayam"
  ],
  authors: [{ name: "Zeus Tattoo Studio Kottayam" }],
  openGraph: {
    title: "Zeus Tattoo Kottayam | 5.0★ Tattoo & Piercing Studio",
    description: "Welcoming tattoo & piercing shop in Kottayam, Kerala featuring professional artists, clean hospital-grade studio, custom tattoos, fine line, minimalist art, and piercings.",
    url: "https://zeustattoo.in/",
    siteName: "Zeus Tattoo Kottayam",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zeus Tattoo Kottayam | 5.0★ Tattoo & Piercing Studio",
    description: "Top-rated tattoo and piercing shop in Kottayam, Kerala (5.0★ 210+ Google reviews). Custom tattoos, fine line, minimalist designs, and professional piercings.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  "name": "Zeus Tattoo Kottayam",
  "image": "https://zeustattoo.in/images/about_story.jpg",
  "@id": "https://zeustattoo.in",
  "url": "https://zeustattoo.in/",
  "telephone": "087141 31748",
  "priceRange": "₹₹",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "210",
    "bestRating": "5",
    "worstRating": "1"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2nd floor, Manorama Junction, roji's arch, Erayilkadavu Rd, Eerayil Kadavu",
    "addressLocality": "Kottayam",
    "addressRegion": "Kerala",
    "postalCode": "686001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 9.5878,
    "longitude": 76.5244
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "10:00",
      "closes": "20:00"
    }
  ],
  "sameAs": [
    "https://zeustattoo.in/",
    "https://instagram.com/zeustattoo"
  ]
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${inter.variable} ${caveat.variable} ${playfair.variable} ${cinzel.variable} antialiased scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-brand-black text-brand-off-white font-sans selection:bg-brand-warm-cream selection:text-brand-black">
        {children}
      </body>
    </html>
  );
}

