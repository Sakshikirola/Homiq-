import { Link } from "react-router-dom";
import { ShieldCheck, MapPinned, Wallet } from "lucide-react";
import Img from "../Components/Img.jsx";
import PageHeader from "../Components/PageHeader.jsx";
import SectionTitle from "../Components/SectionTitle.jsx";

const stats = [["2,500+", "Homes listed"], ["8", "Cities covered"], ["1,200+", "Families settled"], ["4.8/5", "Average client rating"]];
const values = [
  [ShieldCheck, "Honesty first", "If a listing has a flaw, we say so. Trust matters more than a quick sale."],
  [MapPinned, "Local knowledge", "Our agents live in the areas they sell, so you get real answers about schools, commutes and neighbours."],
  [Wallet, "Respect for your budget", "We show homes that fit what you can spend, and we do not push upgrades."],
];

export default function About() {
  return (
    <>
      <PageHeader title="About Homiq" text="We make finding a home less stressful." />

      {/* Story + image (add your image link in the src below) */}
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-extrabold text-navy">Honest prices. Real details.</h2>
          <p className="mt-5 max-w-prose leading-relaxed text-slate-600">
            Homiq started in Faridabad in 2018 with one idea: buyers and renters should see honest prices, real photos and
            complete details before they ever visit a property. Today our team helps families across eight cities find a place
            they are happy to come home to.
          </p>
        </div>
        <Img src="" alt="Homiq office" className="h-72 w-full rounded-lg lg:h-96" />
      </section>

      {/* Stats */}
      <section className="bg-navy">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map(([number, label]) => (
            <div key={label} className="border-l-2 border-gold pl-4">
              <p className="text-3xl font-extrabold text-gold">{number}</p>
              <p className="text-sm text-slate-300">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-6xl px-4 py-16">
        <SectionTitle title="What we stand for" />
        <div className="grid gap-6 md:grid-cols-3">
          {values.map(([Icon, title, text]) => (
            <div key={title} className="rounded-lg border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/20 text-navy"><Icon size={22} /></span>
              <h3 className="mt-4 font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-gold">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-10 md:flex-row md:items-center">
          <h2 className="text-2xl font-extrabold text-navy">Ready to find your next home?</h2>
          <Link to="/contact" className="rounded-full bg-navy px-7 py-3.5 text-sm font-bold text-white hover:bg-navy-light">Contact our team</Link>
        </div>
      </section>
    </>
  );
}
