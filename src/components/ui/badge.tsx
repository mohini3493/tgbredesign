import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide",
  {
    variants: {
      tone: {
        primary: "bg-primary text-white",
        secondary: "bg-secondary text-white",
        ink: "bg-ink text-white",
        "secondary-soft": "bg-secondary-tint text-secondary",
        "primary-soft": "bg-primary-tint text-primary",
        glass: "bg-white/90 text-ink backdrop-blur",
      },
    },
    defaultVariants: { tone: "secondary-soft" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
