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
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red inline-block"></span>
            Categorías
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onSelectCategory(null)}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                selectedCategory === null
                  ? "bg-white/10 text-white font-medium border-l-2 border-brand-red"
                  : "text-zinc-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
              }`}
            >
              Todos los cortes
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedCategory === cat
                    ? "bg-white/10 text-white font-medium border-l-2 border-brand-red"
                    : "text-zinc-400 hover:text-white hover:bg-white/5 border-l-2 border-transparent"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-white/5">
          <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-red inline-block"></span>
            Ordenamiento
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => onPriceOrderChange('asc')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                priceOrder === 'asc'
                  ? "bg-white/10 text-white font-medium"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Precio: Menor a Mayor
            </button>
            <button
              onClick={() => onPriceOrderChange('desc')}
              className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${
                priceOrder === 'desc'
                  ? "bg-white/10 text-white font-medium"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
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
