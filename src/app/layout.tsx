import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Distribuidora La Chona | Carnes de Alta Calidad",
  description: "Distribuidora y comercializadora de productos cárnicos (Res, Cerdo y Pollo) para restaurantes, taquerías y público general en Reynosa, Tamaulipas.",
};

import { CartProvider } from "@/context/CartContext";
import { CartSidebar } from "@/components/ui/CartSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} text-foreground antialiased min-h-screen relative bg-brand-dark`}>
        
        {/* Global smoky/textured background from the hero image */}
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          {/* Base dark color */}
          <div className="absolute inset-0 bg-brand-dark/70 z-10"></div>
          {/* Gradients to keep the top darker for the header */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 via-brand-dark/60 to-brand-dark z-10"></div>
          {/* The image providing the texture */}
          <img 
            src="/images/hanging_meat.jpg" 
            alt="" 
            className="w-full h-full object-cover opacity-40 blur-[15px] scale-110 mix-blend-luminosity"
          />
        </div>

        <CartProvider>
          <div className="relative z-0">
            {children}
          </div>
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
