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
          setHampers(
            data
              .filter((h: Hamper) => h.isAvailable)
              .sort((a: Hamper, b: Hamper) => (a.price || 0) - (b.price || 0))
          );
        }
      })
      .catch(err => console.error("Error fetching hampers:", err));
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-surface text-[#1a1a1a]">
      <PageHeader
        eyebrow="The Diwali Edit · 2026"
        title="Festive moments, sweeter together"
        subtitle="Celebrate the festival of lights with our handcrafted, premium gift boxes."
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <HamperGridSection showHeading={false} hampers={hampers} />
        <Footer />
      </div>
    </main>
  );
}
