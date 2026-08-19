"use client";

import { useState } from "react";
import { ChevronDown, ArrowUpRight, Star, Leaf as LeafIcon } from "lucide-react";
import { menuCategories } from "@/data/menuCategories";
import WhatsAppIcon from "@/components/shared/WhatsAppIcon";

const WHATSAPP_NUMBER = "918866836861";

function waLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export default function MenuShowcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="menu" className="my-10 rounded-[2.5rem] bg-gradient-to-b from-[#fbe3e6] to-[#f6d4da] px-6 py-16 sm:my-14 sm:px-10 sm:py-20 lg:px-16">
      <div className="mx-auto max-w-xl text-center">
        <p className="mb-4 font-body text-[0.68rem] uppercase tracking-[0.25em] text-[#a1284f]">The full menu</p>
        <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-[#6d1130] sm:text-5xl">
          Explore every <em className="font-normal text-italic">flavor.</em>
        </h2>
        <p className="mx-auto mt-5 max-w-md font-body text-sm font-light leading-7 text-[#5b4048] sm:text-base">
          {menuCategories.length} categories, made fresh to order. Tap a category to see what&apos;s inside, then message us to place your order.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-[2rem] bg-white/80 shadow-[0_20px_60px_rgba(109,17,48,0.1)] backdrop-blur-sm">
        {menuCategories.map((category, index) => {
          const isOpen = openIndex === index;
          const Icon = category.icon;
          return (
            <div key={category.name} className={index !== 0 ? "border-t border-[#f3d9de]" : ""}>
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-4 px-5 py-5 text-left transition-colors hover:bg-[#fbe3e6]/40 sm:px-8"
              >
                <span className="hidden font-body text-xs font-medium text-[#c98a9c] sm:block">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-[#fbe3e6] text-[#d81159]">
                  <Icon size={19} strokeWidth={1.6} />
                </span>
                <span className="flex-1">
                  <span className="block font-display text-lg font-semibold text-[#3a2530] sm:text-xl">
                    {category.name}
                  </span>
                  <span className="block font-body text-xs text-[#8a6a75]">
                    {category.items.length} flavors
                  </span>
                </span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-[#d81159] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-400 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-6 sm:px-8 sm:pl-[4.75rem]">
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((item) => (
                        <span
                          key={item.name}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 font-body text-[0.78rem] leading-none ${
                            item.tag === "bestseller"
                              ? "bg-[#fff4e0] text-[#8a5a1a]"
                              : item.tag === "seasonal"
                              ? "bg-[#e9f5e5] text-[#3f7a3a]"
                              : "bg-[#faf0f2] text-[#5b4048]"
                          }`}
                        >
                          {item.tag === "bestseller" && <Star size={11} className="fill-current" />}
                          {item.tag === "seasonal" && <LeafIcon size={11} />}
                          {item.name}
                        </span>
                      ))}
                    </div>
                    <a
                      href={waLink(`Hi! I'd love to know more about your ${category.name} menu.`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 font-body text-xs font-semibold uppercase tracking-[0.14em] text-[#d81159] transition-opacity hover:opacity-70"
                    >
                      <WhatsAppIcon size={14} /> Ask about {category.name} <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mx-auto mt-12 max-w-md text-center">
        <p className="font-body text-lg font-medium text-[#6d1130] sm:text-xl">Craving something specific?</p>
        <p className="mt-2 font-body text-sm font-light text-[#5b4048]">
          Message us your favorite flavor and delivery date — we&apos;ll take it from there.
        </p>
        <a
          href={waLink("Hi! I'd love to see your full menu and place an order.")}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-3 rounded-full bg-[#e0186f] px-7 py-3.5 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_10px_25px_rgba(224,24,111,0.28)] transition-transform hover:-translate-y-1"
        >
          <WhatsAppIcon size={16} /> Chat with us on WhatsApp
        </a>
      </div>
    </section>
  );
}
