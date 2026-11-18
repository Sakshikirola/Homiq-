import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, BedDouble, Bath, Ruler, Calendar, MapPin, Check, Phone, ChevronLeft } from "lucide-react";
import Img from "../Components/Img.jsx";
import PropertyCard from "../Components/PropertyCard.jsx";
import { formatPrice } from "../Data/properties.js";
import { useListings } from "../Context/ListingsContext.jsx";
import { useWishlist } from "../Context/WishlistContext.jsx";

const field =
  "w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";

export default function PropertyDetails() {
  const { id } = useParams();
  const { all: properties } = useListings();
  const p = properties.find((x) => x.id === Number(id));
  const { has, toggle } = useWishlist();
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);

  if (!p) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-ink">Property not found</h1>
        <Link to="/properties" className="mt-4 inline-block font-semibold text-brass-dark hover:underline">
          Back to all properties
        </Link>
      </div>
    );
  }

  const saved = has(p.id);
  const similar = properties.filter((x) => x.id !== p.id && (x.city === p.city || x.type === p.type)).slice(0, 3);
  const facts = [
    [BedDouble, "Bedrooms", p.beds],
    [Bath, "Bathrooms", p.baths],
    [Ruler, "Area", `${p.area} sq ft`],
    [Calendar, "Built in", p.year],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/properties" className="inline-flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-brass-dark">
        <ChevronLeft size={16} /> Back to properties
      </Link>

      {/* key resets the photo choice and the visit form when you open a similar property */}
      <div key={p.id} className="mt-4 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Img src={p.gallery[active]} alt={p.title} seed={p.id + active} className="h-72 w-full rounded-xl sm:h-105" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {p.gallery.map((src, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1}`}
                className={`overflow-hidden rounded-lg border-2 ${active === i ? "border-brass" : "border-transparent"}`}
              >
                <Img src={src} alt="" seed={p.id + i} className="h-20 w-full" />
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rounded bg-brass/20 px-2.5 py-1 text-xs font-bold text-ink">For {p.status}</span>
              <h1 className="mt-3 text-3xl font-extrabold text-ink">{p.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-slate-600"><MapPin size={16} /> {p.address}</p>
            </div>
            <div className="sm:text-right">
              <p className="font-display text-3xl font-extrabold text-ink">{formatPrice(p.price, p.status)}</p>
              <button
                type="button"
                onClick={() => toggle(p.id)}
                aria-pressed={saved}
                className="mt-2 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold hover:bg-slate-100"
              >
                <Heart size={16} className={saved ? "fill-brass text-brass" : ""} /> {saved ? "Saved" : "Save to wishlist"}
              </button>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:grid-cols-4">
            {facts.map(([Icon, label, value]) => (
              <div key={label}>
                <Icon size={20} className="text-brass-dark" />
                <dt className="mt-2 text-xs text-slate-500">{label}</dt>
                <dd className="font-bold">{value}</dd>
              </div>
            ))}
          </dl>

          <h2 className="mt-8 text-xl font-bold text-ink">About this property</h2>
          <p className="mt-3 max-w-prose leading-relaxed text-slate-700">{p.description}</p>

          <h2 className="mt-8 text-xl font-bold text-ink">Amenities</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {p.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2 text-slate-700"><Check size={16} className="text-brass-dark" /> {a}</li>
            ))}
          </ul>
        </div>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6 lg:sticky lg:top-24">
          <p className="text-sm text-slate-500">Listing agent</p>
          <p className="font-bold">{p.agent.name}</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-slate-600"><Phone size={14} /> {p.agent.phone}</p>

          {sent ? (
            <p className="mt-6 rounded-lg bg-brass/15 p-4 text-sm text-ink">
              Visit request sent. {p.agent.name} will contact you within one working day.
            </p>
          ) : (
            <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <input required className={field} placeholder="Your name" aria-label="Your name" />
              <input required type="tel" className={field} placeholder="Phone number" aria-label="Phone number" />
              <textarea className={field} rows={3} defaultValue={`I'd like to visit ${p.title}.`} aria-label="Message" />
              <button className="w-full rounded-lg bg-ink py-2.5 text-sm font-semibold text-white hover:bg-ink-soft">Request a visit</button>
            </form>
          )}
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold text-ink">Similar properties</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((s) => <PropertyCard key={s.id} p={s} />)}
          </div>
        </section>
      )}
    </div>
  );
}
