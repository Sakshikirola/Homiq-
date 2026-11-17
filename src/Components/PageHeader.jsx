// Navy title banner used at the top of Properties, About and Contact.
export default function PageHeader({ title, text }) {
  return (
    <section className="bg-linear-to-br from-navy to-navy-light pb-20 pt-14 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-3xl font-extrabold sm:text-4xl">{title}</h1>
        {text && <p className="mt-3 max-w-xl text-slate-300">{text}</p>}
        <div className="mt-5 h-1 w-16 rounded bg-gold" />
      </div>
    </section>
  );
}
