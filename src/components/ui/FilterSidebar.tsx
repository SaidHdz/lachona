"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";

interface FilterSidebarProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  priceOrder: 'asc' | 'desc';
  onPriceOrderChange: (order: 'asc' | 'desc') => void;
}

export function FilterSidebar({
  categories,
  selectedCategory,
  onSelectCategory,
  priceOrder,
  onPriceOrderChange
}: FilterSidebarProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="md:hidden w-full mb-4">
        <button 
          onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
          className="w-full glass-panel py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-sm font-semibold text-white"
        >
          <SlidersHorizontal size={18} />
          {mobileFiltersOpen ? "Ocultar Filtros" : "Mostrar Filtros"}
        </button>
      </div>

      {/* Sidebar Content (Hidden on mobile unless toggled, always visible on desktop) */}
      <aside className={`w-full md:w-64 flex-shrink-0 flex-col gap-8 glass-panel p-6 rounded-2xl h-fit sticky top-28 ${mobileFiltersOpen ? 'flex' : 'hidden md:flex'}`}>
        <div>
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            Categorías
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onSelectCategory(null)}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                selectedCategory === null
                  ? "bg-white/10 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
              }`}
            >
              Todos los cortes
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-white/10 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4 flex items-center gap-2">
            Ordenamiento
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onPriceOrderChange('asc')}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                priceOrder === 'asc'
                  ? "bg-white/10 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
              }`}
            >
              Precio: Menor a Mayor
            </button>
            <button
              onClick={() => onPriceOrderChange('desc')}
              className={`block w-full text-left px-4 py-2 rounded-lg text-sm transition-all duration-300 ${
                priceOrder === 'desc'
                  ? "bg-white/10 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.03)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 hover:translate-x-1"
              }`}
            >
              Precio: Mayor a Menor
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
