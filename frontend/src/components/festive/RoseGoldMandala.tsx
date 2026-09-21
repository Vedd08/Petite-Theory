"use client";

import { useId } from "react";

interface RoseGoldMandalaProps {
  className?: string;
  spin?: boolean;
}

export default function RoseGoldMandala({ className = "", spin = false }: RoseGoldMandalaProps) {
  // Clean useId for SVG gradient ref
  const rawId = useId();
  const gradId = `mandala-grad-${rawId.replace(/[^a-zA-Z0-9]/g, "")}`;

  const cx = 300;
  const cy = 300;

  // 1. Center empty circle (r=92)
  // 2. 48 filled dots at r=104
  const dots48 = Array.from({ length: 48 }).map((_, i) => {
    const angle = (i * 360) / 48;
    return (
      <circle
        key={`d48-${i}`}
        cx={cx}
        cy={cy - 104}
        r="1.6"
        fill={`url(#${gradId})`}
        stroke="none"
        transform={`rotate(${angle}, ${cx}, ${cy})`}
      />
    );
  });

  // 3. 24 almond-shaped petals between r=110 and r=150
  const almonds24 = Array.from({ length: 24 }).map((_, i) => {
    const angle = (i * 360) / 24;
    return (
      <g key={`alm-${i}`} transform={`rotate(${angle}, ${cx}, ${cy})`}>
        <path
          d={`M ${cx} ${cy - 110} Q ${cx + 15} ${cy - 130} ${cx} ${cy - 150} Q ${cx - 15} ${cy - 130} ${cx} ${cy - 110}`}
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
        />
        <line
          x1={cx}
          y1={cy - 110}
          x2={cx}
          y2={cy - 145}
          vectorEffect="non-scaling-stroke"
          strokeWidth="0.8"
        />
      </g>
    );
  });

  // 4. Circle at r=156
  // 5. 36 scallops between r=160 and r=178
  const scallops36 = Array.from({ length: 36 }).map((_, i) => {
    const angle = (i * 360) / 36;
    const aRads = (10 * Math.PI) / 180; // 360/36 = 10 deg
    const x2 = cx + 160 * Math.sin(aRads);
    const y2 = cy - 160 * Math.cos(aRads);
    return (
      <path
        key={`sca-${i}`}
        d={`M ${cx} ${cy - 160} Q ${cx + 160 * Math.sin(aRads / 2)} ${cy - 178} ${x2} ${y2}`}
        transform={`rotate(${angle}, ${cx}, ${cy})`}
        vectorEffect="non-scaling-stroke"
        strokeWidth="1"
      />
    );
  });

  // 6. 16 lotus petals between r=180 and r=235, nested outlines + dot
  const lotus16 = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i * 360) / 16;
    return (
      <g key={`lot-${i}`} transform={`rotate(${angle}, ${cx}, ${cy})`}>
        {/* Outer petal */}
        <path
          d={`M ${cx} ${cy - 180} C ${cx + 25} ${cy - 180}, ${cx + 30} ${cy - 210}, ${cx} ${cy - 235} C ${cx - 30} ${cy - 210}, ${cx - 25} ${cy - 180}, ${cx} ${cy - 180}`}
          vectorEffect="non-scaling-stroke"
          strokeWidth="1.2"
        />
        {/* Inner petal */}
        <path
          d={`M ${cx} ${cy - 185} C ${cx + 15} ${cy - 185}, ${cx + 18} ${cy - 205}, ${cx} ${cy - 225} C ${cx - 18} ${cy - 205}, ${cx - 15} ${cy - 185}, ${cx} ${cy - 185}`}
          vectorEffect="non-scaling-stroke"
          strokeWidth="0.8"
        />
        {/* Dot at tip */}
        <circle cx={cx} cy={cy - 240} r="2" fill={`url(#${gradId})`} stroke="none" />
      </g>
    );
  });

  // 7. 32 small teardrops between r=240 and r=258
  const teardrops32 = Array.from({ length: 32 }).map((_, i) => {
    const angle = ((i * 360) / 32) + (360 / 64); // Offset to sit between lotuses
    return (
      <g key={`tear-${i}`} transform={`rotate(${angle}, ${cx}, ${cy})`}>
        <path
          d={`M ${cx} ${cy - 240} Q ${cx + 6} ${cy - 245} ${cx} ${cy - 258} Q ${cx - 6} ${cy - 245} ${cx} ${cy - 240}`}
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
        />
      </g>
    );
  });

  // 8. 32 pointed arches between r=262 and r=292, topped with tiny trefoil
  const arches32 = Array.from({ length: 32 }).map((_, i) => {
    const angle = (i * 360) / 32;
    const aRads = ((360 / 32) * Math.PI) / 180;
    const x2 = cx + 262 * Math.sin(aRads);
    const y2 = cy - 262 * Math.cos(aRads);
    
    // Trefoil (3 dots) at the peak
    const peakY = cy - 292;
    
    return (
      <g key={`arch-${i}`} transform={`rotate(${angle}, ${cx}, ${cy})`}>
        <path
          d={`M ${cx} ${cy - 262} Q ${cx + (131 * Math.sin(aRads / 2))} ${cy - 292} ${x2} ${y2}`}
          vectorEffect="non-scaling-stroke"
          strokeWidth="1"
        />
        <circle cx={cx} cy={peakY - 3} r="1.5" fill={`url(#${gradId})`} stroke="none" />
        <circle cx={cx - 2} cy={peakY} r="1.2" fill={`url(#${gradId})`} stroke="none" />
        <circle cx={cx + 2} cy={peakY} r="1.2" fill={`url(#${gradId})`} stroke="none" />
      </g>
    );
  });

  const spinClass = spin ? "motion-safe:animate-[spin_160s_linear_infinite]" : "";

  return (
    <svg
      viewBox="0 0 600 600"
      className={`${spinClass} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A06A" stopOpacity="0.7" />
          <stop offset="50%" stopColor="#C9876F" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#A83258" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      
      <g stroke={`url(#${gradId})`} fill="none" opacity="0.9">
        <circle cx={cx} cy={cy} r="92" vectorEffect="non-scaling-stroke" strokeWidth="1" />
        {dots48}
        {almonds24}
        <circle cx={cx} cy={cy} r="156" vectorEffect="non-scaling-stroke" strokeWidth="1" />
        {scallops36}
        {lotus16}
        {teardrops32}
        {arches32}
      </g>
    </svg>
  );
}
