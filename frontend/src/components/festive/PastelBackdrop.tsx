import RoseGoldMandala from "./RoseGoldMandala";

export default function PastelBackdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {/* Colour Washes */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `
            radial-gradient(60% 70% at 0% 0%, var(--color-peach) 0%, transparent 60%),
            radial-gradient(50% 60% at 100% 10%, #F2C9D6 0%, transparent 60%),
            radial-gradient(45% 55% at 100% 100%, var(--color-lilac) 0%, transparent 65%),
            radial-gradient(40% 50% at 0% 100%, rgb(211 232 230 / 0.7) 0%, transparent 60%)
          `
        }}
      />
      
      {/* Paper Grain */}
      <div 
        className="absolute inset-0 mix-blend-multiply opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
      
      {/* Partial Mandalas cropped by edges */}
      <RoseGoldMandala 
        className="absolute -top-20 -left-20 w-[380px] opacity-[0.14]"
      />
      <RoseGoldMandala 
        className="absolute -bottom-16 -right-16 w-[320px] opacity-[0.12] hidden md:block"
      />
    </div>
  );
}
