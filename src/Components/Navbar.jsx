import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, X, User } from "lucide-react";
import Logo from "./Logo.jsx";
import { useWishlist } from "../Context/Wishlist.jsx";

const links = [
  { to: "/", label: "Home" },
  { to: "/properties", label: "Properties" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { ids } = useWishlist();
  const onHome = useLocation().pathname === "/";

  const linkClass = ({ isActive }) =>
    `border-b-2 pb-1 text-sm font-semibold ${
      isActive ? "border-gold text-white" : "border-transparent text-slate-300 hover:text-white"
    }`;

  const navLinks = links.map((l) => (
    <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass} onClick={() => setOpen(false)}>
      {l.label}
    </NavLink>
  ));

  return (
    // Transparent on the Home hero image, solid navy on every other page
    <header className={onHome ? "absolute inset-x-0 top-0 z-30" : "sticky top-0 z-30 bg-navy shadow-md"}>
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Logo />

        <nav className="hidden items-center gap-9 md:flex">{navLinks}</nav>

        <div className="flex items-center gap-3">
          <Link
            to="/properties?saved=1"
            aria-label={`Wishlist, ${ids.length} saved`}
            className="relative rounded-full p-2 text-white hover:bg-white/15"
          >
            <Heart size={20} />
            {ids.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-xs font-bold text-navy">
                {ids.length}
              </span>
            )}
          </Link>

          <button type="button" className="hidden items-center gap-2 rounded-full border border-white/50 px-5 py-2 text-xs font-semibold text-white hover:bg-white/15 md:inline-flex">
            <User size={14} /> Login / Sign Up
          </button>

          <button className="rounded p-2 text-white md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && <nav className="flex flex-col gap-4 bg-navy px-4 py-5 md:hidden">{navLinks}</nav>}
    </header>
  );
}
