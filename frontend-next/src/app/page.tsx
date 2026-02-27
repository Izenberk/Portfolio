import { Suspense } from "react";
import Navbar from "@/components/layout/Navbar";
import ScrollToTopOnLoad from "@/components/layout/ScrollToTopOnLoad";
import Hero from "@/sections/Hero";
import AboutSection from "@/sections/About";
import ContactSection from "@/sections/Contact";
import DataSections from "@/components/DataSections";
import SectionSkeletons from "@/components/skeletons/SectionSkeletons";

export default function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <ScrollToTopOnLoad />
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <Suspense fallback={<SectionSkeletons />}>
          <DataSections />
        </Suspense>
        <ContactSection />
      </main>
      <footer className="mt-20 border-t border-border/60 py-10 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} Korn. All rights reserved.
      </footer>
    </div>
  );
}
