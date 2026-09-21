"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FESTIVE } from "@/config/theme";

interface Offer {
  title: string;
  discountLabel: string;
  code?: string;
  ctaLink?: string;
}

export default function AnnouncementBar() {
  const [offer, setOffer] = useState<Offer | null>(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
        const response = await fetch(`${apiUrl}/offers/active`);
        if (!response.ok) return;
        const data = await response.json();
        // Just take the first offer
        if (data && data.length > 0) {
          setOffer(data[0]);
        }
      } catch (err) {
        console.error("Failed to fetch active offers for announcement bar", err);
      }
    };
    fetchOffer();
  }, []);

  const content = (
    <div className="flex h-full w-full items-center justify-center gap-2 px-4 max-w-screen-2xl mx-auto">
      <span className="truncate">
        {offer ? (
          <>
            {offer.discountLabel} — {offer.title}
          </>
        ) : FESTIVE ? (
          "Diwali gifting is open · Hampers from ₹500"
        ) : (
          "Baked fresh daily in Surat"
        )}
      </span>
      {offer?.code && (
        <span className="shrink-0 rounded bg-white/15 px-1.5 py-0.5 text-[10px] font-bold tracking-wider">
          {offer.code}
        </span>
      )}
    </div>
  );

  const targetLink = offer?.ctaLink || (FESTIVE ? "/hampers" : null);

  return (
    <div className="h-[34px] w-full bg-[#6d1130] font-body text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white overflow-hidden">
      {targetLink ? (
        <Link href={targetLink} className="block h-full w-full hover:bg-black/10 transition-colors">
          {content}
        </Link>
      ) : (
        content
      )}
    </div>
  );
}
