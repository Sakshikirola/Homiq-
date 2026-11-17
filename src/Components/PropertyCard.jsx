import { Link } from "react-router-dom";
import { Heart, BedDouble, Bath, Ruler, MapPin } from "lucide-react";
import Img from "./Img.jsx";
import { useWishlist } from "../Context/WishlistContext.jsx";
import { formatPrice } from "../Data/properties.js";

export default function PropertyCard({ p }) {
  const { has, toggle } = useWishlist();
  const saved = has(p.id);

  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-xl">
      <div className="relative">
        <Link to={`/properties/${p.id}`} aria-label={`View ${p.title}`}>
          <Img src={p.image} alt={p.title} seed={p.id} className="h-56 w-full" />
        </Link>
        <span className="absolute left-3 top-3 rounded bg-brass px-2.5 py-1 text-xs font-bold text-ink">For {p.status}</span>
        <button
          type="button"
          onClick={() => toggle(p.id)}
          aria-pressed={saved}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute right-3 top-3 rounded-full bg-white p-2 text-slate-700 shadow hover:text-brass-dark"
        >
          <Heart size={18} className={saved ? "fill-brass text-brass" : ""} />
        </button>
      </div>
      <div className="p-5">
        <p className="font-display text-xl font-extrabold text-ink">{formatPrice(p.price, p.status)}</p>
        <Link to={`/properties/${p.id}`} className="mt-1 block font-semibold text-slate-800 hover:text-brass-dark">
          {p.title}
        </Link>
        <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
          <MapPin size={14} className="shrink-0" /> {p.address}
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
