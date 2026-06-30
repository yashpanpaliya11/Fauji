import { motion, useInView } from "framer-motion";
import { Award, Clock, Users, Utensils } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function Counter({ from = 0, to, duration = 2 }: { from?: number; to: number; duration?: number }) {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const updateCounter = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeProgress * (to - from) + from));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(updateCounter);
        }
      };

      animationFrame = requestAnimationFrame(updateCounter);

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [from, to, duration, isInView]);

  return <span ref={ref}>{count}</span>;
}

const stats = [
  { icon: Users, value: 5000, suffix: "+", label: "Happy Customers" },
  { icon: Utensils, value: 150, suffix: "+", label: "Unique Dishes" },
  { icon: Award, value: 15, suffix: "", label: "Culinary Awards" },
  { icon: Clock, value: 20, suffix: " Yrs", label: "of Excellence" },
];

export function WhyChooseUs() {
  return (
    <section id="about" className="py-32 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="mb-20 text-center">
          <span className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            Our Legacy
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Why We Are <br />
            <span className="text-secondary-text">Different</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-surface flex items-center justify-center mb-4 md:mb-6 group-hover:bg-accent transition-colors duration-500">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-accent group-hover:text-white transition-colors duration-500" />
              </div>
              <div className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mb-1 md:mb-2 flex items-center justify-center">
                <Counter to={stat.value} />
                <span>{stat.suffix}</span>
              </div>
              <div className="text-secondary-text font-medium text-xs sm:text-sm md:text-base">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
