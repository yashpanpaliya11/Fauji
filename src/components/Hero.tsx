import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { MagneticButton } from "./MagneticButton";
import heroAmbiance from "../assets/images/hero_ambiance_1782755588375.jpg";

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const AnimatedText = ({ text, className }: { text: string, className?: string }) => {
  return (
    <span className={className}>
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={charVariants}
          className="inline-block"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

export function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Force play for some mobile browsers that require explicit trigger
      videoRef.current.play().catch((e) => console.log("Video play failed", e));
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section id="home" ref={container} className="relative h-[100dvh] w-full overflow-hidden bg-background flex items-center justify-center">
      {/* Video Background with Scroll Scale */}
      <motion.div 
        style={{ scale: videoScale, opacity }} 
        className="absolute inset-0 z-0 origin-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          className="absolute inset-0 w-full h-full"
        >
          <video
            ref={videoRef}
            key="hero-video"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            poster={heroAmbiance}
          >
            <source src="/videos/hero-background.mp4" type="video/mp4" />
          </video>
        </motion.div>
        
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.65)] via-[rgba(0,0,0,0.45)] to-[rgba(0,0,0,0.70)] pointer-events-none" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: contentY, opacity }}
        className="relative z-10 container mx-auto px-4 md:px-6 flex flex-col items-center text-center"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.03 } } }}
          className="mb-6 flex flex-col items-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] flex flex-col items-center md:gap-2 mb-6">
            <motion.div className="overflow-hidden"><AnimatedText text="Authentic Taste." /></motion.div>
            <motion.div className="overflow-hidden text-secondary-text"><AnimatedText text="Made Fresh." /></motion.div>
            <motion.div className="overflow-hidden"><AnimatedText text="Served with Pride." /></motion.div>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-secondary-text text-base md:text-lg max-w-xl mx-auto"
          >
            Experience Grand Fauji Restaurant with authentic flavours, premium dining and effortless ordering.
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-8 w-full sm:w-auto"
        >
          <MagneticButton variant="primary" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 text-sm animate-reflection group">
            🍽 View Menu
          </MagneticButton>
          <MagneticButton variant="outline" className="w-full sm:w-auto flex items-center justify-center gap-2 text-white border-white/30 hover:border-white px-6 py-3 text-sm animate-reflection group">
            📲 Order on WhatsApp
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <span className="text-xs uppercase tracking-widest text-secondary-text">Scroll</span>
        <div className="w-[1px] h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-white"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
