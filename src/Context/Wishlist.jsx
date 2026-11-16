import { createContext, useContext, useEffect, useState } from "react";

const KEY = "homiq_wishlist";
const Ctx = createContext(null);

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }) {
  const [ids, setIds] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(ids));
    } catch {}
  }, [ids]);

  const toggle = (id) =>
    setIds((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const has = (id) => ids.includes(id);

  return <Ctx.Provider value={{ ids, toggle, has }}>{children}</Ctx.Provider>;
}

export const useWishlist = () => useContext(Ctx);
