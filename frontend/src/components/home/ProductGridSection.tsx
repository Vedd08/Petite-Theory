"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/context/CartContext";
import { useMemo, useState } from "react";
import Leaf from "./Leaf";
import BerryBlob from "./BerryBlob";
import ProductCard from "./ProductCard";

interface ProductGridSectionProps {
  title?: string;
  subtitle?: string;
  showHeading?: boolean;
  products: Product[];
  handleAddToCart: (product: Product) => void;
}

export default function ProductGridSection({
  title = "Our creations.",
  subtitle = "A little sweetness",
  showHeading = true,
  products,
  handleAddToCart,
}: ProductGridSectionProps) {
  const categories = useMemo(() => {
    const unique = Array.from(new Set(products.map((p) => p.category || "Cakes")));
    return ["All", ...unique];
  }, [products]);

  const [activeCategory, setActiveCategory] = useState("All");

  const visibleProducts = activeCategory === "All"
    ? products
    : products.filter((p) => (p.category || "Cakes") === activeCategory);

  return (
    <section id="creations" className="relative border-t border-[#1a1a1a]/10 py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-4 top-24 hidden lg:block">
        <Leaf className="h-10 w-7 rotate-[15deg] opacity-60" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 hidden lg:block">
        <BerryBlob className="h-14 w-14 opacity-70" />
      </div>

      {showHeading && (
        <div className="mb-10 text-center">
          <p className="mb-4 font-body text-[0.68rem] uppercase tracking-[0.25em] text-[#666666]">{subtitle}</p>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h2>
        </div>
      )}

      {categories.length > 2 && (
        <div className="mb-10 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 rounded-full px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                activeCategory === cat
                  ? "bg-[#e0186f] text-white shadow-[0_8px_20px_rgba(224,24,111,0.28)]"
                  : "bg-white text-[#666666] hover:text-[#1a1a1a]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {showHeading && (
        <div className="mb-8 flex justify-center sm:justify-end">
          <Link href="/shop" className="inline-flex items-center gap-2 border-b border-[#1a1a1a] pb-1 font-body text-[0.68rem] uppercase tracking-[0.16em]">
            See the full menu <ArrowUpRight size={13} />
          </Link>
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {visibleProducts.length === 0 ? (
           <p className="col-span-full text-center text-[#666666]">Loading our delicious menu...</p>
        ) : visibleProducts.map((prod, index) => (
          <ProductCard key={prod._id} product={prod} index={index} handleAddToCart={handleAddToCart} />
        ))}
      </div>
    </section>
  );
}
