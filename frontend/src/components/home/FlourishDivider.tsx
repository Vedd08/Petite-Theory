export default function FlourishDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      className={className}
      aria-hidden="true"
    >
      <path d="M0,20 C8,20 10,14 18,14 C26,14 26,20 34,20 L128,20" strokeLinecap="round" />
      <path d="M320,20 C312,20 310,14 302,14 C294,14 294,20 286,20 L192,20" strokeLinecap="round" />
      <path d="M160,12 L168,20 L160,28 L152,20 Z" fill="currentColor" stroke="none" />
    </svg>
  );
}
