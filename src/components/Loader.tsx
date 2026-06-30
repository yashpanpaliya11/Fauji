import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const IMAGES = [
  "/images/loading-img-1.png",
  "/images/loading-img-2.png",
  "/images/loading-img-3.png",
  "/images/loading-img-4.png",
  "/images/loading-img-5.png",
  "/images/loading-img-6.png",
  "/images/loading-img-7.png",
  "/images/loading-img-8.png"
];

const VIDEO_URL = "/videos/hero-background.mp4";
const TOTAL_ASSETS = IMAGES.length + 1;

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [loadedCount, setLoadedCount] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Preload Video
    const video = document.createElement("video");
    video.src = VIDEO_URL;
    video.playsInline = true;
    video.muted = true;
    let videoLoaded = false;
    
    video.oncanplaythrough = () => {
      if (!videoLoaded) {
        videoLoaded = true;
        setLoadedCount((prev) => prev + 1);
      }
    };
    video.onerror = () => {
      if (!videoLoaded) {
        videoLoaded = true;
        setLoadedCount((prev) => prev + 1);
      }
    };
    video.load();

    // Fallback: If after 5 seconds things are still loading, force finish.
    const fallback = setTimeout(() => {
      setLoadedCount(TOTAL_ASSETS);
    }, 5000);

    return () => clearTimeout(fallback);
  }, []);

  const handleImageLoad = (url: string) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(url)) {
        newSet.add(url);
        setLoadedCount((c) => c + 1);
      }
      return newSet;
    });
  };

  const handleImageError = (url: string) => {
    setLoadedImages((prev) => {
      const newSet = new Set(prev);
      if (!newSet.has(url)) {
        newSet.add(url);
        setLoadedCount((c) => c + 1);
      }
      return newSet;
    });
  };

  // Prevent progress from exceeding 100% just in case
  const progress = Math.min(100, Math.floor((loadedCount / TOTAL_ASSETS) * 100));

  useEffect(() => {
    if (progress === 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000); // Wait 1 second at 100% before triggering onComplete
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-white flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 z-0 mask-image-radial-gradient opacity-10 pointer-events-none">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 w-full h-full">
          {IMAGES.map((src, idx) => {
            const isLoaded = loadedImages.has(src);
            return (
              <div key={idx} className="relative w-full h-32 md:h-64 overflow-hidden rounded-xl">
                <motion.img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, filter: "blur(10px)", scale: 1.1 }}
                  animate={isLoaded ? { opacity: 1, filter: "blur(0px)", scale: 1 } : {}}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  onLoad={() => handleImageLoad(src)}
                  onError={() => handleImageError(src)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* Foreground */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <div className="w-[180px] h-[180px] mb-6">
          <DotLottieReact
            src="https://lottie.host/58019634-30a9-4161-93d5-b955fc7307ed/LCFA4IZUfF.lottie"
            loop
            autoplay
          />
        </div>

        <h2 className="text-xl md:text-2xl font-semibold tracking-tight text-gray-900 mb-6">
          Preparing your experience...
        </h2>

        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mb-2 font-semibold">
            Loading Progress
          </span>
          <span className="font-mono text-sm font-light text-gray-600">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
}
