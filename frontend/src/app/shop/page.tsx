"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/shared/PageHeader";
import ProductGridSection from "@/components/home/ProductGridSection";
import { useCart, Product } from "@/context/CartContext";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#1a1a1a]">
      <PageHeader
        eyebrow="Full menu"
        title="All our creations"
        subtitle="Every cake we bake, in one place. Pick your favorite and we'll take care of the rest."
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <ProductGridSection showHeading={false} products={products} handleAddToCart={handleAddToCart} />
        <Footer />
      </div>
    </main>
  );
}
