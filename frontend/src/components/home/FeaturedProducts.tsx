"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/context/CartContext";
import ProductCard from "./ProductCard";
import Leaf from "./Leaf";
import BerryBlob from "./BerryBlob";

interface FeaturedProductsProps {
  products: Product[];
  handleAddToCart: (product: Product) => void;
}

export default function FeaturedProducts({ products, handleAddToCart }: FeaturedProductsProps) {
  const featured = products.slice(0, 3);

  return (
    <section id="creations" className="relative border-t border-[#1a1a1a]/10 py-20 sm:py-28">
      <div className="pointer-events-none absolute -left-4 top-24 hidden lg:block">
        <Leaf className="h-10 w-7 rotate-[15deg] opacity-60" />
      </div>
      <div className="pointer-events-none absolute right-0 top-0 hidden lg:block">
        <BerryBlob className="h-14 w-14 opacity-70" />
      </div>

      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-body text-[0.68rem] uppercase tracking-[0.25em] text-[#666666]">A little sweetness</p>
        <h2 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">Fan favorites.</h2>
        <p className="mt-4 font-body text-sm font-light leading-6 text-[#5b4048] sm:text-base">
          A small taste of what&apos;s waiting for you on the full menu.
        </p>
      </div>

      {featured.length === 0 ? (
        <p className="mt-12 text-center text-[#666666]">Loading our delicious menu...</p>
      ) : (
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {featured.map((prod, index) => (
            <ProductCard key={prod._id} product={prod} index={index} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      )}

      <div className="mt-12 flex justify-center">
        <Link
          href="/shop"
          className="inline-flex items-center gap-3 rounded-full bg-[#e0186f] px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(224,24,111,0.28)] transition-transform hover:-translate-y-1"
        >
          View full menu <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
