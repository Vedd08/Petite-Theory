export default function BerryBlob({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 60" className={className} aria-hidden="true">
      <g fill="#d81159">
        <circle cx="20" cy="18" r="9" />
        <circle cx="34" cy="16" r="8" />
        <circle cx="42" cy="28" r="8.5" />
        <circle cx="30" cy="34" r="9.5" />
        <circle cx="16" cy="32" r="8" />
        <circle cx="26" cy="24" r="7" />
      </g>
    </svg>
  );
}
