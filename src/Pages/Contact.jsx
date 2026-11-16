import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CheckCircle2 } from "lucide-react";

const inp = "w-full rounded border border-stone-300 bg-white px-3 py-2.5 text-sm focus:border-teal-800 focus:outline-none focus:ring-1 focus:ring-teal-800";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const on = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) er.message = "Write at least 10 characters.";
    setErrors(er);
    if (!Object.keys(er).length) setSent(true);
  };

  const info = [[Phone, "Call us", "+91 98100 00000"], [Mail, "Email us", "hello@homiq.demo"], [MapPin, "Visit us", "Sector 15, Faridabad, Haryana 121007"], [Clock, "Open hours", "Mon to Sat, 9:30 am to 7 pm"]];
  const Err = ({ k }) => errors[k] ? <p className="mt-1 text-xs text-red-700">{errors[k]}</p> : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-extrabold text-stone-900">Contact us</h1>
      <p className="mt-2 max-w-prose text-stone-600">Tell us what you are looking for and an agent will reply within one working day.</p>

      <div className="mt-10 grid gap-10 lg:grid-cols-5">
        <div className="rounded-lg border border-stone-200 bg-white p-6 lg:col-span-3">
          {sent ? (
            <div className="flex flex-col items-center py-12 text-center">
              <CheckCircle2 size={40} className="text-teal-800" />
              <p className="mt-4 text-lg font-bold">Message sent</p>
              <p className="mt-1 text-sm text-stone-600">Thanks, {form.name}. We will reply to {form.email} soon.</p>
              <button onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }} className="mt-6 text-sm font-semibold text-teal-800 hover:underline">Send another message</button>
            </div>
          ) : (
            <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
              <div><label className="mb-1 block text-sm font-semibold" htmlFor="n">Name</label><input id="n" className={inp} value={form.name} onChange={on("name")} /><Err k="name" /></div>
              <div><label className="mb-1 block text-sm font-semibold" htmlFor="e">Email</label><input id="e" type="email" className={inp} value={form.email} onChange={on("email")} /><Err k="email" /></div>
              <div className="sm:col-span-2"><label className="mb-1 block text-sm font-semibold" htmlFor="p">Phone (optional)</label><input id="p" type="tel" className={inp} value={form.phone} onChange={on("phone")} /></div>
              <div className="sm:col-span-2"><label className="mb-1 block text-sm font-semibold" htmlFor="m">Message</label><textarea id="m" rows={5} className={inp} value={form.message} onChange={on("message")} /><Err k="message" /></div>
              <button className="rounded bg-teal-800 px-6 py-3 text-sm font-semibold text-white hover:bg-teal-900 sm:col-span-2 sm:justify-self-start">Send message</button>
            </form>
          )}
        </div>
        <ul className="space-y-6 lg:col-span-2">
          {info.map(([Icon, t, d]) => (
            <li key={t} className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-stone-200 text-teal-800"><Icon size={20} /></span>
              <div><p className="font-bold">{t}</p><p className="text-sm text-stone-600">{d}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
