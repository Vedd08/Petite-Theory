import { Cookie, Leaf, HeartHandshake } from "lucide-react";

const features = [
  { icon: Cookie, label: "Baked fresh, never frozen" },
  { icon: Leaf, label: "Premium, wholesome ingredients" },
  { icon: HeartHandshake, label: "Hand-finished with love" },
];

export default function FeatureStrip() {
  return (
    <div className="grid grid-cols-1 gap-8 py-14 sm:grid-cols-3 sm:gap-6 sm:py-16">
      {features.map(({ icon: Icon, label }) => (
        <div key={label} className="flex items-center justify-center gap-4 sm:flex-col sm:text-center">
          <span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#fbe3e6] text-[#d81159]">
            <Icon size={22} strokeWidth={1.6} />
          </span>
          <p className="max-w-[10rem] font-body text-sm font-medium leading-snug text-[#3a2530]">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}
