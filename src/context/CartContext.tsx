"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Product, PricingTier } from "@/lib/data";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getAppliedTier: (quantity: number) => PricingTier;
  getItemPrice: (item: CartItem, globalTier: PricingTier) => number;
  cartTotal: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [globalTier, setGlobalTier] = useState<PricingTier>('menudeo');

  // #-----Logica para determinar el nivel de precio segun la cantidad TOTAL del pedido-----
  const getAppliedTier = (totalQty: number): PricingTier => {
    if (totalQty >= 10) return 'mayoreo';
    if (totalQty >= 5) return 'medio_mayoreo';
    return 'menudeo';
  };

  const getItemPrice = (item: CartItem, tier: PricingTier): number => {
    return item.product.prices[tier] * item.quantity;
  };

  useEffect(() => {
    const newTotalItems = items.reduce((total, item) => total + item.quantity, 0);
    const newTier = getAppliedTier(newTotalItems);
    const newTotal = items.reduce((total, item) => total + getItemPrice(item, newTier), 0);
    
    setTotalItems(newTotalItems);
    setGlobalTier(newTier);
    setCartTotal(newTotal);
  }, [items]);

  const addToCart = (product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{
        items,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getAppliedTier,
        getItemPrice,
        cartTotal,
        totalItems
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
