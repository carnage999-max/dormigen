"use client";

import { CONTENT } from "../constants/content";
import Image from "next/image";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy border-t border-white/5 py-20 relative z-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center space-x-3 mb-8">
            <Image
              src="/dormigen-logo.png"
              alt="Dormigen Logo"
              width={64}
              height={64}
              className="object-contain w-12 h-12 md:w-16 md:h-16"
            />
            <span className="text-2xl font-bold tracking-tighter font-manrope text-white">
              DORMIGEN®
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-16 text-white text-sm font-medium">
            <a href="#outcomes" className="hover:text-medical transition-colors">Outcomes</a>
            <a href="#conditions" className="hover:text-medical transition-colors">Conditions</a>
            <a href="#science" className="hover:text-medical transition-colors">Science</a>
            <a href="#product" className="hover:text-medical transition-colors">Product</a>
            <a href="#faq" className="hover:text-medical transition-colors">FAQ</a>
            <a href="#contact" className="hover:text-medical transition-colors">Contact</a>
          </div>

          <div className="max-w-3xl border-t border-white/5 pt-12">
            {CONTENT.footer.legal.map((text, i) => (
              <p key={i} className="text-sm text-white/90 mb-4 leading-relaxed">
                {text.replace("2024", currentYear.toString())}
              </p>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
