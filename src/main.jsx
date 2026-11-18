import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { WishlistProvider } from "./Context/WishlistContext.jsx";
import "./index.css";
import { ListingsProvider } from "./Context/ListingsContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <WishlistProvider>
       <ListingsProvider>
        <App />
       </ListingsProvider>
      </WishlistProvider>
    </BrowserRouter>
  </StrictMode>
);
