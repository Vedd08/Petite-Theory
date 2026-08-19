"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import gsap from "gsap";
import WhatsAppIcon from "./WhatsAppIcon";

const WHATSAPP_NUMBER = "918866836861";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I'd love to know more about your cakes.")}`;

export default function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && popupRef.current) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: 16, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.6)" }
      );
    }
  }, [open]);

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-4 sm:bottom-8 sm:right-8">
      {open && (
        <div
          ref={popupRef}
          className="w-[300px] max-w-[85vw] overflow-hidden rounded-2xl bg-white shadow-[0_20px_50px_rgba(109,17,48,0.28)]"
        >
          <div className="relative flex items-center gap-3 bg-[#e0186f] px-5 py-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-white text-[#e0186f]">
              <WhatsAppIcon size={20} />
            </span>
            <div>
              <p className="font-body text-sm font-semibold text-white">Petite थियोरी</p>
              <p className="flex items-center gap-1.5 font-body text-xs text-white/85">
                <span className="size-1.5 rounded-full bg-[#4ade80]" /> Online
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="absolute right-3 top-3 grid size-6 place-items-center rounded-full bg-white/20 text-white transition-colors hover:bg-white/30"
            >
              <X size={14} />
            </button>
          </div>
          <div className="px-5 py-5">
            <p className="rounded-2xl rounded-tl-none bg-[#fbe3e6] px-4 py-3 font-body text-sm leading-relaxed text-[#3a2530]">
              👋 Hi! How can we help you today?
            </p>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[#e0186f] py-3 font-body text-xs font-semibold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#c01260]"
            >
              Start chat
            </a>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close WhatsApp chat" : "Chat with us on WhatsApp"}
        className="relative grid size-14 place-items-center rounded-full bg-[#e0186f] text-white shadow-[0_10px_30px_rgba(224,24,111,0.4)] transition-transform hover:scale-105 sm:size-16"
      >
        {!open && <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#e0186f]/50" />}
        {open ? <X size={24} /> : <WhatsAppIcon size={26} />}
      </button>
    </div>
  );
}
