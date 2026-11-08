"use client";

import React, { useState } from "react";

export interface StudioBranch {
  id: string;
  name: string;
  locationName: string;
  tag: string;
  badge: string;
  addressLine1: string;
  addressLine2: string;
  hours: string;
  phone: string;
  directionsUrl: string;
  mapEmbedUrl: string;
}

export const studioBranches: StudioBranch[] = [
  {
    id: "kottayam",
    name: "Zeus Tattoo Studio",
    locationName: "Kottayam Studio",
    tag: "Flagship Sanctuary",
    badge: "Flagship",
    addressLine1: "2nd Floor, Roji's Arch, Manorama Junction,",
    addressLine2: "Eerayil Kadavu, Kottayam, Kerala 686001",
    hours: "Open Daily: 10:00 AM – 8:00 PM",
    phone: "+91 94951 86001",
    directionsUrl:
      "https://www.google.com/maps/search/?api=1&query=Zeus+Tattoo+Studio+Kottayam",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Zeus%20Tattoo%20Studio%20Kottayam&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
  {
    id: "kakkanad",
    name: "Zeus Tattoo Studio",
    locationName: "Kakkanad Studio, Ernakulam",
    tag: "New Branch",
    badge: "New Location",
    addressLine1: "Opposite SFS, Kakkanad,",
    addressLine2: "Ernakulam, Kochi, Kerala",
    hours: "Open Daily: 10:00 AM – 8:00 PM",
    phone: "+91 94951 86001",
    directionsUrl: "https://maps.app.goo.gl/uYpThd8dAbcgDZSZ9?g_st=awb",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Opposite%20SFS%2C%20Kakkanad%2C%20Ernakulam%2C%20Kerala&t=&z=16&ie=UTF8&iwloc=&output=embed",
  },
];

export default function Booking() {
  const [activeBranchIndex, setActiveBranchIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    location: "kottayam",
    service: "tattoo",
    artist: "any",
    description: "",
  });

  const currentBranch = studioBranches[activeBranchIndex];

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setFormData({
        name: "",
        contact: "",
        email: "",
        location: "kottayam",
        service: "tattoo",
        artist: "any",
        description: "",
      });
    }, 1500);
  };

  return (
    <section
      id="booking"
      className="booking-section"
      suppressHydrationWarning={true}
    >
      <div className="container booking-grid">
        <div className="booking-info">
          <span className="section-subtitle">Reserve a Session</span>
          <h2 className="booking-title">Book a Consultation</h2>
          <p className="booking-desc">
            Consultations are always complimentary. Submit your concept idea,
            select your preferred artist, and our team will get in touch with you
            via WhatsApp or Email to coordinate reference designs and session
            dates.
          </p>

          <div className="process-timeline">
            <div className="process-step">
              <div className="step-num">01</div>
              <div className="step-content">
                <h4 className="step-title">Submit Concept</h4>
                <p className="step-desc">
                  Fill in the booking form with your design ideas, placement, and
                  dimensions.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-num">02</div>
              <div className="step-content">
                <h4 className="step-title">Direct Consultation</h4>
                <p className="step-desc">
                  An artist will connect to refine references and prepare
                  preliminary digital sketches.
                </p>
              </div>
            </div>

            <div className="process-step">
              <div className="step-num">03</div>
              <div className="step-content">
                <h4 className="step-title">The Session</h4>
                <p className="step-desc">
                  Visit our Kottayam or Kakkanad (Ernakulam) studio for a precision-sterile and
                  comfortable session.
                </p>
              </div>
            </div>
          </div>

          <div className="direct-dm-note">
            <div className="dm-icon">⚡</div>
            <div className="dm-text">
              <p style={{ fontWeight: 700, color: "var(--accent-peach)" }}>
                Want a Faster Response?
              </p>
              <p style={{ fontSize: "0.85rem", opacity: 0.85 }}>
                Send us a direct message on Instagram{" "}
                <a
                  href="https://www.instagram.com/zeustattooin/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "underline", fontWeight: 600 }}
                >
                  @zeustattooin
                </a>{" "}
                with your reference images for a quick review!
              </p>
            </div>
          </div>
        </div>

        <div className="booking-form-wrapper">
          <div className="card-glass border-pulse form-card">
            {submitted ? (
              <div className="form-success-state">
                <div className="success-icon-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="spark-accent"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="success-heading">Consultation Request Sent</h3>
                <p className="success-message">
                  Thank you for reaching out to Zeus Tattoo. An artist will
                  review your details and contact you via WhatsApp or Email
                  within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="btn-secondary"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="booking-form">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Adarsh Nair"
                    className="form-input"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="contact" className="form-label">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      placeholder="e.g. +91 98765 43210"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. adarsh@example.com"
                      className="form-input"
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">
                      Desired Service
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="tattoo">Custom Tattoo</option>
                      <option value="piercing">Precision Body Piercing</option>
                      <option value="microblading">Eyebrow Microblading</option>
                      <option value="coverup">
                        Tattoo Restoration / Cover-up
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="artist" className="form-label">
                      Preferred Artist
                    </label>
                    <select
                      id="artist"
                      name="artist"
                      value={formData.artist}
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="any">No Preference (First Available)</option>
                      <option value="shaibin">Shaibin AS (Founder &amp; Piercing)</option>
                      <option value="jins">Jins George (Senior Tattoo Artist)</option>
                      <option value="jyothika">Jyothika (Piercing Artist)</option>
                      <option value="bibin">Bibin George (Tattoo Artist)</option>
                      <option value="shahalya">Shahalya Sherin (Tattoo Artist)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="location" className="form-label">
                    Preferred Studio Branch
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="kottayam">Zeus Tattoo Kottayam (Flagship Sanctuary)</option>
                    <option value="kakkanad">Zeus Tattoo Kakkanad, Ernakulam (Opposite SFS - New Branch)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="description" className="form-label">
                    Concept Description &amp; Placement
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your design, placement on body, approximate size, and style preferences..."
                    rows={4}
                    className="form-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary form-submit-btn"
                >
                  {loading
                    ? "Submitting Request..."
                    : "Send Consultation Request"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Studio Branches & Map Section - Architectural Atelier Edition */}
      <div className="container booking-map-section">
        <div className="atelier-branches-wrap">
          {/* Minimal Editorial Header */}
          <div className="atelier-header">
            <div className="atelier-title-group">
              <span className="atelier-kicker">PHYSICAL SANCTUARIES</span>
              <h3 className="atelier-heading">OUR STUDIO BRANCHES</h3>
            </div>

            <div className="atelier-branch-nav" role="tablist" aria-label="Studio Branches">
              {studioBranches.map((branch, idx) => {
                const isActive = activeBranchIndex === idx;
                return (
                  <button
                    key={branch.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveBranchIndex(idx)}
                    className={`atelier-nav-item ${isActive ? "is-selected" : ""}`}
                  >
                    <span className="atelier-nav-num">0{idx + 1}</span>
                    <span className="atelier-nav-city">
                      {branch.id === "kottayam" ? "KOTTAYAM" : "KAKKANAD"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Architectural Cards Grid */}
          <div className="atelier-cards-grid">
            {studioBranches.map((branch, idx) => {
              const isSelected = activeBranchIndex === idx;
              return (
                <div
                  key={branch.id}
                  onClick={() => setActiveBranchIndex(idx)}
                  className={`atelier-card ${isSelected ? "is-active-branch" : ""}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveBranchIndex(idx);
                    }
                  }}
                >
                  <div className="atelier-card-header">
                    <span className="atelier-card-num">0{idx + 1}</span>
                    <span className="atelier-card-region">
                      {branch.id === "kottayam" ? "CENTRAL KERALA" : "KOCHI METRO"}
                    </span>
                  </div>

                  <h4 className="atelier-card-title">{branch.locationName}</h4>

                  <div className="atelier-card-specs">
                    <div className="atelier-spec-row">
                      <span className="atelier-spec-title">ADDRESS</span>
                      <p className="atelier-spec-text">
                        {branch.addressLine1}
                        <br />
                        {branch.addressLine2}
                      </p>
                    </div>

                    <div className="atelier-spec-row">
                      <span className="atelier-spec-title">HOURS</span>
                      <p className="atelier-spec-text">{branch.hours}</p>
                    </div>

                    <div className="atelier-spec-row">
                      <span className="atelier-spec-title">DIRECT LINE</span>
                      <p className="atelier-spec-text">
                        <a href={`tel:${branch.phone.replace(/\s+/g, "")}`} className="atelier-tel-link">
                          {branch.phone}
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="atelier-card-footer">
                    <a
                      href={branch.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="atelier-directions-btn"
                    >
                      <span>GET DIRECTIONS</span>
                      <span className="atelier-arrow">→</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Architectural Framed Dark Map */}
          <div className="atelier-map-frame">
            <div className="atelier-map-meta-bar">
              <span className="atelier-map-current-label">
                STUDIO LOCATION // {currentBranch.locationName.toUpperCase()}
              </span>
              <a
                href={currentBranch.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="atelier-map-open-link"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <span className="atelier-arrow">→</span>
              </a>
            </div>

            <div className="atelier-map-viewport">
              <iframe
                key={currentBranch.id}
                src={currentBranch.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="atelier-map-iframe"
                title={`${currentBranch.locationName} Map View`}
              />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .booking-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-medium) 0%,
            var(--bg-storm-dark) 100%
          );
          padding: 6.5rem 0;
          position: relative;
        }
        .booking-grid {
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;
          gap: 4.5rem;
          display: grid;
        }
        .booking-title {
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.25rem;
          font-size: clamp(2rem, 3.8vw, 2.7rem);
          font-weight: 900;
        }
        .booking-desc {
          color: var(--text-muted);
          margin-bottom: 2.5rem;
          font-size: 1rem;
          line-height: 1.7;
        }
        .process-timeline {
          flex-direction: column;
          gap: 1.8rem;
          margin-bottom: 3rem;
          display: flex;
        }
        .process-step {
          gap: 1.25rem;
          display: flex;
          align-items: flex-start;
        }
        .step-num {
          font-family: var(--font-headings);
          color: var(--accent-peach);
          background: rgba(255, 168, 82, 0.08);
          border: 1px solid rgba(255, 168, 82, 0.22);
          border-radius: 50%;
          flex-shrink: 0;
          justify-content: center;
          align-items: center;
          width: 42px;
          height: 42px;
          font-size: 1.15rem;
          font-weight: 800;
          display: flex;
        }
        .step-content {
          flex-direction: column;
          display: flex;
        }
        .step-title {
          font-family: var(--font-headings);
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
          font-size: 1.05rem;
          font-weight: 700;
        }
        .step-desc {
          font-family: var(--font-desc);
          color: var(--text-muted);
          font-size: 0.85rem;
          line-height: 1.5;
        }
        .direct-dm-note {
          font-family: var(--font-desc);
          background: rgba(255, 168, 82, 0.06);
          border: 1px solid rgba(255, 168, 82, 0.16);
          border-radius: 12px;
          gap: 0.85rem;
          padding: 1.2rem;
          display: flex;
        }
        .dm-icon {
          color: var(--accent-peach);
          margin-top: 0.1rem;
          font-size: 1.2rem;
        }
        .form-card {
          padding: 2.5rem;
        }
        .booking-form {
          flex-direction: column;
          gap: 1.25rem;
          display: flex;
        }
        .form-group {
          flex-direction: column;
          gap: 0.45rem;
          display: flex;
        }
        .form-row {
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          display: grid;
        }
        .form-label {
          font-family: var(--font-headings);
          text-transform: uppercase;
          color: var(--accent-peach);
          letter-spacing: 0.1em;
          font-size: 0.72rem;
          font-weight: 700;
        }
        .form-input,
        .form-select,
        .form-textarea {
          color: var(--text-main);
          font-family: var(--font-desc);
          transition: var(--transition-fast);
          background: rgba(7, 9, 14, 0.75);
          border: 1px solid rgba(255, 168, 82, 0.18);
          border-radius: 8px;
          padding: 0.85rem 1.1rem;
          font-size: 0.9rem;
          width: 100%;
        }
        @media (max-width: 768px) {
          .form-input,
          .form-select,
          .form-textarea {
            font-size: 16px; /* Prevents auto-zoom on iOS Safari */
          }
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: var(--accent-peach);
          background: rgba(7, 9, 14, 0.95);
          outline: none;
          box-shadow: 0 0 15px rgba(255, 168, 82, 0.2);
        }
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: rgba(248, 250, 252, 0.35);
        }
        .form-select option {
          background-color: var(--bg-storm-dark);
          color: var(--text-main);
        }
        .form-submit-btn {
          width: 100%;
          margin-top: 0.75rem;
          padding: 0.9rem 1.8rem;
        }
        .form-success-state {
          text-align: center;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1.25rem;
          padding: 2.5rem 1rem;
          display: flex;
        }
        .success-icon-box {
          border: 1px solid var(--accent-peach);
          background: rgba(255, 168, 82, 0.1);
          border-radius: 50%;
          justify-content: center;
          align-items: center;
          width: 72px;
          height: 72px;
          margin-bottom: 0.5rem;
          display: flex;
          box-shadow: 0 0 25px rgba(255, 168, 82, 0.25);
        }
        .success-heading {
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 1.6rem;
          font-weight: 800;
        }
        .success-message {
          color: var(--text-muted);
          max-width: 400px;
          margin-bottom: 1rem;
          font-size: 0.92rem;
          line-height: 1.6;
        }

        .booking-map-section {
          margin-top: 5.5rem;
          position: relative;
        }

        .atelier-branches-wrap {
          border: 1px solid rgba(255, 255, 255, 0.09);
          background: #080a0f;
          border-radius: 4px;
          box-shadow: none !important;
          overflow: hidden;
        }

        .atelier-header {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          padding: 2.4rem 2.4rem 2rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          background: #06070a;
          box-shadow: none !important;
        }

        @media (min-width: 768px) {
          .atelier-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
          }
        }

        .atelier-title-group {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .atelier-kicker {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--accent-peach);
        }

        .atelier-heading {
          font-family: var(--font-headings);
          font-size: clamp(1.8rem, 3.2vw, 2.5rem);
          font-weight: 800;
          letter-spacing: -0.01em;
          text-transform: uppercase;
          color: #ffffff;
          line-height: 1.15;
          margin: 0;
        }

        .atelier-branch-nav {
          display: flex;
          align-items: center;
          gap: 0;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #0a0d13;
          border-radius: 2px;
          box-shadow: none !important;
        }

        .atelier-nav-item {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.4rem;
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.45);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s ease, background 0.2s ease;
          box-shadow: none !important;
        }

        .atelier-nav-item:first-child {
          border-right: 1px solid rgba(255, 255, 255, 0.08);
        }

        .atelier-nav-item:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.03);
        }

        .atelier-nav-item.is-selected {
          color: var(--accent-peach);
          background: rgba(255, 168, 82, 0.08);
        }

        .atelier-nav-num {
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          opacity: 0.7;
        }

        .atelier-cards-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        @media (min-width: 900px) {
          .atelier-cards-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .atelier-card {
          padding: 2.2rem 2.4rem;
          background: #080a0f;
          cursor: pointer;
          transition: background 0.25s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: none !important;
          position: relative;
        }

        @media (min-width: 900px) {
          .atelier-card:first-child {
            border-right: 1px solid rgba(255, 255, 255, 0.08);
          }
        }

        @media (max-width: 899px) {
          .atelier-card:first-child {
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
        }

        .atelier-card:hover {
          background: #0b0e15;
        }

        .atelier-card.is-active-branch {
          background: #0d1017;
        }

        .atelier-card.is-active-branch::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--accent-peach);
        }

        .atelier-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;
        }

        .atelier-card-num {
          font-family: var(--font-headings);
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: var(--accent-peach);
        }

        .atelier-card-region {
          font-family: var(--font-body);
          font-size: 0.65rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          color: rgba(255, 255, 255, 0.35);
          text-transform: uppercase;
        }

        .atelier-card-title {
          font-family: var(--font-headings);
          font-size: 1.35rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: #ffffff;
          text-transform: uppercase;
          margin: 0 0 1.8rem;
          line-height: 1.25;
        }

        .atelier-card-specs {
          display: flex;
          flex-direction: column;
          gap: 0;
          margin-bottom: 2rem;
        }

        .atelier-spec-row {
          display: grid;
          grid-template-columns: 100px 1fr;
          gap: 1rem;
          padding: 0.85rem 0;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          align-items: baseline;
        }

        .atelier-spec-title {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
        }

        .atelier-spec-text {
          font-family: var(--font-desc);
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.82);
          line-height: 1.55;
          margin: 0;
        }

        .atelier-tel-link {
          color: var(--accent-peach);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .atelier-tel-link:hover {
          color: #ffffff;
          text-decoration: underline;
        }

        .atelier-card-footer {
          margin-top: auto;
          padding-top: 1.2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.06);
        }

        .atelier-directions-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          font-family: var(--font-body);
          font-size: 0.74rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--accent-peach);
          text-decoration: none;
          transition: gap 0.25s ease, color 0.25s ease;
        }

        .atelier-directions-btn:hover {
          color: #ffffff;
          gap: 0.85rem;
        }

        .atelier-arrow {
          display: inline-block;
          transition: transform 0.25s ease;
        }

        .atelier-directions-btn:hover .atelier-arrow {
          transform: translateX(3px);
        }

        /* Architectural Map Frame */
        .atelier-map-frame {
          position: relative;
          width: 100%;
          background: #050608;
          box-shadow: none !important;
        }

        .atelier-map-meta-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.9rem 2.4rem;
          background: #06070a;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: none !important;
        }

        .atelier-map-current-label {
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.45);
        }

        .atelier-map-open-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: var(--accent-peach);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .atelier-map-open-link:hover {
          color: #ffffff;
        }

        .atelier-map-viewport {
          position: relative;
          width: 100%;
          height: 380px;
          background: #050608;
        }

        @media (min-width: 768px) {
          .atelier-map-viewport {
            height: 440px;
          }
        }

        .atelier-map-iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
          filter: invert(90%) hue-rotate(180deg) contrast(1.15) brightness(0.9);
          transition: filter 0.4s ease;
        }

        .atelier-map-iframe:hover {
          filter: invert(0%) hue-rotate(0deg) contrast(1) brightness(1);
        }

        @media (max-width: 1024px) {
          .booking-grid {
            grid-template-columns: 1fr;
            gap: 3.5rem;
          }
        }

        @media (max-width: 768px) {
          .form-card {
            padding: 1.8rem 1.4rem;
          }
          .form-row {
            grid-template-columns: 1fr;
            gap: 1.25rem;
          }
          .booking-map-section {
            margin-top: 3.5rem;
          }
          .atelier-header {
            padding: 1.6rem 1.4rem;
          }
          .atelier-branch-nav {
            width: 100%;
          }
          .atelier-nav-item {
            flex: 1;
            justify-content: center;
            padding: 0.65rem 0.8rem;
            font-size: 0.7rem;
          }
          .atelier-card {
            padding: 1.6rem 1.4rem;
          }
          .atelier-card-title {
            font-size: 1.15rem;
            margin-bottom: 1.25rem;
          }
          .atelier-spec-row {
            grid-template-columns: 85px 1fr;
            gap: 0.6rem;
            padding: 0.7rem 0;
          }
          .atelier-map-meta-bar {
            padding: 0.75rem 1.4rem;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.4rem;
          }
          .atelier-map-viewport {
            height: 280px;
          }
        }
      `}</style>
    </section>
  );
}
