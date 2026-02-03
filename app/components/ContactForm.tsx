"use client";

import { useState } from "react";
import { CONTENT } from "../constants/content";
import { IOSCard } from "./IOSCard";
import { Send, CheckCircle2, AlertCircle, Phone, MapPin, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const ContactForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg("Failed to connect to the server.");
    }
  };

  return (
    <section className="py-32 bg-primary/20 relative z-10" id="contact">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold font-manrope mb-6">
              Contact Dormigen®
            </h2>
            <p className="text-silver/70 text-lg mb-12">
              Questions or support requests? Reach out to our team.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-medical/10 border border-medical/20 flex items-center justify-center text-medical group-hover:bg-medical group-hover:text-white transition-all duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-silver/40 uppercase tracking-widest mb-1">Email</div>
                  <a href={`mailto:${CONTENT.contact.email}`} className="text-lg font-bold text-white hover:text-medical transition-colors">
                    {CONTENT.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-medical/10 border border-medical/20 flex items-center justify-center text-medical group-hover:bg-medical group-hover:text-white transition-all duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-silver/40 uppercase tracking-widest mb-1">Phone</div>
                  <a href={`tel:${CONTENT.contact.phone}`} className="text-lg font-bold text-white hover:text-medical transition-colors">
                    {CONTENT.contact.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-medical/10 border border-medical/20 flex items-center justify-center text-medical group-hover:bg-medical group-hover:text-white transition-all duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-sm font-bold text-silver/40 uppercase tracking-widest mb-1">Mailing Address</div>
                  <div className="text-lg text-white/80 leading-relaxed whitespace-pre-line">
                    {CONTENT.contact.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <IOSCard className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-silver/40 uppercase tracking-widest pl-1">Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-navy/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-medical ring-medical/20 focus:ring-4 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-silver/40 uppercase tracking-widest pl-1">Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-navy/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-medical ring-medical/20 focus:ring-4 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-silver/40 uppercase tracking-widest pl-1">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="How can we help?"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-navy/50 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-medical ring-medical/20 focus:ring-4 transition-all resize-none"
                />
              </div>

              <button
                disabled={status === "loading"}
                type="submit"
                className="w-full bg-medical hover:bg-mid-blue disabled:opacity-50 text-white py-5 rounded-2xl font-bold text-lg transition-all shadow-lg hover:shadow-medical/20 flex items-center justify-center gap-3"
              >
                {status === "loading" ? "Sending..." : "Send Message"}
                <Send size={20} className={status === "loading" ? "animate-pulse" : ""} />
              </button>

              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key="success"
                    className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20"
                  >
                    <CheckCircle2 size={20} />
                    <span>Message sent successfully! We'll be in touch.</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key="error"
                    className="flex items-center gap-2 text-red-400 bg-red-400/10 p-4 rounded-xl border border-red-400/20"
                  >
                    <AlertCircle size={20} />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </IOSCard>
        </div>
      </div>
    </section>
  );
};
