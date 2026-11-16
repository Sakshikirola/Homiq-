import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShieldCheck, Tag, MessageCircle } from "lucide-react";
import Img from "../components/Img.jsx";
import PropertyCard from "../components/PropertyCard.jsx";
import { properties, cities } from "../data/properties.js";

const inputCls = "w-full rounded border border-stone-300 bg-white px-3 py-2.5 text-sm focus:border-teal-800 focus:outline-none focus:ring-1 focus:ring-teal-800";

export default function Home() {
  const nav = useNavigate();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("All");
  const [city, setCity] = useState("All");

  const submit = (e) => {
    e.preventDefault();
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (status !== "All") sp.set("status", status);
    if (city !== "All") sp.set("city", city);
    nav(`/properties?${sp.toString()}`);
  };

  const featured = properties.filter((p) => p.featured);

  return (
    <>
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-stone-900 sm:text-5xl">Find the home that fits your life</h1>
            <p className="mt-5 max-w-md text-lg text-stone-600">Browse homes for sale and rent across eight cities, with prices and details laid out clearly.</p>
            <form onSubmit={submit} className="mt-8 grid gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4 sm:grid-cols-2">
              <input className={`${inputCls} sm:col-span-2`} placeholder="Search by name, area or city" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search properties" />
              <select className={inputCls} value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Buy or rent">
                <option value="All">Buy or rent</option><option value="Sale">Buy</option><option value="Rent">Rent</option>
              </select>
              <select className={inputCls} value={city} onChange={(e) => setCity(e.target.value)} aria-label="City">
                <option value="All">All cities</option>
                {cities.map((c) => <option key={c}>{c}</option>)}
              </select>
              <button className="flex items-center justify-center gap-2 rounded bg-teal-800 px-5 py-2.5 text-sm font-semibold text-white hover:bg-teal-900 sm:col-span-2">
                <Search size={16} /> Search properties
              </button>
            </form>
          </div>
          {/* HERO IMAGE: add your link to the `src` below */}
          <Img src="" alt="Modern home exterior" className="h-80 w-full rounded-lg lg:h-[460px]" />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="text-2xl font-bold text-stone-900">Featured properties</h2>
          <Link to="/properties" className="text-sm font-semibold text-teal-800 hover:underline">View all properties</Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p) => <PropertyCard key={p.id} p={p} />)}
        </div>
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-3">
          {[
            [ShieldCheck, "Verified listings", "Every property is checked for ownership and accurate details before it goes live."],
            [Tag, "Clear pricing", "Prices are shown in full, with no hidden brokerage in the listing."],
            [MessageCircle, "Direct support", "Talk to a local agent who knows the neighbourhood and answers within a day."],
          ].map(([Icon, t, d]) => (
            <div key={t}>
              <Icon className="text-teal-800" size={28} />
              <h3 className="mt-4 font-bold text-stone-900">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col items-start justify-between gap-6 rounded-lg bg-teal-900 p-10 text-white md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold">Not sure where to start?</h2>
            <p className="mt-2 text-teal-100">Tell us your budget and preferred area, and an agent will shortlist homes for you.</p>
          </div>
          <Link to="/contact" className="rounded bg-white px-6 py-3 text-sm font-semibold text-teal-900 hover:bg-stone-100">Talk to an agent</Link>
        </div>
      </section>
    </>
  );
}
