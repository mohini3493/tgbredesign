import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileDownloadBar } from "@/components/layout/MobileDownloadBar";
import { AppPromptHost } from "@/features/home/components/AppPrompt";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileDownloadBar />
      {/* After the header so its scroll lock wins over the mobile menu's */}
      <AppPromptHost />
    </>
  );
}
