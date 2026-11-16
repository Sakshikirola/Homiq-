export const formatPrice = (p, status) => {
  let s;
  if (p >= 1e7) s = `₹${(p / 1e7).toFixed(2)} Cr`;
  else if (p >= 1e5) s = `₹${(p / 1e5).toFixed(1)} L`;
  else s = `₹${p.toLocaleString("en-IN")}`;
  return status === "Rent" ? `${s}/mo` : s;
};

const g = ["", "", "", ""]; 

export const properties = [
  { id: 1, title: "Aravali Heights 3BHK", type: "Apartment", status: "Sale", price: 8500000, city: "Faridabad", address: "Sector 82, Faridabad, Haryana", beds: 3, baths: 3, area: 1650, year: 2021, featured: true, image: "", gallery: g,
    description: "A bright corner apartment on the 9th floor with open views of the Aravali ridge. The layout separates living and sleeping areas, and every bedroom has an attached bathroom and balcony access.",
    amenities: ["Covered parking", "Power backup", "Gym", "Clubhouse", "24/7 security", "Children's play area"],
    agent: { name: "Rohit Sharma", phone: "+91 98100 00001" } },
  { id: 2, title: "The Palm Residence", type: "Villa", status: "Sale", price: 42000000, city: "Gurugram", address: "Golf Course Extension, Gurugram", beds: 5, baths: 5, area: 4800, year: 2020, featured: true, image: "", gallery: g,
    description: "A five-bedroom villa on a 400 sq yd plot with a private garden, home theatre room and a double-height living room. Built with imported fittings and smart-home wiring throughout.",
    amenities: ["Private garden", "Swimming pool", "Home theatre", "Smart home wiring", "3-car garage", "Servant quarters"],
    agent: { name: "Neha Kapoor", phone: "+91 98100 00002" } },
  { id: 3, title: "Lakeview Studio", type: "Studio", status: "Rent", price: 28000, city: "Bengaluru", address: "Bellandur, Bengaluru, Karnataka", beds: 1, baths: 1, area: 520, year: 2022, featured: true, image: "", gallery: g,
    description: "A fully furnished studio overlooking the lake, ideal for a single professional. Includes a modular kitchen, workspace nook and high-speed fibre internet.",
    amenities: ["Fully furnished", "Fibre internet", "Gym", "Lift", "Covered parking", "Housekeeping"],
    agent: { name: "Karthik Rao", phone: "+91 98100 00003" } },
  { id: 4, title: "Greenfield Family House", type: "House", status: "Sale", price: 17500000, city: "Noida", address: "Sector 50, Noida, Uttar Pradesh", beds: 4, baths: 3, area: 2600, year: 2018, featured: true, image: "", gallery: g,
    description: "An independent three-floor house in a gated community, close to schools and the metro. The ground floor opens onto a landscaped lawn, and the terrace is ready for a garden or solar panels.",
    amenities: ["Lawn", "Terrace", "Gated community", "Park nearby", "Metro access", "Power backup"],
    agent: { name: "Anita Verma", phone: "+91 98100 00004" } },
  { id: 5, title: "Marine Court 2BHK", type: "Apartment", status: "Rent", price: 85000, city: "Mumbai", address: "Worli, Mumbai, Maharashtra", beds: 2, baths: 2, area: 980, year: 2019, featured: false, image: "", gallery: g,
    description: "A semi-furnished two-bedroom flat with a sea-facing balcony, ten minutes from the business district. The building has a resident manager and round-the-clock security.",
    amenities: ["Sea view", "Semi-furnished", "Lift", "Visitor parking", "CCTV", "Resident manager"],
    agent: { name: "Imran Sheikh", phone: "+91 98100 00005" } },
  { id: 6, title: "Orchid Garden Villa", type: "Villa", status: "Sale", price: 28500000, city: "Pune", address: "Koregaon Park, Pune, Maharashtra", beds: 4, baths: 4, area: 3400, year: 2019, featured: false, image: "", gallery: g },
  { id: 7, title: "Pink City Haveli Home", type: "House", status: "Sale", price: 12000000, city: "Jaipur", address: "Vaishali Nagar, Jaipur, Rajasthan", beds: 4, baths: 3, area: 2900, year: 2016, featured: false, image: "", gallery: g },
  { id: 8, title: "Metro Edge 1BHK", type: "Apartment", status: "Rent", price: 32000, city: "Gurugram", address: "Sector 56, Gurugram, Haryana", beds: 1, baths: 1, area: 680, year: 2021, featured: false, image: "", gallery: g },
  { id: 9, title: "Sunrise Builder Floor", type: "House", status: "Sale", price: 6200000, city: "Faridabad", address: "Sector 21C, Faridabad, Haryana", beds: 3, baths: 2, area: 1350, year: 2017, featured: false, image: "", gallery: g },
  { id: 10, title: "Whitefield Penthouse", type: "Apartment", status: "Sale", price: 31000000, city: "Bengaluru", address: "Whitefield, Bengaluru, Karnataka", beds: 4, baths: 4, area: 3100, year: 2023, featured: false, image: "", gallery: g },
  { id: 11, title: "Central Park 2BHK", type: "Apartment", status: "Rent", price: 26000, city: "Noida", address: "Sector 137, Noida, Uttar Pradesh", beds: 2, baths: 2, area: 1100, year: 2020, featured: false, image: "", gallery: g },
  { id: 12, title: "Hillcrest Villa", type: "Villa", status: "Rent", price: 120000, city: "Pune", address: "Baner, Pune, Maharashtra", beds: 4, baths: 4, area: 3600, year: 2022, featured: false, image: "", gallery: g },
];

export const cities = [...new Set(properties.map((p) => p.city))].sort();
export const types = [...new Set(properties.map((p) => p.type))].sort();
