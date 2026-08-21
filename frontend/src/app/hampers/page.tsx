"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/shared/PageHeader";
import HamperGridSection from "@/components/home/HamperGridSection";
import { Hamper } from "@/components/home/HamperCard";

export default function HampersPage() {
  const [hampers, setHampers] = useState<Hamper[]>([]);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    fetch(`${apiUrl}/hampers`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setHampers(data.filter((h: Hamper) => h.isAvailable));
        }
      })
      .catch(err => console.error("Error fetching hampers:", err));
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#1a1a1a]">
      <PageHeader
        eyebrow="Gift hampers"
        title="Curated for every celebration"
        subtitle="Ready-to-gift boxes for festivals, birthdays, and everything worth celebrating."
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <HamperGridSection showHeading={false} hampers={hampers} />
        <Footer />
      </div>
    </main>
  );
}
