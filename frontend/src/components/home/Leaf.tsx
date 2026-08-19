export default function Leaf({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" className={className} fill="none" aria-hidden="true">
      <path
        d="M20 2C32 10 36 26 28 40C22 50 12 56 4 58C2 44 4 28 12 16C15.5 11 17.5 6 20 2Z"
        fill="#8bab7a"
      />
      <path
        d="M20 4C18 20 14 36 5 56"
        stroke="#6f9560"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}
