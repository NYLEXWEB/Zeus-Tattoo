"use client";

import React, { useState } from "react";

const portfolioItems = [
  {
    id: 1,
    title: "Lord Ganesha Spiritual Portrait",
    category: "tattoos",
    dimensions: "1080 x 1350 px (Portrait)",
    description:
      "Detailed black & grey ornamental depiction of Lord Ganesha with a brush-stroke Om symbol.",
    image: "/assets/tattoo-ganesha.jpg",
    aspectRatio: "4 / 5",
  },
  {
    id: 2,
    title: "Jesus Christ Realism Portrait",
    category: "tattoos",
    dimensions: "1080 x 1350 px (Portrait)",
    description:
      "Masterful black & grey realism portrait of Jesus Christ with a crown of thorns.",
    image: "/assets/tattoo-jesus.png",
    aspectRatio: "4 / 5",
  },
  {
    id: 3,
    title: "Watercolor Paper Boat",
    category: "tattoos",
    dimensions: "1080 x 1350 px (Portrait)",
    description:
      "Vibrant custom watercolor illustration of a paper boat sailing on sunlit waves.",
    image: "/assets/tattoo-boat.png",
    aspectRatio: "4 / 5",
  },
  {
    id: 4,
    title: "Fine-line Floral & Butterfly",
    category: "tattoos",
    dimensions: "1080 x 1350 px (Portrait)",
    description:
      "Elegant, delicate black-ink line art of wildflowers with a butterfly.",
    image: "/assets/tattoo-flowers.png",
    aspectRatio: "4 / 5",
  },
  {
    id: 5,
    title: "Minimalist Roman Numerals",
    category: "tattoos",
    dimensions: "1080 x 1350 px (Portrait)",
    description:
      "Sleek and clean vertical Roman numeral date layout on the inner forearm.",
    image: "/assets/tattoo-date.png",
    aspectRatio: "4 / 5",
  },
  {
    id: 6,
    title: "Minimal Helix & Lobe Curation",
    category: "piercings",
    dimensions: "1080 x 1620 px (Portrait)",
    description: "Delicate titanium cartilage hoop paired with clean lobe rings.",
    image: "/assets/piercing-1.jpg",
    aspectRatio: "2 / 3",
  },
  {
    id: 7,
    title: "Emerald & Gold Ear Curation",
    category: "piercings",
    dimensions: "1080 x 1620 px (Portrait)",
    description:
      "Sleek gold helix rings paired with custom green emerald studs.",
    image: "/assets/piercing-2.jpg",
    aspectRatio: "2 / 3",
  },
  {
    id: 8,
    title: "Marquise Cluster & Crescent Moon",
    category: "piercings",
    dimensions: "1080 x 1440 px (Portrait)",
    description:
      "Refined cartilage cluster curation with a custom crescent moon lobe stud.",
    image: "/assets/piercing-3.jpg",
    aspectRatio: "3 / 4",
  },
  {
    id: 9,
    title: "Minimalist Cartilage Articulation",
    category: "piercings",
    dimensions: "1080 x 1440 px (Portrait)",
    description:
      "Simple, sterile steel cartilage stud paired with a delicate hoop.",
    image: "/assets/piercing-4.jpg",
    aspectRatio: "3 / 4",
  },
  {
    id: 10,
    title: "Crystal Helix & Heart Lobe Curation",
    category: "piercings",
    dimensions: "1080 x 1620 px (Portrait)",
    description:
      "Brilliant crystal line helix bar paired with a polished gold heart lobe stud.",
    image: "/assets/piercing-5.jpg",
    aspectRatio: "2 / 3",
  },
];

