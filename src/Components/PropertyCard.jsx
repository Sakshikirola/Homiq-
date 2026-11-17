import { Link } from "react-router-dom";
import { Heart, BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import Img from "./Img.jsx";
import { useWishlist } from "../Context/Wishlist.jsx";
import { formatPrice } from "../Data/properties.js";

export default function PropertyCard({ p }) {
  const { has, toggle } = useWishlist();
  const saved = has(p.id);
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <Link to={`/properties/${p.id}`}>
          <Img src={p.image} alt={p.title} className="h-56 w-full" />
        </Link>
        <span className="absolute left-3 top-3 rounded bg-gold px-2.5 py-1 text-xs font-bold text-navy">
          For {p.status}
        </span>
        <button
          onClick={() => toggle(p.id)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 rounded-full bg-white p-2 text-slate-700 hover:text-gold-dark focus-visible:outline-2 focus-visible:outline-gold"
        >
          <Heart size={18} className={saved ? "fill-gold text-gold" : ""} />
        </button>
      </div>
      <div className="p-5">
        <p className="text-xl font-extrabold text-navy">{formatPrice(p.price, p.status)}</p>
        <Link to={`/properties/${p.id}`} className="mt-1 block font-semibold text-slate-800 hover:text-gold-dark">
          {p.title}
        </Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={14} /> {p.address}
        </p>
        <div className="mt-4 flex gap-5 border-t border-slate-100 pt-4 text-sm text-slate-600">
          <span className="flex items-center gap-1.5"><BedDouble size={16} /> {p.beds} Beds</span>
          <span className="flex items-center gap-1.5"><Bath size={16} /> {p.baths} Baths</span>
          <span className="flex items-center gap-1.5"><Ruler size={16} /> {p.area} sq ft</span>
        </div>
      </div>
    </article>
  );
}
