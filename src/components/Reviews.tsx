import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Food Critic",
    content: "An absolute masterclass in flavor balancing. The Truffle Butter Chicken redefined my expectations of modern Indian cuisine.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Local Guide",
    content: "The ambiance alone is worth the visit, but the food is what keeps you coming back. Exquisite presentation and world-class service.",
    rating: 5,
  },
  {
    name: "Priya Patel",
    role: "Regular Guest",
    content: "It tastes like home, but elevated to a Michelin-star level. The attention to detail in every dish is simply staggering.",
    rating: 5,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export function Reviews() {
  return (
    <section className="py-20 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 md:mb-20">
          <span className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Words from our <br />
            <span className="text-secondary-text">Guests</span>
          </h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="bg-background/50 p-6 md:p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-colors flex flex-col h-full"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 md:w-5 md:h-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-white text-base md:text-lg leading-relaxed mb-8 flex-1">
                "{review.content}"
              </p>
              <div className="mt-auto">
                <div className="font-bold text-white">{review.name}</div>
                <div className="text-secondary-text text-sm">{review.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
