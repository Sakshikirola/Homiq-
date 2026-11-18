import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ImagePlus, X } from "lucide-react";
import PageHeader from "../Components/PageHeader.jsx";
import { useListings } from "../Context/ListingsContext.jsx";
import { formatPrice } from "../Data/properties.js";

const field =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-ink focus:outline-none focus:ring-1 focus:ring-ink";

const amenityOptions = [
  "Parking", "Power backup", "Lift", "Gym", "Swimming pool", "Garden",
  "24/7 security", "Furnished", "Balcony", "Clubhouse", "Water supply", "CCTV",
];

const MAX_PHOTOS = 3;

const empty = {
  ownerName: "", phone: "", title: "", status: "Sale", type: "Apartment", city: "", address: "",
  price: "", beds: "2", baths: "2", area: "", year: "", description: "", amenities: [],
};

// Shrinks a photo so a few of them fit in the browser's localStorage (about 5 MB).
function resizeImage(file, max = 800) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", 0.7));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

const titleCase = (s) => s.trim().replace(/\s+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function FieldError({ message }) {
  return message ? <p className="mt-1 text-xs text-red-700">{message}</p> : null;
}

export default function PostProperty() {
  const navigate = useNavigate();
  const { addListing, cities } = useListings();
  const [form, setForm] = useState(empty);
  const [photos, setPhotos] = useState([]);
  const [errors, setErrors] = useState({});
  const [photoError, setPhotoError] = useState("");
  const [saveError, setSaveError] = useState("");

  const on = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const toggleAmenity = (a) =>
    setForm((f) => ({
      ...f,
      amenities: f.amenities.includes(a) ? f.amenities.filter((x) => x !== a) : [...f.amenities, a],
    }));

  const addPhotos = async (e) => {
    const files = [...e.target.files].filter((f) => f.type.startsWith("image/"));
    e.target.value = "";
    setPhotoError("");
    if (!files.length) return;
    const room = MAX_PHOTOS - photos.length;
    if (files.length > room) setPhotoError(`You can add up to ${MAX_PHOTOS} photos.`);
    try {
      const done = await Promise.all(files.slice(0, room).map((f) => resizeImage(f)));
      setPhotos((prev) => [...prev, ...done]);
    } catch {
      setPhotoError("One of the photos could not be read. Try a different file.");
    }
  };

  const submit = (e) => {
    e.preventDefault();
    const er = {};
    if (!form.ownerName.trim()) er.ownerName = "Enter your name.";
    if (!/^\d{10}$/.test(form.phone.replace(/[\s-]/g, ""))) er.phone = "Enter a 10-digit phone number.";
    if (form.title.trim().length < 5) er.title = "Enter a title of at least 5 characters.";
    if (!form.city.trim()) er.city = "Enter the city.";
    if (!form.address.trim()) er.address = "Enter the address or area.";
    if (!(Number(form.price) > 0)) er.price = "Enter the price in rupees.";
    if (!(Number(form.area) > 0)) er.area = "Enter the area in sq ft.";
    const year = Number(form.year);
    if (form.year && (year < 1950 || year > new Date().getFullYear() + 3)) er.year = "Enter a valid year.";
    setErrors(er);
    if (Object.keys(er).length) return;

    const city = titleCase(form.city);
    const listing = {
      id: Date.now(),
      userPosted: true,
      featured: false,
      title: form.title.trim(),
      type: form.type,
      status: form.status,
      price: Number(form.price),
      city,
      address: form.address.trim(),
      beds: Number(form.beds),
      baths: Number(form.baths),
      area: Number(form.area),
      year: year || new Date().getFullYear(),
      description:
        form.description.trim() ||
        `A ${form.beds}-bedroom ${form.type.toLowerCase()} in ${city} with ${form.area} sq ft of living space. Contact the owner to arrange a visit.`,
      amenities: form.amenities.length ? form.amenities : ["Water supply"],
      agent: { name: form.ownerName.trim(), phone: form.phone.trim() },
      image: photos[0] || "",
      gallery: photos.length ? photos : [""],
    };

    if (addListing(listing)) navigate("/my-listings", { state: { posted: listing.title } });
    else setSaveError("Your browser storage is full. Remove a photo or delete an old listing and try again.");
  };

  return (
    <>
      <PageHeader title="Post your property" text="List a home for sale or rent. Your listing appears on the Properties page straight away." />
      <div className="mx-auto max-w-4xl px-4 pb-16">
        <form onSubmit={submit} noValidate className="relative -mt-10 space-y-8 rounded-xl border border-slate-200 bg-white p-6 shadow-lg">
          {/* Owner */}
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="mb-3 font-display text-lg font-bold text-ink">Your details</legend>
            <div>
              <label htmlFor="ownerName" className="mb-1 block text-sm font-semibold">Your name</label>
              <input id="ownerName" className={field} value={form.ownerName} onChange={on("ownerName")} />
              <FieldError message={errors.ownerName} />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-semibold">Phone number</label>
              <input id="phone" type="tel" className={field} value={form.phone} onChange={on("phone")} placeholder="10-digit mobile number" />
              <FieldError message={errors.phone} />
            </div>
          </fieldset>

          {/* Property */}
          <fieldset className="grid gap-4 sm:grid-cols-2">
            <legend className="mb-3 font-display text-lg font-bold text-ink">Property details</legend>
            <div className="sm:col-span-2">
              <label htmlFor="title" className="mb-1 block text-sm font-semibold">Listing title</label>
              <input id="title" className={field} value={form.title} onChange={on("title")} placeholder="e.g. Spacious 3BHK near metro" />
              <FieldError message={errors.title} />
            </div>
            <div>
              <label htmlFor="status" className="mb-1 block text-sm font-semibold">I want to</label>
              <select id="status" className={field} value={form.status} onChange={on("status")}>
                <option value="Sale">Sell this property</option>
                <option value="Rent">Rent out this property</option>
              </select>
            </div>
            <div>
              <label htmlFor="type" className="mb-1 block text-sm font-semibold">Property type</label>
              <select id="type" className={field} value={form.type} onChange={on("type")}>
                {["Apartment", "House", "Villa", "Studio"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-semibold">City</label>
              <input id="city" list="city-list" className={field} value={form.city} onChange={on("city")} />
              <datalist id="city-list">{cities.map((c) => <option key={c} value={c} />)}</datalist>
              <FieldError message={errors.city} />
            </div>
            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-semibold">Address or area</label>
              <input id="address" className={field} value={form.address} onChange={on("address")} placeholder="e.g. Sector 21C, Faridabad" />
              <FieldError message={errors.address} />
            </div>
            <div>
              <label htmlFor="price" className="mb-1 block text-sm font-semibold">
                {form.status === "Rent" ? "Monthly rent (₹)" : "Price (₹)"}
              </label>
              <input id="price" type="number" min="0" className={field} value={form.price} onChange={on("price")} />
              <p className="mt-1 text-xs text-slate-500">
                {Number(form.price) > 0 ? `Shown as ${formatPrice(Number(form.price), form.status)}` : "Enter the full amount, e.g. 4500000 for ₹45 L"}
              </p>
              <FieldError message={errors.price} />
            </div>
            <div>
              <label htmlFor="area" className="mb-1 block text-sm font-semibold">Area (sq ft)</label>
              <input id="area" type="number" min="0" className={field} value={form.area} onChange={on("area")} />
              <FieldError message={errors.area} />
            </div>
            <div>
              <label htmlFor="beds" className="mb-1 block text-sm font-semibold">Bedrooms</label>
              <select id="beds" className={field} value={form.beds} onChange={on("beds")}>
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="baths" className="mb-1 block text-sm font-semibold">Bathrooms</label>
              <select id="baths" className={field} value={form.baths} onChange={on("baths")}>
                {[1, 2, 3, 4, 5, 6].map((n) => <option key={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="year" className="mb-1 block text-sm font-semibold">Year built (optional)</label>
              <input id="year" type="number" className={field} value={form.year} onChange={on("year")} placeholder="e.g. 2019" />
              <FieldError message={errors.year} />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="description" className="mb-1 block text-sm font-semibold">Description (optional)</label>
              <textarea id="description" rows={4} className={field} value={form.description} onChange={on("description")} placeholder="Tell buyers or renters what makes this property special." />
            </div>
          </fieldset>

          {/* Amenities */}
          <fieldset>
            <legend className="mb-3 font-display text-lg font-bold text-ink">Amenities</legend>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {amenityOptions.map((a) => (
                <label key={a} className="flex items-center gap-2 text-sm text-slate-700">
                  <input type="checkbox" className="accent-ink" checked={form.amenities.includes(a)} onChange={() => toggleAmenity(a)} />
                  {a}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Photos */}
          <fieldset>
            <legend className="mb-3 font-display text-lg font-bold text-ink">Photos</legend>
            <div className="flex flex-wrap gap-3">
              {photos.map((src, i) => (
                <div key={i} className="relative">
                  <img src={src} alt={`Upload ${i + 1}`} className="h-24 w-32 rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={() => setPhotos(photos.filter((_, j) => j !== i))}
                    aria-label={`Remove photo ${i + 1}`}
                    className="absolute -right-2 -top-2 rounded-full bg-ink p-1 text-white shadow hover:bg-ink-soft"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              {photos.length < MAX_PHOTOS && (
                <label className="flex h-24 w-32 cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-300 text-xs text-slate-500 hover:border-brass hover:text-brass-dark">
                  <ImagePlus size={22} />
                  Add photo
                  <input type="file" accept="image/*" multiple className="sr-only" onChange={addPhotos} />
                </label>
              )}
            </div>
            <p className="mt-2 text-xs text-slate-500">Up to {MAX_PHOTOS} photos. They are resized and saved in your browser only.</p>
            <FieldError message={photoError} />
          </fieldset>

          {saveError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-800">{saveError}</p>}

          <div className="flex flex-wrap items-center gap-4">
            <button className="rounded-lg bg-ink px-7 py-3 text-sm font-semibold text-white hover:bg-ink-soft">Post property</button>
            <Link to="/my-listings" className="text-sm font-semibold text-brass-dark hover:underline">View my listings</Link>
          </div>
        </form>
      </div>
    </>
  );
}