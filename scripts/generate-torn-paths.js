// Generate authentic jagged ripped-paper SVG paths filling from bottom (y=32) up to jagged rip line
function generateTornPaperPath(seed) {
  let x = 0;
  const width = 1440;
  let path = "M0,32 L0,18 ";
  
  // Seeded pseudo-random
  let s = seed;
  function rand() {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  }

  let currentY = 16;
  const points = [];
  
  while (x < width) {
    const stepX = 4 + rand() * 8; // Small 4-12px horizontal steps for dense jaggedness
    x = Math.min(width, x + stepX);
    
    // Wave envelope combined with sharp micro-jitter
    const wave = Math.sin(x * 0.008 + seed) * 3 + Math.sin(x * 0.02 + seed * 2) * 2;
    const jitter = (rand() - 0.5) * 6;
    const microTear = rand() > 0.88 ? (rand() > 0.5 ? 4 : -4) : 0;
    
    currentY = 14 + wave + jitter + microTear;
    currentY = Math.max(4, Math.min(26, currentY));
    
    points.push(`L${x.toFixed(1)},${currentY.toFixed(1)}`);
  }

  path += points.join(" ") + ` L${width},32 Z`;
  return path;
}

console.log("BOTTOM_PATH_1:", generateTornPaperPath(42));
console.log("BOTTOM_PATH_2:", generateTornPaperPath(108));
console.log("BOTTOM_PATH_3:", generateTornPaperPath(256));
