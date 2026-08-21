"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/shared/PageHeader";
import FeatureStrip from "@/components/home/FeatureStrip";

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#1a1a1a]">
      <PageHeader
        eyebrow="Our story"
        title="About Petite थियोरी"
        subtitle="We believe that every celebration, no matter how small, deserves a centerpiece that is both beautiful and delicious."
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <section className="grid gap-10 py-20 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-[0_25px_60px_rgba(109,17,48,0.14)]">
            <Image
              src="/cakes/cake-3.png"
              alt="A Petite थियोरी celebration cake"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-body text-[0.68rem] uppercase tracking-[0.25em] text-[#d81159]">Baked with passion</p>
            <h2 className="mt-4 max-w-md font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#6d1130] sm:text-5xl">
              Minimalist treats, <em className="font-normal text-italic">maximum love.</em>
            </h2>
            <p className="mt-6 max-w-md font-body text-base font-light leading-7 text-[#5b4048]">
              Petite थियोरी began with a simple idea: minimalist treats for every occasion. Every cake is crafted with precision, love, and the finest ingredients to make your moments unforgettable.
            </p>
            <p className="mt-4 max-w-md font-body text-base font-light leading-7 text-[#5b4048]">
              Our bakers start early every morning, mixing perfectly balanced flavors. We&apos;ve been serving the community with artisanal cakes that look like art and taste like heaven.
            </p>
          </div>
        </section>

        <FeatureStrip />

        <section className="my-10 rounded-[2.5rem] bg-gradient-to-b from-[#fbe3e6] to-[#f6d4da] px-6 py-16 text-center sm:my-14 sm:px-10 sm:py-20">
          <h2 className="mx-auto max-w-lg font-display text-3xl font-semibold leading-[1.1] tracking-[-0.03em] text-[#6d1130] sm:text-5xl">
            Ready to taste the difference?
          </h2>
          <p className="mx-auto mt-4 max-w-sm font-body text-sm font-light leading-6 text-[#5b4048] sm:text-base">
            Browse our full menu and find your next favorite.
          </p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#e0186f] px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(224,24,111,0.28)] transition-transform hover:-translate-y-1"
          >
            Browse our menu <ArrowUpRight size={15} />
          </Link>
        </section>

        <Footer />
      </div>
    </main>
  );
}
