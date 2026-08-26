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
  title: "ZEUS TATTOO STUDIO | Premium & Luxury Tattoo Studio",
  description: "At Zeus Tattoo Studio, we turn your ideas into timeless art. Our skilled artists, premium hygiene standards, and creative approach make every tattoo a unique experience.",
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
      <body className="bg-brand-black text-brand-off-white font-sans">
        {children}
      </body>
    </html>
  );
}
