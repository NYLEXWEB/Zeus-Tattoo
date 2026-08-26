"use client";

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Artists", href: "#artists" },
    { name: "Styles", href: "#styles" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "Aftercare", href: "#aftercare" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer id="contact" className="bg-brand-black border-t border-brand-off-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Footer Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-brand-off-white/5">
          
          {/* Logo & Description */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 flex items-center justify-center border border-brand-off-white/40">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M12 2L4 10H20L12 2Z" />
                  <path d="M12 22L4 14H20L12 22Z" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" />
                </svg>
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-lg tracking-[0.2em] font-semibold text-brand-off-white uppercase">
                  ZEUS
                </span>
                <span className="text-[8px] tracking-[0.4em] text-brand-off-white/60 font-sans uppercase mt-0.5">
                  Tattoo Studio
                </span>
              </div>
            </div>

            <p className="text-xs text-brand-off-white/60 font-sans leading-relaxed mb-8 max-w-sm">
              We turn your personal stories and design visions into timeless, sterile, and premium custom skin art. Visit our editorial spaces and connect with our elite artists.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-brand-off-white/10 flex items-center justify-center text-brand-off-white/60 hover:text-brand-warm-cream hover:border-brand-warm-cream transition-colors duration-300"
                aria-label="Instagram"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-brand-off-white/10 flex items-center justify-center text-brand-off-white/60 hover:text-brand-warm-cream hover:border-brand-warm-cream transition-colors duration-300"
                aria-label="Facebook"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-brand-off-white/10 flex items-center justify-center text-brand-off-white/60 hover:text-brand-warm-cream hover:border-brand-warm-cream transition-colors duration-300"
                aria-label="Pinterest"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10S2 17.523 2 12 6.478 2 12 2zm0 3c-3.86 0-7 3.14-7 7 0 3 1.9 5.57 4.54 6.55-.07-.57-.14-1.44.03-2.06l.76-3.23s-.2-.39-.2-.97c0-.91.53-1.6 1.19-1.6.56 0 .83.42.83.93 0 .56-.36 1.41-.54 2.2-.15.65.33 1.19.97 1.19 1.16 0 2.05-1.23 2.05-3 0-1.57-1.13-2.67-2.74-2.67-1.87 0-2.96 1.4-2.96 2.85 0 .57.22 1.18.49 1.5.05.07.06.12.04.19l-.19.76c-.03.13-.1.15-.23.09-.9-.42-1.47-1.73-1.47-2.79 0-2.27 1.65-4.36 4.76-4.36 2.5 0 4.44 1.78 4.44 4.16 0 2.49-1.57 4.49-3.75 4.49-.73 0-1.42-.38-1.65-.83l-.45 1.71c-.16.62-.6 1.4-1.9 1.87.65.2 1.34.31 2.06.31 3.86 0 7-3.14 7-7 0-3.86-3.14-7-7-7z"></path>
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full border border-brand-off-white/10 flex items-center justify-center text-brand-off-white/60 hover:text-brand-warm-cream hover:border-brand-warm-cream transition-colors duration-300"
                aria-label="YouTube"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-sans text-[10px] tracking-[0.2em] font-semibold text-brand-off-white uppercase mb-6">
              Quick Links
            </h4>
            <div className="grid grid-cols-2 gap-y-3 gap-x-4">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-sans text-xs text-brand-off-white/60 hover:text-brand-warm-cream transition-colors duration-300 uppercase tracking-widest"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 flex flex-col">
            <h4 className="font-sans text-[10px] tracking-[0.2em] font-semibold text-brand-off-white uppercase mb-6">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4 text-xs font-sans text-brand-off-white/60">
              <div className="flex flex-col">
                <span className="text-[10px] tracking-widest uppercase text-brand-off-white/40 mb-1">Phone</span>
                <span className="text-brand-off-white hover:text-brand-warm-cream transition-colors font-medium">
                  +1 (555) 839-4290
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-widest uppercase text-brand-off-white/40 mb-1">Email</span>
                <a href="mailto:info@zeustattoo.com" className="text-brand-off-white hover:text-brand-warm-cream transition-colors font-medium">
                  info@zeustattoo.com
                </a>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-widest uppercase text-brand-off-white/40 mb-1">Location</span>
                <span className="text-brand-off-white font-medium leading-relaxed">
                  104 Luxury Lane, Suite A<br />
                  Beverly Hills, CA 90210
                </span>
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="lg:col-span-2 flex flex-col">
            <h4 className="font-sans text-[10px] tracking-[0.2em] font-semibold text-brand-off-white uppercase mb-6">
              Opening Hours
            </h4>
            <div className="flex flex-col gap-4 text-xs font-sans text-brand-off-white/60">
              <div className="flex flex-col border-b border-brand-off-white/5 pb-2">
                <span className="text-[10px] tracking-widest uppercase text-brand-off-white/40 mb-1">Mon – Sat</span>
                <span className="text-brand-off-white font-medium">10:00 AM – 8:00 PM</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] tracking-widest uppercase text-brand-off-white/40 mb-1">Sunday</span>
                <span className="text-brand-off-white font-medium">11:00 AM – 6:00 PM</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-10 text-[10px] font-sans text-brand-off-white/40 tracking-wider uppercase">
          <span>
            © 2026 ZEUS TATTOO STUDIO. ALL RIGHTS RESERVED.
          </span>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-brand-warm-cream transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-brand-warm-cream transition-colors">Terms & Conditions</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
