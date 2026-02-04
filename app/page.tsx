"use client";

import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { OutcomesSection } from "./components/OutcomesSection";
import { ScienceSection } from "./components/ScienceSection";
import { ProductSection } from "./components/ProductSection";
import { FAQSection } from "./components/FAQSection";
import { ContactForm } from "./components/ContactForm";
import { Footer } from "./components/Footer";
import { BuyNowModal } from "./components/BuyNowModal";
import { ConditionsSection } from "./components/ConditionsSection";

export default function Home() {
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);

  // Strictly targeted click handler
  const handleGlobalClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // 1. Never trigger from hero background clicks
    if (target.closest('#hero') && !target.closest('button')) {
      return;
    }

    // 2. Only trigger for explicit "Buy Now" text/links outside the hero
    if (target.closest('[href="#buy"]') || (target.textContent?.includes("Buy Now") && !target.closest('#hero'))) {
      e.preventDefault();
      setIsBuyModalOpen(true);
    }
  };

  return (
    <main onClick={handleGlobalClick}>
      <Navbar />
      <Hero onBuyClick={() => setIsBuyModalOpen(true)} />
      <div id="outcomes">
        <OutcomesSection />
      </div>
      <ConditionsSection />
      <div id="science">
        <ScienceSection />
      </div>
      <div id="product">
        <ProductSection />
      </div>
      <div id="faq">
        <FAQSection />
      </div>
      <div id="contact">
        <ContactForm />
      </div>
      <Footer />

      <BuyNowModal 
        isOpen={isBuyModalOpen} 
        onClose={() => setIsBuyModalOpen(false)} 
      />
    </main>
  );
}
