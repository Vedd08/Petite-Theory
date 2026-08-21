import type { Metadata } from "next";
import { CartProvider } from "@/context/CartContext";
import WhatsAppWidget from "@/components/shared/WhatsAppWidget";
import "./globals.css";

export const metadata: Metadata = {
  title: "Petite थियोरी | Minimalist Artisanal Cakes",
  description: "Minimalist treats for every occasion, baked with love and fresh ingredients.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <CartProvider>
          {children}
          <WhatsAppWidget />
        </CartProvider>
      </body>
    </html>
  );
}
