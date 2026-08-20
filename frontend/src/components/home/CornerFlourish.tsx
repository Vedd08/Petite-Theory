export default function CornerFlourish({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      <path d="M58,16 L22,16" strokeLinecap="round" />
      <path d="M16,22 L16,58" strokeLinecap="round" />
      <path d="M16,16 C9,16 9,9 9,9" strokeLinecap="round" />
      <circle cx="9" cy="9" r="1.6" fill="currentColor" stroke="none" />
      <path d="M58,16 C52,13 50,8 53,3" strokeLinecap="round" />
      <path d="M16,58 C13,52 8,50 3,53" strokeLinecap="round" />
    </svg>
  );
}
