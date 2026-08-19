"use client";

import Link from "next/link";
import { ArrowUpRight, Wheat, Leaf, Heart, Sparkles, Cookie, Clock, LucideIcon } from "lucide-react";

interface Callout {
  icon: LucideIcon;
  label: string;
  position: string;
}

const callouts: Callout[] = [
  { icon: Wheat, label: "Stone-ground flour", position: "lg:top-[4%] lg:left-[-2%]" },
  { icon: Leaf, label: "Seasonal berries", position: "lg:top-[42%] lg:left-[-10%]" },
  { icon: Heart, label: "Real butter", position: "lg:bottom-[4%] lg:left-[-2%]" },
  { icon: Sparkles, label: "Pure vanilla", position: "lg:top-[4%] lg:right-[-2%]" },
  { icon: Cookie, label: "Belgian chocolate", position: "lg:top-[42%] lg:right-[-10%]" },
  { icon: Clock, label: "Baked to order", position: "lg:bottom-[4%] lg:right-[-2%]" },
];

export default function IngredientsSection() {
  return (
    <section id="ingredients" className="my-10 rounded-[2.5rem] bg-gradient-to-b from-[#fbe3e6] to-[#f6d4da] px-6 py-16 sm:my-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-body text-[0.68rem] uppercase tracking-[0.25em] text-[#a1284f]">Our promise</p>
        <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#6d1130] sm:text-5xl">
          The secret is in <em className="font-normal text-italic">our ingredients.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-md font-body text-sm font-light leading-7 text-[#5b4048] sm:text-base">
          We use only quality, seasonal ingredients — nothing artificial, nothing rushed — in every cake we bake.
        </p>
      </div>

      <div className="relative mx-auto mt-14 max-w-xs sm:max-w-sm lg:max-w-lg lg:py-10">
        <div className="relative mx-auto aspect-square w-full max-w-[280px] overflow-hidden rounded-full bg-white shadow-[0_25px_60px_rgba(109,17,48,0.18)] sm:max-w-[320px]">
          <img
            src="/cakes/cake-2.png"
            alt="Layered cake made with premium natural ingredients"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:mt-0 lg:block">
          {callouts.map(({ icon: Icon, label, position }) => (
            <div
              key={label}
              className={`flex items-center gap-2 rounded-full bg-white px-4 py-2.5 shadow-[0_8px_20px_rgba(109,17,48,0.1)] lg:absolute lg:w-44 ${position}`}
            >
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#fbe3e6] text-[#d81159]">
                <Icon size={14} strokeWidth={1.8} />
              </span>
              <span className="font-body text-[0.7rem] font-medium leading-tight text-[#3a2530]">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-md text-center">
        <p className="font-body text-lg font-medium text-[#6d1130] sm:text-xl">Want to know more?</p>
        <p className="mt-2 font-body text-sm font-light text-[#5b4048]">
          Scroll through our story and we&apos;ll tell you all about our ingredients.
        </p>
        <Link
          href="/about"
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#e0186f] px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(224,24,111,0.28)] transition-transform hover:-translate-y-1"
        >
          Read our story <ArrowUpRight size={15} />
        </Link>
      </div>
    </section>
  );
}
