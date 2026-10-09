"use client";

import React, { useState } from "react";

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    service: "tattoo",
    artist: "any",
    description: "",
  });

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
        service: "tattoo",
        artist: "any",
        description: "",
      });
    }, 1500);
  };

  return (
    <section id="booking" className="booking-section">
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
                  Visit our Eerayil Kadavu studio for a precision-sterile and
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
              <p style={{ fontSize: "0.85rem", opacity: 0.8 }}>
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
                    width="48"
                    height="48"
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
                      <option value="aryan">Aryan &apos;Zeus&apos; (Tattoo Lead)</option>
                      <option value="malavika">
                        Malavika &apos;Athena&apos; (Brows Lead)
                      </option>
                      <option value="sreejit">
                        Sreejit &apos;Hermes&apos; (Piercing Lead)
                      </option>
                    </select>
                  </div>
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
                    placeholder="Describe your design, desired placement on body, approximate size, and style preferences..."
                    rows={4}
                    className="form-textarea"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Reference Images (Optional)
                  </label>
                  <div className="file-upload-placeholder">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="upload-icon"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                    <span className="upload-text">
                      Upload references later via WhatsApp / Email
                    </span>
                    <span className="upload-subtext">
                      Clicking here will let you select files (Placeholder slot)
                    </span>
                  </div>
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

      <div className="container booking-map-section">
        <div className="map-info-card card-glass border-pulse">
          <div className="map-text">
            <span className="map-subtitle">Sanctuary Location</span>
            <h3 className="map-heading">Find Our Studio</h3>
            <p className="map-desc">
              2nd Floor, Roji&apos;s Arch, Manorama Junction,
              <br />
              Eerayil Kadavu, Kottayam, Kerala 686001, India
            </p>
            <div className="map-contact-details">
              <div className="contact-detail-item">
                <span className="contact-icon">🕒</span>
                <span>Open Daily: 10:00 AM – 8:00 PM</span>
              </div>
              <div className="contact-detail-item">
                <span className="contact-icon">☎</span>
                <span>Phone: +91 94951 86001</span>
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Zeus+Tattoo+Studio+Kottayam"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary map-directions-btn"
            >
              Get Directions
            </a>
          </div>
          <div className="map-frame-wrapper">
            <iframe
              src="https://maps.google.com/maps?q=Zeus%20Tattoo%20Studio%20Kottayam&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="google-map-iframe"
              title="Zeus Tattoo Studio Kottayam Map Location"
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .booking-section {
          background: linear-gradient(
            180deg,
            var(--bg-storm-medium) 0%,
            var(--bg-storm-dark) 100%
          );
          padding: 6rem 0;
          position: relative;
        }
        .booking-grid {
          grid-template-columns: 0.9fr 1.1fr;
          align-items: center;
          gap: 5rem;
          display: grid;
        }
        .booking-title {
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1.5rem;
          font-size: 2.5rem;
          font-weight: 900;
        }
        .booking-desc {
          color: var(--text-muted);
          margin-bottom: 3rem;
          font-size: 1.05rem;
          line-height: 1.7;
        }
        .process-timeline {
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3.5rem;
          display: flex;
        }
        .process-step {
          gap: 1.5rem;
          display: flex;
        }
        .step-num {
          font-family: var(--font-headings);
          color: var(--accent-peach);
          background: #ffa8520d;
          border: 1px solid #ffa85226;
          border-radius: 50%;
          flex-shrink: 0;
          justify-content: center;
          align-items: center;
          width: 45px;
          height: 45px;
          font-size: 1.25rem;
          font-weight: 800;
          display: flex;
          box-shadow: 0 0 10px #ffa8520d;
        }
        .step-content {
          flex-direction: column;
          display: flex;
        }
        .step-title {
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 0.25rem;
          font-size: 1.1rem;
          font-weight: 700;
        }
        .step-desc {
          color: var(--text-muted);
          font-size: 0.85rem;
          line-height: 1.5;
        }
        .direct-dm-note {
          background: #ffa8520a;
          border: 1px solid #ffa8521a;
          border-radius: 12px;
          gap: 1rem;
          padding: 1.25rem;
          display: flex;
        }
        .dm-icon {
          color: var(--accent-peach);
          margin-top: 0.1rem;
          font-size: 1.25rem;
        }
        .form-card {
          padding: 3rem;
        }
        .booking-form {
          flex-direction: column;
          gap: 1.5rem;
          display: flex;
        }
        .form-group {
          flex-direction: column;
          gap: 0.5rem;
          display: flex;
        }
        .form-row {
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          display: grid;
        }
        .form-label {
          text-transform: uppercase;
          color: var(--accent-peach);
          letter-spacing: 0.1em;
          font-size: 0.75rem;
          font-weight: 700;
        }
        .form-input,
        .form-select,
        .form-textarea {
          color: var(--text-main);
          font-family: var(--font-body);
          transition: var(--transition-fast);
          background: #07090e99;
          border: 1px solid #ffa8521f;
          border-radius: 8px;
          padding: 0.85rem 1.2rem;
          font-size: 0.9rem;
        }
        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          border-color: var(--accent-peach);
          background: #07090ecc;
          outline: none;
          box-shadow: 0 0 15px #ffa85226;
        }
        .form-input::placeholder,
        .form-textarea::placeholder {
          color: #f8fafc59;
        }
        .form-select option {
          background-color: var(--bg-storm-dark);
          color: var(--text-main);
        }
        .file-upload-placeholder {
          cursor: pointer;
          transition: var(--transition-smooth);
          background: #07090e66;
          border: 1px dashed #ffa85233;
          border-radius: 8px;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 1.5rem;
          display: flex;
        }
        .file-upload-placeholder:hover {
          border-color: var(--accent-peach);
          background: #07090e99;
        }
        .upload-icon {
          color: #ffa85233;
          transition: var(--transition-fast);
          margin-bottom: 0.5rem;
        }
        .file-upload-placeholder:hover .upload-icon {
          color: var(--accent-peach);
          transform: scale(1.1);
        }
        .upload-text {
          color: var(--text-main);
          margin-bottom: 0.15rem;
          font-size: 0.8rem;
          font-weight: 600;
        }
        .upload-subtext {
          color: var(--text-muted);
          opacity: 0.6;
          font-size: 0.7rem;
        }
        .form-submit-btn {
          width: 100%;
          margin-top: 1rem;
        }
        .form-success-state {
          text-align: center;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 1.5rem;
          padding: 3rem 1rem;
          display: flex;
        }
        .success-icon-box {
          border: 1px solid var(--accent-peach);
          background: #ffa8520d;
          border-radius: 50%;
          justify-content: center;
          align-items: center;
          width: 80px;
          height: 80px;
          margin-bottom: 1rem;
          display: flex;
          box-shadow: 0 0 25px #ffa85233;
        }
        .success-heading {
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-size: 1.75rem;
          font-weight: 800;
        }
        .success-message {
          color: var(--text-muted);
          max-width: 420px;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .booking-map-section {
          margin-top: 5rem;
        }
        .map-info-card {
          background: linear-gradient(
            135deg,
            #0d111bf2,
            #151d2dd9
          );
          border-color: #ffa85214;
          border-radius: 20px;
          grid-template-columns: 1fr;
          display: grid;
          overflow: hidden;
          box-shadow: 0 15px 40px #00000073;
        }
        @media (min-width: 992px) {
          .map-info-card {
            grid-template-columns: 1fr 1.3fr;
            height: 400px;
          }
        }
        .map-text {
          flex-direction: column;
          justify-content: center;
          padding: 2.2rem 1.8rem;
          display: flex;
        }
        @media (min-width: 992px) {
          .map-text {
            padding: 3rem;
          }
        }
        .map-subtitle {
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--accent-peach);
          margin-bottom: 0.4rem;
          font-size: 0.65rem;
          font-weight: 700;
          display: block;
        }
        .map-heading {
          font-family: var(--font-headings);
          color: var(--text-main);
          letter-spacing: 0.02em;
          margin-bottom: 1.2rem;
          font-size: 1.75rem;
          font-weight: 800;
          line-height: 1.2;
        }
        .map-desc {
          color: var(--text-muted);
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .map-contact-details {
          flex-direction: column;
          gap: 0.6rem;
          margin-bottom: 1.8rem;
          display: flex;
        }
        .contact-detail-item {
          color: var(--text-muted);
          align-items: center;
          gap: 0.75rem;
          font-size: 0.88rem;
          display: flex;
        }
        .contact-icon {
          color: var(--accent-peach);
          text-shadow: 0 0 10px #ffa85226;
        }
        .map-directions-btn {
          justify-content: center;
          align-items: center;
          width: fit-content;
          text-decoration: none;
          display: inline-flex;
        }
        .map-frame-wrapper {
          width: 100%;
          height: 280px;
          position: relative;
          overflow: hidden;
        }
        @media (min-width: 992px) {
          .map-frame-wrapper {
            height: 100%;
          }
        }
        .google-map-iframe {
          filter: invert(90%) hue-rotate(180deg) contrast(1.15) brightness(0.9);
          transition: filter 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .google-map-iframe:hover {
          filter: invert(0%) hue-rotate(0deg) contrast(1) brightness(1);
        }
        @media (max-width: 1024px) {
          .booking-grid {
            grid-template-columns: 1fr;
            gap: 4rem;
          }
        }
        @media (max-width: 768px) {
          .form-card {
            padding: 2rem 1.5rem;
          }
          .form-row {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
