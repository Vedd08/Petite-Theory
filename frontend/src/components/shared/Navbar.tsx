"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X } from "lucide-react";
import gsap from "gsap";

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const cartIconRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headerRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
    });
    return () => ctx.revert();
  }, []);

  // Calculate total items in cart
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const prevTotalRef = useRef(totalItems);

  useEffect(() => {
    if (totalItems > prevTotalRef.current && cartIconRef.current) {
      gsap.fromTo(
        cartIconRef.current,
        { scale: 1 },
        { scale: 1.25, duration: 0.18, ease: "power2.out", yoyo: true, repeat: 1 }
      );
    }
    prevTotalRef.current = totalItems;
  }, [totalItems]);

  return (
    <>
      <header ref={headerRef} className="sticky top-4 z-50 flex items-center justify-between rounded-full bg-white/40 px-6 py-4 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] lg:px-10 border border-white/60 mb-6 mt-4">
        <Link href="/" className="shrink-0" aria-label="Petite Théorie home">
          <Image src="/logo-wordmark.png" alt="Petite थियोरी" width={1670} height={314} priority className="h-7 w-auto sm:h-9" />
        </Link>
        <nav className="hidden items-center gap-9 font-body text-[0.8rem] font-medium uppercase tracking-[0.18em] lg:flex" aria-label="Main navigation">
          <Link className="transition-opacity hover:opacity-55" href="/shop">Menu</Link>
          <Link className="transition-opacity hover:opacity-55" href="/#menu">Flavors</Link>
          <Link className="transition-opacity hover:opacity-55" href="/about">Our story</Link>
          <Link className="transition-opacity hover:opacity-55" href="/contact">Visit us</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/shop"
            className="hidden items-center rounded-full bg-[#e0186f] px-5 py-2.5 font-body text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_18px_rgba(224,24,111,0.28)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Order now
          </Link>
          <Link ref={cartIconRef} href="/checkout" aria-label="Shopping bag" className="relative grid size-10 place-items-center rounded-full transition-colors hover:bg-white/60">
            <ShoppingBag size={20} strokeWidth={1.6} />
            {totalItems > 0 && (
              <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-[#e0186f] text-[9px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'} className="grid size-10 place-items-center rounded-full bg-white/70 lg:hidden">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>
      {menuOpen && (
        <nav className="flex flex-col gap-5 border-t border-[#1a1a1a]/10 py-6 font-body text-sm uppercase tracking-[0.16em] lg:hidden">
          <Link href="/shop" onClick={() => setMenuOpen(false)}>Menu</Link>
          <Link href="/#menu" onClick={() => setMenuOpen(false)}>Flavors</Link>
          <Link href="/about" onClick={() => setMenuOpen(false)}>Our story</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Visit us</Link>
        </nav>
      )}
    </>
  );
}
