"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import HeroSection from "@/components/home/HeroSection";
import DiwaliHero from "@/components/home/hero/DiwaliHero";
import FeatureStrip from "@/components/home/FeatureStrip";
import DiwaliEdit from "@/components/home/DiwaliEdit";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import DripDivider from "@/components/home/DripDivider";
import MenuShowcase from "@/components/home/MenuShowcase";
import PastelBackdrop from "@/components/festive/PastelBackdrop";
import { Product } from "@/components/home/ProductCard";
import { FESTIVE } from "@/config/theme";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/products`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data.sort((a: Product, b: Product) => (a.price || 0) - (b.price || 0)));
        }
      })
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-surface text-[#1a1a1a]">
      <div className="relative bg-band ">
        {FESTIVE && <PastelBackdrop />}
        <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
          <Navbar />
          {FESTIVE ? <DiwaliHero /> : <HeroSection />}
        </div>
        <DripDivider flip />
      </div>

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <FeatureStrip />

        {FESTIVE && <DiwaliEdit />}

        <FeaturedProducts products={products} />

        <MenuShowcase />

        <Footer />
      </div>
    </main>
  );
}
