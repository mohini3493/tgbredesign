import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./Container";

export function Section({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn("py-12 md:py-20", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
