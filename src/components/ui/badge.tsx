import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide transition-colors",
  {
    variants: {
      tone: {
        primary: "bg-secondary text-white hover:bg-primary",
        secondary: "bg-secondary text-white hover:bg-primary",
        ink: "bg-ink text-white",
        "secondary-soft": "bg-secondary-tint text-secondary hover:bg-primary hover:text-white",
        "primary-soft": "bg-secondary-tint text-secondary hover:bg-primary hover:text-white",
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
