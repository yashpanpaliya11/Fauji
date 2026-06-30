import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { MagneticButton } from "./MagneticButton";
import { ImageLoader } from "./ImageLoader";

import dalMakhani from "../assets/images/dish_dal_makhani_1782755493869.jpg";
import tandooriChicken from "../assets/images/dish_tandoori_chicken_1782755521593.jpg";
import butterChicken from "../assets/images/dish_butter_chicken_1782755509797.jpg";
import roganJosh from "../assets/images/dish_rogan_josh_1782755534882.jpg";
import paneerTikka from "../assets/images/dish_paneer_tikka_1782755548521.jpg";
import garlicNaan from "../assets/images/dish_garlic_naan_1782755560760.jpg";

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  {
    id: 1,
    name: "Dal Makhani",
    desc: "Rich, creamy slow-cooked black lentils with fresh cream and coriander.",
    price: "$18",
    img: dalMakhani,
  },
  {
    id: 2,
    name: "Tandoori Chicken",
    desc: "Smoky, charcoal-grilled chicken with mint chutney and lemon.",
    price: "$24",
    img: tandooriChicken,
  },
  {
    id: 3,
    name: "Butter Chicken",
    desc: "Authentic Murgh Makhani in a rich, buttery orange-red tomato gravy.",
    price: "$26",
    img: butterChicken,
  },
  {
    id: 4,
    name: "Mutton Rogan Josh",
    desc: "Tender lamb cooked in a deep red, spicy, and aromatic Kashmiri curry.",
    price: "$32",
    img: roganJosh,
  },
  {
    id: 5,
    name: "Paneer Tikka Masala",
    desc: "Charcoal-grilled cottage cheese in a spiced tomato gravy.",
    price: "$20",
    img: paneerTikka,
  },
  {
    id: 6,
    name: "Garlic Butter Naan",
    desc: "Freshly baked flatbread topped with minced garlic and cilantro.",
    price: "$8",
    img: garlicNaan,
  },
];

export function SpecialDishes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scroll = scrollRef.current;

    if (!container || !scroll) return;

    let ctx = gsap.context(() => {
      // Check if it's mobile view, horizontal pinning can be jarring on very small screens, 
      // but if we want to keep the horizontal scroll effect, we adjust the calculation slightly.
      const isMobile = window.innerWidth < 768;
      const scrollWidth = scroll.scrollWidth - window.innerWidth + (isMobile ? 32 : 0); // Add some padding for mobile
      
      gsap.to(scroll, {
        x: -scrollWidth,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${scrollWidth * 1.8}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="menu" ref={containerRef} className="relative h-[100dvh] bg-background overflow-hidden py-16 md:py-20 flex flex-col">
      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12 shrink-0">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight">
          Signature <span className="text-secondary-text">Plates</span>
        </h2>
        <p className="text-secondary-text mt-2 md:mt-4 max-w-md text-sm md:text-base">
          A curated selection of our finest dishes, crafted with passion and the highest quality ingredients.
        </p>
      </div>

      <div className="flex-1 relative w-full h-full flex items-center min-h-[400px]">
        <div ref={scrollRef} className="flex gap-4 md:gap-8 px-4 md:px-6 absolute left-0 w-max items-center h-full">
          {dishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              className="relative w-[280px] md:w-[450px] aspect-[3/4] md:aspect-[4/5] rounded-3xl overflow-hidden group cursor-pointer shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="absolute inset-0 bg-surface">
                <ImageLoader
                  src={dish.img}
                  alt={dish.name}
                  containerClassName="w-full h-full"
                  imageClassName="transition-transform duration-1000 group-hover:scale-110"
                  loading="eager"
                />
              </div>
              
              {/* Glass overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500 backdrop-blur-[2px] group-hover:backdrop-blur-sm" />
              
              <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-end transform translate-y-8 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                    {dish.name}
                  </h3>
                  <span className="text-accent text-xl md:text-2xl font-medium">{dish.price}</span>
                </div>
                <p className="text-secondary-text text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-6">
                  {dish.desc}
                </p>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                  <MagneticButton variant="outline" className="w-full py-3 text-sm">Order Now</MagneticButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
