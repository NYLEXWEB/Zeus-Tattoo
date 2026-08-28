"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, Upload, MessageCircle, Phone, Sparkles } from "lucide-react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  fullName: string;
  phone: string;
  email: string;
  artist: string;
  style: string;
  placement: string;
  size: string;
  budget: string;
  date: string;
  time: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  phone?: string;
  email?: string;
  date?: string;
}

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    artist: "No Preference",
    style: "Realism",
    placement: "Arm (Forearm / Sleeve)",
    size: "Medium (2\"-6\")",
    budget: "₹10,000 - ₹25,000",
    date: "",
    time: "Afternoon (2:00 PM - 6:00 PM)",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone/WhatsApp number is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.date) newErrors.date = "Preferred date is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1200);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      artist: "No Preference",
      style: "Realism",
      placement: "Arm (Forearm / Sleeve)",
      size: "Medium (2\"-6\")",
      budget: "₹10,000 - ₹25,000",
      date: "",
      time: "Afternoon (2:00 PM - 6:00 PM)",
      message: "",
    });
    setFileName(null);
    setIsSuccess(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Fade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-black/90 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Panel */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 w-full max-w-3xl bg-brand-charcoal border border-brand-off-white/10 rounded-[4px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-brand-off-white/10 flex items-center justify-between bg-brand-black/40">
              <div className="flex flex-col">
                <span className="font-sans text-[10px] tracking-[0.35em] text-brand-warm-cream uppercase flex items-center gap-1.5">
                  <Sparkles size={12} />
                  YOUR IDEA. OUR CRAFT.
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-brand-off-white uppercase mt-1">
                  Book Your Consultation
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 border border-brand-off-white/20 hover:border-brand-warm-cream rounded-full flex items-center justify-center text-brand-off-white hover:text-brand-warm-cream transition-colors cursor-pointer"
                aria-label="Close Booking Modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Direct Instant Contact Shortcuts Bar */}
            <div className="bg-brand-black/80 border-b border-brand-off-white/5 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-sans">
              <span className="text-[10px] tracking-widest text-brand-off-white/50 uppercase">
                PREFER DIRECT MESSAGE?
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-brand-warm-cream hover:underline uppercase tracking-wider font-semibold"
                >
                  <MessageCircle size={13} />
                  WhatsApp
                </a>
                <a
                  href="https://instagram.com/zeustattoo"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-brand-warm-cream hover:underline uppercase tracking-wider font-semibold"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                  @zeustattoo
                </a>
                <a
                  href="tel:+919876543210"
                  className="flex items-center gap-1 text-[11px] text-brand-warm-cream hover:underline uppercase tracking-wider font-semibold"
                >
                  <Phone size={13} />
                  Call Us
                </a>
              </div>
            </div>

            {/* Form Container */}
            <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    {/* Full Name & Email row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`bg-brand-black/60 border ${
                            errors.fullName ? "border-red-500/60 focus:border-red-500" : "border-brand-off-white/10 focus:border-brand-warm-cream"
                          } px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px]`}
                          placeholder="Your Full Name"
                        />
                        {errors.fullName && (
                          <span className="text-[10px] text-red-400 font-sans tracking-wide mt-1.5">{errors.fullName}</span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`bg-brand-black/60 border ${
                            errors.email ? "border-red-500/60 focus:border-red-500" : "border-brand-off-white/10 focus:border-brand-warm-cream"
                          } px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px]`}
                          placeholder="yourname@domain.com"
                        />
                        {errors.email && (
                          <span className="text-[10px] text-red-400 font-sans tracking-wide mt-1.5">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Phone & Preferred Artist */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                          Phone / WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`bg-brand-black/60 border ${
                            errors.phone ? "border-red-500/60 focus:border-red-500" : "border-brand-off-white/10 focus:border-brand-warm-cream"
                          } px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px]`}
                          placeholder="+91 98765 43210"
                        />
                        {errors.phone && (
                          <span className="text-[10px] text-red-400 font-sans tracking-wide mt-1.5">{errors.phone}</span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                          Preferred Artist
                        </label>
                        <select
                          name="artist"
                          value={formData.artist}
                          onChange={handleInputChange}
                          className="bg-brand-black border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] cursor-pointer"
                        >
                          <option value="No Preference">No Preference (First Available Master)</option>
                          <option value="Rahul Sharma">Rahul Sharma (Realism & Portraits)</option>
                          <option value="Meera Nair">Meera Nair (Fine Line & Micro)</option>
                          <option value="Arjun Verma">Arjun Verma (Black & Grey Sleeves)</option>
                          <option value="Sahana Rao">Sahana Rao (Geometry & Cover-Ups)</option>
                        </select>
                      </div>
                    </div>

                    {/* Style & Placement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                          Tattoo Style
                        </label>
                        <select
                          name="style"
                          value={formData.style}
                          onChange={handleInputChange}
                          className="bg-brand-black border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] cursor-pointer"
                        >
                          <option value="Realism">Hyper-Realism & Portraits</option>
                          <option value="Black & Grey">Black & Grey Monochromatic</option>
                          <option value="Fine Line">Fine Line & Botanicals</option>
                          <option value="Traditional">Geometric & Dotwork</option>
                          <option value="Cover Up">Cover-Up & Transformation</option>
                          <option value="Custom">Custom Concept</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                          Body Placement
                        </label>
                        <select
                          name="placement"
                          value={formData.placement}
                          onChange={handleInputChange}
                          className="bg-brand-black border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] cursor-pointer"
                        >
                          <option value="Arm (Forearm / Sleeve)">Arm (Forearm / Full Sleeve)</option>
                          <option value="Leg (Thigh / Calf)">Leg (Thigh / Calf / Ankle)</option>
                          <option value="Chest">Chest</option>
                          <option value="Back (Full / Upper)">Back (Full / Upper Back)</option>
                          <option value="Shoulder">Shoulder / Collarbone</option>
                          <option value="Ribs">Ribs / Torso</option>
                          <option value="Hand / Wrist">Hand / Wrist</option>
                          <option value="Neck">Neck / Behind Ear</option>
                          <option value="Other">Other Custom Placement</option>
                        </select>
                      </div>
                    </div>

                    {/* Size & Budget */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                          Approximate Size
                        </label>
                        <select
                          name="size"
                          value={formData.size}
                          onChange={handleInputChange}
                          className="bg-brand-black border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] cursor-pointer"
                        >
                          <option value="Small (< 2&quot;)">Small (Micro / Under 2 inches)</option>
                          <option value="Medium (2&quot;-6&quot;)">Medium (2 to 6 inches)</option>
                          <option value="Large (6&quot;+)">Large (6+ inches)</option>
                          <option value="Full Sleeve / Back">Full Sleeve / Back Piece</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                          Estimated Budget Range
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleInputChange}
                          className="bg-brand-black border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] cursor-pointer"
                        >
                          <option value="₹3,500 - ₹10,000">₹3,500 - ₹10,000</option>
                          <option value="₹10,000 - ₹25,000">₹10,000 - ₹25,000</option>
                          <option value="₹25,000 - ₹50,000">₹25,000 - ₹50,000</option>
                          <option value="₹50,000+">₹50,000+ (Full Project)</option>
                        </select>
                      </div>
                    </div>

                    {/* Preferred Date & Reference Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                          Preferred Date *
                        </label>
                        <input
                          type="date"
                          name="date"
                          min={new Date().toISOString().split("T")[0]}
                          value={formData.date}
                          onChange={handleInputChange}
                          className={`bg-brand-black/60 border ${
                            errors.date ? "border-red-500/60 focus:border-red-500" : "border-brand-off-white/10 focus:border-brand-warm-cream"
                          } px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px]`}
                        />
                        {errors.date && (
                          <span className="text-[10px] text-red-400 font-sans tracking-wide mt-1.5">{errors.date}</span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                          Reference Image (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="reference-upload-modal"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="reference-upload-modal"
                            className="w-full flex items-center justify-between bg-brand-black/60 border border-brand-off-white/10 px-4 py-3 text-sm text-brand-off-white/70 hover:text-brand-warm-cream hover:border-brand-warm-cream font-sans rounded-[3px] cursor-pointer transition-colors duration-300"
                          >
                            <span className="truncate max-w-[180px]">
                              {fileName ? fileName : "Attach Reference..."}
                            </span>
                            <Upload size={16} className="text-brand-off-white/40" />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Message / Description */}
                    <div className="flex flex-col">
                      <label className="font-sans text-[10px] tracking-widest text-brand-off-white/70 uppercase mb-2">
                        Tattoo Description & Ideas
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={3}
                        className="bg-brand-black/60 border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] resize-none"
                        placeholder="Tell us about the story behind your tattoo, specific element requests, or any questions..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full py-4 mt-2 bg-brand-off-white hover:bg-brand-warm-cream disabled:bg-brand-off-white/40 text-brand-black font-sans text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          REQUEST CONSULTATION
                          <Sparkles size={13} className="group-hover:scale-125 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  /* Success View */
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12 px-4"
                  >
                    <div className="text-brand-warm-cream mb-6">
                      <CheckCircle2 size={64} className="stroke-1" />
                    </div>
                    
                    <h4 className="font-serif text-3xl md:text-4xl text-brand-off-white uppercase mb-4">
                      Inquiry Received
                    </h4>
                    
                    <p className="text-brand-off-white/75 font-sans text-xs md:text-sm leading-relaxed max-w-md mb-8">
                      Thank you for contacting Zeus Tattoo Studio, <strong className="text-brand-off-white">{formData.fullName}</strong>. We have logged your consultation request for a <strong className="text-brand-off-white">{formData.style}</strong> project on <strong className="text-brand-off-white">{formData.date}</strong>. Our Koramangala team will review your project and get back to you within 24 hours.
                    </p>

                    <button
                      onClick={handleReset}
                      className="px-8 py-3.5 border border-brand-off-white/20 hover:border-brand-warm-cream text-brand-off-white hover:text-brand-warm-cream font-sans text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      CLOSE WINDOW
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
