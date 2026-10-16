import type { SVGProps } from "react";

/** Line-art motorcycle mark (TGB's take on a line icon). Uses currentColor. */
export function MotorcycleIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      <circle cx="5" cy="16.5" r="3.2" />
      <circle cx="19" cy="16.5" r="3.2" />
      <circle cx="5" cy="16.5" r="0.6" />
      <circle cx="19" cy="16.5" r="0.6" />
      <path d="M5 16.5l2.3-5" />
      <path d="M5.8 11.5h4.4l1.3-1.6h3.3c.9 0 1.6.6 1.8 1.4l.3 1" />
      <path d="M19 16.5l-2.9-7.4" />
      <path d="M14.8 7.6l1.3 1.5 2-.3" />
      <path d="M9.5 13.2h4.3l-1.2 3.3h-2.7z" />
      <path d="M13.8 13.2l2.6-.9" />
      <path d="M8.6 18.4h3.6" />
    </svg>
  );
}
