"use client";

import { useState, useEffect } from 'react';
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProductCard } from "@/components/ui/ProductCard";
import { FilterSidebar } from "@/components/ui/FilterSidebar";
import type { Product, PricingTier } from "@/lib/data";
import { motion } from "framer-motion";
import { Beef } from 'lucide-react';

export default function Home() {
  const [currentTier, setCurrentTier] = useState<PricingTier>('menudeo');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceOrder, setPriceOrder] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error loading products:", err);
        setIsLoading(false);
      });
  }, []);

  const categories = Array.from(new Set(products.map(p => p.category)));
  
  const filteredProducts = products
    .filter(p => !selectedCategory || p.category === selectedCategory)
    .sort((a, b) => {
      const priceA = a.prices[currentTier];
      const priceB = b.prices[currentTier];
      return priceOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

  return (
    <div className="min-h-screen flex flex-col bg-transparent selection:bg-brand-red/30">
      <Header currentTier={currentTier} onTierChange={setCurrentTier} />

      <main className="flex-grow w-full flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full min-h-[70vh] md:min-h-[85vh] py-12 md:py-16 overflow-hidden px-4 md:px-8 bg-transparent flex items-center">
          
          {/* Mobile Background Image */}
          <div className="absolute inset-0 z-0 md:hidden overflow-hidden">
            <img 
              src="/images/hanging_meat.jpg" 
              alt="Fondo La Chona" 
              className="w-full h-full object-cover blur-[3px] scale-110 opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#09090b]" />
          </div>

          <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 md:gap-12 relative z-10 pt-10 md:pt-0">
            
            {/* Left: Meat Image (Hidden on Mobile, blended on Desktop) */}
            <div className="hidden md:flex w-full md:w-1/2 justify-start shrink-0">
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative w-full max-w-[600px] aspect-[4/5] pointer-events-none"
                style={{ 
                  maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)',
                  WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 75%)'
                }}
              >
                <img 
                  src="/images/hanging_meat.jpg" 
                  alt="Corte Premium La Chona" 
                  className="w-full h-full object-cover opacity-90"
                />
              </motion.div>
            </div>

            {/* Right: Text */}
            <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center">
              <motion.h1 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-7xl sm:text-8xl md:text-8xl lg:text-[9rem] font-black text-white mb-2 md:mb-6 tracking-tighter uppercase"
              >
                LA
                <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-brand-red to-red-600">
                  CHONA
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                className="mt-6 md:mt-6 border-t-2 border-brand-red md:border-t-0 md:border-l-4 pt-6 md:pt-0 md:pl-6 max-w-sm mx-auto md:mx-0"
              >
                <p className="text-lg sm:text-xl md:text-2xl text-zinc-200 font-light leading-tight md:leading-normal">
                  Contamos con los mejores cortes al mejor precio.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-zinc-400 font-light mt-3 md:mt-4 leading-relaxed">
                  <span className="text-brand-red font-semibold">Menudeo desde 1 kilo</span>, variedad en vitrina lista para el asador.
                </p>
              </motion.div>
            </div>
            
          </div>
        </section>

        {/* Catalog Layout */}
        <section className="max-w-7xl mx-auto px-4 py-16 w-full flex flex-col md:flex-row gap-8">
          <FilterSidebar 
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            priceOrder={priceOrder}
            onPriceOrderChange={setPriceOrder}
          />

          <div className="flex-1">
            <div className="mb-8 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white mb-2">Catálogo de Cortes</h2>
              <p className="text-sm text-zinc-400">
                Mostrando precios base de <strong className="text-brand-red uppercase">{currentTier.replace('_', ' ')}</strong>
              </p>
            </div>

            {isLoading ? (
              <div className="text-center text-zinc-500 py-20">Cargando cortes...</div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                {filteredProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id}
                    product={product} 
                    currentTier={currentTier} 
                    priority={index < 4}
                    index={index}
                  />
                ))}
                
                {filteredProducts.length === 0 && (
                  <div className="col-span-full py-12 text-center">
                    <p className="text-zinc-500">No se encontraron productos en esta categoría.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
