import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import { AppContextProvider } from "./context/AppContentProvider.jsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const query = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={query}>
    <BrowserRouter>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </BrowserRouter>
  </QueryClientProvider>
);
