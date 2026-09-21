import Navbar from "./Navbar";
import DripDivider from "@/components/home/DripDivider";
import Leaf from "@/components/home/Leaf";
import PastelBackdrop from "@/components/festive/PastelBackdrop";
import LotusRule from "@/components/festive/LotusRule";
import { FESTIVE } from "@/config/theme";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative bg-band">
      {FESTIVE && <PastelBackdrop />}
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-14">
        <Navbar />
        <div className="relative py-14 text-center sm:py-20">
          <div className="pointer-events-none absolute left-[6%] top-2 hidden sm:block">
            <Leaf className="h-10 w-7 -rotate-12 opacity-70" />
          </div>
          <div className="pointer-events-none absolute right-[8%] bottom-0 hidden sm:block">
            <Leaf className="h-8 w-6 rotate-[110deg] opacity-60" />
          </div>
          <p className="font-body text-[0.68rem] font-medium uppercase tracking-[0.25em] text-band-accent">{eyebrow}</p>
          <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-[-0.02em] text-band-ink sm:text-6xl">{title}</h1>
          {subtitle && (
            <>
              <p className="mx-auto mt-5 max-w-lg font-body text-base font-light leading-7 text-band-muted">{subtitle}</p>
              {FESTIVE && (
                <div className="mt-4 flex justify-center text-gold">
                  <LotusRule />
                </div>
              )}
            </>
          )}
        </div>
      </div>
      <DripDivider flip />
    </div>
  );
}
