"use client";

import React, { useState } from "react";

const MapPinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
  </svg>
);

const PhoneIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const NavigationIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="3 11 22 2 13 21 11 13 3 11"/>
  </svg>
);

const ExternalLinkIcon = ({ size = 12 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6"/><path d="M10 14 21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
  </svg>
);

const SparklesIcon = ({ size = 13, className = "" }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

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

      {/* Studio Branches & Map Section */}
      <div className="container booking-map-section">
        <div className="map-showcase-card card-glass border-pulse">
          <div className="map-card-header">
            <div className="map-title-block">
              <span className="map-subtitle">
                <SparklesIcon size={13} className="inline-sparkle" />
                Our Studio Branches
              </span>
              <h3 className="map-heading">Visit Our Sanctuaries</h3>
            </div>

            <div className="branch-toggle-pills">
              {studioBranches.map((branch, idx) => (
                <button
                  key={branch.id}
                  type="button"
                  onClick={() => setActiveBranchIndex(idx)}
                  className={`branch-pill-btn ${activeBranchIndex === idx ? "pill-active" : ""}`}
                >
                  <MapPinIcon size={14} />
                  <span>{branch.locationName}</span>
                  {branch.id === "kakkanad" && (
                    <span className="branch-new-badge">NEW</span>
                  )}
                </button>
              ))}
            </div>

            <a
              href={currentBranch.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="map-directions-header-btn"
            >
              <NavigationIcon size={15} />
              <span>Get Directions</span>
              <ExternalLinkIcon size={13} />
            </a>
          </div>

          {/* Interactive Dual Branch Cards */}
          <div className="branches-dual-grid">
            {studioBranches.map((branch, idx) => {
              const isSelected = activeBranchIndex === idx;
              return (
                <div
                  key={branch.id}
                  onClick={() => setActiveBranchIndex(idx)}
                  className={`branch-showcase-box ${isSelected ? "is-selected" : ""}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      setActiveBranchIndex(idx);
                    }
                  }}
                >
                  <div className="branch-box-header">
                    <div className="branch-box-titles">
                      <div className="branch-tag-line">
                        <span
                          className={`branch-badge-pill ${branch.id === "kakkanad"
                              ? "pill-new"
                              : "pill-flagship"
                            }`}
                        >
                          {branch.tag}
                        </span>
                        {isSelected && (
                          <span className="branch-active-indicator">
                            ● Active View
                          </span>
                        )}
                      </div>
                      <h4 className="branch-box-name">{branch.name}</h4>
                      <p className="branch-box-location-title">
                        {branch.locationName}
                      </p>
                    </div>
                  </div>

                  <div className="branch-box-body">
                    <div className="branch-info-row">
                      <div className="detail-box-icon-wrap branch-icon-wrap">
                        <MapPinIcon size={16} />
                      </div>
                      <div className="branch-row-content">
                        <span className="detail-box-label">Address</span>
                        <p className="detail-box-value">
                          {branch.addressLine1}
                          <br />
                          {branch.addressLine2}
                        </p>
                      </div>
                    </div>

                    <div className="branch-info-row">
                      <div className="detail-box-icon-wrap branch-icon-wrap">
                        <ClockIcon size={16} />
                      </div>
                      <div className="branch-row-content">
                        <span className="detail-box-label">Operating Hours</span>
                        <p className="detail-box-value">{branch.hours}</p>
                        <span className="detail-box-tag">Walk-ins Welcome</span>
                      </div>
                    </div>

                    <div className="branch-info-row">
                      <div className="detail-box-icon-wrap branch-icon-wrap">
                        <PhoneIcon size={16} />
                      </div>
                      <div className="branch-row-content">
                        <span className="detail-box-label">Direct Contact</span>
                        <p className="detail-box-value">{branch.phone}</p>
                        <span className="detail-box-tag">Call / WhatsApp Support</span>
                      </div>
                    </div>
                  </div>

                  <div className="branch-box-footer">
                    <a
                      href={branch.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="branch-direct-nav-btn"
                    >
                      <NavigationIcon size={14} />
                      <span>
                        Directions to {branch.id === "kottayam" ? "Kottayam" : "Kakkanad"}
                      </span>
                      <ExternalLinkIcon size={12} />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="map-bottom-cover-wrapper">
            <div className="map-floating-pill">
              <span className="studio-pin-dot" />
              <span>
                {currentBranch.name} • {currentBranch.locationName}
              </span>
            </div>
            <iframe
              key={currentBranch.id}
              src={currentBranch.mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="google-map-cover-iframe"
              title={`${currentBranch.locationName} Map Location`}
            />
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
          margin-top: 5rem;
        }
        .map-showcase-card {
          background: linear-gradient(
            135deg,
            rgba(13, 17, 27, 0.95),
            rgba(21, 29, 45, 0.85)
          );
          border: 1px solid rgba(255, 168, 82, 0.2);
          border-radius: 22px;
          overflow: hidden;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6);
        }
        .map-card-header {
          padding: 2.4rem 2.4rem 1.6rem;
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }
        @media (min-width: 768px) {
          .map-card-header {
            flex-direction: row;
            justify-content: space-between;
            align-items: flex-end;
          }
        }
        .map-subtitle {
          font-family: var(--font-body);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--accent-peach);
          font-size: 0.75rem;
          font-weight: 700;
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          margin-bottom: 0.4rem;
        }
        .map-heading {
          font-family: var(--font-headings);
          color: var(--text-main);
          letter-spacing: -0.02em;
          font-size: clamp(1.8rem, 3.5vw, 2.5rem);
          font-weight: 800;
          line-height: 1.15;
          text-transform: uppercase;
        }
        .map-directions-header-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.75rem 1.5rem;
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-decoration: none;
          color: var(--text-dark);
          background: linear-gradient(135deg, var(--accent-peach), #e08e3e);
          border-radius: 100px;
          transition: var(--transition-smooth);
          width: fit-content;
        }
        .map-directions-header-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 168, 82, 0.35);
        }

        .branch-toggle-pills {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: rgba(7, 9, 14, 0.7);
          border: 1px solid rgba(255, 168, 82, 0.22);
          border-radius: 100px;
          padding: 0.35rem;
          width: fit-content;
        }

        .branch-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.45rem;
          padding: 0.45rem 1rem;
          border-radius: 100px;
          border: 1px solid transparent;
          background: transparent;
          color: var(--text-muted);
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          cursor: pointer;
          transition: var(--transition-fast);
        }

        .branch-pill-btn:hover {
          color: var(--text-main);
          background: rgba(255, 168, 82, 0.08);
        }

        .branch-pill-btn.pill-active {
          background: rgba(255, 168, 82, 0.2);
          border-color: rgba(255, 168, 82, 0.45);
          color: var(--accent-peach);
          box-shadow: 0 0 15px rgba(255, 168, 82, 0.2);
        }

        .branch-new-badge {
          background: linear-gradient(135deg, #ff4c4c, #ff8c42);
          color: #ffffff;
          font-size: 0.58rem;
          font-weight: 900;
          padding: 0.12rem 0.4rem;
          border-radius: 100px;
          letter-spacing: 0.05em;
        }

        .branches-dual-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.25rem;
          padding: 0 2.4rem 2rem;
        }

        @media (min-width: 900px) {
          .branches-dual-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .branch-showcase-box {
          background: rgba(7, 9, 14, 0.65);
          border: 1px solid rgba(255, 168, 82, 0.16);
          border-radius: 18px;
          padding: 1.6rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          cursor: pointer;
          transition: all 0.35s ease;
          position: relative;
          overflow: hidden;
        }

        .branch-showcase-box:hover {
          border-color: rgba(255, 168, 82, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
        }

        .branch-showcase-box.is-selected {
          border-color: rgba(255, 168, 82, 0.7);
          background: linear-gradient(
            165deg,
            rgba(21, 29, 45, 0.85) 0%,
            rgba(13, 17, 27, 0.95) 100%
          );
          box-shadow: 0 15px 35px rgba(255, 168, 82, 0.12);
        }

        .branch-showcase-box.is-selected::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, var(--accent-peach), #ffc285);
        }

        .branch-box-header {
          margin-bottom: 1.25rem;
        }

        .branch-tag-line {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          margin-bottom: 0.5rem;
        }

        .branch-badge-pill {
          font-family: var(--font-body);
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 0.22rem 0.6rem;
          border-radius: 100px;
        }

        .pill-flagship {
          background: rgba(255, 168, 82, 0.16);
          color: var(--accent-peach);
          border: 1px solid rgba(255, 168, 82, 0.35);
        }

        .pill-new {
          background: rgba(255, 92, 92, 0.18);
          color: #ff8c8c;
          border: 1px solid rgba(255, 92, 92, 0.4);
        }

        .branch-active-indicator {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--accent-peach);
          letter-spacing: 0.05em;
        }

        .branch-box-name {
          font-family: var(--font-headings);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: 0.04em;
          text-transform: uppercase;
          margin-bottom: 0.2rem;
        }

        .branch-box-location-title {
          font-family: var(--font-desc);
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--accent-peach-bright);
        }

        .branch-box-body {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          margin-bottom: 1.4rem;
        }

        .branch-info-row {
          display: flex;
          align-items: flex-start;
          gap: 0.85rem;
        }

        .branch-icon-wrap {
          width: 34px;
          height: 34px;
        }

        .branch-row-content {
          display: flex;
          flex-direction: column;
          gap: 0.18rem;
        }

        .branch-box-footer {
          margin-top: auto;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 168, 82, 0.12);
        }

        .branch-direct-nav-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--accent-peach);
          background: rgba(255, 168, 82, 0.1);
          border: 1px solid rgba(255, 168, 82, 0.25);
          border-radius: 100px;
          padding: 0.5rem 1rem;
          transition: var(--transition-fast);
          text-decoration: none;
        }

        .branch-direct-nav-btn:hover {
          background: var(--accent-peach);
          color: var(--text-dark);
          border-color: var(--accent-peach);
        }

        .info-detail-box {
          background: rgba(7, 9, 14, 0.55);
          border: 1px solid rgba(255, 168, 82, 0.14);
          border-radius: 14px;
          padding: 1.25rem;
          display: flex;
          align-items: flex-start;
          gap: 0.9rem;
          transition: border-color 0.3s ease;
        }
        .info-detail-box:hover {
          border-color: rgba(255, 168, 82, 0.35);
        }
        .detail-box-icon-wrap {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: rgba(255, 168, 82, 0.1);
          border: 1px solid rgba(255, 168, 82, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          color: var(--accent-peach);
        }
        .detail-box-text {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }
        .detail-box-label {
          font-family: var(--font-body);
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--accent-peach);
          font-weight: 700;
        }
        .detail-box-value {
          font-family: var(--font-desc);
          color: var(--text-main);
          font-size: 0.86rem;
          line-height: 1.5;
        }
        .detail-box-tag {
          font-size: 0.7rem;
          color: var(--text-muted);
          margin-top: 0.15rem;
        }

        .map-bottom-cover-wrapper {
          position: relative;
          width: 100%;
          height: 360px;
          border-top: 1px solid rgba(255, 168, 82, 0.18);
          background: #07090e;
          overflow: hidden;
        }
        @media (min-width: 768px) {
          .map-bottom-cover-wrapper {
            height: 420px;
          }
        }
        .map-floating-pill {
          position: absolute;
          top: 16px;
          left: 18px;
          background: rgba(7, 9, 14, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 168, 82, 0.35);
          border-radius: 100px;
          padding: 0.4rem 0.9rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          color: var(--accent-peach);
          z-index: 10;
          pointer-events: none;
        }
        .studio-pin-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--accent-peach);
          box-shadow: 0 0 8px var(--accent-peach);
        }
        .google-map-cover-iframe {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
          filter: invert(90%) hue-rotate(180deg) contrast(1.1) brightness(0.95);
          transition: filter 0.4s ease;
        }
        .google-map-cover-iframe:hover {
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
          .map-card-header {
            padding: 1.5rem 1.2rem 1.2rem;
          }
          .branch-toggle-pills {
            width: 100%;
            justify-content: center;
          }
          .branch-pill-btn {
            flex: 1;
            justify-content: center;
            padding: 0.45rem 0.6rem;
            font-size: 0.7rem;
          }
          .branches-dual-grid {
            padding: 0 1.2rem 1.4rem;
            gap: 1rem;
          }
          .branch-showcase-box {
            padding: 1.25rem 1.1rem;
          }
          .map-directions-header-btn {
            width: 100%;
            justify-content: center;
          }
          .map-bottom-cover-wrapper {
            height: 280px;
          }
        }
      `}</style>
    </section>
  );
}
