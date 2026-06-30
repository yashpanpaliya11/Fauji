/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from "react";
import Lenis from "lenis";
import { Loader } from "./components/Loader";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { SpecialDishes } from "./components/SpecialDishes";
import { Gallery } from "./components/Gallery";
import { Reviews } from "./components/Reviews";
import { WhyChooseUs } from "./components/WhyChooseUs";
import { VisitSection } from "./components/VisitSection";
import { Footer } from "./components/Footer";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { AnimatePresence, motion, useScroll } from "framer-motion";

export default function App() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-background min-h-screen text-primary-text font-sans antialiased selection:bg-accent selection:text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
      
      <AnimatePresence mode="wait">
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <SpecialDishes />
            <Gallery />
            <Reviews />
            <WhyChooseUs />
            <VisitSection />
          </main>
          <WhatsAppButton />
          <Footer />
        </>
      )}
    </div>
  );
}
