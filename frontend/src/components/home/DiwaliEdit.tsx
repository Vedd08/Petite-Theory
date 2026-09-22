"use client";

import Image from "next/image";
import Link from "next/link";
import { heroPosters } from "@/data/heroPosters";
import LotusRule from "@/components/festive/LotusRule";
import RoseGoldMandala from "@/components/festive/RoseGoldMandala";

export default function DiwaliEdit() {
  return (
    <section className="relative overflow-hidden border-t border-[#1a1a1a]/10 py-20 sm:py-28">
      {/* Background Ornament */}
      <RoseGoldMandala 
        className="absolute -top-32 -right-32 w-[440px] opacity-15 pointer-events-none" 
        aria-hidden="true" 
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <p className="font-body text-[0.68rem] uppercase tracking-[0.25em] text-deep-rose/70 mb-4">
            Gifting for the festival of lights
          </p>
          <h2 className="font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl text-deep-rose mb-6">
            The Diwali Edit.
          </h2>
          <div className="flex justify-center">
            <LotusRule className="text-gold" />
          </div>
        </div>

        {/* Cards Row/Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar lg:grid lg:grid-cols-4 gap-5 pb-8 lg:pb-0 -mx-5 px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
          {heroPosters.map((poster) => (
            <Link
              key={poster.id}
              href="/hampers"
              className="group relative block aspect-[4/5] rounded-[1.25rem] overflow-hidden bg-[#faf6f0] p-4 flex items-center justify-center ring-1 ring-gold/40 shadow-[0_18px_40px_rgba(123,30,58,0.14)] transition-transform duration-300 hover:-translate-y-1 basis-[72%] sm:basis-[44%] shrink-0 snap-start"
            >
              <Image
                src={poster.image}
                alt={poster.alt}
                fill
                sizes="(min-width: 1024px) 25vw, 72vw"
                className="object-contain p-4"
                loading="lazy"
              />
            </Link>
          ))}
        </div>

        {/* Explore Link */}
        <div className="mt-8 lg:mt-12 text-center">
          <Link
            href="/hampers"
            className="inline-block border-b border-deep-rose/30 pb-0.5 text-sm uppercase tracking-widest text-deep-rose hover:border-deep-rose transition-colors"
          >
            Explore all hampers
          </Link>
        </div>
      </div>
    </section>
  );
}
