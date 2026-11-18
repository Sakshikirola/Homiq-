# Homiq

Homiq is a real estate website where people can browse homes to buy or rent, search and filter listings, save favourites and send enquiries. It is a front-end only project, so there is no backend or API. All listings are static sample data.

## Features

- **5 pages:** Home, Properties, Property Details, About and Contact
- **12 static property listings** across 8 cities, with photos
- **5 listings with complete details:** description, amenities, agent and facts
- **Search, filters and sorting:**
  - Search by name, area or city
  - Filter by Buy or Rent, property type, city, bedrooms and budget
  - Budget ranges change automatically between Buy and Rent
  - Sort by featured, price (low to high and high to low), largest area and newest built
  - Show saved properties only
- **Wishlist:** save or remove properties with the heart icon. Saved items are kept in `localStorage`, so they stay after a refresh. The navbar shows a live count.
- **Home page search:** choose Buy or Rent, city and type, and go straight to filtered results
- **Contact form** with validation and a success message
- **Visit request form** on each property page
- **Responsive design** for mobile, tablet and desktop, with a mobile menu
- **404 page** for unknown addresses

## Tech stack

- React Js
- Vite
- React Router
- Tailwind CSS
- Lucide React

## Notes

- This is a demo project. Property data, agent names, phone numbers and emails are sample content.
- The contact form and visit request form do not send data anywhere, because there is no backend.

## License
This project is for learning and portfolio use.

