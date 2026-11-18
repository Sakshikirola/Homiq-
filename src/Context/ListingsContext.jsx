import { createContext, useContext, useState } from "react";
import { properties as staticProperties } from "../Data/properties.js";

const KEY = "homiq_user_listings";

const ListingsContext = createContext({
  all: staticProperties,
  userListings: [],
  cities: [],
  types: [],
  addListing: () => false,
  removeListing: () => {},
});

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function ListingsProvider({ children }) {
  const [userListings, setUserListings] = useState(load);

  // Returns false if the browser storage is full or blocked, so the form can show a message.
  const addListing = (listing) => {
    const next = [listing, ...userListings];
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      return false;
    }
    setUserListings(next);
    return true;
  };

  const removeListing = (id) => {
    const next = userListings.filter((l) => l.id !== id);
    try {
      localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* ignore: the list still updates for this session */
    }
    setUserListings(next);
  };

  // Posted listings come first, so new posts are easy to find.
  const all = [...userListings, ...staticProperties];
  const cities = [...new Set(all.map((p) => p.city))].sort();
  const types = [...new Set(all.map((p) => p.type))].sort();

  return (
    <ListingsContext.Provider value={{ all, userListings, cities, types, addListing, removeListing }}>
      {children}
    </ListingsContext.Provider>
  );
}

export const useListings = () => useContext(ListingsContext);