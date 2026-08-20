"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Leaf from "./Leaf";
import BerryBlob from "./BerryBlob";
import EiffelTowerIcon from "./EiffelTowerIcon";
import FlourishDivider from "./FlourishDivider";
import CornerFlourish from "./CornerFlourish";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const leaf1 = useRef<HTMLDivElement>(null);
  const leaf2 = useRef<HTMLDivElement>(null);
  const leaf3 = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scale: 1.06,
        opacity: 0,
        duration: 1.4,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      gsap.from(contentRef.current, {
        y: 24,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
        clearProps: "transform,opacity",
      });

      gsap.from(badgeRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 1,
        clearProps: "transform,opacity",
      });

      [leaf1.current, leaf2.current, leaf3.current, blobRef.current].forEach((leaf, i) => {
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
      className="relative isolate transform-gpu overflow-hidden rounded-[2.5rem] bg-[#fbe3e6] sm:rounded-[3.5rem] lg:rounded-[4rem]"
    >
      <div ref={imageRef} className="absolute inset-0 h-full w-full -z-10 transform-gpu overflow-hidden">
        <Image
          src="/paris-sketch.jpg"
          alt="Watercolor sketch of the Eiffel Tower, Arc de Triomphe, and a Parisian café"
          fill
          priority
          sizes="100vw"
          className="scale-125 object-cover object-[38%_40%] opacity-25 sm:object-[55%_45%] lg:object-[center_45%]"
        />
      </div>

      <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 lg:block xl:right-10">
        <div className="relative aspect-[1.05/1] w-96 overflow-hidden rounded-[2.5rem] border-4 border-white bg-white shadow-[0_25px_70px_rgba(109,17,48,0.28)] xl:w-160">
          <Image
            src="/cakes/hero-cake-new.jpg"
            alt="White frosted cake decorated with fresh flowers"
            fill
            className="object-cover"
          />
        </div>
        <div className="pointer-events-none absolute -left-2 -top-2 text-[#d81159]/70">
          <CornerFlourish className="h-9 w-9 sm:h-12 sm:w-12" />
        </div>
        <div className="pointer-events-none absolute -bottom-2 -right-2 rotate-180 text-[#d81159]/70">
          <CornerFlourish className="h-9 w-9 sm:h-12 sm:w-12" />
        </div>
        <div ref={blobRef} className="pointer-events-none absolute -right-4 -top-5">
          <BerryBlob className="h-14 w-14 opacity-90 drop-shadow-[0_8px_15px_rgba(216,17,89,0.35)]" />
        </div>
        <div
          ref={badgeRef}
          className="absolute -bottom-5 -left-6 inline-flex items-center rounded-full bg-white px-5 py-3 font-body text-[0.67rem] uppercase tracking-[0.15em] text-[#6d1130] shadow-[0_10px_30px_rgba(109,17,48,0.15)]"
        >
          <span className="mr-2 inline-block size-2 rounded-full bg-[#e0186f]" />
          Baked fresh daily
        </div>
      </div>

      <div ref={leaf1} className="pointer-events-none absolute left-3 top-[6%] hidden sm:block">
        <Leaf className="h-12 w-8 rotate-[-20deg] opacity-80" />
      </div>
      <div ref={leaf2} className="pointer-events-none absolute left-[42%] top-4 hidden lg:block">
        <Leaf className="h-9 w-6 rotate-35 opacity-70" />
      </div>
      <div ref={leaf3} className="pointer-events-none absolute left-[6%] bottom-[8%] hidden sm:block">
        <Leaf className="h-10 w-7 rotate-100 opacity-70" />
      </div>

      <div className="relative px-6 py-14 sm:px-10 sm:py-20 lg:px-16 lg:py-28">
        <div ref={contentRef} className="max-w-xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#6d1130] shadow-[0_4px_14px_rgba(109,17,48,0.08)]">
            <EiffelTowerIcon size={12} className="text-[#d81159]" />
            Born in France, perfected in Surat
          </div>
          <h1 className="font-display text-[clamp(2.6rem,6.4vw,5.4rem)] font-bold uppercase leading-[0.98] tracking-[-0.02em] text-[#6d1130] [text-shadow:0_0_1px_#fbe3e6,0_0_1px_#fbe3e6,0_0_4px_#fbe3e6,0_0_4px_#fbe3e6,0_0_10px_#fbe3e6,0_0_20px_#fbe3e6,0_0_34px_#fbe3e6]">
            Small cakes,
            <br />
            big feelings.
          </h1>
          <p className="mt-5 inline-flex items-center gap-1.5 font-body text-sm font-medium text-[#d81159] [text-shadow:0_0_1px_#fbe3e6,0_0_1px_#fbe3e6,0_0_3px_#fbe3e6,0_0_3px_#fbe3e6,0_0_8px_#fbe3e6,0_0_16px_#fbe3e6,0_0_26px_#fbe3e6]">
            crafted in small batches
            <ChevronDown size={15} className="mt-0.5" />
          </p>
          <p className="mt-6 max-w-sm font-body text-base font-light leading-7 text-[#5b4048] [text-shadow:0_0_1px_#fbe3e6,0_0_1px_#fbe3e6,0_0_3px_#fbe3e6,0_0_3px_#fbe3e6,0_0_8px_#fbe3e6,0_0_18px_#fbe3e6,0_0_30px_#fbe3e6] sm:text-lg">
            If you love beautiful desserts but refuse to compromise on taste, our
            cakes were made for you.
          </p>
          <FlourishDivider className="mt-7 h-5 w-48 text-[#d81159]/50 drop-shadow-sm sm:w-56" />
          <div className="mt-7 flex flex-wrap items-center gap-5">
            <Link
              href="/#creations"
              className="inline-flex items-center gap-3 rounded-full bg-[#e0186f] px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(224,24,111,0.28)] transition-transform hover:-translate-y-1"
            >
              View menu <ArrowUpRight size={15} />
            </Link>
            <div className="inline-flex items-center rounded-full bg-white px-5 py-3 font-body text-[0.67rem] uppercase tracking-[0.15em] text-[#6d1130] shadow-[0_10px_30px_rgba(109,17,48,0.15)] lg:hidden">
              <span className="mr-2 inline-block size-2 rounded-full bg-[#e0186f]" />
              Baked fresh daily
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
