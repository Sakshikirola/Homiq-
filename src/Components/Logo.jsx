import { Link } from "react-router-dom";
import { House } from "lucide-react";

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-white">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brass text-ink">
        <House size={20} />
      </span>
      <span className="font-display text-2xl font-extrabold">Homiq</span>
    </Link>
  );
}