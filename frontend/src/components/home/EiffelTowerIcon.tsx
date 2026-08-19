export default function EiffelTowerIcon({ size = 18, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={(size * 180) / 100}
      viewBox="0 0 100 180"
      fill="currentColor"
      fillRule="evenodd"
      className={className}
      aria-hidden="true"
    >
      <path d="M50,0 L52,38 L58,40 L55,42 L63,95 L72,98 L67,101 L88,145 L98,176 L100,180 L0,180 L2,176 L12,145 L33,101 L28,98 L37,95 L45,42 L42,40 L48,38 Z M50,103 L22,178 L78,178 Z" />
    </svg>
  );
}
