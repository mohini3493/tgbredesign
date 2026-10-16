import { ArrowLeft, Download } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { ButtonLink } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/** Placeholder for pages that are planned but not built yet. */
export function ComingSoon({ title, description }: { title: string; description?: string }) {
  return (
    <section className="bg-deep py-24 md:py-32">
      <Container className="max-w-3xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">Coming soon</p>
        <h1 className="mt-3 font-display text-5xl font-extrabold uppercase text-white md:text-7xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-xl text-deep-text">
          {description ?? "We're building this page right now. Meanwhile, everything is already live in the TGB app."}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={siteConfig.appLinks.download} size="lg">
            <Download /> Get the app
          </ButtonLink>
          <ButtonLink href="/" variant="outline-light" size="lg">
            <ArrowLeft /> Back home
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
