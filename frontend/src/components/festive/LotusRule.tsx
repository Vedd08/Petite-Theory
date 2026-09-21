export default function LotusRule({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden="true">
      <div className="h-px w-12 bg-current opacity-40"></div>
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s-8-4.5-8-11.5c0-4.5 4-6.5 8-10.5 4 4 8 6 8 10.5 0 7-8 11.5-8 11.5z" />
        <path d="M12 22s-4-6.5-4-11.5c0-3.5 2-5 4-8 2 3 4 4.5 4 8 0 5-4 11.5-4 11.5z" />
        <path d="M12 22v-9" />
      </svg>
      <div className="h-px w-12 bg-current opacity-40"></div>
    </div>
  );
}
