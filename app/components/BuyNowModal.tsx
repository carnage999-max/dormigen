"use client";

import { useState } from "react";
import { CONTENT } from "../constants/content";
import { X, Plus, Minus, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface BuyNowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BuyNowModal = ({ isOpen, onClose }: BuyNowModalProps) => {
  const [selectedBundle, setSelectedBundle] = useState("single");
  const [subscribe, setSubscribe] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const calculateTotal = () => {
    const prices = { single: 69, "2-pack": 125, family: 220 };
    const base = prices[selectedBundle as keyof typeof prices] * quantity;
    const discount = subscribe ? base * 0.15 : 0;
    return (base - discount).toFixed(2);
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          bundleId: selectedBundle,
          quantity,
          subscribe,
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Checkout failed. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-navy/80 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-2xl ios-card p-0 overflow-hidden shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between p-6 border-b border-white/5">
            <h2 className="text-2xl font-bold font-manrope">{CONTENT.buyNow.title}</h2>
            <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white">
              <X size={24} />
            </button>
          </div>

          <div className="p-8 space-y-8 overflow-y-auto max-h-[80vh]">
            {/* Bundle Selector */}
            <div className="space-y-4">
              <label className="text-sm font-bold text-silver/40 uppercase tracking-widest">Select Bundle</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {CONTENT.buyNow.bundles.map((bundle) => (
                  <button
                    key={bundle.id}
                    onClick={() => setSelectedBundle(bundle.id)}
                    className={cn(
                      "p-4 rounded-2xl border transition-all text-left relative overflow-hidden text-white",
                      selectedBundle === bundle.id
                        ? "bg-medical/10 border-medical ring-2 ring-medical/20 font-bold"
                        : "bg-white/5 border-white/10 hover:border-white/20"
                    )}
                  >
                    {bundle.savings && (
                      <div className="absolute top-0 right-0 bg-medical text-[10px] font-bold px-2 py-0.5 rounded-bl-lg">
                        {bundle.savings}
                      </div>
                    )}
                    <div className="font-bold mb-1">{bundle.name}</div>
                    <div className="text-xl font-manrope font-bold text-medical">{bundle.price}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Subscription Toggle */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
              <div>
                <div className="font-bold text-white">Subscribe & Save 15%</div>
                <div className="text-sm text-silver/60">Auto-shipped every 30 days. Cancel anytime.</div>
              </div>
              <button
                onClick={() => setSubscribe(!subscribe)}
                className={cn(
                  "w-12 h-6 rounded-full transition-colors relative",
                  subscribe ? "bg-medical" : "bg-white/10"
                )}
              >
                <motion.div
                  animate={{ x: subscribe ? 24 : 4 }}
                  className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                />
              </button>
            </div>

            {/* Quantity */}
            <div className="space-y-4 text-white">
              <label className="text-sm font-bold text-silver/40 uppercase tracking-widest">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                >
                  <Minus size={20} />
                </button>
                <span className="text-xl font-bold w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>

            {/* Checkout Summary Stub */}
            <div className="pt-8 border-t border-white/5">
              <div className="flex items-center justify-between mb-6">
                <div className="text-silver/60">Total (Excl. Tax)</div>
                <div className="text-3xl font-bold font-manrope text-white">${calculateTotal()}</div>
              </div>
              <button 
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-medical hover:bg-mid-blue disabled:opacity-50 text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl hover:shadow-medical/30 flex items-center justify-center gap-3 active:scale-95"
              >
                {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Check size={24} />}
                {isLoading ? "Redirecting..." : "Complete Purchase"}
              </button>
              <p className="text-center text-xs text-silver/30 mt-4">
                Payments are securely processed via Stripe.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
