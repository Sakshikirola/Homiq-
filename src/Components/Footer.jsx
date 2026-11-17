import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import Logo from "./Logo.jsx";

export default function Footer() {
  return (
    <footer className="bg-navy text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
            Find a home to buy or rent, with clear prices and verified details.
          </p>
        </div>
        <div>
          <p className="font-bold text-gold">Explore</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/properties" className="hover:text-white">Properties</Link></li>
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-bold text-gold">Get in touch</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex items-center gap-2"><Phone size={15} /> +91 98100 00000</li>
            <li className="flex items-center gap-2"><Mail size={15} /> hello@homiq.demo</li>
            <li className="flex items-center gap-2"><MapPin size={15} /> Sector 15, Faridabad, Haryana</li>
          </ul>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-slate-400">
        © 2026 Homiq. Demo website with sample data.
      </p>
    </footer>
  );
}
