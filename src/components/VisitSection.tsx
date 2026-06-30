import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MagneticButton } from "./MagneticButton";

export function VisitSection() {
  return (
    <section id="contact" className="py-20 md:py-32 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center max-w-3xl mx-auto text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="w-full flex flex-col items-center"
          >
            <span className="text-accent text-xs md:text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
              Visit Us
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-8">
              Experience it <br />
              <span className="text-secondary-text">in person</span>
            </h2>
            
            <div className="space-y-6 md:space-y-8 mb-10 md:mb-12 w-full max-w-md text-left">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2">Location</h4>
                  <p className="text-secondary-text text-sm md:text-base">123 Culinary Avenue, Food District<br />Metropolis, NY 10001</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2">Hours</h4>
                  <p className="text-secondary-text text-sm md:text-base">Mon - Thu: 11:00 AM - 10:00 PM<br />Fri - Sun: 11:00 AM - 11:30 PM</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-background flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 md:w-5 md:h-5 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg md:text-xl mb-1 md:mb-2">Contact</h4>
                  <p className="text-secondary-text text-sm md:text-base">+1 (555) 123-4567<br />reservations@grandfauji.com</p>
                </div>
              </div>
            </div>
            
            <MagneticButton variant="primary" className="w-full sm:w-auto">
              Book a Table
            </MagneticButton>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
