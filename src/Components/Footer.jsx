import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="bg-ink text-white/75">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
            Homes to buy or rent, with clear prices and details you can check before you visit.
          </p>
        </div>
        <div>
          <p className="font-display font-bold text-brass">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/properties" className="hover:text-white">Properties</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-display font-bold text-brass">Get in touch</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={15} /> +91 98100 00000</li>
            <li className="flex items-center gap-2"><Mail size={15} /> hello@homiq.demo</li>
            <li className="flex items-center gap-2"><MapPin size={15} /> Sector 15, Faridabad, Haryana</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © 2026 Homiq. Demo website with sample data.
      </p>
    </footer>
  );
}
