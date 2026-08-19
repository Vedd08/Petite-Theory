"use client";

import { ArrowUpRight, ArrowUp, Mail, MapPin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import WhatsAppIcon from "./WhatsAppIcon";

const WHATSAPP_NUMBER = "918866836861";
const WHATSAPP_DISPLAY = "+91 88668 36861";
const EMAIL = "petitetheory.india@gmail.com";
const INSTAGRAM_HANDLE = "petitetheory.india";
const ADDRESS = "UG-37, Highfield Ascot, Vesu, Surat, Gujarat 395007";
const MAPS_LINK = "https://maps.app.goo.gl/k2bVHMZ1a1fWtMnB6?g_st=ic";

const EXPLORE_LINKS = [
  { href: "/shop", label: "Menu" },
  { href: "/#menu", label: "Flavors" },
  { href: "/about", label: "Our story" },
  { href: "/contact", label: "Visit us" },
];

function CameraIcon(props: { size?: number }) {
  // Local, minimal Instagram stand-in (lucide dropped brand icons)
  return (
    <svg width={props.size ?? 18} height={props.size ?? 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
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

      <footer id="footer" className="mt-4 rounded-t-[2.5rem] bg-[#faf0f2] px-6 pt-14 sm:px-10 lg:px-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 pb-14 lg:grid-cols-[1.3fr_0.9fr_1fr_1.1fr] lg:gap-10">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <Image src="/logo-wordmark.png" alt="Petite थियोरी" width={1670} height={314} className="h-8 w-auto" />
            <p className="mt-4 max-w-xs font-body text-sm font-light leading-6 text-[#5b4048]">
              Small-batch artisanal cakes, hand-finished with love for every celebration.
              <br /><br />
              <strong>Founder:</strong> Chef. Priyanshi
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with us on WhatsApp"
                className="grid size-10 place-items-center rounded-full bg-white text-[#d81159] shadow-[0_6px_16px_rgba(109,17,48,0.08)] transition-colors hover:bg-[#e0186f] hover:text-white"
              >
                <WhatsAppIcon size={17} />
              </a>
              <a
                href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="grid size-10 place-items-center rounded-full bg-white text-[#d81159] shadow-[0_6px_16px_rgba(109,17,48,0.08)] transition-colors hover:bg-[#e0186f] hover:text-white"
              >
                <CameraIcon size={17} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#a1284f]">Explore</h3>
            <nav className="mt-4 flex flex-col gap-3 font-body text-sm text-[#3a2530]" aria-label="Footer navigation">
              {EXPLORE_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="w-fit transition-colors hover:text-[#d81159]">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#a1284f]">Contact</h3>
            <ul className="mt-4 flex flex-col gap-3 font-body text-sm text-[#3a2530]">
              <li>
                <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 transition-colors hover:text-[#d81159]">
                  <WhatsAppIcon size={15} className="mt-0.5 shrink-0 text-[#d81159]" />
                  <span>{WHATSAPP_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-start gap-2.5 transition-colors hover:text-[#d81159]">
                  <Mail size={15} className="mt-0.5 shrink-0 text-[#d81159]" />
                  <span>{EMAIL}</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="flex items-start gap-2.5 transition-colors hover:text-[#d81159]">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-[#d81159]" />
                  <span className="max-w-[200px]">{ADDRESS}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-body text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#a1284f]">Stay in the loop</h3>
            <p className="mt-4 max-w-sm font-body text-sm font-light leading-6 text-[#5b4048]">
              New bakes, seasonal stories, and the occasional sweet surprise.
            </p>
            <form onSubmit={handleSubscribe} className="mt-4 flex border-b border-[#1a1a1a]/30 pb-3">
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input
                id="footer-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="min-w-0 flex-1 bg-transparent font-body text-sm outline-none placeholder:text-[#8a6a75]"
              />
              <button type="submit" className="font-body text-[0.68rem] font-medium uppercase tracking-[0.14em] text-[#3a2530]">
                {subscribed ? "Thank you" : "Subscribe"} <span className="ml-1">→</span>
              </button>
            </form>
            <p className="mt-3 font-body text-[0.68rem] font-light text-[#8a6a75]">No noise, just nice things. Unsubscribe anytime.</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[#1a1a1a]/10 py-6 font-body text-[0.7rem] text-[#8a6a75] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
            <span>© {new Date().getFullYear()} Petite थियोरी. All rights reserved.</span>
            <span className="hidden sm:inline">·</span>
            <span>
              Developed by{" "}
              <a
                href="https://logicmindsbyparii.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#3a2530] underline underline-offset-2 transition-colors hover:text-[#d81159]"
              >
                Logic Minds by Parii
              </a>
            </span>
          </div>
          <a href="#top" className="flex items-center gap-1.5 transition-colors hover:text-[#d81159]">
            Back to top <ArrowUp size={13} />
          </a>
        </div>
      </footer>
    </div>
  );
}
