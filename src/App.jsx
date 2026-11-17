import { Routes, Route, Link } from "react-router-dom";
import Layout from "./Components/Layout.jsx";
import Home from "./Pages/Home.jsx";
import Properties from "./Pages/Properties.jsx";
import PropertyDetails from "./Pages/PropertyDetails.jsx";
import About from "./Pages/About.jsx";
import Contact from "./Pages/Contact.jsx";

function NotFound() {
  return ( 
    <div className="mx-auto max-w-6xl px-4 py-28 text-center">
      <h1 className="text-3xl font-extrabold text-ink">Page not found</h1>
      <p className="mt-2 text-slate-600">The address you opened does not exist on Homiq.</p>
      <Link to="/" className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white hover:bg-ink-soft">
        Go to home
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<PropertyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  ); 
}
