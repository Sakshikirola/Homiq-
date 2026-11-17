import { Link } from "react-router-dom";
import { ArrowRight, Play, Home as HomeIcon, ShieldCheck, Headset, Tag, MessageCircle } from "lucide-react";
import PropertyCard from "../components/PropertyCard.jsx";
import { properties } from "../data/properties.js";

// HERO BACKGROUND IMAGE: paste your image link between the quotes
const HERO_IMAGE = "";

const trust = [
  [HomeIcon, "Trusted by 10K+ Clients"],
  [ShieldCheck, "Secure & Transparent Deals"],
  [Headset, "24/7 Customer Support"],
];

export default function Home() {
  const featured = properties.filter((p) => p.featured);

  return (
    <>
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-stone-800 text-white">
        <div className="absolute inset-0">
          {HERO_IMAGE && <img src={HERO_IMAGE} alt="Modern home at dusk" className="h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-linear-to-r from-stone-950/80 via-stone-950/40 to-stone-950/10" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-40 pt-32">
          <p className="flex items-center gap-4 text-sm tracking-[0.25em] text-stone-200">
            BUY &middot; SELL &middot; RENT <span className="hidden h-px w-24 bg-stone-300 sm:block" />
          </p>
          <h1 className="mt-6 max-w-xl text-5xl font-extrabold leading-[1.1] sm:text-6xl">
            Find Your <span className="text-amber-300">Dream</span> Home
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-stone-200">
            Discover the best properties in prime locations with ease and confidence.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link to="/properties" className="inline-flex items-center gap-2 rounded-full bg-amber-300 px-7 py-3.5 text-sm font-bold text-stone-900 hover:bg-amber-200">
              Explore Properties <ArrowRight size={16} />
            </Link>
            <button type="button" className="group inline-flex items-center gap-3 text-sm font-semibold">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/80 group-hover:bg-white/15">
                <Play size={16} className="fill-white" />
              </span>
              Watch Video
            </button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 px-4">
          <ul className="mx-auto grid max-w-3xl divide-y divide-white/20 rounded-xl bg-stone-900/80 px-4 py-2 backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-4">
            {trust.map(([Icon, t]) => (
              <li key={t} className="flex items-center justify-center gap-3 px-4 py-3 text-sm sm:py-0">
                <Icon size={22} className="shrink-0 text-amber-300" /> {t}
              </li>
            ))}
          </ul>
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