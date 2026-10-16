import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileDownloadBar } from "@/components/layout/MobileDownloadBar";

/** Homepage layout: transparent header floating over the full-screen hero. */
export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header overlay />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileDownloadBar />
    </>
  );
}
