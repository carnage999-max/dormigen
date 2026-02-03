"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Download, Share2, Info, Maximize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface PremiumLightboxProps {
  src: string;
  alt: string;
  title: string;
  description: string;
  className?: string;
}

export const ImageLightbox = ({ src, alt, title, description, className }: PremiumLightboxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(src);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title.toLowerCase().replace(/\s+/g, "-")}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Dormigen - ${title}`,
          text: description,
          url: window.location.href,
        });
      } catch (error) {
        console.error("Share failed:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Clipboard failed:", error);
      }
    }
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[99999] bg-black flex flex-col lg:flex-row overflow-hidden"
          onClick={() => setIsOpen(false)}
        >
          {/* Main Visual - Left/Center */}
          <div className="relative flex-1 bg-black flex items-center justify-center p-4 lg:p-12 overflow-hidden h-[60vh] lg:h-full">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              <Image
                src={src}
                alt={alt}
                fill
                priority
                className="object-contain"
                quality={100}
              />
            </motion.div>
          </div>

          {/* Details Panel - Right */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 200, mass: 0.8 }}
            className="w-full lg:w-[450px] bg-white h-[40vh] lg:h-full flex flex-col p-8 lg:p-12 shadow-[-20px_0_50px_rgba(0,0,0,0.5)] z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-8 lg:mb-12">
              <div className="flex gap-3">
                <button 
                  onClick={handleShare}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-navy"
                  title="Share"
                >
                  <Share2 size={20} />
                </button>
                <button 
                  onClick={handleDownload}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors text-navy"
                  title="Download"
                >
                  <Download size={20} />
                </button>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-3 bg-navy/5 hover:bg-navy/10 rounded-full text-navy transition-colors lg:flex hidden"
              >
                <X size={24} />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 lg:hidden text-navy"
              >
                <X size={28} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-medical" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-medical">Core Outcome Visualization</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy mb-6 leading-tight font-manrope">
                {title}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8 text-[15px]">
                {description}
              </p>

              <div className="p-6 bg-medical/5 rounded-3xl border border-medical/10 mb-8 mt-auto">
                <div className="flex gap-4 items-start">
                  <Info className="text-medical shrink-0 mt-1" size={20} />
                  <div>
                    <span className="font-bold text-navy block mb-1 text-sm">Clinical Summary</span>
                    <p className="text-xs lg:text-sm text-gray-700 leading-relaxed">
                      Dormigen® utilizes proprietary bioavailability enhancers to ensure targeted delivery of its antiviral nutrient complex.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Thumbnail */}
      <div 
        className={cn("relative group cursor-zoom-in w-full h-full min-h-[300px] overflow-hidden rounded-[inherit] bg-navy/20", className)}
        onClick={() => setIsOpen(true)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-contain transition-transform duration-700 group-hover:scale-105 p-4"
        />
        <div className="absolute inset-0 bg-navy/0 group-hover:bg-navy/40 transition-all duration-500" />
        
        {/* Hover UI */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
           <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm shadow-2xl flex items-center gap-2">
             <Maximize2 size={16} />
             Inspect Outcome
           </div>
        </div>
      </div>

      {/* Modal Portal - This fixes the flickering/clipping bug by moving the modal out of the clip-path parents */}
      {mounted && createPortal(modalContent, document.body)}
    </>
  );
};
