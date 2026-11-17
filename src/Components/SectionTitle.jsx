export default function SectionTitle({ title, text, light = false }) {
  return (
    <div className="mb-10">
      <h2 className={`text-3xl font-extrabold sm:text-4xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {text && <p className={`mt-2 max-w-xl ${light ? "text-white/75" : "text-slate-600"}`}>{text}</p>}
    </div>
  );
}
