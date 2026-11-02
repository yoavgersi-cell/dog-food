import { DisclosureBar } from "@/components/disclosure-bar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// US-region chrome. Wraps every route in the (main) group (the whole existing
// site - URLs are unchanged by the route group). The UK region has its own
// chrome under /uk and never inherits this footer's US weight-loss drug links.
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DisclosureBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
