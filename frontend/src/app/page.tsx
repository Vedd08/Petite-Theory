"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/home/HeroSection";
import DripDivider from "@/components/home/DripDivider";
import FeatureStrip from "@/components/home/FeatureStrip";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import IngredientsSection from "@/components/home/IngredientsSection";
import { useCart, Product } from "@/context/CartContext";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch products
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
      <div className="relative bg-[#fbe3e6]">
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <Navbar />
          <HeroSection />
        </div>
        <DripDivider />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <FeatureStrip />

        <FeaturedProducts
          products={products}
          handleAddToCart={handleAddToCart}
        />

        <IngredientsSection />

        <Footer />
      </div>
    </main>
  );
}
