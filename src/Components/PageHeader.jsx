export default function PageHeader({ title, text }) {
  return (
    <section className="bg-linear-to-br from-ink to-ink-soft pb-20 pt-14 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <h1 className="text-4xl font-extrabold sm:text-5xl">{title}</h1>
        {text && <p className="mt-3 max-w-xl text-white/75">{text}</p>}
        <div className="mt-5 h-1 w-16 rounded bg-brass" />
      </div>
    </section>
  );
}
