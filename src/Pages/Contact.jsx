import { useState } from "react";
import { Phone, Mail, MapPin, Clock, CircleCheck } from "lucide-react";
import PageHeader from "../Components/PageHeader.jsx";

const field =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";

const empty = { name: "", email: "", phone: "", message: "" };

const info = [
  [Phone, "Call us", "+91 98100 00000"],
  [Mail, "Email us", "hello@homiq.demo"],
  [MapPin, "Visit us", "Sector 15, Faridabad, Haryana 121007"],
  [Clock, "Open hours", "Mon to Sat, 9:30 am to 7 pm"],
];

function FieldError({ message }) {
  return message ? <p className="mt-1 text-xs text-red-700">{message}</p> : null;
}

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);
  const on = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = "Enter your name.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) er.email = "Enter a valid email address.";
    if (form.message.trim().length < 10) er.message = "Write at least 10 characters.";
    setErrors(er);
    if (!Object.keys(er).length) setSent(true);
  };

  return (
    <>
      <PageHeader title="Contact us" text="Tell us what you are looking for and an agent will reply within one working day." />
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-3">
            {sent ? (
              <div className="flex flex-col items-center py-12 text-center">
                <CircleCheck size={40} className="text-brass-dark" />
                <p className="mt-4 text-lg font-bold text-ink">Message sent</p>
                <p className="mt-1 text-sm text-slate-600">Thanks, {form.name}. We will reply to {form.email} soon.</p>
                <button
                  type="button"
                  onClick={() => { setSent(false); setForm(empty); setErrors({}); }}
                  className="mt-6 text-sm font-semibold text-brass-dark hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-semibold" htmlFor="name">Name</label>
                  <input id="name" className={field} value={form.name} onChange={on("name")} />
                  <FieldError message={errors.name} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-semibold" htmlFor="email">Email</label>
                  <input id="email" type="email" className={field} value={form.email} onChange={on("email")} />
                  <FieldError message={errors.email} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-semibold" htmlFor="phone">Phone (optional)</label>
                  <input id="phone" type="tel" className={field} value={form.phone} onChange={on("phone")} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-sm font-semibold" htmlFor="message">Message</label>
                  <textarea id="message" rows={5} className={field} value={form.message} onChange={on("message")} />
                  <FieldError message={errors.message} />
                </div>
                <button className="rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink-soft sm:col-span-2 sm:justify-self-start">
                  Send message
                </button>
              </form>
            )}
          </div>

          <ul className="space-y-6 lg:col-span-2">
            {info.map(([Icon, title, detail]) => (
              <li key={title} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-brass/20 text-ink"><Icon size={20} /></span>
                <div>
                  <p className="font-bold text-ink">{title}</p>
                  <p className="text-sm text-slate-600">{detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
