import { Link } from "react-router-dom";
import Img from "../components/Img.jsx";

const team = [
  { name: "Aarav Mehta", role: "Founder and CEO" },
  { name: "Simran Kaur", role: "Head of Listings" },
  { name: "Vikram Joshi", role: "Senior Agent" },
];
const stats = [["2,500+", "Homes listed"], ["8", "Cities covered"], ["1,200+", "Families settled"], ["4.8/5", "Average client rating"]];

export default function About() {
  return (
    <>
      <section className="border-b border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
          <div>
            <h1 className="text-4xl font-extrabold text-stone-900">We make finding a home less stressful</h1>
            <p className="mt-5 max-w-prose leading-relaxed text-stone-600">Homiq started in Faridabad in 2018 with one idea: buyers and renters should see honest prices, real photos and complete details before they ever visit a property. Today our team helps families across eight cities find a place they are happy to come home to.</p>
          </div>
          {/* ABOUT IMAGE */}
          <Img src="" alt="Homiq team" className="h-72 w-full rounded-lg lg:h-96" />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(([n, l]) => (
          <div key={l} className="border-l-2 border-teal-800 pl-4"><p className="text-3xl font-extrabold text-stone-900">{n}</p><p className="text-sm text-stone-600">{l}</p></div>
        ))}
      </section>

      <section className="border-y border-stone-200 bg-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
          {[["Honesty first", "If a listing has a flaw, we say so. Trust matters more than a quick sale."], ["Local knowledge", "Our agents live in the areas they sell, so you get real answers about schools, commutes and neighbours."], ["Respect for your budget", "We show homes that fit what you can spend, and we do not push upgrades."]].map(([t, d]) => (
            <div key={t}><h3 className="font-bold text-stone-900">{t}</h3><p className="mt-2 text-sm leading-relaxed text-stone-600">{d}</p></div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="text-2xl font-bold">Meet the team</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {team.map((m) => (
            <div key={m.name}>
              <Img src="" alt={m.name} className="h-64 w-full rounded-lg" />
              <p className="mt-3 font-bold">{m.name}</p><p className="text-sm text-stone-500">{m.role}</p>
            </div>
          ))}
        </div>
        <Link to="/contact" className="mt-12 inline-block rounded bg-teal-800 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-900">Contact our team</Link>
      </section>
    </>
  );
}
