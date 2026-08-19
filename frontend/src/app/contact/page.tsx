"use client";

import { MessageCircle, Mail, Camera, MapPin } from "lucide-react";
import Footer from "@/components/shared/Footer";
import PageHeader from "@/components/shared/PageHeader";

const contactMethods = [
  { icon: MessageCircle, label: "WhatsApp", value: "+91 8866836861", href: "https://wa.me/918866836861" },
  { icon: Mail, label: "Email", value: "bloomcakes@example.com", href: "mailto:bloomcakes@example.com" },
  { icon: Camera, label: "Instagram", value: "@bloomcakes.official", href: "https://instagram.com/bloomcakes.official" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#1a1a1a]">
      <PageHeader
        eyebrow="Get in touch"
        title="Visit us"
        subtitle="Custom orders, questions, or just want to say hi? We'd love to hear from you."
      />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <section className="py-20 sm:py-28">
          <div className="grid gap-5 sm:grid-cols-3">
            {contactMethods.map(({ icon: Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl bg-white p-8 text-center shadow-[0_10px_40px_rgba(100,45,55,0.06)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(100,45,55,0.12)]"
              >
                <span className="mx-auto grid size-14 place-items-center rounded-full bg-[#fbe3e6] text-[#d81159] transition-colors group-hover:bg-[#e0186f] group-hover:text-white">
                  <Icon size={24} strokeWidth={1.6} />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold text-[#6d1130]">{label}</h3>
                <p className="mt-2 font-body text-sm font-light text-[#5b4048]">{value}</p>
              </a>
            ))}
          </div>

          <div className="mt-16 flex flex-col items-center gap-6 rounded-[2.5rem] bg-gradient-to-b from-[#fbe3e6] to-[#f6d4da] px-6 py-14 text-center sm:px-10 sm:py-16">
            <span className="grid size-14 place-items-center rounded-full bg-white text-[#d81159]">
              <MapPin size={24} strokeWidth={1.6} />
            </span>
            <div>
              <p className="font-body text-[0.68rem] uppercase tracking-[0.25em] text-[#a1284f]">Find us</p>
              <h2 className="mt-3 font-display text-2xl font-semibold text-[#6d1130] sm:text-3xl">
                123 Bakery Lane, Sweet District, City
              </h2>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
