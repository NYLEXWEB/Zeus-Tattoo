"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Clock, User, Sparkles, CheckCircle2, Upload } from "lucide-react";

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
    placement: "Arm",
    size: "Medium (2\"-6\")",
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
    // Clear errors when user types
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
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
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
    
    // Simulate API Submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      artist: "No Preference",
      style: "Realism",
      placement: "Arm",
      size: "Medium (2\"-6\")",
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

          {/* Modal Panel Slide Up */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="relative z-10 w-full max-w-2xl bg-brand-charcoal border border-brand-off-white/10 rounded-[4px] shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 md:p-8 border-b border-brand-off-white/5 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-sans text-[10px] tracking-[0.3em] text-brand-warm-cream uppercase">
                  Appointment Booking
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-brand-off-white uppercase mt-1">
                  Book Your Session
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 border border-brand-off-white/10 hover:border-brand-warm-cream rounded-full flex items-center justify-center text-brand-off-white hover:text-brand-warm-cream transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form Content / Success View */}
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
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className={`bg-brand-black/50 border ${
                            errors.fullName ? "border-red-500/50 focus:border-red-500" : "border-brand-off-white/10 focus:border-brand-warm-cream"
                          } px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px]`}
                          placeholder="John Doe"
                        />
                        {errors.fullName && (
                          <span className="text-[10px] text-red-400 font-sans tracking-wide mt-1.5">{errors.fullName}</span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className={`bg-brand-black/50 border ${
                            errors.email ? "border-red-500/50 focus:border-red-500" : "border-brand-off-white/10 focus:border-brand-warm-cream"
                          } px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px]`}
                          placeholder="johndoe@email.com"
                        />
                        {errors.email && (
                          <span className="text-[10px] text-red-400 font-sans tracking-wide mt-1.5">{errors.email}</span>
                        )}
                      </div>
                    </div>

                    {/* Phone & Preferred Artist */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={`bg-brand-black/50 border ${
                            errors.phone ? "border-red-500/50 focus:border-red-500" : "border-brand-off-white/10 focus:border-brand-warm-cream"
                          } px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px]`}
                          placeholder="+1 (555) 000-0000"
                        />
                        {errors.phone && (
                          <span className="text-[10px] text-red-400 font-sans tracking-wide mt-1.5">{errors.phone}</span>
                        )}
                      </div>

                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                          Preferred Artist
                        </label>
                        <select
                          name="artist"
                          value={formData.artist}
                          onChange={handleInputChange}
                          className="bg-brand-black border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] cursor-pointer"
                        >
                          <option value="No Preference">No Preference (First Available)</option>
                          <option value="Arjun">Arjun (Realism / Black & Grey)</option>
                          <option value="Meera">Meera (Fine Line / Minimalist)</option>
                          <option value="Rahul">Rahul (Japanese / Neo-Traditional)</option>
                          <option value="Sahana">Sahana (Geometric / Custom)</option>
                        </select>
                      </div>
                    </div>

                    {/* Style & Placement */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                          Tattoo Style
                        </label>
                        <select
                          name="style"
                          value={formData.style}
                          onChange={handleInputChange}
                          className="bg-brand-black border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] cursor-pointer"
                        >
                          <option value="Realism">Realism</option>
                          <option value="Black & Grey">Black & Grey</option>
                          <option value="Fine Line">Fine Line</option>
                          <option value="Japanese">Japanese</option>
                          <option value="Geometric">Geometric</option>
                          <option value="Minimalist">Minimalist</option>
                          <option value="Other">Other / Custom</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                          Tattoo Placement
                        </label>
                        <select
                          name="placement"
                          value={formData.placement}
                          onChange={handleInputChange}
                          className="bg-brand-black border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] cursor-pointer"
                        >
                          <option value="Arm">Arm (Sleeve, Forearm, Bicep)</option>
                          <option value="Leg">Leg (Thigh, Calf, Ankle)</option>
                          <option value="Chest">Chest</option>
                          <option value="Back">Back (Full/Upper/Lower)</option>
                          <option value="Shoulder">Shoulder</option>
                          <option value="Ribs">Ribs / Torso</option>
                          <option value="Hand">Hand / Wrist</option>
                          <option value="Neck">Neck / Behind Ear</option>
                          <option value="Other">Other Placement</option>
                        </select>
                      </div>
                    </div>

                    {/* Size & Date */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                          Approximate Size
                        </label>
                        <select
                          name="size"
                          value={formData.size}
                          onChange={handleInputChange}
                          className="bg-brand-black border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] cursor-pointer"
                        >
                          <option value="Small (< 2&quot;)">Small (Less than 2 inches)</option>
                          <option value="Medium (2&quot;-6&quot;)">Medium (2 to 6 inches)</option>
                          <option value="Large (6&quot;+)">Large (Greater than 6 inches)</option>
                          <option value="Full Sleeve / Back">Full Sleeve / Full Back Piece</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                          Preferred Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="date"
                            min={new Date().toISOString().split("T")[0]}
                            value={formData.date}
                            onChange={handleInputChange}
                            className={`w-full bg-brand-black/50 border ${
                              errors.date ? "border-red-500/50 focus:border-red-500" : "border-brand-off-white/10 focus:border-brand-warm-cream"
                            } px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px]`}
                          />
                        </div>
                        {errors.date && (
                          <span className="text-[10px] text-red-400 font-sans tracking-wide mt-1.5">{errors.date}</span>
                        )}
                      </div>
                    </div>

                    {/* Preferred Time & Reference Image Upload */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                          Preferred Time Frame
                        </label>
                        <select
                          name="time"
                          value={formData.time}
                          onChange={handleInputChange}
                          className="bg-brand-black border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] cursor-pointer"
                        >
                          <option value="Morning (10:00 AM - 2:00 PM)">Morning (10:00 AM - 2:00 PM)</option>
                          <option value="Afternoon (2:00 PM - 6:00 PM)">Afternoon (2:00 PM - 6:00 PM)</option>
                          <option value="Evening (6:00 PM - 8:00 PM)">Evening (6:00 PM - 8:00 PM)</option>
                        </select>
                      </div>

                      <div className="flex flex-col">
                        <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                          Reference Image (Optional)
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="reference-upload"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          <label
                            htmlFor="reference-upload"
                            className="w-full flex items-center justify-between bg-brand-black/50 border border-brand-off-white/10 px-4 py-3 text-sm text-brand-off-white/60 hover:text-brand-warm-cream hover:border-brand-warm-cream font-sans rounded-[3px] cursor-pointer transition-colors duration-300"
                          >
                            <span className="truncate max-w-[180px]">
                              {fileName ? fileName : "Upload Reference..."}
                            </span>
                            <Upload size={16} className="text-brand-off-white/40" />
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col">
                      <label className="font-sans text-[10px] tracking-widest text-brand-off-white/60 uppercase mb-2">
                        Tattoo Description & Notes
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="bg-brand-black/50 border border-brand-off-white/10 focus:border-brand-warm-cream px-4 py-3 text-sm text-brand-off-white font-sans outline-none transition-colors rounded-[3px] resize-none"
                        placeholder="Describe your design idea, placement preference, and any text formatting details here..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group w-full py-4 mt-4 bg-brand-off-white hover:bg-brand-warm-cream disabled:bg-brand-off-white/45 disabled:cursor-not-allowed text-brand-black font-sans text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                    >
                      {isSubmitting ? (
                        <div className="w-4 h-4 border-2 border-brand-black border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          Submit Inquiry
                          <Sparkles size={12} className="group-hover:scale-125 transition-transform" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  // Success State
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center py-12 px-4"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 15 }}
                      className="text-brand-warm-cream mb-6"
                    >
                      <CheckCircle2 size={64} className="stroke-1" />
                    </motion.div>
                    
                    <h4 className="font-serif text-3xl text-brand-off-white uppercase mb-4">
                      Inquiry Received
                    </h4>
                    
                    <p className="text-brand-off-white/70 font-sans text-sm leading-relaxed max-w-md mb-8">
                      Thank you for contacting Zeus Tattoo Studio, <strong className="text-brand-off-white">{formData.fullName}</strong>. We have saved your preference for a <strong className="text-brand-off-white">{formData.style}</strong> tattoo with <strong className="text-brand-off-white">{formData.artist}</strong> on <strong className="text-brand-off-white">{formData.date}</strong>. Our team will review your project and email you within 24 hours.
                    </p>

                    <button
                      onClick={handleReset}
                      className="px-8 py-3.5 border border-brand-off-white/20 hover:border-brand-warm-cream text-brand-off-white hover:text-brand-warm-cream font-sans text-xs font-semibold tracking-widest uppercase transition-colors cursor-pointer"
                    >
                      Close Window
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
