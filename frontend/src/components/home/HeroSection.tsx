"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Leaf from "./Leaf";
import BerryBlob from "./BerryBlob";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const leaf1 = useRef<HTMLDivElement>(null);
  const leaf2 = useRef<HTMLDivElement>(null);
  const leaf3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-reveal", {
        y: 40,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2,
      });

      gsap.from(imageRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        delay: 0.4,
      });

      gsap.to(imageRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });

      gsap.from(badgeRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 1.2,
      });

      [leaf1.current, leaf2.current, leaf3.current].forEach((leaf, i) => {
        if (!leaf) return;
        gsap.to(leaf, {
          y: i % 2 === 0 ? -16 : 16,
          rotate: i % 2 === 0 ? 10 : -10,
          duration: 3.5 + i * 0.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="relative grid items-center gap-10 pb-24 pt-8 sm:pb-32 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:pb-40 lg:pt-12"
    >
      <div ref={leaf1} className="pointer-events-none absolute -left-3 top-[6%] hidden sm:block">
        <Leaf className="h-12 w-8 -rotate-[20deg] opacity-80" />
      </div>
      <div ref={leaf2} className="pointer-events-none absolute left-[40%] -top-2 hidden lg:block">
        <Leaf className="h-9 w-6 rotate-[35deg] opacity-70" />
      </div>
      <div ref={leaf3} className="pointer-events-none absolute left-[6%] top-[64%] hidden sm:block">
        <Leaf className="h-10 w-7 rotate-[100deg] opacity-70" />
      </div>

      <div className="relative max-w-xl">
        <h1 className="hero-reveal font-display text-[clamp(2.6rem,6.4vw,5.4rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em] text-[#6d1130]">
          Small cakes,
          <br />
          big feelings.
        </h1>
        <p className="hero-reveal mt-5 inline-flex items-center gap-1.5 font-body text-sm font-medium text-[#d81159]">
          crafted in small batches
          <ChevronDown size={15} className="mt-0.5" />
        </p>
        <p className="hero-reveal mt-6 max-w-sm font-body text-base font-light leading-7 text-[#5b4048] sm:text-lg">
          If you love beautiful desserts but refuse to compromise on taste, our
          cakes were made for you.
        </p>
        <Link
          href="/#creations"
          className="hero-reveal mt-9 inline-flex items-center gap-3 rounded-full bg-[#e0186f] px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(224,24,111,0.28)] transition-transform hover:-translate-y-1"
        >
          View menu <ArrowUpRight size={15} />
        </Link>
      </div>

      <div className="relative mx-auto w-full max-w-2xl">
        <div
          ref={imageRef}
          className="relative aspect-[1.05/1] overflow-hidden rounded-[2.5rem] bg-white shadow-[0_25px_70px_rgba(109,17,48,0.15)] sm:rounded-[4rem]"
        >
          <Image
            src="/cakes/hero-cake-new.jpg"
            alt="White frosted cake decorated with fresh flowers"
            fill
            priority
            className="object-cover"
          />
        </div>
        <div
          ref={badgeRef}
          className="absolute -bottom-5 -left-3 rounded-full bg-white px-5 py-3 font-body text-[0.67rem] uppercase tracking-[0.15em] text-[#6d1130] shadow-[0_10px_30px_rgba(109,17,48,0.15)] sm:-left-8"
        >
          <span className="mr-2 inline-block size-2 rounded-full bg-[#e0186f]" />
          Baked fresh daily
        </div>
        <div className="pointer-events-none absolute -right-4 -top-6 hidden sm:block">
          <BerryBlob className="h-16 w-16 opacity-90 drop-shadow-[0_8px_15px_rgba(216,17,89,0.35)]" />
        </div>
      </div>
    </section>
  );
}
