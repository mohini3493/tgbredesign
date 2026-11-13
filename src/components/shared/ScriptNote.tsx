import { cn } from "@/lib/utils";

/** Hand-written accent with the brand underline swoosh (same treatment as the app popup). */
export function ScriptNote({ lines, className }: { lines: string[]; className?: string }) {
  return (
    <div className={cn("font-script leading-[1.05]", className)} aria-hidden>
      {lines.map((line, i) => (
        <p key={line} style={{ paddingLeft: `${i * 0.6}em` }}>
          {line}
        </p>
      ))}
      <Swoosh className="mt-1 ml-[1.2em] h-4 w-[110px]" />
    </div>
  );
}

export function Swoosh({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" className={className} fill="none" aria-hidden>
      <path d="M3 13C35 6 75 3 117 3" stroke="#ff7723" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}
