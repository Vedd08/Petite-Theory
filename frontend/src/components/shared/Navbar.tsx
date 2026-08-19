"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Menu, X, ArrowUpRight } from "lucide-react";
import gsap from "gsap";

const NAV_LINKS = [
  { href: "/shop", label: "Menu" },
  { href: "/#menu", label: "Flavors" },
  { href: "/about", label: "Our story" },
  { href: "/contact", label: "Visit us" },
];

export default function Navbar() {
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const cartIconRef = useRef<HTMLAnchorElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (menuOpen && mobilePanelRef.current) {
      gsap.fromTo(
        mobilePanelRef.current,
        { opacity: 0, y: -12 },
        { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
      );
    }
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        ref={headerRef}
        className="sticky top-4 z-50 flex items-center justify-between rounded-full border border-white/60 bg-white/40 px-4 py-3.5 backdrop-blur-md shadow-[0_8px_30px_rgb(0,0,0,0.04)] mb-6 mt-4 sm:px-6 sm:py-4 lg:px-10"
      >
        <Link href="/" className="shrink-0" aria-label="Petite Théorie home">
          <Image src="/logo-wordmark.png" alt="Petite थियोरी" width={1670} height={314} priority className="h-6 w-auto sm:h-7 lg:h-9" />
        </Link>
        <nav className="hidden items-center gap-9 font-body text-[0.8rem] font-medium uppercase tracking-[0.18em] lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} className="transition-opacity hover:opacity-55" href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/shop"
            className="hidden items-center rounded-full bg-[#e0186f] px-5 py-2.5 font-body text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_18px_rgba(224,24,111,0.28)] transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Order now
          </Link>
          <Link ref={cartIconRef} href="/checkout" aria-label="Shopping bag" className="relative grid size-9 shrink-0 place-items-center rounded-full transition-colors hover:bg-white/60 sm:size-10">
            <ShoppingBag size={19} strokeWidth={1.6} />
            {totalItems > 0 && (
              <span className="absolute right-0 top-0 grid size-4 place-items-center rounded-full bg-[#e0186f] text-[9px] text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="grid size-9 shrink-0 place-items-center rounded-full bg-white/70 transition-colors hover:bg-white sm:size-10 lg:hidden"
          >
            {menuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          ref={mobilePanelRef}
          className="fixed inset-x-5 top-[5.75rem] z-40 overflow-hidden rounded-[1.75rem] border border-white/60 bg-white/95 shadow-[0_25px_60px_rgba(109,17,48,0.18)] backdrop-blur-md sm:inset-x-8 lg:hidden"
        >
          <nav className="flex flex-col divide-y divide-[#1a1a1a]/[0.06] font-body text-sm font-medium uppercase tracking-[0.16em]" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-6 py-4 text-[#1a1a1a] transition-colors hover:bg-[#fbe3e6]/50"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-[#1a1a1a]/[0.06] px-5 py-5">
            <Link
              href="/shop"
              onClick={() => setMenuOpen(false)}
              className="flex items-center justify-center gap-2 rounded-full bg-[#e0186f] px-5 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_8px_18px_rgba(224,24,111,0.28)]"
            >
              Order now <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      )}

      {menuOpen && (
        <button
          aria-label="Close menu overlay"
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 z-30 bg-[#1a1a1a]/10 backdrop-blur-[1px] lg:hidden"
        />
      )}
    </>
  );
}
