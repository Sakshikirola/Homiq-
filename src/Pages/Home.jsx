import { Link } from "react-router-dom";
import { ArrowRight, Play, House, ShieldCheck, Headset, Tag, MessageCircle, Building2, Trees, BedDouble } from "lucide-react";
import PropertyCard from "../Components/PropertyCard.jsx";
import SectionTitle from "../Components/SectionTitle.jsx";
import { properties, types } from "../Data/properties.js";

// HERO BACKGROUND IMAGE: paste your image link between the quotes
const HERO_IMAGE = "";

const trust = [
  [House, "Trusted by 10K+ Clients"],
  [ShieldCheck, "Secure & Transparent Deals"],
  [Headset, "24/7 Customer Support"],
];
const typeIcons = { Apartment: Building2, Villa: Trees, House: House, Studio: BedDouble };
const reasons = [
  [ShieldCheck, "Verified listings", "Every property is checked for ownership and accurate details before it goes live."],
  [Tag, "Clear pricing", "Prices are shown in full, with no hidden brokerage in the listing."],
  [MessageCircle, "Direct support", "Talk to a local agent who knows the neighbourhood and answers within a day."],
];

export default function Home() {
  const featured = properties.filter((p) => p.featured);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-linear-to-br from-navy to-navy-light text-white">
        <div className="absolute inset-0">
          {HERO_IMAGE && <img src={HERO_IMAGE} alt="Modern home at dusk" className="h-full w-full object-cover" />}
          <div className="absolute inset-0 bg-linear-to-r from-navy/90 via-navy/50 to-navy/10" />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-40 pt-32">
          <p className="flex items-center gap-4 text-sm tracking-[0.25em] text-slate-200">
            BUY &middot; SELL &middot; RENT <span className="hidden h-px w-24 bg-slate-300 sm:block" />
          </p>
          <h1 className="mt-6 max-w-xl text-5xl font-extrabold leading-[1.1] sm:text-6xl">
            Find Your <span className="text-gold">Dream</span> Home
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-200">
            Discover the best properties in prime locations with ease and confidence.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6">
            <Link to="/properties" className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-sm font-bold text-navy hover:bg-white">
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
          <ul className="mx-auto grid max-w-3xl divide-y divide-white/20 rounded-xl bg-navy/85 px-4 py-2 backdrop-blur sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:py-4">
            {trust.map(([Icon, text]) => (
              <li key={text} className="flex items-center justify-center gap-3 px-4 py-3 text-sm sm:py-0">
                <Icon size={22} className="shrink-0 text-gold" /> {text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Browse by type */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle title="Browse by property type" text="Pick the kind of home you want and see everything available." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {types.map((t) => {
            const Icon = typeIcons[t] || House;
            const count = properties.filter((p) => p.type === t).length;
            return (
              <Link key={t} to={`/properties?type=${t}`} className="group rounded-lg border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-gold hover:shadow-xl">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-gold group-hover:bg-gold group-hover:text-navy">
                  <Icon size={22} />
                </span>
                <p className="mt-4 text-lg font-bold text-navy">{t}s</p>
                <p className="text-sm text-slate-500">{count} properties</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <div className="flex items-end justify-between">
            <SectionTitle title="Featured properties" text="Hand-picked homes our agents recommend right now." />
            <Link to="/properties" className="mb-10 hidden text-sm font-bold text-gold-dark hover:underline sm:block">View all properties</Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => <PropertyCard key={p.id} p={p} />)}
          </div>
        </div>
      </section>

      {/* Why Homiq */}
      <section className="bg-navy">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <SectionTitle light title="Why choose Homiq" text="We keep home hunting simple and honest." />
          <div className="grid gap-6 md:grid-cols-3">
            {reasons.map(([Icon, title, text]) => (
              <div key={title} className="rounded-lg border border-white/10 bg-navy-light p-6">
                <Icon className="text-gold" size={28} />
                <h3 className="mt-4 font-bold text-white">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="bg-gold">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-12 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-extrabold text-navy">Not sure where to start?</h2>
            <p className="mt-2 text-navy/80">Tell us your budget and preferred area, and an agent will shortlist homes for you.</p>
          </div>
          <Link to="/contact" className="rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white hover:bg-navy-light">
            Talk to an agent
          </Link>
        </div>
      </section>
    </>
  );
}
