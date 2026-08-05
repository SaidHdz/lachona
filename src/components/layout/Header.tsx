"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Beef, ShoppingCart, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import type { PricingTier } from "@/lib/data";
import { useCart } from "@/context/CartContext";

interface HeaderProps {
  currentTier: PricingTier;
  onTierChange: (tier: PricingTier) => void;
}

export function Header({ currentTier, onTierChange }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCartOpen, totalItems } = useCart();

  const tiers: { id: PricingTier; label: string }[] = [
    { id: "menudeo", label: "Menudeo" },
    { id: "medio_mayoreo", label: "Medio Mayoreo" },
    { id: "mayoreo", label: "Mayoreo" }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-zinc-950/60 backdrop-blur-2xl border-b border-white/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            className="w-10 h-10 rounded-full bg-brand-red flex items-center justify-center text-white shadow-[0_0_15px_rgba(225,29,72,0.5)]"
          >
            <Beef size={24} />
          </motion.div>
          <div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white m-0">
              Distribuidora La Chona
            </h1>
            <p className="text-[10px] md:text-xs text-zinc-400 m-0">Distribuidora de carne</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-white hover:text-brand-red transition-colors">Catálogo</Link>
          <Link href="#contacto" className="text-sm font-medium text-zinc-300 hover:text-brand-red transition-colors">Contacto</Link>
        </nav>

        {/* Pricing Tier Selector & Actions (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <div className="flex bg-zinc-900 rounded-full p-1 border border-white/5">
            {tiers.map((tier) => (
              <button
                key={tier.id}
                onClick={() => onTierChange(tier.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-300 ${
                  currentTier === tier.id
                    ? "bg-brand-red text-white shadow-lg"
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-zinc-300 hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-[9px] font-bold text-white flex items-center justify-center rounded-full shadow-lg">
                {totalItems}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-zinc-300 hover:text-white transition-colors"
          >
            <ShoppingCart size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-[9px] font-bold text-white flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          <button 
            className="p-2 text-zinc-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 bg-brand-dark overflow-hidden"
          >
            <div className="px-4 py-6 space-y-6">
              <nav className="flex flex-col gap-4">
                <Link 
                  href="/" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-white hover:text-brand-red transition-colors"
                >
                  Catálogo
                </Link>
                <Link 
                  href="#contacto" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-base font-medium text-zinc-300 hover:text-brand-red transition-colors"
                >
                  Contacto
                </Link>
              </nav>

              <div className="pt-6 border-t border-white/5">
                <p className="text-xs font-semibold text-zinc-500 uppercase mb-3">Modalidad de Precio</p>
                <div className="flex flex-col gap-2">
                  {tiers.map((tier) => (
                    <button
                      key={tier.id}
                      onClick={() => {
                        onTierChange(tier.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-left px-4 py-3 text-sm font-semibold rounded-lg transition-all duration-300 ${
                        currentTier === tier.id
                          ? "bg-brand-red text-white shadow-lg"
                          : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10"
                      }`}
                    >
                      {tier.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
