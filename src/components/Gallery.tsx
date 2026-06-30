import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ImageLoader } from "./ImageLoader";

import img1 from "../assets/images/gallery/gallery_1.png";
import img2 from "../assets/images/gallery/gallery_2.png";
import img3 from "../assets/images/gallery/gallery_3.png";
import img4 from "../assets/images/gallery/gallery_4.png";
import img5 from "../assets/images/gallery/gallery_5.png";
import img6 from "../assets/images/gallery/gallery_6.png";
import img7 from "../assets/images/gallery/gallery_7.png";
import img8 from "../assets/images/gallery/gallery_8.png";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8
];

export function Gallery() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const x = useTransform(scrollYProgress, (pos) => `calc(${pos * -100}% + ${pos * 100}vw)`);

  return (
    <section id="gallery" ref={targetRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 flex h-[100dvh] flex-col justify-center overflow-hidden py-24">
        <div className="container mx-auto px-4 md:px-6 z-10 shrink-0 mb-8 md:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-accent text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                Atmosphere
              </span>
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
                A Feast for <br className="hidden md:block" />
                <span className="text-secondary-text">the Eyes</span>
              </h2>
            </div>
            <p className="text-secondary-text max-w-md">
              Immerse yourself in our beautifully designed dining spaces. Where modern elegance meets traditional warmth.
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center overflow-hidden min-h-[50vh]">
          <motion.div style={{ x }} className="flex gap-6 md:gap-8 px-4 md:px-20 w-max items-center">
            {images.map((src, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  className={`relative w-[75vw] sm:w-[50vw] md:w-[35vw] lg:w-[25vw] h-[45vh] md:h-[60vh] shrink-0 overflow-hidden rounded-2xl bg-surface group ${isEven ? 'translate-y-4 md:translate-y-8' : '-translate-y-4 md:-translate-y-8'}`}
                >
                  <ImageLoader
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    containerClassName="w-full h-full"
                    imageClassName="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                    loading="eager"
                    fetchPriority="high"
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
