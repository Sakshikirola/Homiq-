import { Link, useLocation } from "react-router-dom";
import { CircleCheck, Trash2, PlusCircle } from "lucide-react";
import PageHeader from "../Components/PageHeader.jsx";
import PropertyCard from "../Components/PropertyCard.jsx";
import { useListings } from "../Context/ListingsContext.jsx";
import { useWishlist } from "../Context/WishlistContext.jsx";

export default function MyListings() {
  const { userListings, removeListing } = useListings();
  const { has, toggle } = useWishlist();
  const posted = useLocation().state?.posted;

  const remove = (p) => {
    if (!window.confirm(`Delete "${p.title}"? This cannot be undone.`)) return;
    if (has(p.id)) toggle(p.id); // keep the wishlist count correct
    removeListing(p.id);
  };

  return (
    <>
      <PageHeader title="My listings" text="Properties you posted from this browser." />
      <div className="mx-auto max-w-6xl px-4 pb-16">
        {posted && (
          <p role="status" className="relative -mt-10 mb-6 flex items-center gap-2 rounded-xl border border-brass bg-white p-4 text-sm text-ink shadow-lg">
            <CircleCheck size={18} className="text-brass-dark" />
            "{posted}" is now live on the Properties page.
          </p>
        )}

        {userListings.length ? (
          <>
            <div className={`flex justify-end ${posted ? "" : "relative -mt-10"}`}>
              <Link to="/post-property" className="inline-flex items-center gap-2 rounded-lg bg-brass px-5 py-2.5 text-sm font-bold text-ink shadow hover:bg-[#d8a54f]">
                <PlusCircle size={16} /> Post another property
              </Link>
            </div>
            <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {userListings.map((p) => (
                <div key={p.id}>
                  <PropertyCard p={p} />
                  <button
                    type="button"
                    onClick={() => remove(p)}
                    className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-red-700 hover:underline"
                  >
                    <Trash2 size={15} /> Delete listing
                  </button>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="relative -mt-10 flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white px-4 py-16 text-center">
            <p className="font-semibold text-slate-800">You have not posted any property yet</p>
            <p className="mt-1 text-sm text-slate-500">Sell or rent out your home in a few minutes.</p>
            <Link to="/post-property" className="mt-6 rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
              Post a property
            </Link>
          </div>
        )}
      </div>
    </>
  );
}