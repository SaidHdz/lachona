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
    <div className="min-h-[100dvh] flex flex-col bg-brand-dark selection:bg-brand-red/30">
      <Header currentTier={currentTier} onTierChange={setCurrentTier} />

      <main className="flex-grow w-full flex flex-col">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/90 to-brand-dark/40 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1607116176195-b81b1f41f536?q=80&w=2000&auto=format&fit=crop" 
              alt="Fondo Carniceria" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
              LA <span className="text-brand-red">CHONA</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-zinc-300 font-light"
            >
              Contamos con los mejores cortes al mejor precio.<br/>
              <span className="text-brand-red font-medium">Menudeo desde 1 kilo</span>, variedad en vitrina lista para el asador
            </motion.p>
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
            <div className="mb-8 border-b border-white/10 pb-6">
              <h2 className="text-3xl font-bold text-white mb-3">Contamos con los mejores cortes al mejor precio</h2>
              <p className="text-zinc-400 mb-2">
                Menudeo desde 1 kilo, variedad en vitrina lista para el asador.
              </p>
              <p className="text-sm text-zinc-500">
                Mostrando precios base de <strong className="text-brand-red uppercase">{currentTier.replace('_', ' ')}</strong>
              </p>
            </div>

            {isLoading ? (
              <div className="text-center text-zinc-500 py-20">Cargando cortes...</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
