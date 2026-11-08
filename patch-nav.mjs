import fs from 'fs';

// Update Navbar.tsx
let navCode = fs.readFileSync('src/components/Navbar.tsx', 'utf8');
navCode = navCode.replace(
  /className=\{`site-header \$\{isPastHero \? "header-past-hero" : "header-in-hero"\} \$\{isScrolled \? "scrolled" : "at-top"[\s\r\n]*\}`\}/,
  'className={`site-header ${isPastHero ? "header-past-hero scrolled" : "header-in-hero at-top"}`}'
);
fs.writeFileSync('src/components/Navbar.tsx', navCode, 'utf8');
console.log('Navbar updated!');

// Update globals.css to ensure .header-in-hero is 100% transparent and merged
let cssCode = fs.readFileSync('src/styles/globals.css', 'utf8');

// Replace the navbar background rules
const cssTargetRegex = /\/\* Unscrolled Navbar:[\s\S]*?\.site-header\.scrolled \{[\s\S]*?\}/;
const cssReplacement = `/* Unscrolled Navbar & Throughout Entire Hero Section: Seamlessly merged transparently */
.site-header,
.site-header.at-top,
.site-header.header-in-hero {
  background-color: transparent !important;
  background: transparent !important;
  backdrop-filter: none !important;
  -webkit-backdrop-filter: none !important;
  border-bottom: 1px solid transparent !important;
  box-shadow: none !important;
}

/* Past the Hero Section: Luxury Dark Frosted Glass */
.site-header.header-past-hero,
.site-header.scrolled:not(.header-in-hero) {
  background-color: #07090e !important;
  background: rgba(7, 9, 14, 0.94) !important;
  backdrop-filter: blur(20px) !important;
  -webkit-backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid rgba(255, 168, 82, 0.2) !important;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.9) !important;
}`;

cssCode = cssCode.replace(cssTargetRegex, cssReplacement);
fs.writeFileSync('src/styles/globals.css', cssCode, 'utf8');
console.log('globals.css updated!');

