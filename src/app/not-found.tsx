import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <>
      <Header />
      <main id="main" className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
        <p className="font-display text-8xl font-extrabold text-primary">404</p>
        <h1 className="mt-2 font-display text-4xl font-bold uppercase">Wrong turn, rider</h1>
        <p className="mt-3 max-w-md text-body">This road doesn&apos;t exist. Let&apos;s get you back on route.</p>
        <ButtonLink href="/" className="mt-8">Back to home</ButtonLink>
      </main>
      <Footer />
    </>
  );
}