export default function Gallery() {
  const [filter, setFilter] = useState("all");

  const filteredItems =
    filter === "all"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="gallery-section">
      <div className="container">
        <div className="gallery-header-wrapper">
          <div className="gallery-title-block">
            <span className="gallery-subtitle">Our Artistry</span>
            <h2 className="gallery-main-title">
              THE PORTFOLIO <br />
              <span className="serif-italic-peach">OF PERMANENT</span> <br />
              COLLECTIVES
            </h2>
          </div>
          <div className="filter-bar-right">
            <button
              onClick={() => setFilter("all")}
              className={`filter-btn ${filter === "all" ? "active" : ""}`}
            >
              All Portfolio
            </button>
            <button
              onClick={() => setFilter("tattoos")}
              className={`filter-btn ${filter === "tattoos" ? "active" : ""}`}
            >
              Tattoos
            </button>
            <button
              onClick={() => setFilter("piercings")}
              className={`filter-btn ${filter === "piercings" ? "active" : ""}`}
            >
              Piercings
            </button>
          </div>
        </div>

        <div className="masonry-grid-container">
          {filteredItems.map((item) => {
            const paddingBottom =
              item.aspectRatio === "4 / 5"
                ? "125%"
                : item.aspectRatio === "2 / 3"
                ? "150%"
                : item.aspectRatio === "3 / 4"
                ? "133.33%"
                : item.aspectRatio === "1 / 1"
                ? "100%"
                : "125%";

            return (
              <div
                key={item.id}
                style={{ paddingBottom }}
                className="masonry-card-wrapper"
              >
                <div className="motion-card">
                  {item.image ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={item.image}
                      alt={item.title}
                      className="gallery-grid-img"
                    />
                  ) : (
                    <div className="gallery-grid-placeholder">
                      <div className="lightning-bolt-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="28"
                          height="28"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                        </svg>
                      </div>
                      <span className="placeholder-text">Image Slot</span>
                      <span className="placeholder-upload-hint">
                        Ready for Upload
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .gallery-section {
          background-color: var(--bg-storm-dark);
          padding: 8rem 0 6rem;
          position: relative;
        }
        .gallery-header-wrapper {
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 4.5rem;
          display: flex;
        }
        @media (min-width: 992px) {
          .gallery-header-wrapper {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }
        .gallery-title-block {
          max-width: 600px;
        }
        .gallery-subtitle {
          font-family: var(--font-body);
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-peach);
          font-size: 0.8rem;
          font-weight: 600;
          display: block;
        }
        .gallery-main-title {
          font-family: var(--font-headings);
          color: var(--text-main);
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-top: 0.75rem;
          font-size: 2.2rem;
          font-weight: 800;
          line-height: 1.1;
        }
        @media (min-width: 768px) {
          .gallery-main-title {
            font-size: 3.2rem;
          }
        }
        .serif-italic-peach {
          font-family: var(--font-headings);
          color: var(--accent-peach);
          text-transform: uppercase;
          font-style: italic;
          font-weight: 400;
        }
        .filter-bar-right {
          flex-wrap: wrap;
          gap: 0.6rem;
          display: flex;
        }
        .filter-btn {
          color: var(--text-muted);
          font-family: var(--font-body);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          cursor: pointer;
          transition: var(--transition-smooth);
          background: transparent;
          border: 1px solid #ffa85226;
          border-radius: 100px;
          padding: 0.6rem 1.4rem;
          font-size: 0.75rem;
          font-weight: 600;
        }
        .filter-btn:hover {
          color: var(--text-main);
          background: #ffa85208;
          border-color: #ffa85266;
        }
        .filter-btn.active {
          color: var(--text-dark);
          background: var(--accent-peach);
          border-color: var(--accent-peach);
          box-shadow: 0 4px 15px #ffa85240;
        }
        .masonry-grid-container {
          column-count: 1;
          z-index: 10;
          column-gap: 1.5rem;
          width: 100%;
          position: relative;
        }
        @media (min-width: 768px) {
          .masonry-grid-container {
            column-count: 2;
          }
        }
        @media (min-width: 992px) {
          .masonry-grid-container {
            column-count: 3;
          }
        }
        .masonry-card-wrapper {
          break-inside: avoid;
          width: 100%;
          height: 0;
          margin-bottom: 1.5rem;
          display: block;
          position: relative;
        }
        .motion-card {
          background: var(--bg-storm-medium);
          cursor: default;
          border: 1px solid #ffa8520f;
          border-radius: 16px;
          width: 100%;
          height: 100%;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            filter 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: block;
          position: absolute;
          inset: 0;
          overflow: hidden;
        }
        .masonry-grid-container:hover .motion-card {
          opacity: 0.55;
          filter: blur(1.5px) grayscale(15%);
        }
        .masonry-grid-container .motion-card:hover {
          opacity: 1;
          filter: blur(0px) grayscale(0%);
          z-index: 20;
          border-color: #ffa85259;
          transform: scale(1.025) translateY(-3px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.6), 0 0 20px #ffa8521a;
        }
        .gallery-grid-img {
          object-fit: cover;
          border-radius: 16px;
          width: 100%;
          height: 100%;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          position: absolute;
          inset: 0;
        }
        .motion-card:hover .gallery-grid-img {
          transform: scale(1.03);
        }
        .gallery-grid-placeholder {
          width: 100%;
          height: 100%;
          color: var(--text-muted);
          transition: var(--transition-smooth);
          background: linear-gradient(135deg, #151d2d99 0%, #0d111be6 100%);
          border: 1px dashed #ffa85226;
          border-radius: 16px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          display: flex;
          position: absolute;
          inset: 0;
        }
        .lightning-bolt-icon {
          color: #ffa85226;
          transition: var(--transition-smooth);
          margin-bottom: 0.75rem;
        }
        .motion-card:hover .lightning-bolt-icon {
          color: var(--accent-peach);
          filter: drop-shadow(0 0 8px #ffa85266);
          transform: scale(1.1);
        }
        .placeholder-text {
          font-family: var(--font-body);
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-main);
          margin-bottom: 0.4rem;
          font-size: 0.8rem;
          font-weight: 700;
        }
        .placeholder-upload-hint {
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: var(--accent-peach);
          background: #ffa8520a;
          border: 1px solid #ffa8521a;
          border-radius: 100px;
          align-items: center;
          gap: 0.4rem;
          padding: 0.35rem 0.85rem;
          font-size: 0.65rem;
          font-weight: 600;
          display: flex;
        }
      `}</style>
    </section>
  );
}
