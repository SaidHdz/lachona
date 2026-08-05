"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, Info } from "lucide-react";
import { useCart } from "@/context/CartContext";
import Image from "next/image";

export function CartSidebar() {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeFromCart, getAppliedTier, getItemPrice, cartTotal, totalItems } = useCart();

  const tierNames = {
    menudeo: "Menudeo",
    medio_mayoreo: "Medio Mayoreo",
    mayoreo: "Mayoreo"
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-950 border-l border-white/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10 bg-brand-dark">
              <div className="flex items-center gap-3">
                <ShoppingBag className="text-brand-red" />
                <h2 className="text-lg font-bold text-white">Tu Pedido</h2>
                <span className="bg-brand-red text-white text-xs font-bold px-2 py-0.5 rounded-full">
                  {totalItems}
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5"
              >
                <X size={20} />
              </button>
            </div>

            {/* Informational Banner */}
            <div className="bg-brand-red/10 border-b border-brand-red/20 p-4 flex gap-3 items-start text-sm">
              <Info className="text-brand-red shrink-0" size={18} />
              <p className="text-zinc-300 leading-tight">
                <strong className="text-white">¡Ahorra comprando por volumen!</strong><br />
                <span className="text-brand-red">5 a 9 pzas:</span> Precio Medio Mayoreo.<br />
                <span className="text-brand-red">10+ pzas:</span> Precio Mayoreo.
              </p>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-zinc-500 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Tu carrito está vacío.</p>
                </div>
              ) : (
                items.map((item) => {
                  const appliedTier = getAppliedTier(totalItems);
                  const unitPrice = item.product.prices[appliedTier];
                  const totalPrice = getItemPrice(item, appliedTier);
                  
                  return (
                    <div key={item.product.id} className="flex gap-4 p-4 rounded-xl glass-panel relative group">
                      <div className="w-20 h-20 relative rounded-lg overflow-hidden shrink-0 bg-zinc-900 border border-white/5">
                        <Image
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-white text-sm line-clamp-1">{item.product.name}</h3>
                            <button 
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-zinc-500 hover:text-brand-red transition-colors ml-2"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          
                          <div className="mt-1 flex items-center gap-2">
                            <span className="text-xs text-zinc-400 border border-white/10 px-2 py-0.5 rounded text-brand-red">
                              {tierNames[appliedTier]}
                            </span>
                            <span className="text-xs text-zinc-500">${unitPrice.toFixed(2)} / {item.product.unit}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center border border-white/10 rounded-lg bg-black/50 overflow-hidden">
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >-</button>
                            <span className="w-8 text-center text-sm font-medium text-white">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                            >+</button>
                          </div>
                          <div className="flex flex-col items-end">
                            {appliedTier !== 'menudeo' && (
                              <span className="text-[10px] text-zinc-500 line-through">
                                ${(item.product.prices.menudeo * item.quantity).toFixed(2)}
                              </span>
                            )}
                            <span className="font-bold text-white">${totalPrice.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-white/10 bg-brand-dark/80 backdrop-blur-md">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-zinc-400">Total Calculado</span>
                  <span className="text-2xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full bg-brand-red text-white font-semibold py-4 rounded-xl shadow-[0_0_20px_rgba(225,29,72,0.3)] hover:shadow-[0_0_30px_rgba(225,29,72,0.5)] transition-all flex justify-center items-center gap-2 hover:-translate-y-1">
                  Continuar por WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
