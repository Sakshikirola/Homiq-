export default function SectionTitle({ title, text, light }) {
  return (
    <div className="mb-10">
      <h2 className={`text-3xl font-extrabold ${light ? "text-white" : "text-navy"}`}>{title}</h2>
      {text && <p className={`mt-2 max-w-xl ${light ? "text-slate-300" : "text-slate-600"}`}>{text}</p>}
    </div>
  );
}
