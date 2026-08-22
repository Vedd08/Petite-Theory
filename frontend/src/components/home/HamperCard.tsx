"use client";

import { useRef, useState } from "react";
import { Plus, Check } from "lucide-react";
import gsap from "gsap";
import { useCart } from "@/context/CartContext";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

const WHATSAPP_NUMBER = "918866836861";

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface Hamper {
  _id: string;
  title: string;
  description: string;
  price?: number;
  imageUrl: string;
  occasion: string;
  contents: string[];
  isAvailable: boolean;
}

interface HamperCardProps {
  hamper: Hamper;
}

export default function HamperCard({ hamper }: HamperCardProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const flyRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onAdd = () => {
    if (hamper.price === undefined) return;

    addToCart({
      _id: hamper._id,
      title: hamper.title,
      description: hamper.description,
      price: hamper.price,
      imageUrl: hamper.imageUrl,
      category: hamper.occasion,
    });
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

  const contentsPreview = hamper.contents.length
    ? hamper.contents.length > 3
      ? `${hamper.contents.slice(0, 3).join(", ")} +${hamper.contents.length - 3} more`
      : hamper.contents.join(", ")
    : null;

  return (
    <article className="product-card group rounded-3xl bg-white p-3 shadow-[0_10px_40px_rgba(100,45,55,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(100,45,55,0.12)]">
      <div className="relative aspect-[9/16] overflow-hidden rounded-[1.4rem] bg-[#faf6f0]">
        <img
          src={hamper.imageUrl}
          alt={hamper.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="px-2 pb-2 pt-5">
        <span className="inline-block rounded-full bg-[#fbe3e6] px-2.5 py-0.5 font-body text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-[#6d1130]">
          {hamper.occasion}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold">{hamper.title}</h3>
        <p className="mt-1 font-body text-xs font-light text-[#666666] line-clamp-2">{hamper.description}</p>
        {contentsPreview && (
          <p className="mt-1.5 font-body text-[0.7rem] italic text-[#8a8a8a] line-clamp-1">{contentsPreview}</p>
        )}
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="font-body text-base font-semibold text-[#6d1130]">
            {hamper.price !== undefined ? `₹${hamper.price}` : "Price on request"}
          </span>
        </div>
        {hamper.price !== undefined ? (
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
        ) : (
          <a
            href={waLink(`Hi! I'd love to know the price for the "${hamper.title}" hamper.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-[#6d1130] py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#4d0c22]"
          >
            <WhatsAppIcon size={14} /> Ask for price
          </a>
        )}
      </div>
    </article>
  );
}
