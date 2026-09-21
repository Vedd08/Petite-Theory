"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { gsap } from "gsap";
import { heroBanners } from "@/data/heroBanners";
import LotusRule from "@/components/festive/LotusRule";
import RoseGoldMandala from "@/components/festive/RoseGoldMandala";

export default function DiwaliHero() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isPageHidden, setIsPageHidden] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setPrefersReducedMotion(reduced);

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.intersectionRatio > 0.5),
      { threshold: 0.5 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);

    const handleVisibilityChange = () => setIsPageHidden(document.hidden);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion && textRef.current && sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".animate-line", {
          y: 16,
          opacity: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power2.out",
        });

        gsap.from(".stage-container", {
          opacity: 0,
          duration: 1,
          ease: "power2.out",
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, [prefersReducedMotion]);

  const n = heroBanners.length;
  const goNext = () => setActiveIdx((prev) => (prev + 1) % n);
  const goPrev = () => setActiveIdx((prev) => (prev - 1 + n) % n);

  const effectivelyPaused = isUserPaused || isHovered || isFocused || !isVisible || isPageHidden || prefersReducedMotion;

  const handlePointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
    setIsSwiping(false);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (startX.current === null || startY.current === null) return;
    const dx = e.clientX - startX.current;
    const dy = e.clientY - startY.current;
    startX.current = null;
    startY.current = null;
    
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
      setIsSwiping(true);
      if (dx > 0) goPrev();
      else goNext();
    }
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (isSwiping) {
      e.preventDefault();
      e.stopPropagation();
      setIsSwiping(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") goPrev();
    if (e.key === "ArrowRight") goNext();
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (!sectionRef.current?.contains(e.relatedTarget as Node)) {
      setIsFocused(false);
    }
  };

  const renderCaption = (isDesktop: boolean) => (
    <div 
      className={isDesktop 
        ? "hidden lg:block mt-7 w-full max-w-[26rem] border-t border-deep-rose/15 pt-5 animate-line opacity-100" 
        : "lg:hidden mt-6 w-full"
      }
      aria-live={effectivelyPaused ? "polite" : "off"}
    >
      <div className={`grid ${isDesktop ? "justify-items-start" : "justify-items-center text-center"}`}>
        {heroBanners.map((banner, i) => {
          const isActive = i === activeIdx;
          return (
            <div 
              key={banner.id}
              aria-hidden={!isActive}
              // @ts-expect-error React 19 boolean inert
              inert={!isActive}
              className={`col-start-1 row-start-1 flex flex-col ${isDesktop ? "items-start" : "items-center"} transition-opacity ${prefersReducedMotion ? 'duration-150' : 'duration-900'} ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            >
              <span className="font-body text-xs tracking-[0.2em] text-plum">
                {String(i + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
              </span>
              <p className="mt-2 font-display italic text-xl text-deep-rose whitespace-nowrap">
                {banner.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-body text-[0.65rem] uppercase tracking-[0.18em] text-plum/80">
                  {banner.detail}
                </span>
                <span className="w-1 h-1 rounded-full bg-gold shrink-0" />
                <Link href={banner.href} className="flex items-center gap-0.5 text-[0.65rem] uppercase tracking-widest text-deep-rose hover:text-raspberry transition-colors">
                  View <ArrowUpRight size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderControls = (isDesktop: boolean) => (
    <div 
      className={isDesktop 
        ? "hidden lg:flex absolute bottom-7 right-8 xl:right-10 z-20 items-center gap-2 rounded-full bg-white/65 p-1.5 ring-1 ring-deep-rose/10 backdrop-blur-md shadow-[0_8px_24px_rgba(123,30,58,0.12)]"
        : "lg:flex flex items-center gap-2 rounded-full bg-white/65 p-1.5 ring-1 ring-deep-rose/10 backdrop-blur-md shadow-[0_8px_24px_rgba(123,30,58,0.12)] mt-5 mx-auto w-fit"
      }
    >
      <button 
        onClick={goPrev}
        aria-label="Previous product"
        className="grid size-9 place-items-center rounded-full text-deep-rose hover:bg-white/50 transition-colors"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="h-[2px] w-14 bg-deep-rose/15 overflow-hidden relative rounded-full">
        <div
          key={activeIdx}
          className="h-full w-full bg-deep-rose origin-left motion-reduce:hidden"
          style={{
            animation: "hero-progress 6s linear forwards",
            animationPlayState: effectivelyPaused ? "paused" : "running"
          }}
          onAnimationEnd={goNext}
        />
      </div>

      <button 
        onClick={goNext}
        aria-label="Next product"
        className="grid size-9 place-items-center rounded-full text-deep-rose hover:bg-white/50 transition-colors"
      >
        <ChevronRight size={20} />
      </button>

      <div className="h-4 w-px bg-deep-rose/15" />

      <button
        onClick={() => setIsUserPaused(!isUserPaused)}
        aria-label={isUserPaused ? "Play carousel" : "Pause carousel"}
        aria-pressed={isUserPaused}
        className="grid size-9 place-items-center rounded-full text-deep-rose hover:bg-white/50 transition-colors motion-reduce:hidden"
      >
        {isUserPaused ? <Play size={16} className="fill-current" /> : <Pause size={16} className="fill-current" />}
      </button>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative z-10 lg:mt-2 mb-10 lg:mb-14"
      aria-roledescription="carousel"
      aria-label="Diwali collection"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      <div ref={textRef}>
        {/* Mobile Text Content */}
        <div className="lg:hidden flex flex-col items-center text-center py-8">
          <div className="animate-line opacity-100 w-full flex items-center gap-3 justify-center">
            <LotusRule className="text-gold" />
            <p className="font-body text-[0.68rem] uppercase tracking-[0.3em] text-deep-rose/80 shrink-0">
              The Diwali Edit · 2026
            </p>
            <LotusRule className="text-gold" />
          </div>

          <p className="animate-line opacity-100 mt-6" lang="hi">
            <span className="font-brand text-raspberry text-[clamp(1.75rem,3vw,2.5rem)]">
              शुभ दीपावली
            </span>
          </p>

          <h1 className="animate-line opacity-100 mt-4 font-display font-semibold text-deep-rose leading-[1.02] tracking-[-0.03em] text-[clamp(2.4rem,3.6vw,4rem)]">
            Festive moments, <em className="font-normal text-italic text-raspberry">sweeter</em> together.
          </h1>

          <p className="animate-line opacity-100 mt-5 font-body font-light text-plum max-w-md leading-7 mx-auto">
            Handcrafted hampers, truffles and brownies for the festival of lights, baked in small batches in our Surat kitchen.
          </p>

          <div className="animate-line opacity-100 mt-8 flex flex-wrap gap-4 justify-center">
            <Link
              href="/hampers"
              className="flex items-center gap-2 rounded-full bg-deep-rose px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-peach shadow-[0_12px_28px_rgba(123,30,58,0.25)] hover:bg-raspberry transition-colors"
            >
              Shop Diwali hampers <ArrowUpRight size={14} />
            </Link>
            <a
              href="https://wa.me/918866836861?text=Hi%20Petite%20Theory!%20I'd%20like%20to%20order%20Diwali%20hampers."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-deep-rose/30 bg-white/50 backdrop-blur-sm px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-deep-rose hover:bg-white/80 transition-colors"
            >
              Order on WhatsApp
            </a>
          </div>
        </div>

        <div 
          className="stage-container relative isolate overflow-hidden rounded-[1.75rem] lg:rounded-[2.5rem] bg-stage ring-1 ring-gold/30 shadow-[0_30px_80px_rgba(123,30,58,0.18)] aspect-[9/10] md:aspect-[4/3] lg:aspect-auto lg:h-[clamp(560px,76vh,760px)] w-full touch-pan-y flex flex-col lg:flex-row"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          onClickCapture={handleClickCapture}
        >
          {/* Desktop Text Column */}
          <div className="hidden lg:flex relative z-20 h-full w-[46%] max-w-[36rem] flex-col justify-center pl-12 xl:pl-16">
            <div className="animate-line opacity-100 w-full flex items-center gap-3 justify-start">
              <LotusRule className="text-gold" />
              <p className="font-body text-[0.68rem] uppercase tracking-[0.3em] text-deep-rose/80 shrink-0">
                The Diwali Edit · 2026
              </p>
              <LotusRule className="text-gold hidden xl:block" />
            </div>

            <p className="animate-line opacity-100 mt-6" lang="hi">
              <span className="font-brand text-raspberry text-[clamp(1.75rem,3vw,2.5rem)]">
                शुभ दीपावली
              </span>
            </p>

            <h1 className="animate-line opacity-100 mt-4 font-display font-semibold text-deep-rose leading-[1.02] tracking-[-0.03em] text-[clamp(2.4rem,3.6vw,4rem)]">
              Festive moments, <em className="font-normal text-italic text-raspberry">sweeter</em> together.
            </h1>

            <p className="animate-line opacity-100 mt-5 font-body font-light text-plum max-w-md leading-7 hidden xl:block">
              Handcrafted hampers, truffles and brownies for the festival of lights, baked in small batches in our Surat kitchen.
            </p>

            <div className="animate-line opacity-100 mt-8 flex flex-wrap gap-4 justify-start">
              <Link
                href="/hampers"
                className="flex items-center gap-2 rounded-full bg-deep-rose px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-peach shadow-[0_12px_28px_rgba(123,30,58,0.25)] hover:bg-raspberry transition-colors"
              >
                Shop Diwali hampers <ArrowUpRight size={14} />
              </Link>
              <a
                href="https://wa.me/918866836861?text=Hi%20Petite%20Theory!%20I'd%20like%20to%20order%20Diwali%20hampers."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-full border border-deep-rose/30 bg-white/50 backdrop-blur-sm px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-deep-rose hover:bg-white/80 transition-colors"
              >
                Order on WhatsApp
              </a>
            </div>

            {renderCaption(true)}
          </div>

          {/* Scrim for desktop */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-[62%] bg-gradient-to-r from-stage via-stage/80 to-transparent z-10 pointer-events-none" />
          
          {/* Mandala for desktop */}
          <RoseGoldMandala className="hidden lg:block absolute -bottom-16 -left-16 w-[380px] opacity-14 z-10 pointer-events-none" />

          {/* Slides */}
          {heroBanners.map((banner, i) => {
            const isActive = i === activeIdx;
            return (
              <div
                key={banner.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${n}`}
                aria-hidden={!isActive}
                // @ts-expect-error React 19 boolean inert
                inert={!isActive}
                className={`absolute inset-y-0 right-0 h-full w-full lg:w-auto lg:aspect-[3/2] transition-opacity ${prefersReducedMotion ? 'duration-150' : 'duration-900 ease-in-out'} ${isActive ? 'opacity-100 z-0' : 'opacity-0 z-0 pointer-events-none'}`}
              >
                {/* Desktop layout uses mask, mobile does not. We'll use two images to perfectly match the CSS requirements since mask-image on mobile isn't wanted */}
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  sizes="(min-width: 1024px) 1140px, 100vw"
                  // @ts-expect-error Next 16 preload
                  preload={i === 0 ? true : undefined}
                  className="hidden lg:block object-cover object-[center_center] [mask-image:linear-gradient(to_right,transparent_0%,#000_20%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,#000_20%)]"
                />
                <Image
                  src={banner.src}
                  alt={banner.alt}
                  fill
                  sizes="(min-width: 1024px) 1140px, 100vw"
                  // @ts-expect-error Next 16 preload
                  preload={i === 0 ? true : undefined}
                  className="lg:hidden object-cover object-[100%_50%]"
                />
              </div>
            );
          })}

          {renderControls(true)}
        </div>

        {renderCaption(false)}
        {renderControls(false)}
      </div>
    </section>
  );
}
