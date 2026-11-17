import { Link } from "react-router-dom";
import { House } from "lucide-react";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-white">
      <span className="flex h-9 w-9 items-center justify-center rounded bg-gold text-navy">
        <House size={20} />
      </span>
      <span className="leading-tight">
        <span className="block text-xl font-extrabold">Homiq</span>
        <span className="block text-[11px] font-medium text-slate-300">Find Your Perfect Place</span>
      </span>
    </Link>
  );
}
