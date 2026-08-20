interface DripDividerProps {
  color?: string;
  flip?: boolean;
}

export default function DripDivider({ color = "#ffffff", flip = false }: DripDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative w-full overflow-hidden leading-[0] ${flip ? "rotate-180" : ""}`}
    >
      <svg
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        className="block h-[36px] w-full sm:h-[56px] lg:h-[140px]"
      >
        <path
          fill={color}
          d="M0,0 L1440,0 L1440,18 C1400,18 1390,64 1350,64 C1310,64 1300,18 1260,18 C1220,18 1210,64 1170,64 C1130,64 1120,18 1080,18 C1040,18 1030,64 990,64 C950,64 940,18 900,18 C860,18 850,64 810,64 C770,64 760,18 720,18 C680,18 670,64 630,64 C590,64 580,18 540,18 C500,18 490,64 450,64 C410,64 400,18 360,18 C320,18 310,64 270,64 C230,64 220,18 180,18 C140,18 130,64 90,64 C50,64 40,18 0,18 Z"
        />
      </svg>
    </div>
  );
}
