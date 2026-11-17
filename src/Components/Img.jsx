import { useState } from "react";
import { House } from "lucide-react";
const tones = [
  ["#0e3b43", "#2b7a78"],
  ["#3a4a2f", "#8a9a5b"],
  ["#4a3b2a", "#c8963e"],
  ["#2d3a55", "#6c7fa8"],
  ["#4b2f3a", "#b5707e"],
  ["#1f4d3a", "#5aa17f"],
];

export default function Img({ src, alt = "", className = "", seed = 0 }) {
  const [failed, setFailed] = useState(false);

  if (src && !failed) {
    return <img src={src} alt={alt} loading="lazy" onError={() => setFailed(true)} className={`object-cover ${className}`} />;
  }

  const [a, b] = tones[Math.abs(seed) % tones.length];
  return (
    <div
      role="img"
      aria-label={alt || "Photo coming soon"}
      className={`flex items-center justify-center text-white/70 ${className}`}
      style={{ background: `linear-gradient(135deg, ${a}, ${b})` }}
    >
      <House size={40} strokeWidth={1.4} />
    </div>
  );
}
