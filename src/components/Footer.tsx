import { Instagram, MapPin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background py-12 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          <div className="text-2xl font-bold tracking-tighter shine-text">
            The Grand Fauji
          </div>

          <div className="flex items-center gap-6">
            <a href="https://www.instagram.com/the_grand_fauji_7/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-secondary-text hover:text-white hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#e6683c] hover:to-[#bc1888] transition-all duration-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-secondary-text hover:text-white hover:bg-[#25D366] transition-colors duration-300">
              <MessageCircle className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-secondary-text hover:text-white hover:bg-white/20 transition-colors duration-300">
              <MapPin className="w-4 h-4" />
            </a>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-secondary-text">
          <p>© {new Date().getFullYear()} Grand Fauji Restaurant. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
