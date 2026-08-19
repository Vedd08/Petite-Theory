"use client";

import { ArrowUpRight, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  function handleSubscribe(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (email.trim()) setSubscribed(true);
  }

  return (
    <div>
      <section id="story" className="grid gap-10 border-t border-[#1a1a1a]/10 py-20 sm:py-28 lg:grid-cols-2 lg:gap-28">
        <div>
          <p className="mb-5 font-body text-[0.68rem] uppercase tracking-[0.25em] text-[#666666]">The petite philosophy</p>
          <h2 className="max-w-lg font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl">Made with <em className="font-normal text-italic">intention.</em></h2>
        </div>
        <div className="max-w-md lg:pt-10">
          <p className="font-body text-lg font-light leading-8 text-[#666666]">We believe the best things in life are worth savouring. Every Petite थियोरी is hand-finished with seasonal ingredients, a light touch, and plenty of time.</p>
          <Link href="/about" className="mt-8 inline-flex items-center gap-2 font-body text-xs font-medium uppercase tracking-[0.16em] underline underline-offset-8">
            Read our story <ArrowUpRight size={14} />
          </Link>
        </div>
      </section>

      <section id="newsletter" className="mb-10 grid gap-8 rounded-[2.5rem] bg-gradient-to-br from-white to-[#fdf1f3] px-7 py-12 shadow-[0_15px_50px_rgba(100,45,55,0.06)] sm:px-12 sm:py-16 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:px-20 border border-white">
        <div>
          <p className="mb-5 font-body text-[0.68rem] uppercase tracking-[0.25em] text-[#666666]">Keep in touch</p>
          <h2 className="max-w-md font-display text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-5xl">A note from <em className="font-normal text-italic">the kitchen.</em></h2>
          <p className="mt-5 max-w-sm font-body text-sm font-light leading-6 text-[#666666]">New bakes, seasonal stories, and the occasional sweet surprise.</p>
        </div>
        <div>
          <form onSubmit={handleSubscribe} className="flex border-b border-[#1a1a1a] pb-3">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email address" className="min-w-0 flex-1 bg-transparent font-body text-sm outline-none placeholder:text-[#666666]/70" />
            <button type="submit" className="font-body text-[0.68rem] font-medium uppercase tracking-[0.14em]">
              {subscribed ? 'Thank you' : 'Subscribe'} <span className="ml-2">→</span>
            </button>
          </form>
          <p className="mt-3 font-body text-[0.68rem] font-light text-[#666666]">No noise, just nice things. Unsubscribe anytime.</p>
        </div>
      </section>

      <footer className="flex flex-col gap-5 py-8 font-body text-[0.68rem] uppercase tracking-[0.16em] text-[#666666] sm:flex-row sm:items-center sm:justify-between">
        <span>© 2026 Petite थियोरी</span>
        <span>Made with love</span>
        <a href="#top" className="flex items-center gap-2 transition-colors hover:text-[#1a1a1a]">Back to top <Plus size={13} /></a>
        <a href="#" aria-label="Instagram" className="transition-opacity hover:opacity-55">Instagram</a>
      </footer>
    </div>
  );
}
