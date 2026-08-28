import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ZEUS TATTOO STUDIO | Luxury Custom Tattoo Studio in Bangalore",
  description: "Experience luxury custom tattooing at Zeus Tattoo Studio in Koramangala, Bengaluru. Elite artists specializing in Realism, Fine Line, Black & Grey, and bespoke cover-ups in a sterile, hospital-grade environment.",
  keywords: [
    "Bangalore tattoo studio",
    "best tattoo artist in Bangalore",
    "tattoo studio in Koramangala",
    "custom tattoo Bangalore",
    "realism tattoo Bangalore",
    "fine line tattoo Bangalore",
    "black and grey tattoo Bangalore",
    "luxury tattoo studio Bengaluru",
    "tattoo studio near me"
  ],
  authors: [{ name: "Zeus Tattoo Studio" }],
  openGraph: {
    title: "ZEUS TATTOO STUDIO | Premium & Luxury Tattoo Studio",
    description: "Where skin becomes a canvas. Custom tattoos, photorealism, fine line, and sterile safety standards in Koramangala, Bengaluru.",
    url: "https://zeustattoo.com",
    siteName: "Zeus Tattoo Studio",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZEUS TATTOO STUDIO | Luxury Custom Tattoo Studio",
    description: "Custom tattoos, photorealism, fine line, and hospital-grade hygiene in Koramangala, Bengaluru.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TattooParlor",
  "name": "Zeus Tattoo Studio",
  "image": "https://zeustattoo.com/images/about_workspace.jpg",
  "@id": "https://zeustattoo.com",
  "url": "https://zeustattoo.com",
  "telephone": "+919876543210",
  "priceRange": "$$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "#42, 100 Feet Road, 5th Block, Koramangala",
    "addressLocality": "Bengaluru",
    "addressRegion": "Karnataka",
    "postalCode": "560095",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 12.9352,
    "longitude": 77.6245
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      "opens": "11:00",
      "closes": "20:30"
    }
  ],
  "sameAs": [
    "https://instagram.com/zeustattoo",
    "https://facebook.com/zeustattoo"
  ]
};

interface LayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html
      lang="en"
      className={`${cormorantGaramond.variable} ${inter.variable} antialiased scroll-smooth`}
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

