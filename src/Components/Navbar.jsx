import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import Logo from "./Logo.jsx";
import { useWishlist } from "../Context/WishlistContext.jsx";

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
    `border-b-2 pb-1 text-sm font-semibold transition-colors ${
      isActive ? "border-brass text-white" : "border-transparent text-white/75 hover:text-white"
    }`;

  const navLinks = links.map((l) => (
    <NavLink key={l.to} to={l.to} end={l.to === "/"} className={linkClass} onClick={() => setOpen(false)}>
      {l.label}
    </NavLink>
  ));

  return (
    // Transparent over the Home hero, solid on every other page.
    <header className={onHome ? "absolute inset-x-0 top-0 z-30" : "sticky top-0 z-30 bg-ink shadow-md"}>
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-9 md:flex" aria-label="Main">{navLinks}</nav>

        <div className="flex items-center gap-2">
          <Link
            to="/properties?saved=1"
            aria-label={`Wishlist, ${ids.length} saved`}
            className="relative rounded-full p-2.5 text-white hover:bg-white/15"
          >
            <Heart size={20} />
            {ids.length > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-brass px-1 text-xs font-bold text-ink">
                {ids.length}
              </span>
            )}
          </Link>
          <button
            type="button"
            className="rounded-full p-2.5 text-white hover:bg-white/15 md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && <nav className="flex flex-col gap-4 bg-ink px-4 pb-6 pt-2 md:hidden" aria-label="Mobile">{navLinks}</nav>}
    </header>
  );
}
