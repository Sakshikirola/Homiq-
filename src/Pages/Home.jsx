
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, House, ShieldCheck, Tag, MessageCircle, Building2, Trees, BedDouble } from "lucide-react";
import PropertyCard from "../Components/PropertyCard.jsx";
import SectionTitle from "../Components/SectionTitle.jsx";
import { properties, cities, types } from "../Data/properties.js";

const typeIcons = { Apartment: Building2, Villa: Trees, House, Studio: BedDouble };

const reasons = [
  [ShieldCheck, "Verified listings", "Every property is checked for ownership and accurate details before it goes live."],
  [Tag, "Clear pricing", "Prices are shown in full, with no hidden brokerage in the listing."],
  [MessageCircle, "Direct support", "Talk to a local agent who knows the neighbourhood and replies within a day."],
];

const field = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-800 focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";

function Skyline() {
  const blocks = [[0, 90, 70], [80, 50, 110], [140, 120, 60], [210, 70, 90], [290, 30, 140], [330, 100, 80], [420, 60, 120], [490, 110, 70], [570, 40, 100], [620, 80, 130], [710, 20, 90], [750, 100, 60]];
  return (
    <svg viewBox="0 0 800 160" preserveAspectRatio="xMidYMax slice" className="absolute inset-x-0 bottom-0 h-28 w-full text-ink-soft" aria-hidden="true">
      {blocks.map(([x, y, w], i) => (
        <g key={i}>
          <rect x={x} y={y + 20} width={w - 6} height={160 - y} fill="currentColor" opacity="0.55" />
          {Array.from({ length: Math.floor((160 - y - 20) / 18) }).map((_, r) =>
            Array.from({ length: Math.floor((w - 16) / 16) }).map((__, c) =>
              (r * 7 + c * 3 + i) % 4 === 0 ? <rect key={`${r}-${c}`} x={x + 6 + c * 16} y={y + 30 + r * 18} width="6" height="8" fill="#c8963e" opacity="0.85" /> : null
            )
          )}
        </g>
      ))}
    </svg>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState({ status: "Sale", city: "All", type: "All" });
  const featured = properties.filter((p) => p.featured);

  const search = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set("status", q.status);
    if (q.city !== "All") params.set("city", q.city);
    if (q.type !== "All") params.set("type", q.type);
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <>
      <section className="relative overflow-hidden bg-linear-to-br from-ink to-[#0a2a31] text-white">
        <Skyline />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:grid-cols-2 sm:py-16">
          <div className="relative z-10">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-brass">Find your perfect place</p>
            <h1 className="max-w-xl text-4xl font-extrabold leading-tight sm:text-5xl">A home you can check before you visit</h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/80 sm:text-base">Browse homes to buy or rent across Faridabad, Gurugram, Noida and five more cities. Every listing shows its full price and details.</p>
            <form onSubmit={search} className="mt-6 grid max-w-xl gap-2 rounded-xl bg-white p-3 shadow-2xl sm:grid-cols-2">
              <select className={field} value={q.status} onChange={(e) => setQ({ ...q, status: e.target.value })} aria-label="Buy or rent">
                <option value="Sale">Buy</option>
                <option value="Rent">Rent</option>
              </select>
              <select className={field} value={q.city} onChange={(e) => setQ({ ...q, city: e.target.value })} aria-label="City">
                <option value="All">All cities</option>
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
              <select className={field} value={q.type} onChange={(e) => setQ({ ...q, type: e.target.value })} aria-label="Property type">
                <option value="All">All types</option>
                {types.map((t) => <option key={t}>{t}</option>)}
              </select>
              <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-brass px-4 py-2.5 text-sm font-bold text-ink transition hover:bg-[#d8a54f]"><Search size={16} /> Search homes</button>
            </form>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-md">
            <div className="aspect-4/3 overflow-hidden rounded-2xl border border-white/20 bg-white/10 shadow-2xl">
              <img src="" alt="Featured property" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <SectionTitle title="Browse by property type" text="Pick the kind of home you want and see everything available." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((t) => {
            const Icon = typeIcons[t] || House;
            const count = properties.filter((p) => p.type === t).length;
            return (
              <Link key={t} to={`/properties?type=${encodeURIComponent(t)}`} className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-brass hover:shadow-lg">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-brass transition group-hover:bg-brass group-hover:text-ink"><Icon size={20} /></span>
                <p className="mt-3 font-display text-base font-bold text-ink">{t === "House" ? "Houses" : `${t}s`}</p>
                <p className="text-xs text-slate-500">{count} {count === 1 ? "property" : "properties"}</p>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
          <div className="flex items-end justify-between">
            <SectionTitle title="Featured properties" text="Hand-picked homes our agents recommend right now." />
            <Link to="/properties" className="mb-8 hidden text-sm font-bold text-brass-dark hover:underline sm:block">View all properties</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
          <Link to="/properties" className="mt-5 inline-block text-sm font-bold text-brass-dark hover:underline sm:hidden">View all properties →</Link>
        </div>
      </section>

      <section className="bg-ink">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
          <SectionTitle light title="Why choose Homiq" text="We keep home hunting simple and honest." />
          <div className="grid gap-4 md:grid-cols-3">
            {reasons.map(([Icon, title, text]) => (
              <div key={title} className="rounded-xl border border-white/10 bg-ink-soft p-4">
                <Icon className="text-brass" size={25} />
                <h3 className="mt-3 text-base font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brass">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-4 py-8 md:flex-row md:items-center">
          <div>
            <h2 className="text-xl font-extrabold text-ink">Not sure where to start?</h2>
            <p className="mt-1 text-sm text-ink/80">Share your budget and preferred area, and an agent will shortlist homes for you.</p>
          </div>
          <Link to="/contact" className="rounded-full bg-ink px-6 py-3 text-sm font-bold text-white transition hover:bg-ink-soft">Talk to an agent</Link>
        </div>
      </section>
    </>
  );
}
