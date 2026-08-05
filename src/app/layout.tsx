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
      <body className={`${inter.className} bg-brand-dark text-foreground antialiased`}>
        <CartProvider>
          {children}
          <CartSidebar />
        </CartProvider>
      </body>
    </html>
  );
}
