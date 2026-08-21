"use client";

import { useMemo, useState } from "react";
import HamperCard, { Hamper } from "./HamperCard";

interface HamperGridSectionProps {
  title?: string;
  subtitle?: string;
  showHeading?: boolean;
  hampers: Hamper[];
}

export default function HamperGridSection({
  title = "Gift hampers.",
  subtitle = "Curated boxes for every occasion",
  showHeading = true,
  hampers,
}: HamperGridSectionProps) {
  const occasions = useMemo(() => {
    const unique = Array.from(new Set(hampers.map((h) => h.occasion || "General")));
    return ["All", ...unique];
  }, [hampers]);

  const [activeOccasion, setActiveOccasion] = useState("All");

  const visibleHampers = activeOccasion === "All"
    ? hampers
    : hampers.filter((h) => (h.occasion || "General") === activeOccasion);

  return (
    <section className="relative border-t border-[#1a1a1a]/10 py-20 sm:py-28">
      {showHeading && (
        <div className="mb-10 text-center">
          <p className="mb-4 font-body text-[0.68rem] uppercase tracking-[0.25em] text-[#666666]">{subtitle}</p>
          <h2 className="mx-auto max-w-2xl font-display text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">{title}</h2>
        </div>
      )}

      {occasions.length > 2 && (
        <div className="mb-10 flex items-center justify-center gap-2 overflow-x-auto no-scrollbar">
          {occasions.map((occ) => (
            <button
              key={occ}
              onClick={() => setActiveOccasion(occ)}
              className={`shrink-0 rounded-full px-5 py-2.5 font-body text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                activeOccasion === occ
                  ? "bg-[#e0186f] text-white shadow-[0_8px_20px_rgba(224,24,111,0.28)]"
                  : "bg-white text-[#666666] hover:text-[#1a1a1a]"
              }`}
            >
              {occ}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-5 md:grid-cols-3">
        {visibleHampers.length === 0 ? (
          <p className="col-span-full text-center text-[#666666]">
            {hampers.length === 0 ? "No hampers available right now — check back soon!" : "No hampers in this category yet."}
          </p>
        ) : visibleHampers.map((hamper, index) => (
          <HamperCard key={hamper._id} hamper={hamper} index={index} />
        ))}
      </div>
    </section>
  );
}
