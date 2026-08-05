"use client";

import { motion } from "framer-motion";
import type { Product, PricingTier } from "@/lib/data";
import Image from "next/image";
import { Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  currentTier: PricingTier;
  priority?: boolean;
  index?: number;
}

export function ProductCard({ product, currentTier, priority = false, index = 0 }: ProductCardProps) {
  const currentPrice = product.prices[currentTier];
  const { addToCart } = useCart();

  return (
    <div style={{ perspective: "1000px" }} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2 }}
        className="glass-panel rounded-2xl overflow-hidden group flex flex-col h-full shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-shadow duration-300 hover:shadow-[0_20px_40px_rgba(225,29,72,0.15)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="relative h-48 w-full overflow-hidden bg-zinc-900" style={{ transform: "translateZ(20px)" }}>
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent opacity-80" />
        
        {product.isPopular && (
          <div className="absolute top-3 left-3 bg-brand-red text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wider uppercase shadow-lg">
            Más Vendido
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs font-semibold text-brand-red uppercase tracking-wider block mb-1">
              {product.category}
            </span>
            <h3 className="text-lg font-bold text-white leading-tight">
              {product.name}
            </h3>
          </div>
        </div>

        <p className="text-sm text-zinc-400 mb-4 line-clamp-2 flex-grow">
          {product.description}
        </p>

        <div className="flex items-end justify-between mt-auto pt-4 border-t border-white/5">
          <div>
            <span className="text-xs text-zinc-500 block mb-0.5">Precio {currentTier.replace('_', ' ')}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-white">${currentPrice.toFixed(2)}</span>
              <span className="text-xs text-zinc-400">/ {product.unit}</span>
            </div>
          </div>
          
          <motion.button 
            whileTap={{ scale: 0.9 }}
            onClick={() => addToCart(product)}
            className="w-10 h-10 rounded-full bg-brand-red/10 border border-brand-red text-brand-red flex items-center justify-center hover:bg-brand-red hover:text-white transition-all shadow-[0_0_15px_rgba(225,29,72,0.15)] hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]"
          >
            <Plus size={20} />
          </motion.button>
        </div>
      </div>
      </motion.div>
    </div>
  );
}
