"use client";

import { useRef, useState } from "react";
import { Plus, Check } from "lucide-react";
import gsap from "gsap";
import { Product } from "@/context/CartContext";

interface ProductCardProps {
  product: Product;
  index?: number;
  handleAddToCart: (product: Product) => void;
}

export default function ProductCard({ product, index = 0, handleAddToCart }: ProductCardProps) {
  const [added, setAdded] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const flyRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onAdd = () => {
    handleAddToCart(product);
    setAdded(true);

    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 1 },
        { scale: 1.07, duration: 0.16, ease: "power2.out", yoyo: true, repeat: 1 }
      );
    }
    if (flyRef.current) {
      gsap.fromTo(
        flyRef.current,
        { y: 0, opacity: 1, scale: 0.8 },
        { y: -34, opacity: 0, scale: 1.1, duration: 0.7, ease: "power2.out" }
      );
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setAdded(false), 1400);
  };

  return (
    <article className="product-card group rounded-3xl bg-white p-3 shadow-[0_10px_40px_rgba(100,45,55,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(100,45,55,0.12)]">
      <div className={`relative aspect-[1.08/1] overflow-hidden rounded-[1.4rem] ${index % 2 === 0 ? 'bg-[#fbe3e6]' : 'bg-[#e2e4e4]'}`}>
        <img
          src={product.imageUrl || "/cakes/cake-6.png"}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="px-2 pb-2 pt-5">
        <h3 className="font-display text-xl font-semibold">{product.title}</h3>
        <p className="mt-1 font-body text-xs font-light text-[#666666] line-clamp-2">{product.description}</p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-body text-base font-semibold text-[#6d1130]">₹{product.price}</span>
        </div>
        <button
          ref={btnRef}
          onClick={onAdd}
          className={`relative mt-3 flex w-full items-center justify-center gap-2 rounded-full py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors ${
            added ? "bg-[#1fa855]" : "bg-[#e0186f] hover:bg-[#c01260]"
          }`}
        >
          <span ref={flyRef} className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-body text-xs font-bold text-[#1fa855] opacity-0">
            +1
          </span>
          {added ? (
            <>
              Added <Check size={14} />
            </>
          ) : (
            <>
              Add to cart <Plus size={14} />
            </>
          )}
        </button>
      </div>
    </article>
  );
}
