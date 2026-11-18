import { useMemo, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { Search, SearchX } from "lucide-react";
import PageHeader from "../Components/PageHeader.jsx";
import PropertyCard from "../Components/PropertyCard.jsx";
import { useListings } from "../Context/ListingsContext.jsx";
import { useWishlist } from "../Context/WishlistContext.jsx";

const field =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";

const budgets = {
  Sale: [["Any budget", 0], ["Up to ₹50 L", 5e6], ["Up to ₹1 Cr", 1e7], ["Up to ₹2 Cr", 2e7], ["Up to ₹5 Cr", 5e7]],
  Rent: [["Any budget", 0], ["Up to ₹30,000/mo", 3e4], ["Up to ₹60,000/mo", 6e4], ["Up to ₹1 L/mo", 1e5]],
};

const sorters = {
  featured: (a, b) => Number(b.featured) - Number(a.featured) || a.id - b.id,
  low: (a, b) => a.price - b.price,
  high: (a, b) => b.price - a.price,
  area: (a, b) => b.area - a.area,
  newest: (a, b) => b.year - a.year,
};

function PropertiesInner() {
  const [sp] = useSearchParams();
  const { ids } = useWishlist();
  const { all: properties, cities, types } = useListings();

  const start = {
    q: sp.get("q") || "",
    status: sp.get("status") || "All",
    city: sp.get("city") || "All",
    type: sp.get("type") || "All",
    beds: 0,
    max: 0,
    sort: "featured",
    saved: sp.get("saved") === "1",
  };
  const blank = { ...start, q: "", status: "All", city: "All", type: "All", saved: false };

  const [f, setF] = useState(start);
  const set = (key, value) => setF((prev) => ({ ...prev, [key]: value, ...(key === "status" ? { max: 0 } : {}) }));

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    const list = properties.filter(
      (p) =>
        (!q || `${p.title} ${p.address} ${p.city} ${p.type}`.toLowerCase().includes(q)) &&
        (f.status === "All" || p.status === f.status) &&
        (f.city === "All" || p.city === f.city) &&
        (f.type === "All" || p.type === f.type) &&
        p.beds >= f.beds &&
        (!f.max || p.price <= f.max) &&
        (!f.saved || ids.includes(p.id))
    );
    return [...list].sort(sorters[f.sort]);
  }, [f, ids, properties]);

  return (
    <>
      <PageHeader
        title={f.saved ? "Your wishlist" : "Properties"}
        text={`${results.length} ${results.length === 1 ? "property" : "properties"} found`}
      />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        <div className="relative -mt-10 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
          <div className="relative">
            <Search size={16} className="pointer-events-none absolute left-3 top-3.5 text-slate-400" />
            <input
              className={`${field} pl-9`}
              placeholder="Search by name, area or city"
              value={f.q}
              onChange={(e) => set("q", e.target.value)}
              aria-label="Search"
            />
          </div>

          <div className="mt-3 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <select className={field} value={f.status} onChange={(e) => set("status", e.target.value)} aria-label="Buy or rent">
              <option value="All">Buy or rent</option>
              <option value="Sale">Buy</option>
              <option value="Rent">Rent</option>
            </select>
            <select className={field} value={f.type} onChange={(e) => set("type", e.target.value)} aria-label="Property type">
              <option value="All">All types</option>
              {types.map((t) => <option key={t}>{t}</option>)}
            </select>
            <select className={field} value={f.city} onChange={(e) => set("city", e.target.value)} aria-label="City">
              <option value="All">All cities</option>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
            <select className={field} value={f.beds} onChange={(e) => set("beds", Number(e.target.value))} aria-label="Bedrooms">
              <option value={0}>Any bedrooms</option>
              {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n}+ beds</option>)}
            </select>
            <select
              className={`${field} disabled:bg-slate-100 disabled:text-slate-400`}
              value={f.max}
              onChange={(e) => set("max", Number(e.target.value))}
              disabled={f.status === "All"}
              aria-label="Budget"
              title={f.status === "All" ? "Choose Buy or Rent first" : ""}
            >
              {(budgets[f.status] || [["Budget", 0]]).map(([label, value]) => <option key={label} value={value}>{label}</option>)}
            </select>
            <select className={field} value={f.sort} onChange={(e) => set("sort", e.target.value)} aria-label="Sort by">
              <option value="featured">Featured first</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="area">Largest area</option>
              <option value="newest">Newest built</option>
            </select>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm">
            <label className="flex items-center gap-2 text-slate-700">
              <input type="checkbox" className="accent-ink" checked={f.saved} onChange={(e) => set("saved", e.target.checked)} />
              Show saved only ({ids.length})
            </label>
            <button type="button" onClick={() => setF(blank)} className="font-semibold text-brass-dark hover:underline">
              Clear all filters
            </button>
          </div>
        </div>

        {results.length ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        ) : (
          <div className="mt-8 flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
            <SearchX size={36} className="text-slate-400" />
            <p className="mt-4 font-semibold text-slate-800">
              {f.saved ? "No saved properties match" : "No properties match your filters"}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {f.saved ? "Tap the heart on any listing to save it here." : "Remove a filter or search a different area."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default function Properties() {
  const { search } = useLocation();
  return <PropertiesInner key={search} />;
}
