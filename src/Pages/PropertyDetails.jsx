import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, BedDouble, Bath, Ruler, Calendar, MapPin, Check, Phone, ChevronLeft } from "lucide-react";
import Img from "../components/Img.jsx";
import PropertyCard from "../components/PropertyCard.jsx";
import { properties, formatPrice } from "../data/properties.js";
import { useWishlist } from "../context/Wishlist.jsx";

const inp = "w-full rounded border border-stone-300 px-3 py-2.5 text-sm focus:border-teal-800 focus:outline-none focus:ring-1 focus:ring-teal-800";

export default function PropertyDetails() {
  const { id } = useParams();
  const p = properties.find((x) => x.id === Number(id));
  const { has, toggle } = useWishlist();
  const [active, setActive] = useState(0);
  const [sent, setSent] = useState(false);

  if (!p) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">Property not found</h1>
        <Link to="/properties" className="mt-4 inline-block font-semibold text-teal-800 hover:underline">Back to all properties</Link>
      </div>
    );
  }

  const saved = has(p.id);
  const agent = p.agent || { name: "Homiq Sales Team", phone: "+91 98100 00000" };
  const description = p.description || `A ${p.beds}-bedroom ${p.type.toLowerCase()} in ${p.city} with ${p.area} sq ft of living space. Contact our team to schedule a visit and get the full details.`;
  const amenities = p.amenities || ["Parking", "Power backup", "Security", "Water supply"];
  const similar = properties.filter((x) => x.id !== p.id && (x.city === p.city || x.type === p.type)).slice(0, 3);
  const facts = [[BedDouble, "Bedrooms", p.beds], [Bath, "Bathrooms", p.baths], [Ruler, "Area", `${p.area} sq ft`], [Calendar, "Built in", p.year]];

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Link to="/properties" className="inline-flex items-center gap-1 text-sm font-semibold text-stone-600 hover:text-teal-800"><ChevronLeft size={16} /> Back to properties</Link>

      <div className="mt-4 grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {/* MAIN + THUMBNAIL IMAGES: fill `gallery` in data/properties.js */}
          <Img src={p.gallery[active]} alt={p.title} className="h-72 w-full rounded-lg sm:h-[420px]" />
          <div className="mt-3 grid grid-cols-4 gap-3">
            {p.gallery.map((src, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Show image ${i + 1}`} className={`overflow-hidden rounded border-2 ${active === i ? "border-teal-800" : "border-transparent"}`}>
                <Img src={src} alt="" className="h-20 w-full" />
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="rounded bg-stone-200 px-2.5 py-1 text-xs font-semibold">For {p.status}</span>
              <h1 className="mt-3 text-3xl font-extrabold text-stone-900">{p.title}</h1>
              <p className="mt-1 flex items-center gap-1 text-stone-600"><MapPin size={16} /> {p.address}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-extrabold text-teal-800">{formatPrice(p.price, p.status)}</p>
              <button onClick={() => toggle(p.id)} aria-pressed={saved} className="mt-2 inline-flex items-center gap-2 rounded border border-stone-300 px-4 py-2 text-sm font-semibold hover:bg-stone-100">
                <Heart size={16} className={saved ? "fill-teal-800 text-teal-800" : ""} /> {saved ? "Saved" : "Save to wishlist"}
              </button>
            </div>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 rounded-lg border border-stone-200 bg-white p-5 sm:grid-cols-4">
            {facts.map(([Icon, l, v]) => (
              <div key={l}><Icon size={20} className="text-teal-800" /><dt className="mt-2 text-xs text-stone-500">{l}</dt><dd className="font-bold">{v}</dd></div>
            ))}
          </dl>

          <h2 className="mt-8 text-xl font-bold">About this property</h2>
          <p className="mt-3 max-w-prose leading-relaxed text-stone-700">{description}</p>

          <h2 className="mt-8 text-xl font-bold">Amenities</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {amenities.map((a) => <li key={a} className="flex items-center gap-2 text-stone-700"><Check size={16} className="text-teal-800" /> {a}</li>)}
          </ul>
        </div>

        <aside className="h-fit rounded-lg border border-stone-200 bg-white p-6 lg:sticky lg:top-24">
          <p className="text-sm text-stone-500">Listing agent</p>
          <p className="font-bold">{agent.name}</p>
          <p className="mt-1 flex items-center gap-2 text-sm text-stone-600"><Phone size={14} /> {agent.phone}</p>
          {sent ? (
            <p className="mt-6 rounded bg-teal-50 p-4 text-sm text-teal-900">Request sent. {agent.name} will contact you within one working day.</p>
          ) : (
            <form className="mt-6 space-y-3" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <input required className={inp} placeholder="Your name" aria-label="Your name" />
              <input required type="tel" className={inp} placeholder="Phone number" aria-label="Phone number" />
              <textarea className={inp} rows={3} defaultValue={`I'd like to visit ${p.title}.`} aria-label="Message" />
              <button className="w-full rounded bg-teal-800 py-2.5 text-sm font-semibold text-white hover:bg-teal-900">Request a visit</button>
            </form>
          )}
        </aside>
      </div>

      {similar.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Similar properties</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{similar.map((s) => <PropertyCard key={s.id} p={s} />)}</div>
        </section>
      )}
    </div>
  );
}
