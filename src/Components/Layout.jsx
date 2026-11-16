import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { Heart, Menu, X, Home as HomeIcon, Mail, Phone, MapPin } from "lucide-react";
import { useWishlist } from "../context/Wishlist.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

function Logo({ light }) {
  return (
    <Link to="/" className={`flex items-center gap-2 text-xl font-extrabold ${light ? "text-white" : "text-stone-900"}`}>
      <span className="flex h-8 w-8 items-center justify-center rounded bg-teal-800 text-white"><HomeIcon size={18} /></span>
      Homiq
    </Link>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { ids } = useWishlist();
  const { pathname } = useLocation();

  useEffect(() => { window.scrollTo(0, 0); setOpen(false); }, [pathname]);

  const linkCls = ({ isActive }) =>
    `text-sm font-semibold ${isActive ? "text-teal-800" : "text-stone-600 hover:text-stone-900"}`;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkCls}>{l.label}</NavLink>)}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/properties?saved=1" className="relative rounded-full p-2 text-stone-700 hover:bg-stone-100" aria-label={`Wishlist, ${ids.length} saved`}>
              <Heart size={20} />
              {ids.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-teal-800 px-1 text-xs font-bold text-white">{ids.length}</span>
              )}
            </Link>
            <button className="rounded p-2 md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="flex flex-col gap-4 border-t border-stone-200 px-4 py-4 md:hidden">
            {links.map((l) => <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkCls}>{l.label}</NavLink>)}
          </nav>
        )}
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="bg-stone-900 text-stone-300">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-400">Find a home to buy or rent, with clear prices and verified details.</p>
          </div>
          <div>
            <p className="font-semibold text-white">Explore</p>
            <ul className="mt-4 space-y-2 text-sm">
              {links.map((l) => <li key={l.to}><Link to={l.to} className="hover:text-white">{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-white">Get in touch</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone size={15} /> +91 98100 00000</li>
              <li className="flex items-center gap-2"><Mail size={15} /> hello@homiq.demo</li>
              <li className="flex items-center gap-2"><MapPin size={15} /> Sector 15, Faridabad, Haryana</li>
            </ul>
          </div>
        </div>
        <p className="border-t border-stone-800 py-5 text-center text-xs text-stone-500">© 2026 Homiq. Demo website with sample data.</p>
      </footer>
    </div>
  );
}
