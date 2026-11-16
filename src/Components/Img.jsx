import { Image as ImageIcon } from "lucide-react";

export default function Img({ src, alt = "", className = "" }) {
  if (src) return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
  return (
    <div className={`flex items-center justify-center bg-stone-200 text-stone-400 ${className}`} aria-label="Image placeholder">
      <ImageIcon size={32} strokeWidth={1.5} />
    </div>
  );
}